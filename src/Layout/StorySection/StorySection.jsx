import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { Link } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const StorySection = () => {
  const axiosPublic = useAxiosPublic()
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

  function truncateText(text, maxLength) {
    const words = text.split(' ');
    if (words.length > maxLength) {
      return words.slice(0, maxLength).join(' ') + '...';
    } else {
      return text;
    }
  }
  
  return (
    <div className="lg:max-w-7xl lg:mx-auto mt-32">
      <div>
        <h1 className="text-2xl font-roboto font-semibold text-center text-gray-800 capitalize lg:text-3xl ">
        Tourist Story
        </h1>

      </div>
      <div ref={sliderRef} className="keen-slider mt-24">
        {
          storyData.map(newStory => <div key={newStory._id} className="keen-slider__slide">
            <Link to={`/storyView/${newStory._id}`}>
              <blockquote className="flex flex-col items-center p-4">
                <h3 className="max-w-4xl text-lg text-[#3a3a3ac2] font-roboto  font-medium text-center md:text-2xl lg:text-3xl">
                {truncateText(newStory.tourDetails, 40)}
                </h3>
                <footer className="flex items-center gap-3 mt-6 md:mt-12">
                  <img
                    className="flex-shrink-0 w-20 h-20 border p-1 bg-[#51ADE5] rounded-full border-black/10"
                    src={newStory.userPhoto}
                    alt="Sebastiaan Kloos"
                    loading="lazy"
                  />
                  <a
                    href=""
                    target="_blank"
                    className="inline-block font-bold text-3xl tracking-tight"
                  >
                    <p>{newStory.userName}</p>
                  </a>
                </footer>
              </blockquote>
            </Link>
          </div>)
        }
        
      </div>
    </div>
  );
};

export default StorySection;
