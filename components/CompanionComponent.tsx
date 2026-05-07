"use client";

import { useEffect, useRef, useState } from 'react';
import { cn, configureAssistant, getSubjectColor } from '@/lib/utils';
import Vapi from '@vapi-ai/web';
import Image from 'next/image';
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import soundwaves from '@/constants/soundwaves.json';
import { addToSessionHistory } from '@/lib/actions/companion.actions';

enum CallStatus {
    INACTIVE = 'INACTIVE',
    CONNECTING = 'CONNECTING',
    ACTIVE = 'ACTIVE',
    FINISHED = 'FINISHED',
}

interface SavedMessage {
    role: 'user' | 'assistant';
    content: string;
}

interface Message {
    type: string;
    transcriptType?: string;
    role: 'user' | 'assistant';
    transcript: string;
}

const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_WEB_TOKEN!);

const CompanionComponent = ({ companionId, subject, topic, name, userName,
    userImage, style, voice
}: CompanionComponentProps) => {
    const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [messages, setMessages] = useState<SavedMessage[]>([]);
    const lottieRef = useRef<LottieRefCurrentProps>(null);

    useEffect(() => {
        if (lottieRef.current) {
            if (isSpeaking) { lottieRef.current?.play(); } 
            else { lottieRef.current?.stop(); }
        }
    }, [isSpeaking]);

    useEffect(() => {
        const onCallStart = () => setCallStatus(CallStatus.ACTIVE);
        const onCallEnd = () => {
            setCallStatus(CallStatus.FINISHED);
            addToSessionHistory(companionId);
        };

        const onMessage = (message: Message) => {
            if (message.type === 'transcript' && message.transcriptType === 'final') {
                const newMessage = { role: message.role, content: message.transcript };
                setMessages((prev) => [newMessage, ...prev]);
            }
        };

        const onSpeechStart = () => setIsSpeaking(true);
        const onSpeechEnd = () => setIsSpeaking(false);
        const onError = (error: Error) => console.log('Error', error);

        vapi.on('call-start', onCallStart);
        vapi.on('call-end', onCallEnd);
        vapi.on('message', onMessage);
        vapi.on('error', onError);
        vapi.on('speech-start', onSpeechStart);
        vapi.on('speech-end', onSpeechEnd);

        return () => {
            vapi.off('call-start', onCallStart);
            vapi.off('call-end', onCallEnd);
            vapi.off('message', onMessage);
            vapi.off('error', onError);
            vapi.off('speech-start', onSpeechStart);
            vapi.off('speech-end', onSpeechEnd);
        };
    }, [companionId]);

    const toggleMicrophone = () => {
        const currentlyMuted = vapi.isMuted();
        vapi.setMuted(!currentlyMuted);
        setIsMuted(!currentlyMuted);
    };

    const handleCall = async () => {
        try {
            setCallStatus(CallStatus.CONNECTING);
            const assistantOverrides = { variableValues: { subject, topic, style } };
            const assistantConfig = configureAssistant(voice, style);
            await vapi.start(assistantConfig, assistantOverrides);
        } catch (error) {
            console.error("Vapi Start Error:", error);
            setCallStatus(CallStatus.INACTIVE);
            alert("Microphone access is required for SomaAI sessions.");
        }
    };

    const handleDisconnect = () => {
        setCallStatus(CallStatus.FINISHED);
        vapi.stop();
    };

    const brandColor = getSubjectColor(subject);

    return (
        <section className="flex flex-col h-full min-h-[650px] bg-[#0A0A0A] text-white">
            
            {/* 1. TOP VISUAL BAR: The AI & The User */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 border-b border-white/10">
                
                {/* AI Side */}
                <div className="p-8 flex flex-col items-center justify-center bg-[#0D0D0D] relative overflow-hidden">
                    {isSpeaking && (
                        <div className="absolute inset-0 bg-[radial-gradient(circle,var(--tw-gradient-stops))] from-white/[0.03] to-transparent animate-pulse pointer-events-none" />
                    )}
                    
                    <div className="relative size-40 md:size-48 flex items-center justify-center rounded-full mb-6 z-10"
                         style={{ backgroundColor: `${brandColor}15`, border: `2px solid ${brandColor}30` }}>
                        
                        <div className={cn(
                            'absolute inset-0 flex items-center justify-center transition-all duration-700',
                            callStatus === CallStatus.ACTIVE ? 'opacity-0 scale-75' : 'opacity-100 scale-100'
                        )}>
                            <Image src={`/icons/${subject}.svg`} alt={subject} width={100} height={100} className="invert brightness-200" />
                        </div>

                        <div className={cn(
                            'absolute inset-0 flex items-center justify-center transition-all duration-700',
                            callStatus === CallStatus.ACTIVE ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                        )}>
                            <Lottie lottieRef={lottieRef} animationData={soundwaves} autoplay={false} className="w-full" />
                        </div>
                    </div>
                    <h2 className="text-xl font-bold tracking-tight">{name}</h2>
                    <span className="text-[10px] uppercase tracking-[0.3em] text-slate-500 mt-1">Intelligence Architect</span>
                </div>

                {/* User Side */}
                <div className="p-8 flex flex-col items-center justify-center bg-[#0D0D0D]">
                    <div className="relative mb-6">
                        <Image src={userImage} alt={userName} width={160} height={160} className="rounded-3xl border-2 border-white/5 object-cover grayscale hover:grayscale-0 transition-all duration-500" />
                        {callStatus === CallStatus.ACTIVE && (
                            <div className="absolute -bottom-2 -right-2 size-6 bg-green-500 rounded-full border-4 border-[#0D0D0D] animate-bounce" />
                        )}
                    </div>
                    <h2 className="text-xl font-bold tracking-tight">{userName}</h2>
                    <span className="text-[10px] uppercase tracking-[0.3em] text-slate-500 mt-1">Research Fellow</span>
                </div>
            </div>

            {/* 2. TRANSCRIPT AREA: Centered and Clean */}
            <div className="flex-grow relative overflow-hidden bg-[#0A0A0A] p-6">
                <div className="max-w-3xl mx-auto h-[300px] overflow-y-auto no-scrollbar flex flex-col-reverse gap-4">
                    {messages.length === 0 && (
                        <p className="text-center text-slate-600 italic text-sm mt-10">Waiting for session initialization...</p>
                    )}
                    {messages.map((message, index) => (
                        <div key={index} className={cn(
                            "flex flex-col gap-1 max-w-[80%]",
                            message.role === 'assistant' ? "items-start" : "items-end ml-auto"
                        )}>
                            <span className="text-[10px] uppercase font-bold text-slate-500">
                                {message.role === 'assistant' ? name.split(' ')[0] : 'You'}
                            </span>
                            <div className={cn(
                                "px-4 py-2 rounded-2xl text-sm leading-relaxed",
                                message.role === 'assistant' 
                                    ? "bg-white/5 text-white border border-white/10 rounded-tl-none" 
                                    : "bg-[#2B82F6] text-white rounded-tr-none"
                            )}>
                                {message.content}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#0A0A0A] to-transparent pointer-events-none" />
            </div>

            {/* 3. CONTROL PANEL: Floating at the Bottom */}
            <div className="p-6 bg-[#0D0D0D] border-t border-white/10">
                <div className="max-w-md mx-auto flex items-center gap-4">
                    <button 
                        className={cn(
                            "p-4 rounded-2xl border transition-all",
                            isMuted ? "bg-red-500/10 border-red-500/50 text-red-500" : "bg-white/5 border-white/10 text-white"
                        )}
                        onClick={toggleMicrophone} 
                        disabled={callStatus !== CallStatus.ACTIVE}
                    >
                        <Image 
                            src={isMuted ? '/icons/mic-off.svg' : '/icons/mic-on.svg'} 
                            alt="mic" width={24} height={24} 
                            className="invert"
                        />
                    </button>

                    <button 
                        className={cn(
                            'flex-grow py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-lg active:scale-95',
                            callStatus === CallStatus.ACTIVE 
                                ? 'bg-red-600 hover:bg-red-700 text-white' 
                                : 'bg-[#2B82F6] hover:bg-blue-500 text-white',
                            callStatus === CallStatus.CONNECTING && 'animate-pulse opacity-50'
                        )} 
                        onClick={callStatus === CallStatus.ACTIVE ? handleDisconnect : handleCall}
                    >
                        {callStatus === CallStatus.ACTIVE ? "End Session" : 
                         callStatus === CallStatus.CONNECTING ? 'Connecting...' : 'Start Session'}
                    </button>
                </div>
            </div>
        </section>
    );
}

export default CompanionComponent;