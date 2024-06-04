import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { toast } from "react-toastify";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddedPackage = () => {
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const [tourType, setTourType] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    location: "",
    description: "",
  });
  const [dayPlaner, setDayPlaner] = useState([
    { daytitle: "", daydescription: "" },
  ]);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleAddMore = () => {
    setDayPlaner([...dayPlaner, { daytitle: "", daydescription: "" }]);
  };

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const newDayPlaner = [...dayPlaner];
    newDayPlaner[index][name] = value;
    setDayPlaner(newDayPlaner);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handlePackegSubmit = async (event) => {
    event.preventDefault();

    let imageUrl = null;

    if (selectedFile) {
      const imageData = new FormData();
      imageData.append("image", selectedFile);

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
    console.log(imageUrl);

    const packageInfo = {
      title: formData.title,
      price: formData.price,
      location: formData.location,
      description: formData.description,
      tourType: tourType,
      dayPlaner: dayPlaner,
      image: imageUrl,
    };

    try {
      const addpackage = await axiosSecure.post("/addpackage", packageInfo);
      if (addpackage.data.insertedId) {
        toast.success("Package added successfully");
      }
      setFormData({
        title: "",
        price: "",
        location: "",
        description: "",
      });
      setDayPlaner([{ daytitle: "", daydescription: "" }]);
      setTourType("");
      setSelectedFile(null);
    } catch (error) {
      toast.error("Failed to add package: " + error.message);
    }
  };

  const handleTourType = (e) => {
    setTourType(e.target.value);
  };

  return (
    <div>
      <div className="h-full">
        <div className="mx-auto">
          <div className="flex justify-center px-6 py-12">
            <div className="w-full flex">
              <div className="w-full bg-white dark:bg-gray-700 p-5 rounded-lg lg:rounded-l-none">
                <h3 className="py-4 text-4xl font-roboto font-bold text-center text-gray-800 dark:text-white">
                  Add Package
                </h3>
                <form
                  onSubmit={handlePackegSubmit}
                  className="px-8 pt-6 pb-8 mb-4 bg-white dark:bg-gray-800 rounded"
                >
                  <div className="mb-4 md:flex md:justify-between">
                    <div className="mb-4 w-full md:mr-2 md:mb-0">
                      <label
                        className="block mb-2 text-lg font-roboto font-bold text-gray-700 dark:text-white"
                        htmlFor="title"
                      >
                        Title
                      </label>
                      <input
                        className="w-full px-3 py-2 text-lg font-roboto leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="title"
                        type="text"
                        placeholder="Title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="md:ml-2 w-full">
                      <label
                        className="block mb-2 text-lg font-roboto font-bold text-gray-700 dark:text-white"
                        htmlFor="price"
                      >
                        Price
                      </label>
                      <input
                        className="w-full px-3 py-2 text-lg font-roboto leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="price"
                        type="number"
                        placeholder="Price"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="mb-4 md:flex md:justify-between">
                    <div className="mb-4 w-full md:mr-2 md:mb-0">
                      <label
                        className="block mb-2 text-lg font-roboto font-bold text-gray-700 dark:text-white"
                        htmlFor="tour"
                      >
                        Tour
                      </label>
                      <select
                        id="tour"
                        value={tourType}
                        onChange={handleTourType}
                        className="w-full px-3 py-2 text-lg font-roboto leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      >
                        <option value="" disabled>
                          Tour Type
                        </option>
                        <option value="Adventure Tours">Adventure Tours</option>
                        <option value="Cultural Tours">Cultural Tours</option>
                        <option value="Eco Tours">Eco Tours</option>
                        <option value="Historical Tours">
                          Historical Tours
                        </option>
                        <option value="Luxury Tours">Luxury Tours</option>
                        <option value="Volunteer Tours">Volunteer Tours</option>
                      </select>
                    </div>
                    <div className="md:ml-2 w-full">
                      <label
                        className="block mb-2 text-lg font-roboto font-bold text-gray-700 dark:text-white"
                        htmlFor="location"
                      >
                        Locations
                      </label>
                      <input
                        className="w-full px-3 py-2 text-lg font-roboto leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="location"
                        type="text"
                        placeholder="Location"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="photo"
                      className="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
                    >
                      Upload Image
                    </label>
                    <input
                      id="photo"
                      name="photo"
                      type="file"
                      onChange={handleFileChange}
                      className="mt-2 block w-full text-sm file:mr-4 file:rounded-md file:border-0 file:bg-teal-500 file:py-2 file:px-4 file:text-sm file:font-semibold file:text-white hover:file:bg-teal-700 focus:outline-none disabled:pointer-events-none disabled:opacity-60"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block font-roboto mb-2 text-lg font-bold text-gray-700 dark:text-white"
                      htmlFor="description"
                    >
                      Description
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      rows="5"
                      placeholder="Write Something"
                      className="w-full px-3 py-2 mb-3 text-lg font-roboto leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      value={formData.description}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>
                  <div className="divider font-roboto text-lg text-black">
                    Day Plan
                  </div>
                  {dayPlaner.map((input, index) => (
                    <div key={index} className="mb-4">
                      <div className="mb-4 w-full md:mr-2 md:mb-0">
                        <label
                          className="block mb-2 text-lg font-roboto font-bold text-gray-700 dark:text-white"
                          htmlFor={`daytitle-${index}`}
                        >
                          Day Title
                        </label>
                        <input
                          className="w-full px-3 py-2 text-lg font-roboto leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                          id={`daytitle-${index}`}
                          type="text"
                          placeholder="Day Title"
                          name="daytitle"
                          value={input.daytitle}
                          onChange={(event) => handleChange(index, event)}
                        />
                      </div>
                      <div className="mt-2 w-full">
                        <label
                          className="block mb-2 text-lg font-roboto font-bold text-gray-700 dark:text-white"
                          htmlFor={`daydescription-${index}`}
                        >
                          Day Description
                        </label>
                        <input
                          className="w-full px-3 py-2 text-lg font-roboto leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                          id={`daydescription-${index}`}
                          type="text"
                          placeholder="Day Description"
                          name="daydescription"
                          value={input.daydescription}
                          onChange={(event) => handleChange(index, event)}
                        />
                      </div>
                    </div>
                  ))}
                  <h2 className="mb-2 font-roboto text-red-600 text-sm font-bold">Important Annousment! If you need more day plan Click the plus icon below</h2>
                  <button
                    type="button"
                    onClick={handleAddMore}
                    className="mb-4 p-2 border rounded-md border-[#2C3892] text-blue-500 hover:underline"
                  >
                    <FaPlus />
                  </button>
                  <div className="mb-6 text-center">
                    <button
                      className="w-full px-4 py-2 font-bold text-white bg-[#135D66] rounded-full hover:bg-[#135c66e2] dark:bg-blue-700 dark:text-white dark:hover:bg-blue-900 focus:outline-none focus:shadow-outline"
                      type="submit"
                    >
                      Add Package
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddedPackage;
