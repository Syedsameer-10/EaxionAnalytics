import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { COURSES } from "@/data/content";
import { ArrowRight, BookOpen, GraduationCap, Cpu, Layers, ChevronDown } from "lucide-react";
import { Link } from "wouter";

export function Courses() {
  const [activeTab, setActiveTab] = useState("professional");
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);
  const rotateY = useTransform(scrollYProgress, [0, 1], [0, 360]);

  const tabs = [
    { id: "professional", label: "Professional", icon: GraduationCap },
    { id: "technical", label: "Technical", icon: Cpu },
    { id: "learn", label: "Traditional", icon: BookOpen },
  ];

  return (
    <section id="courses" ref={containerRef} className="py-32 relative bg-slate-950 scroll-mt-20 overflow-hidden">
      {/* New Moving Architectural Background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <motion.div 
          style={{ y: bgY, rotate: rotateY }}
          className="absolute top-1/4 -left-20 w-[400px] h-[400px] border-2 border-primary/30 rounded-[3rem]"
        />
        <motion.div 
          style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]), rotate: useTransform(scrollYProgress, [0, 1], [0, -180]) }}
          className="absolute bottom-1/4 -right-20 w-[300px] h-[300px] border-2 border-accent/30 rounded-full"
        />
        <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-white/5 to-transparent" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          <div className="lg:w-1/3 lg:sticky lg:top-32">
            <div className="inline-flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-widest mb-6">
              <Layers className="w-4 h-4" />
              Curriculum
            </div>
            <h2 className="text-4xl md:text-6xl font-black mb-8 leading-none">
              ELITE <br /><span className="text-gradient">STREAMS</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-12 max-w-sm">
              Deep-dive into specialized learning tracks. Hover to reveal course specifics.
            </p>

            <div className="flex flex-col gap-3">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`group flex items-center justify-between p-6 rounded-2xl transition-all duration-500 border ${
                    activeTab === tab.id 
                    ? "bg-primary border-primary shadow-[0_10px_30px_-10px_rgba(124,58,237,0.6)]" 
                    : "bg-white/5 border-white/5 hover:border-white/20"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <tab.icon className={`w-5 h-5 ${activeTab === tab.id ? "text-white" : "text-primary"}`} />
                    <span className={`font-bold text-lg ${activeTab === tab.id ? "text-white" : "text-muted-foreground group-hover:text-white"}`}>
                      {tab.label}
                    </span>
                  </div>
                  {activeTab === tab.id && <ArrowRight className="w-5 h-5 text-white" />}
                </button>
              ))}
            </div>
          </div>

          <div className="lg:w-2/3 w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="flex flex-wrap gap-6"
              >
                {COURSES[activeTab as keyof typeof COURSES].map((course, idx) => (
                  <CourseStrip key={course.id} course={course} idx={idx} />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

function CourseStrip({ course, idx }: { course: { title: string, id: string }, idx: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link href={`/contact?course=${course.id}`}>
      <motion.div
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="group relative w-full sm:w-1/2 lg:w-1/3 aspect-square flex flex-col p-6 md:p-8 rounded-[2.5rem] bg-white/5 border border-white/5 hover:border-primary/30 transition-all duration-500 cursor-pointer overflow-hidden"
      >
        <div className="relative z-10 flex items-center justify-between w-full">
          <div className="flex items-center gap-6">
            <span className="text-3xl md:text-4xl font-black text-white/10 group-hover:text-primary transition-colors duration-500">
              {(idx + 1).toString().padStart(2, '0')}
            </span>
            <h3 className="text-lg md:text-xl font-bold group-hover:text-white transition-colors">{course.title}</h3>
          </div>
          <ChevronDown className={`w-6 h-6 text-primary transition-transform duration-500 ${isHovered ? 'rotate-180' : ''}`} />
        </div>

        <div className="absolute left-0 right-0 bottom-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-400 ease-[cubic-bezier(.22,1,.36,1)] z-10">
          <p className="text-base text-muted-foreground max-w-full mb-4 leading-relaxed">
            This comprehensive curriculum for {course.title} covers advanced industry methodologies, practical case studies, and hands-on technical labs to ensure mastery of the domain.
          </p>
          <div className="flex items-center gap-4 text-sm font-black uppercase tracking-widest text-primary">
            Secure Your Spot <ArrowRight className="w-5 h-5 animate-pulse" />
          </div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </motion.div>
    </Link>
  );
}
