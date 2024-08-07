import Footer from "@/components/Footer";
import HomePageContent from "../components/HomePage";
import { SiteHeader } from "@/components/SiteHeader";

const HomePage = async () => {
  return (
    <div >
      <SiteHeader />
      <HomePageContent />
      <Footer/>
    </div>
  );
};

export default HomePage;
