import React from "react";
import "./App.css";
import "./i18n/i18n";
import Navbar from "./Components/Navbar/Navbar";
import Hero from "./Components/Hero/Hero";
import About from "./Components/About/About";
import Services from "./Components/Services/Services";
import Contact from "./Components/Contact/Contact";
import Vision from "./Components/Vision/Vision";
import Mission from "./Components/Mission/Mission";
import Values from "./Components/Values/Values";
import WhyChooseUs from "./Components/WhyChooseUs/WhyChooseUs";
import Sustainability from "./Components/Sustainability/Sustainability";
const App: React.FC = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Vision />
      <Mission />
      <Values />
      <WhyChooseUs />
      <Services />
      <Sustainability />
      <Contact />
    </>
  );
};

export default App;
