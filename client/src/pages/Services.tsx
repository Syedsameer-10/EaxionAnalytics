import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Services as ServicesSection } from "@/components/sections/Services";

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-foreground">
      <Navbar />
      <main className="pt-24">
        <ServicesSection />
      </main>
      <Footer />
    </div>
  );
}
