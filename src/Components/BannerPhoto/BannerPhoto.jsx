import bannerimage from '../../assets/image/Login.jpg'
import PropTypes from "prop-types";

const BannerPhoto = ({name}) => {
    return (
        <div>
            <div
        className="hero"
        style={{
          backgroundImage: `url(${bannerimage})`,
        }}
      >
        <div className="hero-overlay bg-gradient-to-r from-[#51ADE5] via-transparent to-[rgba(171, 185, 183, 0.13)]"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-roboto font-bold">{name}</h1>
          </div>
        </div>
      </div>
        </div>
    );
};
BannerPhoto.propTypes = {
    name: PropTypes.string.isRequired,
  };
export default BannerPhoto;