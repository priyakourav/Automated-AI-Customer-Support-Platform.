import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/landing/Hero";
import HowItWorks from "@/components/landing/HowItWorks";

export default function Home() {
  return (
    <main className="bg-[#0B0F19]">
      <Navbar />
      <Hero />
      <HowItWorks />
    </main>
  );
}