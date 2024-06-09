import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { Link } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import TouristStoryCard from "../../Components/TouristStoryCard/TouristStoryCard";

const StorySection = () => {
  const axiosPublic = useAxiosPublic();
  const [sliderRef] = useKeenSlider(
    {
      loop: true,
    },
    [
      (slider) => {
        let timeout;
        let mouseOver = false;
        function clearNextTimeout() {
          clearTimeout(timeout);
        }
        function nextTimeout() {
          clearTimeout(timeout);
          if (mouseOver) return;
          timeout = setTimeout(() => {
            slider.next();
          }, 2000);
        }
        slider.on("created", () => {
          slider.container.addEventListener("mouseover", () => {
            mouseOver = true;
            clearNextTimeout();
          });
          slider.container.addEventListener("mouseout", () => {
            mouseOver = false;
            nextTimeout();
          });
          nextTimeout();
        });
        slider.on("dragStarted", clearNextTimeout);
        slider.on("animationEnded", nextTimeout);
        slider.on("updated", nextTimeout);
      },
    ]
  );
  const { data: storyData = [] } = useQuery({
    queryKey: ["storyData"],
    queryFn: async () => {
      const res = await axiosPublic.get("/getStorys");
      return res.data;
    },
  });


  return (
    <div className="lg:max-w-7xl lg:mx-auto mt-32">
      <div>
        <h1 className="text-2xl font-roboto font-semibold text-center text-gray-800 capitalize lg:text-3xl ">
          Tourist Story
        </h1>
      </div>
      <div ref={sliderRef} className="keen-slider mt-24">
        {storyData.map((newStory) => (
          <div key={newStory._id} className="keen-slider__slide">
            <TouristStoryCard data={newStory}></TouristStoryCard>
          </div>
        ))}
      </div>
      <div className="text-center mt-12 ">
        <Link to="/allStory">
          <button className="btn w-2/4 font-poppins font-semibold text-base text-white bg-[#2C3892] hover:bg-[#3945a1]">
            All Story
          </button>
        </Link>
      </div>
    </div>
  );
};

export default StorySection;
