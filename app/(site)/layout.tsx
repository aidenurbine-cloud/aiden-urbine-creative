import Sidebar from "@/components/Sidebar";
import Banner from "@/components/Banner";
import ShopBanner from "@/components/shop/ShopBanner";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
    <Banner />
    <ShopBanner />
    <div className="shell">
      <Sidebar />
      <main className="main" id="top">
        {children}
      </main>
    </div>
    </>
  );
}
