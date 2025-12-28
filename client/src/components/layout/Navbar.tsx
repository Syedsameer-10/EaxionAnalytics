import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

import logo from "/logo.webp";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about", icon: BookOpen },
    { name: "Services", href: "/services" },
    { name: "Courses", href: "/courses" },
    { name: "Connect", href: "/connect" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
        scrolled ? "bg-slate-950/90 backdrop-blur-md border-emerald-500/10 shadow-sm py-2" : "bg-transparent py-4"
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link href="/">
          <span className="flex items-center gap-3 cursor-pointer group">
            <img src={logo} alt="Eaxion Logo" className="w-10 h-10 object-contain rounded-lg" />
            <span className="text-2xl font-black font-heading tracking-tight text-white uppercase group-hover:text-emerald-500 transition-colors">
              Eaxion
            </span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href}>
              <span
                className={cn(
                  "text-xs font-bold uppercase tracking-[0.2em] transition-all hover:text-emerald-400 cursor-pointer flex items-center gap-2",
                  location === link.href ? "text-emerald-400" : "text-slate-400"
                )}
              >
                {link.icon ? <link.icon className="w-4 h-4 text-emerald-400" /> : null}
                {link.name}
              </span>
            </Link>
          ))}
          <Link href="/connect">
            <Button size="sm" className="rounded-xl px-6 font-bold bg-emerald-600 hover:bg-emerald-500 text-xs tracking-widest uppercase">Launch</Button>
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-slate-950 border-b border-emerald-500/10"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <Link key={link.name} href={link.href}>
                  <span onClick={() => setIsOpen(false)} className="text-sm font-bold text-white py-2 border-b border-white/5 uppercase tracking-widest cursor-pointer block">
                    <div className="flex items-center gap-2">
                      {link.icon ? <link.icon className="w-4 h-4 text-emerald-400" /> : null}
                      <span>{link.name}</span>
                    </div>
                  </span>
                </Link>
              ))}
              <Link href="/connect">
                 <Button className="w-full mt-2 bg-emerald-600" onClick={() => setIsOpen(false)}>Get Started</Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
