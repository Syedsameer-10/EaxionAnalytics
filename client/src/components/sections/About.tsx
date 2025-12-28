import { motion } from "framer-motion";
import { CheckCircle2, Users, Target, Lightbulb, Eye } from "lucide-react";

export function About() {
  return (
    <section className="bg-slate-950 text-slate-100 py-24">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white">
            About <span className="text-emerald-400">Eaxion</span>
          </h1>
          <p className="mt-4 text-lg text-slate-400">
            We are a team of passionate innovators dedicated to transforming businesses through cutting-edge technology and data-driven insights.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Who We Are</h2>
            <p className="text-slate-300 leading-relaxed mb-6">
              Eaxion is a forward-thinking technology consultancy specializing in digital transformation, data analytics, and custom software development. Our mission is to empower businesses with the tools and insights they need to thrive in the digital age.
            </p>

            <p className="text-slate-300 leading-relaxed mb-6">
              With expertise spanning cloud computing, business intelligence, and enterprise applications, we deliver solutions that are not only innovative but also practical and scalable.
            </p>

            <div className="flex gap-4 mt-6">
              <button className="px-6 py-3 rounded-lg bg-emerald-500 text-slate-950 font-semibold shadow-md hover:shadow-xl transform hover:-translate-y-0.5 transition">Our Services</button>
              <button className="px-6 py-3 rounded-lg bg-transparent border border-slate-800 text-slate-300 font-semibold hover:bg-slate-900/40 transition">Contact Us</button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -right-8 -top-8 w-64 h-64 bg-emerald-900/10 rounded-lg transform rotate-3 blur-3xl opacity-40" />
            <div className="absolute -left-8 -bottom-8 w-64 h-48 bg-emerald-800/6 rounded-lg transform -rotate-3 blur-2xl opacity-30" />

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.025 }}
              className="relative bg-slate-900/70 rounded-xl backdrop-blur-sm p-6 border border-slate-800 shadow-2xl z-10"
            >
              <div className="space-y-6">
                {[{
                  icon: Target,
                  color: 'bg-emerald-500/10 text-emerald-400',
                  value: '10+',
                  label: 'Years of Excellence'
                },{
                  icon: Users,
                  color: 'bg-emerald-400/10 text-emerald-400',
                  value: '100+',
                  label: 'Clients Served'
                },{
                  icon: Lightbulb,
                  color: 'bg-amber-400/10 text-amber-400',
                  value: '500+',
                  label: 'Projects Delivered'
                }].map((s, i) => (
                  <motion.div key={i} whileHover={{ x: 6 }} className="flex items-center gap-4 hover:bg-slate-800/40 p-2 rounded-lg transition">
                    <motion.div animate={{ scale: [1, 1.04, 1] }} transition={{ duration: 4, repeat: Infinity }} className={`w-12 h-12 rounded-lg flex items-center justify-center ${s.color}`}>
                      <s.icon className="w-6 h-6" />
                    </motion.div>
                    <div>
                      <div className="text-xl font-extrabold text-white">{s.value}</div>
                      <div className="text-sm text-slate-400">{s.label}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Mission & Vision cards (two wide gradient cards side-by-side on md+) */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -8, scale: 1.01 }}
            transition={{ type: 'spring', stiffness: 120, damping: 14 }}
            viewport={{ once: true }}
            className="group relative rounded-2xl overflow-hidden shadow-2xl"
          >
            <div className="absolute inset-0 pointer-events-none rounded-2xl bg-gradient-to-br from-emerald-400/8 to-transparent opacity-0 group-hover:opacity-100 blur-3xl transition-opacity" />
            <div className="p-10 bg-gradient-to-br from-blue-600 to-blue-400 text-white h-full relative z-10">
              <div className="flex items-start gap-6">
                <div className="p-3 rounded-lg bg-white/10 transform transition group-hover:scale-110">
                  <Target className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-extrabold mb-3">Our Mission</h3>
                  <p className="text-white/90 leading-relaxed">
                    To empower businesses worldwide with innovative technology solutions that drive growth, efficiency, and competitive advantage. We strive to be the trusted partner that transforms challenges into opportunities.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -8, scale: 1.01 }}
            transition={{ type: 'spring', stiffness: 120, damping: 14 }}
            viewport={{ once: true }}
            className="group relative rounded-2xl overflow-hidden shadow-2xl"
          >
            <div className="absolute inset-0 pointer-events-none rounded-2xl bg-gradient-to-br from-emerald-400/6 to-transparent opacity-0 group-hover:opacity-100 blur-3xl transition-opacity" />
            <div className="p-10 bg-gradient-to-br from-sky-500 to-blue-500 text-white h-full relative z-10">
              <div className="flex items-start gap-6">
                <div className="p-3 rounded-lg bg-white/10 transform transition group-hover:scale-110">
                  <Eye className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-extrabold mb-3">Our Vision</h3>
                  <p className="text-white/90 leading-relaxed">
                    To become the leading force in digital transformation, recognized globally for our commitment to innovation, excellence, and client success. We envision a future where every business can harness the power of technology.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Core values section */}
        <div className="mt-20 text-center">
          <h3 className="text-3xl font-extrabold text-white">Our Core Values</h3>
          <p className="text-slate-400 mt-3 max-w-2xl mx-auto">The principles that guide everything we do</p>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Innovation', body: 'We embrace change and continuously seek new ways to solve problems, staying ahead of technology trends to deliver cutting-edge solutions.', icon: Lightbulb },
              { title: 'Excellence', body: 'Quality is at the heart of everything we create. We are committed to delivering exceptional results that exceed expectations.', icon: Target },
              { title: 'Partnership', body: 'We build lasting relationships based on trust, transparency, and mutual success. Your success is our success.', icon: Users },
            ].map((v, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 12, scale: 0.98 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.08, type: 'spring', stiffness: 120 }} className="relative group bg-slate-800/50 rounded-3xl p-8 text-left shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:-translate-y-4">
                <div aria-hidden className="absolute inset-0 pointer-events-none -z-10">
                  <div className="absolute inset-0 transition-opacity duration-500 opacity-40 group-hover:opacity-80" style={{ background: 'radial-gradient(ellipse at 20% 20%, rgba(59,130,246,0.12), transparent 20%), radial-gradient(ellipse at 80% 80%, rgba(16,185,129,0.08), transparent 30%)', filter: 'blur(20px)' }} />
                  <div className="absolute -bottom-6 -right-12 w-48 h-48 rounded-full blur-3xl opacity-30 group-hover:opacity-60" style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.22), rgba(16,185,129,0.16))' }} />
                </div>
                <div className="flex items-center gap-4 mb-6">
                  <motion.div whileHover={{ rotate: 12, scale: 1.12 }} className="relative w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-blue-500 flex items-center justify-center text-white transition-transform shadow-md">
                    <div className="absolute inset-0 rounded-full blur-xl opacity-30 group-hover:opacity-60" style={{ background: 'radial-gradient(circle at 30% 30%, rgba(14,165,233,0.28), transparent 40%)' }} />
                    <v.icon className="w-6 h-6 relative" />
                  </motion.div>
                  <h4 className="text-xl font-bold text-white">{v.title}</h4>
                </div>
                <p className="text-slate-300">{v.body}</p>
                <motion.div aria-hidden initial={{ opacity: 0 }} animate={{ opacity: 0 }} whileHover={{ opacity: 1 }} transition={{ duration: 0.4 }} className="pointer-events-none absolute inset-0 -z-20">
                  <div className="absolute inset-0" style={{ boxShadow: '0 20px 50px rgba(14,165,233,0.06), inset 0 2px 20px rgba(99,102,241,0.02)' }} />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Banner */}
        <div className="mt-20">
          <div className="rounded-xl overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-sky-500 p-12 text-center rounded-xl shadow-2xl">
              <h3 className="text-4xl font-extrabold text-white">Ready to Work Together?</h3>
              <p className="text-white/90 mt-4 max-w-2xl mx-auto">Let's discuss how we can help transform your business with innovative solutions.</p>
              <div className="mt-6">
                <button className="px-8 py-4 rounded-xl bg-orange-500 text-white font-bold shadow-lg hover:brightness-105 transition">Get Started Today</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
