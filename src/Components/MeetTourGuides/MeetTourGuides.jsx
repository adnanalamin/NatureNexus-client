import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import GuidCard from "../GuidCard/GuidCard";

const MeetTourGuides = () => {
    const [sliderRef] = useKeenSlider(
        {
          loop: true,
        },
        [
          (slider) => {
            let timeout
            let mouseOver = false
            function clearNextTimeout() {
              clearTimeout(timeout)
            }
            function nextTimeout() {
              clearTimeout(timeout)
              if (mouseOver) return
              timeout = setTimeout(() => {
                slider.next()
              }, 2000)
            }
            slider.on("created", () => {
              slider.container.addEventListener("mouseover", () => {
                mouseOver = true
                clearNextTimeout()
              })
              slider.container.addEventListener("mouseout", () => {
                mouseOver = false
                nextTimeout()
              })
              nextTimeout()
            })
            slider.on("dragStarted", clearNextTimeout)
            slider.on("animationEnded", nextTimeout)
            slider.on("updated", nextTimeout)
          },
        ]
      )
    return (
        <div className="lg:max-w-7xl lg:mx-auto">
            <div ref={sliderRef} className="keen-slider">
        <div className="keen-slider__slide number-slide1"><GuidCard></GuidCard></div>
        <div className="keen-slider__slide number-slide2"><GuidCard></GuidCard></div>
        <div className="keen-slider__slide number-slide3"><GuidCard></GuidCard></div>
      </div>
        </div>
    );
};

export default MeetTourGuides;