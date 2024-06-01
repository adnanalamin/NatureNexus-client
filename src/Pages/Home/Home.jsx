import Banner from "../../Layout/Banner/Banner";
import CategoryTourType from "../../Layout/CategoryTourType/CategoryTourType";
import TourismAndGuide from "../../Layout/TourismAndGuide/TourismAndGuide";
import ScrollToTop from "react-scroll-to-top";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <TourismAndGuide></TourismAndGuide>
      <CategoryTourType></CategoryTourType>
      <ScrollToTop
        viewBox="0 0 50 50"
        svgPath="M11.4,39.7L24.9,26c0.6-0.6,1.6-0.6,2.2,0l13.5,13.7c0.6,0.6,0.6,1.6,0,2.2l-2.2,2.2
        c-0.6,0.6-1.6,0.6-2.2,0l-9.1-9.4c-0.6-0.6-1.6-0.6-2.2,0L15.8,44c-0.6,0.6-1.6,0.6-2.2,0l-2.2-2.2C10.9,41.2,10.9,40.2,11.4,39.7M11.4,21.6L24.9,7.9c0.6-0.6,1.6-0.6,2.2,0l13.5,13.7c0.6,0.6,0.6,1.6,0,2.2L38.4,26
        c-0.6,0.6-1.6,0.6-2.2,0l-9.1-9.4c-0.6-0.6-1.6-0.6-2.2,0l-9.1,9.3c-0.6,0.6-1.6,0.6-2.2,0l-2.2-2.2C10.9,23.1,10.9,22.2,11.4,21.6z"
        smooth
      ></ScrollToTop>
    </div>
  );
};

export default Home;
