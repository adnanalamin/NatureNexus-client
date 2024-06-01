import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import video from "../../assets/video/video.mp4";
import PackagesCard from "../../Components/PackagesCard/PackagesCard";
import MeetTourGuides from "../../Components/MeetTourGuides/MeetTourGuides";
const TourismAndGuide = () => {
  return (
    <div className="lg:max-w-7xl lg:mx-auto">
      <div>
        <h1 className="text-2xl font-roboto font-semibold text-center text-gray-800 capitalize lg:text-3xl ">
          Tourism and Travel Guide
        </h1>

        <p className="max-w-2xl mx-auto my-6 font-poppins text-center text-gray-500 ">
          Embark on a seamless journey from start to finish with our expert trip
          planning resources. Learn essential travel tips, including visa
          requirements, transportation options, accommodation
        </p>
      </div>
      <div className="mt-16">
        <Tabs>
          <div className="flex items-center justify-center ">
            <TabList>
              <Tab><span className="font-poppins font-semibold text-base">Overview</span></Tab>
              <Tab><span className="font-poppins font-semibold text-base">Our Packages</span></Tab>
              <Tab><span className="font-poppins font-semibold text-base">Meet Our Tour Guides</span></Tab>
            </TabList>
          </div>

          <TabPanel className="mt-6 ">
            <h2>
              <iframe
                className="md:w-3/5 rounded-lg mx-auto aspect-video ..."
                src={video}
              ></iframe>
            </h2>
          </TabPanel>
          <TabPanel>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-5 md:gap-4 gap-4">
              <PackagesCard></PackagesCard>
              <PackagesCard></PackagesCard>
              <PackagesCard></PackagesCard>
            </div>
            <div className="text-center mt-10 ">
              <button className="btn w-2/4 font-poppins font-semibold text-base text-white bg-[#2C3892] hover:bg-[#3945a1]">All Packages</button>
            </div>
          </TabPanel>
          <TabPanel>
            <MeetTourGuides></MeetTourGuides>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

export default TourismAndGuide;
