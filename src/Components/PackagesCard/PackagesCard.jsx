import { FiHeart } from "react-icons/fi";
import { MdOutlineAttachMoney } from "react-icons/md";
import PropTypes from "prop-types";

const PackagesCard = ({packege}) => {
  const {tourType, title, price, image} = packege;
  return (
    <div>
      <div className="w-full ">
        <div className="">
          <div className="rounded overflow-hidden shadow-lg flex flex-col ">
            <a href="#"></a>
            <div className="relative">
              <a href="#">
                <img
                  className="w-full h-72"
                  src={image}
                  alt="Sunset in the mountains"
                />
                <div className="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25"></div>
              </a>

              <button className="text-3xl absolute top-0 right-0  px-4 py-2  mt-3 mr-3  transition duration-500 ease-in-out">
                <FiHeart className="text-red-700"></FiHeart>
              </button>
            </div>
            <div className="px-6 py-4 mb-auto">
              <h3 className="text-base font-roboto font-medium mb-2">
                {" "}
                Tour Type{" "}
                <div className="badge badge-info text-white gap-2">{tourType}</div>
              </h3>
              <h3 className="text-lg font-roboto font-semibold mb-2">
                {title}
              </h3>
              <p className="flex gap-3 items-center text-base font-roboto font-medium">
                Price :{" "}
                <span className="flex gap-1 items-center">
                  {" "}
                  <MdOutlineAttachMoney className="text-xl text-info"></MdOutlineAttachMoney>{" "}
                  {price}
                </span>
              </p>
            </div>
            <div className="px-6 py-4 mb-auto">
              <button className="btn w-full font-poppins font-semibold bg-[#2C3892] hover:bg-[#3945a1] text-white">
                View Package
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
PackagesCard.propTypes = {
  packege: PropTypes.object.isRequired,
};
export default PackagesCard;
