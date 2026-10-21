import Sidebar from "@/components/Sidebar";
import Banner from "@/components/Banner";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
    <Banner />
    <div className="shell">
      <Sidebar />
      <main className="main" id="top">
        {children}
      </main>
    </div>
    </>
  );
}
