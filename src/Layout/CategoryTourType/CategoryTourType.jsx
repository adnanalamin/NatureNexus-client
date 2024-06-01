import ToureCategoryCard from "../../Components/ToureCategoryCard/ToureCategoryCard";
import background from "../../assets/image/ParallaxBanner.jpg"
const CategoryTourType = () => {
  return (
    <div className="lg:max-w-7xl lg:mx-auto mt-32">
      <div
        className="hero min-h-screen bg-fixed"
        style={{
          backgroundImage:
            `url(${background})`,
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="">
            <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
            <div className="grid  md:grid-cols-2 lg:grid-cols-4 gap-4">
                <ToureCategoryCard></ToureCategoryCard>
                <ToureCategoryCard></ToureCategoryCard>
                <ToureCategoryCard></ToureCategoryCard>
                <ToureCategoryCard></ToureCategoryCard>
                <ToureCategoryCard></ToureCategoryCard>
                <ToureCategoryCard></ToureCategoryCard>
                <ToureCategoryCard></ToureCategoryCard>
                <ToureCategoryCard></ToureCategoryCard>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryTourType;
