import Footer from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { SiteHeader } from "@/components/SiteHeader";

const HomePage = () => {
  return (
    <main className="w-full max-h-screen">
      <div className="absolute inset-0 h-full w-full flex flex-col items-center gap-24 p-4 bg-white bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]">
        <SiteHeader />
        <Hero />
        <Footer />
      </div>
    </main>
  );
};

export default HomePage;
