"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Nav from "@/components/Nav";
import OriginSection from "@/components/OriginSection";
import AboutPreview from "@/components/AboutPreview";
import ClientStrip from "@/components/ClientStrip";
import ProjectCarousel from "@/components/ProjectCarousel";
import ServicesStrip from "@/components/ServicesStrip";
import PullQuote from "@/components/PullQuote";
import Footer from "@/components/Footer";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const access = localStorage.getItem("auc-access");
    if (!access) router.push("/");
  }, [router]);

  return (
    <main>
      <Nav />
      <OriginSection />
      <AboutPreview />
      <ClientStrip />
      <ProjectCarousel />
      <ServicesStrip />
      <PullQuote />
      <Footer />
    </main>
  );
}
