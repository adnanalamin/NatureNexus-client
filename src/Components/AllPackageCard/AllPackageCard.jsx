import PropTypes from "prop-types";
import { Link } from "react-router-dom";
const AllPackageCard = ({ data }) => {
  const { _id, title, image, tourType, price } = data;
  return (
    <div className="font-roboto">
      <div className="bg-white grid sm:grid-cols-2 items-center shadow-[0_2px_18px_-6px_rgba(0,0,0,0.2)] w-full max-w-xl rounded-lg h-52  overflow-hidden mt-4">
        <img src={image} className="w-full h-full" alt="Card" />
        <div className="px-4 py-6">
          <h3 className="text-xl font-semibold">{title}</h3>
          <p className="mt-2 text-sm text-black font-semibold">
            Tour Type : {tourType}
          </p>

          <p className="mt-2 text-sm text-black font-semibold">
            Price : {price}
          </p>
          <Link to={`/PackageDetails/${_id}`}>
            <button className="btn bg-[#2C3892] hover:bg-[#3945a1] text-white font-bold border rounded-lg w-full px-4 py-2 mt-6">
              Viwe Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
AllPackageCard.propTypes = {
  data: PropTypes.object.isRequired,
};
export default AllPackageCard;
