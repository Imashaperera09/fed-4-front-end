import Navigation from "./components/Navigation/Navigation";
import HeroSection from "./pages/home/HeroSection/HeroSection";
import UserProfile from "./components/UserProfile/UserProfile";
import Footer from "./pages/home/Footer/Footer";

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
