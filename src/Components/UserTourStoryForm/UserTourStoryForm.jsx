import { useContext, useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { AuthContext } from "../../Provider/AuthProvider";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const UserTourStoryForm = () => {
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const [formData, setFormData] = useState({
    title: "",
    rating: "",
    location: "",
    tourType: "",
    price: "",
    image: null,
    tourDetails: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let imageUrl = null;

    if (formData.image) {
      const imageData = new FormData();
      imageData.append("image", formData.image);

      try {
        const res = await axiosPublic.post(image_hosting_api, imageData, {
          headers: {
            "content-type": "multipart/form-data",
          },
        });

        imageUrl = res.data.data.display_url;
      } catch (error) {
        toast.error("Image upload failed: " + error.message);
        return;
      }
    }

    const StoryInfo = {
      title: formData.title,
      location: formData.location,
      tourType: formData.tourType,
      price: formData.price,
      rating: formData.rating,
      image: imageUrl,
      tourDetails: formData.tourDetails,
      userName: user.displayName,
      userPhoto: user.photoURL,
      userEmail: user.email,
    };

    try {
      const addPackage = await axiosPublic.post("/addstory", StoryInfo);
      if (addPackage.data.insertedId) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: `Story Send Successful`,
          showConfirmButton: false,
          timer: 1500,
        });
        setFormData({
          title: "",
          rating: "",
          location: "",
          tourType: "",
          price: "",
          image: null,
          tourDetails: "",
        });
      }
    } catch (error) {
      toast.error("Failed to send story: " + error.message);
    }
  };

  return (
    <div className="bg-white border w-full rounded-lg shadow relative m-10">
    <div className="pt-6">
      <h3 className="mb-6 text-teal-900 text-center font-roboto text-3xl font-semibold underline decoration-teal-200/80">
        Adding a story
      </h3>
    </div>

    <div className="p-6 space-y-6">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-6 gap-6 font-roboto">
          <div className="col-span-6 sm:col-span-3">
            <label
              htmlFor="title"
              className="text-sm font-medium text-gray-900 block mb-2"
            >
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              value={formData.title}
              onChange={handleChange}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
              placeholder="Story Title"
              required
            />
          </div>
          <div className="col-span-6 sm:col-span-3">
            <label
              htmlFor="location"
              className="text-sm font-medium text-gray-900 block mb-2"
            >
              Location
            </label>
            <input
              type="text"
              name="location"
              id="location"
              value={formData.location}
              onChange={handleChange}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
              placeholder="Location"
              required
            />
          </div>
          <div className="col-span-6 sm:col-span-3">
            <label
              className="text-sm font-medium text-gray-900 block mb-2"
              htmlFor="tourType"
            >
              Tour Type
            </label>
            <select
              id="tourType"
              name="tourType"
              value={formData.tourType}
              onChange={handleChange}
              required
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block p-2.5 w-full px-3 py-2 text-lg font-roboto leading-tight appearance-none focus:outline-none focus:shadow-outline"
            >
              <option value="" disabled>
                Tour Type
              </option>
              <option value="Adventure Tours">Adventure Tours</option>
              <option value="Cultural Tours">Cultural Tours</option>
              <option value="Eco Tours">Eco Tours</option>
              <option value="Historical Tours">Historical Tours</option>
              <option value="Luxury Tours">Luxury Tours</option>
              <option value="Volunteer Tours">Volunteer Tours</option>
            </select>
          </div>
          <div className="col-span-6 sm:col-span-3">
            <label
              htmlFor="price"
              className="text-sm font-medium text-gray-900 block mb-2"
            >
              Price
            </label>
            <input
              type="number"
              name="price"
              id="price"
              value={formData.price}
              onChange={handleChange}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
              placeholder="$2300"
              required
            />
          </div>
          <div className="col-span-6 sm:col-span-3">
            <label
              htmlFor="image"
              className="text-sm font-medium text-gray-900 block mb-2"
            >
              Upload Image
            </label>
            <input
              id="image"
              type="file"
              name="image"
              onChange={handleFileChange}
              required
              className="mt-2 block w-full text-sm file:mr-4 file:rounded-md file:border-0 file:bg-teal-500 hover:file:bg-teal-700 file:py-2 file:px-4 file:text-sm file:font-semibold file:text-white focus:outline-none disabled:pointer-events-none disabled:opacity-60"
            />
          </div>
          <div className="col-span-6 sm:col-span-3">
            <label
              htmlFor="location"
              className="text-sm font-medium text-gray-900 block mb-2"
            >
              Rating
            </label>
            <input
              type="text"
              name="rating"
              id="rating"
              value={formData.rating}
              onChange={handleChange}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
              placeholder="Rating"
              required
            />
          </div>
          <div className="col-span-full">
            <label
              htmlFor="tourDetails"
              className="text-sm font-medium text-gray-900 block mb-2"
            >
              Tour Details
            </label>
            <textarea
              id="tourDetails"
              name="tourDetails"
              value={formData.tourDetails}
              onChange={handleChange}
              rows="6"
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-4"
              placeholder="Details"
            ></textarea>
          </div>
        </div>
        <div className="p-6 border-t border-gray-200 rounded-b w-full">
          <button
            className="text-white w-full bg-teal-500 hover:bg-teal-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            type="submit"
          >
            Send Story
          </button>
        </div>
      </form>
    </div>
  </div>
  );
};

export default UserTourStoryForm;
