import Nav from "@/components/Nav";
import HeroSection from "@/components/HeroSection";
import StatementSection from "@/components/StatementSection";
import PortfolioReel from "@/components/PortfolioReel";
import ScrollRevealSection from "@/components/ScrollRevealSection";

export default function Home() {
  return (
    <main>
      <Nav />
      <HeroSection />
      <StatementSection />
      <PortfolioReel />
      <ScrollRevealSection />
    </main>
  );
}
