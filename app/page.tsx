import Nav from "@/components/Nav";
import HeroSection from "@/components/HeroSection";
import StatementSection from "@/components/StatementSection";
import SectionBridge from "@/components/SectionBridge";
import PortfolioReel from "@/components/PortfolioReel";

export default function Home() {
  return (
    <main>
      <Nav />
      <HeroSection />
      <StatementSection />
      <SectionBridge />
      <PortfolioReel />
    </main>
  );
}
