import React from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import ShopByCategory from "../components/ShopByCategory";
import FeaturedProduct from "../components/FeaturedProduct";
import NewLaunches from "../components/NewLaunches";
import WhyChooseUs from "../components/WhyChooseUs";
import CustomerReviews from "../components/CustomerReviews";
import FloatingShowcase from "../components/FloatingShowcase";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import BestSeller from "../components/BestSeller";

const Home = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      <BestSeller />
      <ShopByCategory />
      <FeaturedProduct />
      <NewLaunches />
      <WhyChooseUs />
      <CustomerReviews />
      <FloatingShowcase />
      <Newsletter />
      <Footer />
    </>
  );
};

export default Home;