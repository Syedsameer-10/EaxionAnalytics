import { motion, useScroll, useTransform } from "framer-motion";
import { SERVICES } from "@/data/content";

export function Services() {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <section className="py-32 relative overflow-hidden">
      {/* Interactive Background Elements */}
      <motion.div 
        style={{ y: y1 }}
        className="absolute top-1/4 -right-20 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -z-10"
      />
      
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Next-Gen <span className="text-gradient">Capabilities</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              We don't just provide services; we engineer digital ecosystems that define the future of analytics.
            </p>
          </div>
          <div className="hidden md:block h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent mx-8 mb-6" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1px bg-border/50 rounded-3xl overflow-hidden border border-border/50">
          {SERVICES.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group relative bg-slate-950 p-12 hover:bg-slate-900/50 transition-all duration-[1500ms] overflow-hidden cursor-pointer"
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
                  background: `radial-gradient(circle 400px at var(--glow-x, 50%) var(--glow-y, 50%), rgba(16, 185, 129, 0.25), transparent 70%)`
                }}
              />
              <div className="relative z-10">
                <div className="mb-8 inline-flex items-center justify-center">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:scale-125 group-hover:bg-primary group-hover:rotate-12 transition-all duration-[1500ms]">
                    <service.icon className="w-7 h-7 text-primary group-hover:text-white transition-colors duration-[1500ms]" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-white transition-colors duration-[1500ms]">{service.title}</h3>
                <p className="text-muted-foreground leading-relaxed group-hover:text-white transition-colors duration-[1500ms]">
                  {service.description}
                </p>
              </div>
              
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-[1500ms]" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
