import React from "react";
import bgImg1 from "../assets/bg_land1.jpg";
import bgImg2 from "../assets/bg_mob1.jpg";

const HomeMainView = () => {
  return (
    <div className="md:mt-40 mt-80">
      {/* for desktop view */}
      <div
        style={{
          backgroundImage: `url(${bgImg1})`,
          backgroundSize: "cover",
          height: "500px",
        }}
        className="hidden md:block m-14 rounded-3xl shadow-2xl"
      >
        <div className="relative ms-24 top-40 space-y-3">
           <h1 style={{fontWeight:'700'}} className="text-white text-7xl font-serif">PetFeast</h1>
           <h1 style={{fontWeight:'700'}}className="text-white text-3xl font-sans"><i>Fuel Their Play, Feed Their Love</i></h1>
           <p className="text-white text-xl font-mono"><i>“ Feeding animals is a small act that makes a big difference in their lives and ours. ”</i></p>
        </div>
      </div>

      {/* for mobile view */}
      <div
        style={{
          backgroundImage: `url(${bgImg2})`,
          backgroundSize: "cover",
          height: "400px",
        }}
        className="md:hidden m-14 rounded-3xl shadow-2xl"
      >
        <div className="ms-24 space-y-3">
           <h1 style={{fontWeight:'700'}} className="pt-28 text-white text-5xl font-serif">PetFeast</h1>
           <h1 style={{fontWeight:'700'}}className="text-white text-2xl font-sans"><i>Fuel Their Play, Feed Their Love</i></h1>
           <p className="text-white text-xl font-mono"><i>“ Feeding animals is a small act that makes a big difference in their lives and ours. ”</i></p>
        </div>
      </div>
    </div>
  );
};

export default HomeMainView;
