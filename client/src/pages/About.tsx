import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { About as AboutSection } from "@/components/sections/About";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-foreground">
      <Navbar />
      <main className="pt-24">
        <AboutSection />
      </main>
      <Footer />
    </div>
  );
}
