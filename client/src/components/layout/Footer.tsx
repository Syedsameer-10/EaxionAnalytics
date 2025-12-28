import { motion } from "framer-motion";
import { Link } from "wouter";
import { Linkedin, Youtube, Facebook, Instagram } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { name: "Facebook", icon: Facebook, url: "https://www.facebook.com/profile.php?id=100068014312188", color: "hover:text-blue-600" },
    { name: "Instagram", icon: Instagram, url: "https://www.instagram.com/arvind_axion/", color: "hover:text-emerald-400" },
    { name: "YouTube", icon: Youtube, url: "https://youtube.com/@arvindandswamy", color: "hover:text-red-500" },
    { name: "LinkedIn", icon: Linkedin, url: "https://www.linkedin.com/in/arvindaxion", color: "hover:text-emerald-500" },
  ];

  return (
    <footer className="bg-slate-950 text-slate-300 py-12 border-t border-emerald-500/10 relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center justify-center text-center space-y-8">
          <Link href="/">
            <span className="text-2xl font-black text-white tracking-tighter uppercase cursor-pointer">
              Eaxion<span className="text-emerald-500">.</span>
            </span>
          </Link>

          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a 
                key={social.name} 
                href={social.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className={`p-3 rounded-xl bg-white/5 border border-white/5 transition-all duration-300 ${social.color} hover:bg-white/10 hover:border-emerald-500/20`}
                title={social.name}
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
          
          <div className="flex flex-col items-center gap-2">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
              © {currentYear} Eaxion. All rights reserved.
            </p>
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-600">
              Website built by vernex.in
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
