import React from 'react';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import About from './Components/About/About';
import Footer from './Components/Footer/Footer';
import Hero from './Components/Hero/Hero';
import Services from './Components/Services/Services';
import Sustainability from './Components/Sustainability/Sustainability';
import VisionMission from './Components/Vision/Vision';
import WhyUs from './Components/WhyChooseUs/WhyChooseUs';
import Contact from './Components/Contact/Contact';
import NavDots from './Components/NavDots/NavDots';



const App: React.FC = () => {
  return (
    <>
      <Navbar />
      <NavDots />
      <main>
        <Hero />
        <About />
        <Services />
        <VisionMission />
        <WhyUs />
        <Sustainability />
        <Contact />
      </main>
      <Footer />
    </>
  );
};

export default App;