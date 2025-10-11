import Navigation from "../components/Navigation/Navigation";
import HeroSection from "../components/HeroSection/HeroSection";
import SolarEnergyProduction from "../components/SolarEnergyProduction";

const HomePage = () => {
  return (
    <>
      <Navigation />
      <main>
        <HeroSection />
        <SolarEnergyProduction />
      </main>
    </>
  );
};

export default HomePage;