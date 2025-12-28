import { useRoute, Link } from "wouter";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { COURSES } from "@/data/content";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Code, GraduationCap, ArrowLeft, ChevronRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CoursesPage() {
  const [match, params] = useRoute("/courses/:category");
  const category = params?.category as keyof typeof COURSES | undefined;

  const categories = [
    { 
      id: "finance", 
      name: "Finance & Corporate", 
      description: "Elite certifications including ACS, CA, and CFA for global leadership.",
      icon: GraduationCap, 
      color: "text-blue-400", 
      bg: "bg-blue-500/10",
      border: "border-blue-500/20",
      gradient: "from-blue-500/20 to-transparent"
    },
    { 
      id: "tech", 
      name: "Modern Technology", 
      description: "Master full-stack development, AI, and business intelligence.",
      icon: Code, 
      color: "text-emerald-400", 
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20",
      gradient: "from-emerald-500/20 to-transparent"
    },
    { 
      id: "traditional", 
      name: "Traditional Wisdom", 
      description: "Explore the depths of Vedas and ancient spiritual learning tracks.",
      icon: BookOpen, 
      color: "text-amber-400", 
      bg: "bg-amber-500/10",
      border: "border-amber-500/20",
      gradient: "from-amber-500/20 to-transparent"
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-emerald-500/30">
      <Navbar />
      <main className="pt-32 pb-24 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-emerald-500/10 to-transparent blur-[120px] -z-10" />
        
        <div className="w-full px-6 relative z-10">
          <AnimatePresence mode="wait">
            {!category ? (
              <motion.div 
                key="selection"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-6xl mx-auto"
              >
                <div className="text-center mb-20">
                  <motion.div
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-6"
                  >
                    <Sparkles className="w-3 h-3" /> Professional Learning Tracks
                  </motion.div>
                  <h1 className="text-5xl md:text-8xl font-black mb-6 uppercase tracking-tighter leading-none">
                    Architect Your <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600">Future Mastery</span>
                  </h1>
                  <p className="text-slate-400 text-xl max-w-2xl mx-auto leading-relaxed">
                    Select a specialized vertical to access elite curriculum designed for modern industry excellence.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {categories.map((cat, idx) => (
                    <Link key={cat.id} href={`/courses/${cat.id}`}>
                      <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className={`group relative cursor-pointer p-10 rounded-[2.5rem] bg-slate-900/50 border ${cat.border} hover:bg-slate-900 transition-all duration-[1500ms] overflow-hidden h-full flex flex-col`}
                        onMouseMove={(e) => {
                          const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
                          const x = e.clientX - rect.left;
                          const y = e.clientY - rect.top;
                          (e.currentTarget as HTMLElement).style.setProperty('--glow-x', `${x}px`);
                          (e.currentTarget as HTMLElement).style.setProperty('--glow-y', `${y}px`);
                        }}
                      >
                        <div 
                          className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-[1500ms] rounded-[2.5rem]`}
                          style={{
                            background: `radial-gradient(circle 400px at var(--glow-x, 50%) var(--glow-y, 50%), ${cat.id === 'finance' ? 'rgba(59, 130, 246, 0.3)' : cat.id === 'tech' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(217, 119, 6, 0.3)'}, transparent 70%)`
                          }}
                        />
                        
                        <div className={`relative z-10 w-16 h-16 rounded-2xl ${cat.bg} flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-3 transition-all duration-[1500ms]`}>
                          <cat.icon className={`w-8 h-8 ${cat.color} group-hover:text-white transition-colors duration-[1500ms]`} />
                        </div>
                        
                        <div className="relative z-10 flex-grow">
                          <h3 className="text-3xl font-black uppercase tracking-tight mb-4 text-white group-hover:text-2xl group-hover:text-white transition-all duration-300">{cat.name}</h3>
                          <p className="text-slate-400 text-base md:text-lg leading-relaxed mb-8 group-hover:text-sm group-hover:text-white transition-all duration-300">{cat.description}</p>
                        </div>

                        <div className="relative z-10 flex items-center gap-2 text-sm font-black uppercase tracking-widest text-emerald-500 group-hover:text-white group-hover:gap-4 transition-all duration-[1500ms]">
                          Explore Vertical <ChevronRight className="w-4 h-4" />
                        </div>
                      </motion.div>
                    </Link>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="vertical"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="w-full"
              >
                <Link href="/courses">
                  <button className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-slate-400 hover:text-emerald-400 cursor-pointer mb-12 transition-colors group">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to verticals
                  </button>
                </Link>
                
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 border-b border-white/10 pb-12">
                  <div>
                    <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4">
                      {category} <span className="text-emerald-500">Vertical</span>
                    </h1>
                    <p className="text-slate-400 text-lg">Specialized professional certification tracks for {category} mastery.</p>
                  </div>
                  <div className="flex gap-4">
                    <div className="px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-widest">
                      {COURSES[category]?.length} Programs Available
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
                  {COURSES[category]?.map((course, idx) => (
                    <motion.div
                      key={course.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="group relative w-full aspect-square flex flex-col p-4 rounded-[2rem] bg-white/5 border border-white/5 hover:bg-slate-900 hover:border-emerald-500/30 transition-all duration-300 transform-gpu hover:scale-105 overflow-hidden cursor-pointer"
                      onMouseMove={(e) => {
                        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
                        const x = e.clientX - rect.left;
                        const y = e.clientY - rect.top;
                        (e.currentTarget as HTMLElement).style.setProperty('--glow-x', `${x}px`);
                        (e.currentTarget as HTMLElement).style.setProperty('--glow-y', `${y}px`);
                      }}
                    >
                      <div 
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-[1500ms] pointer-events-none"
                        style={{
                          background: `radial-gradient(circle 400px at var(--glow-x, 50%) var(--glow-y, 50%), rgba(16, 185, 129, 0.2), transparent 70%)`
                        }}
                      />

                      <div className="relative z-10 h-full">
                        {/* centered state (default) */}
                        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 transition-all duration-300 group-hover:opacity-0 group-hover:scale-95">
                          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 font-bold">
                            {idx + 1}
                          </div>
                          <h3 className="text-3xl md:text-3xl lg:text-3xl font-black text-slate-200 text-center px-4 group-hover:text-xl transition-all duration-300">
                            {course.title}
                          </h3>
                        </div>

                        {/* hover state (top positions) */}
                        <div className="absolute inset-x-4 top-4 z-20 pointer-events-none opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:pointer-events-auto">
                          <div className="relative">
                            <div className="absolute left-0 top-0 w-8 h-8 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 font-bold">
                              {idx + 1}
                            </div>
                            <h3 className="mx-auto text-center text-lg md:text-lg lg:text-lg font-black text-slate-200 px-4 transition-all duration-300">
                              {course.title}
                            </h3>
                          </div>
                        </div>

                        {/* description overlay (transparent) */}
                        <div className="absolute inset-0 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-30 bg-transparent">
                          <div className="h-full flex flex-col items-stretch justify-start pt-20 pb-20 px-6">
                            <p className={(idx === 0 || idx === 6) ? "text-slate-300 text-[10px] md:text-xs leading-relaxed w-full mb-6 text-left" : "text-slate-300 text-xs md:text-sm leading-relaxed w-full mb-6 text-left"}>
                              {course.description}
                            </p>
                            <div className="mt-auto flex justify-center">
                            <Link href={`/connect?course=${course.id}`}>
                              <Button className="rounded-xl px-6 py-3 bg-emerald-600 hover:bg-white hover:text-emerald-950 font-black text-xs tracking-widest uppercase transition-all duration-300 shadow-lg">
                                Inquire Now
                              </Button>
                            </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
      <Footer />
    </div>
  );
}
