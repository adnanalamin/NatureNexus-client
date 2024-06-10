import { Helmet } from "react-helmet";
import BannerPhoto from "../../Components/BannerPhoto/BannerPhoto";

const AboutUs = () => {
  return (
    <div className="font-roboto">
      <Helmet>
      <title>Nature Nexus | About US</title>
      </Helmet>
      <BannerPhoto name={"About US"}></BannerPhoto>
      <div className="lg:max-w-7xl mx-auto mt-12">
        <div id="about" className="relative bg-white overflow-hidden mt-16">
          <div className="max-w-7xl mx-auto">
            <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
              <svg
                className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
                fill="currentColor"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <polygon points="50,0 100,0 50,100 0,100"></polygon>
              </svg>

              <div className="pt-1"></div>

              <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                <div className="sm:text-center lg:text-left">
                  <h2 className="my-6 text-2xl tracking-tight font-extrabold text-gray-900 sm:text-3xl md:text-4xl">
                    Nature Nexus
                  </h2>

                  <p>
                    Nature Nexus is more than just a tourist guide company it is
                    a gateway to immersive experiences in the heart of nature.
                    Our mission is to connect travelers with the world is most
                    stunning natural wonders while fostering a deeper
                    appreciation for the environment and its conservation. At
                    Nature Nexus, we believe that traveling responsibly and
                    sustainably is not just an option, but a responsibility.
                    That is why we are committed to offering eco-friendly tours
                    and experiences that minimize our footprint on the
                    environment while maximizing your connection with it. Our
                    team consists of passionate nature enthusiasts and
                    experienced guides who are dedicated to providing you with
                    unforgettable adventures. Whether you are hiking through
                    lush forests, kayaking along crystal-clear rivers, or
                    marveling at breathtaking landscapes, our guides are there
                    to ensure your safety and enrich your journey with their
                    knowledge and expertise. But Nature Nexus is not just about
                    exploring the natural world; it is also about connecting
                    with local communities and cultures. We work closely with
                    indigenous groups and local communities to ensure that our
                    tours are culturally sensitive and respectful, providing you
                    with authentic experiences that leave a positive impact on
                    both you and the communities you visit. So whether you are a
                    seasoned adventurer or a first-time explorer, come join us
                    at Nature Nexus and embark on a journey of discovery,
                    inspiration, and connection with the natural world.
                  </p>
                </div>
              </main>
            </div>
          </div>
          <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
            <img
              className="h-56 w-full object-cover object-top sm:h-72 md:h-96 lg:w-full lg:h-full"
              src="https://i.ibb.co/5Rbhds5/acb6d6-4f1f49e4490446d1a971b24b4f225681-mv2.webp"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
