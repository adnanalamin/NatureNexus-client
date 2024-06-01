import ToureCategoryCard from "../../Components/ToureCategoryCard/ToureCategoryCard";
import background from "../../assets/image/ParallaxBanner.jpg"
const CategoryTourType = () => {
  return (
    <div className=" mt-32">
      <div className="mb-24">
        <h1 className="text-2xl font-roboto font-semibold text-center text-gray-800 capitalize lg:text-3xl ">
        Tour Type
        </h1>

        <p className="max-w-2xl mx-auto my-6 font-poppins text-center text-gray-500 ">
          Embark on a seamless journey from start to finish with our expert trip
          planning resources. Learn essential travel tips, including visa
          requirements, transportation options, accommodation
        </p>
      </div>
      <div
        className="hero min-h-screen bg-fixed"
        style={{
          backgroundImage:
            `url(${background})`,
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content lg:max-w-7xl lg:mx-auto">
          <div className="">
            <div className="grid  md:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
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
