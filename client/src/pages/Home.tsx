import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { YouTube } from "@/components/sections/YouTube";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-foreground">
      <Navbar />
      <main>
        <Hero />
        <YouTube />
      </main>
      <Footer />
    </div>
  );
}
