                    "use client"

                    import { zodResolver } from "@hookform/resolvers/zod"
                    import { useForm } from "react-hook-form"
                    import { z } from "zod"
                    import { Button } from "@/components/ui/button"
                    import {
                        Form,
                        FormControl,
                        FormField,
                        FormItem,
                        FormLabel,
                        FormMessage,
                    } from "@/components/ui/form"
                    import { Input } from "@/components/ui/input"

                    import {
                    Select,
                    SelectContent,
                    SelectGroup,
                    SelectItem,
                    SelectTrigger,
                    SelectValue,
                    } from "@/components/ui/select"
                    import { Textarea } from "@/components/ui/textarea"

                    // 1. Define a single, clean schema for your Companion
                    const formSchema = z.object({
                        name: z.string().min(2, { message: 'Companion name is too short.' }).max(32),
                        subject: z.string().min(1, { message: 'Subject is required.' }),
                        topic: z.string().min(5, { message: 'Topic must be at least 5 characters.' }).max(100),
                        voice: z.string().min(1, { message: 'Voice is required.' }),
                        style: z.string().min(1, { message: 'Style is required.' }),
                        duration: z.coerce.number().min(1, { message: 'Duration is required' })
                    })

                    const CompanionForm = () => {
                        // 2. Initialize the form with the schema
                        const form = useForm<z.infer<typeof formSchema>>({
                            resolver: zodResolver(formSchema),
                            defaultValues: {
                                name: "",
                                subject: "",
                                topic: "",
                                voice: "",
                                style: "",
                                duration: 15,
                            },
                        })

                        // 3. Submit handler
                        const onSubmit = (values: z.infer<typeof formSchema>) => {
                            console.log("Form Values:", values)
                        }

                        const subjects = [
                            "math",
                            "science",
                            "history",
                            "programming",
                            "business",
                            "english",
                            ]
                    const voices=[
                        "calm",
                        "energetic",
                        "friendly",
                        "professional",
                    ]
                        return (
   <div className="max-w-3xl mx-auto p-8 md:p-12 
  bg-neutral-50
  rounded-[2.5rem] 
 border border-slate-200
  shadow-[0_20px_50px_rgba(0,0,0,0.1)]">
  
  <div className="text-center mb-12">
    <h2 className="text-3xl md:text-4xl font-extrabold tracking-tighter text-neutral-950">
      Create Your AI Companion
    </h2>
    <p className="text-neutral-500 text-sm mt-3 font-medium">
      Personalize your digital teaching assistant
    </p>
  </div>

  <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      
      {/* Name and Subject */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-neutral-700 font-semibold text-xs uppercase tracking-wider ml-1">Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g. Neuriko"
                  className="bg-neutral-100 border-neutral-200 text-neutral-900 focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 rounded-2xl h-12 transition-all placeholder:text-neutral-400"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-neutral-700 font-semibold text-xs uppercase tracking-wider ml-1">Subject Area</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-neutral-100 border-neutral-200 text-neutral-900 focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 rounded-2xl h-12 capitalize transition-all">
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-white border-neutral-100 rounded-xl">
                  {subjects.map((subject) => (
                    <SelectItem key={subject} value={subject} className="capitalize cursor-pointer focus:bg-cyan-500/10 focus:text-cyan-900">
                      {subject}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Topic */}
      <FormField
        control={form.control}
        name="topic"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-neutral-700 font-semibold text-xs uppercase tracking-wider ml-1">Learning Topic</FormLabel>
            <FormControl>
              <Textarea
                placeholder="What specific skills or knowledge will they teach?"
                className="bg-neutral-100 border-neutral-200 text-neutral-900 focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 rounded-2xl min-h-[120px] resize-none p-4 transition-all placeholder:text-neutral-400"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Bottom Three Settings */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <FormField
          control={form.control}
          name="voice"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-neutral-700 font-semibold text-xs uppercase tracking-wider ml-1">Voice</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-neutral-100 border-neutral-200 text-neutral-900 focus:border-cyan-500 focus:ring-cyan-500/20 rounded-2xl h-12 transition-all">
                    <SelectValue placeholder="Voice" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-white border-neutral-100 rounded-xl">
                  <SelectItem value="male" className="cursor-pointer focus:bg-cyan-500/10 focus:text-cyan-900">Male</SelectItem>
                  <SelectItem value="female" className="cursor-pointer focus:bg-cyan-500/10 focus:text-cyan-900">Female</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="style"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-neutral-700 font-semibold text-xs uppercase tracking-wider ml-1">Style</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-neutral-100 border-neutral-200 text-neutral-900 focus:border-cyan-500 focus:ring-cyan-500/20 rounded-2xl h-12 transition-all">
                    <SelectValue placeholder="Style" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-white border-neutral-100 rounded-xl">
                  <SelectItem value="formal" className="cursor-pointer focus:bg-cyan-500/10 focus:text-cyan-900">Formal</SelectItem>
                  <SelectItem value="casual" className="cursor-pointer focus:bg-cyan-500/10 focus:text-cyan-900">Casual</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="duration"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-neutral-700 font-semibold text-xs uppercase tracking-wider ml-1">Mins</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="30"
                  className="bg-neutral-100 border-neutral-200 text-neutral-900 focus:border-cyan-500 rounded-2xl h-12 transition-all placeholder:text-neutral-400"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>

      <Button
        type="submit"
        className="w-full h-14 mt-6 
        bg-gradient-to-r from-cyan-500 via-cyan-400 to-teal-400
        text-white font-extrabold text-lg 
        rounded-2xl transition-all active:scale-[0.98]
        hover:opacity-95 hover:shadow-[0_0_30px_5px_rgba(6,182,212,0.3)]
        shadow-[0_8px_30px_rgba(6,182,212,0.2)]"
      >
        Generate Companion
      </Button>

    </form>
  </Form>
</div>
                        )
                    }

                    export default CompanionForm