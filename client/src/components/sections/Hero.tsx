import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, Sparkles, Database, Shield, Zap } from "lucide-react";
import heroBg from "@assets/generated_images/futuristic_emerald_and_slate_technical_visualization_background.png";

export function Hero() {
  const { scrollY } = useScroll();
  
  const y1 = useTransform(scrollY, [0, 500], [0, 250]);
  const y2 = useTransform(scrollY, [0, 500], [0, -180]);
  const y3 = useTransform(scrollY, [0, 500], [0, 120]);
  const rotate = useTransform(scrollY, [0, 1000], [0, 120]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 500], [1, 1.15]);

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-transparent">
      {/* Refined Parallax Layer */}
      <motion.div 
        style={{ y: y1, opacity }}
        className="absolute inset-0 z-0 pointer-events-none"
      >
        <motion.img 
          style={{ scale }}
          src={heroBg} 
          alt="Background" 
          className="w-full h-full object-cover opacity-15 mix-blend-screen"
        />
      </motion.div>

      {/* Dynamic Environmental Objects */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <motion.div 
          style={{ y: y2, rotate: rotate }}
          className="absolute top-[15%] left-[8%] w-[2px] h-[350px] bg-gradient-to-b from-transparent via-emerald-500/40 to-transparent opacity-20"
        />
        
        <motion.div 
          style={{ y: y3 }}
          className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[180px]"
        />

        {/* Floating Technical Lines */}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            style={{ 
              y: useTransform(scrollY, [0, 1000], [0, (i + 1) * -90]),
              rotate: (i * 36)
            }}
            className="absolute w-32 h-[1px] bg-emerald-400/10 hidden lg:block"
            initial={{ 
              top: 5 + (i * 10) + "%", 
              left: i % 2 === 0 ? "2%" : "95%" 
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 text-left">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 text-xs font-bold mb-8 backdrop-blur-xl uppercase tracking-widest"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Advanced Intelligence Ecosystem
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.95] uppercase"
            >
              Eaxion <br />
              <span className="text-gradient">Analytics</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-xl text-muted-foreground mb-10 max-w-xl leading-relaxed font-medium"
            >
              Architecting the future of data-driven intelligence. Master elite technical domains through our specialized technical and professional curriculum.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-start"
            >
                <Button asChild size="lg" className="rounded-2xl text-base px-8 h-14 bg-emerald-600 hover:bg-emerald-500 shadow-[0_15px_30px_-10px_rgba(16,185,129,0.4)] transition-all cursor-pointer">
                  <Link href="/courses">Launch Learning <ArrowRight className="ml-2 w-4 h-4" /></Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-2xl text-base px-8 h-14 border-emerald-500/20 bg-emerald-500/5 backdrop-blur-xl hover:bg-emerald-500/10 hover:border-emerald-500/40 cursor-pointer">
                  <Link href="/connect">Connect Now</Link>
                </Button>
            </motion.div>
          </div>

          <div className="lg:col-span-5 relative hidden lg:block">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="relative"
            >
              <motion.div 
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-10 -left-10 p-6 glass-panel rounded-[2rem] z-20"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-emerald-500/20 rounded-2xl text-emerald-400">
                    <Database className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-2xl font-black">4.8TB</div>
                    <div className="text-[10px] uppercase tracking-widest opacity-50">Intelligence Matrix</div>
                  </div>
                </div>
              </motion.div>

              <div className="w-full aspect-square rounded-full border border-emerald-500/20 flex items-center justify-center p-12 relative">
                <div className="absolute inset-0 rounded-full border-2 border-emerald-500/10 animate-[spin_40s_linear_infinite]" />
                <div className="w-full h-full rounded-full border border-emerald-500/30 flex items-center justify-center p-12 animate-[spin_25s_linear_infinite_reverse]">
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-emerald-500/20 to-teal-500/20 blur-3xl opacity-60" />
                </div>
                <Zap className="absolute w-24 h-24 text-emerald-400 animate-pulse drop-shadow-[0_0_20px_rgba(52,211,153,0.5)]" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />
    </section>
  );
}
