

interface CompanionCardProps {
  id: string;
  name: string;
  topic: string;
  subject: string;
  duration: number;
  color: string;
}

import Link from "next/link";
import Image from "next/image";

const CompanionCard = ({ id, name, topic, subject, duration, color }:
  CompanionCardProps) => {

  
  return (
    <article className="companion-card" style={{backgroundColor: color}}>
        <div className="flex items-center justify-between">
          <div className="subject-badge">{subject}</div>
          <button className="companion-bookmark">
            <Image src="/icons/bookmark.svg" 
            alt="bookmark" 
            width={12.5}
            height={15}/>
            </button>
        </div>
        <h1 className="text-2xl font-bld">{name}</h1>
        <p className="text-sm">{topic}</p>
        <div className="flex items-center gap-2">
          <Image src="/icons/clock.svg" alt="clock" width={13.5} height={13.5}/>
          <span className="text-lg font-bold">{duration} mins Duration</span>
        </div>
        <Link href={`/companions/${id}`}>
          <button className="btn-primary w-full justify-center">Launch Lesson</button>
        </Link>
    </article>
  )
}

export default CompanionCard