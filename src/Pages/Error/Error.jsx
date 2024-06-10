import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div>
      <div>
      <Helmet>
      <title>Nature Nexus | Not Found</title>
      </Helmet>
        <div className="h-screen w-screen bg-[#ffffff] flex    items-center">
          <div className="container flex md:flex-row gap-28 flex-col-reverse items-center justify-center px-5 text-gray-700">
            <div className="max-w-md">
              <div className="text-5xl font-dark font-bold text-red-600 font-inter">
                404
              </div>
              <p className="text-2xl md:text-2xl font-bold mt-8 leading-normal font-poppins">
                Sorry we couldn not find this page.
              </p>

              <Link to="/">
                <button className="px-6 mt-8 inline py-4 rounded-lg font-bold text-lg font-inter shadow text-white  bg-[#55DB90]">
                  Back to Home
                </button>
              </Link>
            </div>
            <div className="max-w-lg">
              <img
                src="https://miro.medium.com/v2/resize:fit:1400/1*zE2qnVTJehut7B8P2aMn3A.gif"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Error;
