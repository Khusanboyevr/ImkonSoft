// components
import { Navbar, Footer } from "@/components";

// sections
import Hero from "./hero";
import AboutEvent from "./about-event";
import OurStats from "./our-stats";
import Services from "./services";
import Faq from "./faq";
import Contact from "./contact";

export default function Portfolio() {
  return (
    <>
      <Navbar />
      <Hero />
      <AboutEvent />
      <OurStats />
      <Services />
      <Faq />
      <Contact />
      <Footer />
    </>
  );
}
