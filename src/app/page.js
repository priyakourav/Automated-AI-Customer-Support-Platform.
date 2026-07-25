import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/landing/Hero";
import HowItWorks from "@/components/landing/HowItWorks";
import CTA from "@/components/landing/CTA";
import FAQ from "@/components/landing/FAQ";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <main className="bg-[#0B0F19]">
      <Navbar />
      <Hero />
      <HowItWorks />
      <CTA />
      <FAQ />
      <Footer />
    </main>
    
  );
}