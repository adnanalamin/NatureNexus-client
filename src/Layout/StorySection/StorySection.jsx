import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { Link } from "react-router-dom";

const StorySection = () => {
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
  return (
    <div className="lg:max-w-7xl lg:mx-auto mt-32">
      <div>
        <h1 className="text-2xl font-roboto font-semibold text-center text-gray-800 capitalize lg:text-3xl ">
        Tourist Story
        </h1>

      </div>
      <div ref={sliderRef} className="keen-slider mt-24">
        <div className="keen-slider__slide number-slide1">
          <Link>
            <blockquote className="flex flex-col items-center p-4">
              <h3 className="max-w-4xl text-lg text-[#3a3a3ac2] font-roboto  font-medium text-center md:text-2xl lg:text-3xl">
                recently used this website for a purchase and I was extremely
                satisfied with the ease of use and the variety of options
                available. The checkout process was seamless and the delivery
                was prompt.
              </h3>
              <footer className="flex items-center gap-3 mt-6 md:mt-12">
                <img
                  className="flex-shrink-0 w-20 h-20 border p-1 bg-[#51ADE5] rounded-full border-black/10"
                  src="https://loremflickr.com/g/200/200/girl"
                  alt="Sebastiaan Kloos"
                  loading="lazy"
                />
                <a
                  href=""
                  target="_blank"
                  className="inline-block font-bold tracking-tight"
                >
                  <p>Jane Doe</p>
                  <p className="font-medium text-black/60">Founder of XYZ</p>
                </a>
              </footer>
            </blockquote>
          </Link>
        </div>
        <div className="keen-slider__slide number-slide2">
          <blockquote className="flex flex-col items-center p-4">
            <p className="max-w-4xl text-xl font-medium text-center md:text-2xl lg:text-3xl">
              I recently used this website for a purchase and I was extremely
              satisfied with the ease of use and the variety of options
              available. The checkout process was seamless and the delivery was
              prompt.
            </p>
            <footer className="flex items-center gap-3 mt-6 md:mt-12">
              <img
                className="flex-shrink-0 w-12 h-12 border rounded-full border-black/10"
                src="https://loremflickr.com/g/200/200/girl"
                alt="Sebastiaan Kloos"
                loading="lazy"
              />
              <a
                href=""
                target="_blank"
                className="inline-block font-bold tracking-tight"
              >
                <p>Jane Doe</p>
                <p className="font-medium text-black/60">Founder of XYZ</p>
              </a>
            </footer>
          </blockquote>
        </div>
        <div className="keen-slider__slide number-slide3">
          <blockquote className="flex flex-col items-center p-4">
            <p className="max-w-4xl text-xl font-medium text-center md:text-2xl lg:text-3xl">
              I recently used this website for a purchase and I was extremely
              satisfied with the ease of use and the variety of options
              available. The checkout process was seamless and the delivery was
              prompt.
            </p>
            <footer className="flex items-center gap-3 mt-6 md:mt-12">
              <img
                className="flex-shrink-0 w-12 h-12 border rounded-full border-black/10"
                src="https://loremflickr.com/g/200/200/girl"
                alt="Sebastiaan Kloos"
                loading="lazy"
              />
              <a
                href=""
                target="_blank"
                className="inline-block font-bold tracking-tight"
              >
                <p>Jane Doe</p>
                <p className="font-medium text-black/60">Founder of XYZ</p>
              </a>
            </footer>
          </blockquote>
        </div>
      </div>
    </div>
  );
};

export default StorySection;
