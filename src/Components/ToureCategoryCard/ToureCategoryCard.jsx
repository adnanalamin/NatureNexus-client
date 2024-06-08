import PropTypes from "prop-types";
import { Link } from "react-router-dom";
const ToureCategoryCard = ({ data }) => {
  const { tourType, image } = data;
  return (
    <div className="cursor-pointer">
      <Link to={`/tuorType/${tourType}`}>
        <article className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl px-8 pb-8 pt-40 w-60 h-20">
          <img
            src={image}
            alt="University of Southern California"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40"></div>
          <h3 className="z-10 mt-3 text-3xl font-bold text-white">
            {tourType}
          </h3>
          <div className="z-10 gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">
            City of love
          </div>
        </article>
      </Link>
    </div>
  );
};
ToureCategoryCard.propTypes = {
  data: PropTypes.object.isRequired,
};
export default ToureCategoryCard;
