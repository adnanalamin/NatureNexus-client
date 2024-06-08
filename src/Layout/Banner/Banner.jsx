import banner from "../../assets/image/banner.jpg";
const Banner = () => {
  return (
    <div className="lg:max-w-7xl lg:mx-auto w-full mb-12 md:mb-0">
      <div className="hero min-h-screen bg-white">
        <div className="hero-content flex-1 lg:mr-8 flex-col lg:flex-row-reverse">
          <svg
            className="md:w-[500px] w-full"
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern
                id="image"
                patternUnits="userSpaceOnUse"
                width="200"
                height="200"
              >
                <image className="lg:w-[200px] md:w-full w-full" href={banner} x="0" y="0"  height="200" />
              </pattern>
            </defs>
            <g className="clip-path:url(#clip0_103_21)">
              <path
                d="M71.5579 16.3347C84.3365 -5.4449 115.825 -5.44489 128.603 16.3347L129.067 17.1257C134.963 27.1733 145.709 33.378 157.358 33.4596L158.276 33.466C183.527 33.6428 199.271 60.9123 186.798 82.8687L186.345 83.6661C180.591 93.7953 180.591 106.205 186.345 116.334L186.798 117.131C199.271 139.088 183.527 166.357 158.276 166.534L157.358 166.54C145.709 166.622 134.963 172.827 129.067 182.874L128.603 183.665C115.825 205.445 84.3365 205.445 71.5579 183.665L71.0938 182.874C65.1986 172.827 54.4517 166.622 42.8027 166.54L41.8856 166.534C16.6346 166.357 0.890585 139.088 13.3629 117.131L13.8159 116.334C19.5698 106.205 19.5698 93.7953 13.8159 83.6661L13.3629 82.8687C0.890585 60.9123 16.6346 33.6428 41.8856 33.466L42.8027 33.4596C54.4518 33.378 65.1986 27.1733 71.0938 17.1257L71.5579 16.3347Z"
                fill="url(#image)"
              />
            </g>
          </svg>

          <div className="flex-1">
            <h1 className="md:text-5xl text-3xl font-bold font-roboto">
              Find and Review the Best{" "}
              <span className="text-[#51ADE5]"> Travel Guides Worldwide</span>
            </h1>
            <p className="py-6 font-poppins">
              Ultimate Tourist Guide Directory is your go-to platform for
              discovering and evaluating the best travel guides across the
              globe. We provide extensive reviews, detailed profiles, and user
              ratings to help you select the perfect guide for your adventures
            </p>
            <button className="btn bg-[#2C3892] hover:bg-[#3945a1] w-52 text-white font-poppins font-semibold">
              About US
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
