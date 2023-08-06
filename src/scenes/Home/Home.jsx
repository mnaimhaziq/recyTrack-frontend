import React from "react";
import HomeNavbar from "./HomeNavbar";
import HomeHero from "./HomeHero";
import HomeAbout from "./HomeAbout";
import HomeContact from "./HomeContact";
import HomeCards from "./HomeCards";
import HomeFooter from "./HomeFooter";

const Home = () => {
  return (
    <div className="bg-black h-screen" >
      <HomeNavbar />
      
      <div id="homeHero">
      <HomeHero />
      </div>
      <div id="homeCard">
        <HomeCards />
      </div>
      <div id="homeContact">
        
      <HomeContact />
      </div>
      <div id="homeAbout">
        
      <HomeAbout />
      </div>
     
      <HomeFooter />
    </div>
  );
};

export default Home;
