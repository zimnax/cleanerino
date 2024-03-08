import React from "react";
import Header from "../common/Header";
import SearchBar from "./Search";
import Slideshow from "./Slides";
import ImageSlider from "./Certificates";
import Testimonials from "./Testimonials";
import VideoPlayer from "./VideoPlayer";
import video from "../../videos/homePage.mp4";
import FAQs from "./FAQs";
import NewInComponent from "./NewInComponent";

function Home() {
  const handleSearch = (searchTerm) => {
    console.log("Searching for:", searchTerm);
    // You can perform the search operation here, like calling an API
  };

  return (
    <div>
      {/* Your home component's content goes here */}
      <Header />
      <SearchBar onSearch={handleSearch} />
      <Slideshow />
      <ImageSlider />
      <NewInComponent />
      <Testimonials />
      <VideoPlayer src={video} />
      <FAQs />
    </div>
  );
}

export default Home;
