import Navigation from "./components/Navigation/Navigation";
import HeroSection from "./components/HeroSection/HeroSection";
import UserProfile from "./components/UserProfile/UserProfile";
import Footer from "./components/Footer/Footer";

function App() {
  
  return (
    <>
      <Navigation />   
    <main> 
      <HeroSection />
    </main>
    <UserProfile />
    <Footer />
    </>
  );
}

export default App;
