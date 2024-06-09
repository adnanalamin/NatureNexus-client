import { Link, useParams } from "react-router-dom";
import BannerPhoto from "../../Components/BannerPhoto/BannerPhoto";
import PhotoGallery from "../../Components/PhotoGallery/PhotoGallery";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AuthContext } from "../../Provider/AuthProvider";
import { toast } from "react-toastify";
import Confetti from "react-confetti";

const PackageDetails = () => {
  const [showModal, setShowModal] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [bookingCount, setBookingCount] = useState(0);
  const [price, setPrice] = useState("");
  const [tourGuide, setTourGuide] = useState("");
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const { user } = useContext(AuthContext);
  console.log(tourGuide);
  const { _id } = useParams();
  console.log(_id);
  const axiosPublic = useAxiosPublic();
  const { data: packaged = [], isLoading } = useQuery({
    queryKey: ["package"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/packageDetails/${_id}`);
      return res.data;
    },
  });

  const { data: tourGuid = [] } = useQuery({
    queryKey: ["tourGuid"],
    queryFn: async () => {
      const res = await axiosPublic.get("/findGuide/");
      return res.data;
    },
  });

  if (isLoading)
    return (
      <div className=" flex h-screen items-center">
        <span className="loading loading-bars loading-lg mx-auto "></span>
      </div>
    );

  const handleBookNowClick = () => {
    setShowModal(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const bookingInfo = {
      name: user.displayName,
      email: user.email,
      image: user.photoURL,
      packageName: packaged.title,
      packageId: packaged._id,
      price,
      tourDate: startDate.toLocaleDateString(),
      tourGuide,
      status: "In Review",
    };
    console.log(bookingInfo);
    try {
      const bookingPackage = await axiosPublic.post("/booking", bookingInfo);
      if (bookingPackage.data.insertedId) {
        toast.success("Booking successfully");
        setShowModal(false);
        setShowConfirmationModal(true);
        setBookingCount(bookingCount + 1);
      }
    } catch (error) {
      toast.error("Failed to Booking package: " + error.message);
    }
  };

  return (
    <div>
      <BannerPhoto name={"Package Details"}></BannerPhoto>
      <PhotoGallery></PhotoGallery>
      <div className="lg:max-w-7xl lg:mx-auto">
        <h3 className="mb-6 mt-8 text-teal-900 font-roboto text-center text-3xl font-semibold underline decoration-teal-200/80 ">
          Package Details
        </h3>
        <div className="font-sans bg-white">
          <div className="p-6 lg:max-w-7xl max-w-2xl max-lg:mx-auto">
            <div className="grid items-start grid-cols-1 lg:grid-cols-5 gap-12">
              <div className="lg:col-span-3 w-full lg:sticky top-0 text-center">
                <div className="bg-teal-600/80 px-1 py-1 rounded-xl">
                  <img
                    src={packaged.image}
                    alt="Product"
                    className="w-full rounded object-cover h-[500px] mx-auto"
                  />
                </div>
              </div>

              <div className="lg:col-span-2">
                <h2 className="text-3xl font-bold text-black font-roboto">
                  {packaged.title}
                </h2>
                <div className="flex flex-wrap gap-4 mt-4">
                  <p className="text-black text-xl font-semibold font-roboto">
                    Price :{" "}
                  </p>
                  <p className="text-black text-xl font-semibold font-roboto">
                    ${packaged.price}
                  </p>
                </div>
                <div className="flex flex-wrap gap-4 mt-4">
                  <p className="text-black text-xl font-semibold font-roboto">
                    Location :{" "}
                  </p>
                  <p className="text-black text-xl font-semibold font-roboto">
                    {packaged.location}
                  </p>
                </div>
                <div className="flex flex-wrap gap-4 mt-4">
                  <p className="text-black text-xl font-semibold font-roboto">
                    Type of tour :{" "}
                  </p>
                  <p className="text-black text-xl font-semibold font-roboto">
                    {packaged.tourType}
                  </p>
                </div>
                <div className="mt-6">
                  <h3 className="mb-1 text-black font-roboto  text-xl font-semibold ">
                    Descriptions :
                  </h3>
                  <p className="font-roboto ml-6 font-semibold">
                    {packaged.description}
                  </p>
                </div>
                <div className="mt-6 bg-white  overflow-hidden max-w-lg mx-auto">
                  <h3 className="mb-1 text-black font-roboto  text-xl font-semibold ">
                    Tour guide :
                  </h3>
                  <div className="">
                    <ul className="">
                      {tourGuid.map((guid, index) => (
                        <li className="shadow rounded-md" key={guid._id}>
                          <Link to={`/userGuidProfile/${guid._id}`}>
                            <div className="flex items-center py-4 px-6">
                              <span className="text-gray-700 text-lg font-medium mr-4">
                                {index + 1}
                              </span>
                              <img
                                className="w-12 h-12 rounded-full object-cover mr-4"
                                src={guid.photo}
                                alt="User avatar"
                              />
                              <div className="flex-1">
                                <h3 className="text-lg font-medium text-gray-800">
                                  {guid.name}
                                </h3>
                              </div>
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <section
                  id="faq"
                  className="container relative mx-auto py-12 px-2"
                >
                  <h3 className="mb-6 text-teal-900 font-roboto  text-3xl font-semibold underline decoration-teal-200/80 ">
                    Day Plan
                  </h3>
                  {packaged.dayPlaner.map((newItem, index) => (
                    <div key={newItem._id} className="my-6">
                      <div className="rounded-t-2xl bg-teal-600/80  w-full cursor-pointer select-none border-2 border-teal-600/30 px-4 py-4 text-gray-100 transition duration-300 hover:border-teal-600/80 hover:text-white">
                        <h4 className="text-lg font-roboto font-medium">
                          <span className="font-roboto bg-teal-800 px-6 py-2 mr-2 rounded-lg">
                            Day-{index + 1}
                          </span>{" "}
                          {newItem.daytitle}
                        </h4>
                      </div>
                      <div className="inline-flex w-full font-roboto rounded-b-2xl border-x-2 border-b-2 border-dashed border-teal-600/30 bg-teal-100/50 px-4 py-4 text-teal-800">
                        <h5>{newItem.daydescription}</h5>
                      </div>
                    </div>
                  ))}
                </section>

                <div className="w-full mt-4">
                  <button
                    onClick={handleBookNowClick}
                    type="button"
                    className="w-full px-4 py-3 bg-teal-600/80 font-roboto text-white hover:bg-teal-700  text-lg font-bold rounded"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <div
              className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div className="px-4 py-5 sm:px-6">
                <h3 className="mb-6 text-teal-900 text-center font-roboto  text-3xl font-semibold underline decoration-teal-200/80 ">
                  Booking Form
                </h3>
                <div className="">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <label
                        htmlFor="name"
                        className="block text-black font-roboto font-bold mb-2"
                      >
                        Tourist Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={user.displayName}
                        readOnly
                        className="border border-gray-400 p-2 w-full rounded-lg focus:outline-none "
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="name"
                        className="block text-black font-roboto font-bold mb-2"
                      >
                        Tourist Email
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={user.email}
                        readOnly
                        className="border border-gray-400 p-2 w-full rounded-lg focus:outline-none "
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="name"
                        className="block text-black font-roboto font-bold mb-2"
                      >
                        Tourist image URL
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={user.photoURL}
                        readOnly
                        className="border border-gray-400 p-2 w-full rounded-lg focus:outline-none "
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="age"
                        className="block text-black font-roboto font-bold mb-2"
                      >
                        Price
                      </label>
                      <input
                        type="number"
                        id="age"
                        name="age"
                        onChange={(e) => setPrice(e.target.value)}
                        className="border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-400"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="age"
                        className="block text-black font-roboto font-bold mb-2"
                      >
                        Tour Date
                      </label>
                      <div className="w-full">
                        <DatePicker
                          className="border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-400"
                          selected={startDate}
                          onChange={(date) => setStartDate(date)}
                          dateFormat="dd/MM/YYYY"
                        />
                      </div>
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="gender"
                        className="block text-black font-roboto font-bold mb-2"
                      >
                        Tour guide name
                      </label>
                      <select
                        id="gender"
                        name="gender"
                        onChange={(e) => setTourGuide(e.target.value)}
                        className="border text-black font-roboto font-bold border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-400"
                        required
                      >
                        <option value="">Tour guide name</option>
                        {tourGuid.map((guid) => (
                          <option key={guid._id} value={guid.name}>
                            {guid.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <button
                        type="submit"
                        className="w-full px-4 py-3 bg-teal-600/80 font-roboto text-white hover:bg-teal-700  text-lg font-bold rounded"
                      >
                        Booking
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-4 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-teal-600/80 text-base font-medium text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showConfirmationModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen">
              &#8203;
            </span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="mb-6 text-teal-900 text-center font-roboto text-3xl font-semibold underline decoration-teal-200/80">
                  Confirm your Booking
                </h3>

                <p>
                  Click{" "}
                  <Link
                    to="/dashbord/myBooking"
                    className="text-teal-600 font-roboto font-semibold hover:underline"
                  >
                    here
                  </Link>{" "}
                  to view your bookings.
                </p>
              </div>
              <div className="bg-gray-50 px-4 py-4 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={() => setShowConfirmationModal(false)}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-teal-600/80 text-base font-medium text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {bookingCount > 2 && (
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-50">
          <Confetti width={window.innerWidth} height={window.innerHeight} />
          <div className="bg-white shadow-[0_8px_12px_-6px_rgba(0,0,0,0.2)] border p-6 w-full max-w-sm rounded-lg font-[sans-serif] overflow-hidden mx-auto mt-4">
            <h3 className="text-xl font-bold text-[#333]">Congratulations! 🎉</h3>
            <p className="mt-4 text-sm text-gray-500">
             You hve unlocked a special discount for being a loyal customer. Enjoy your savings and thank you for choosing us for your bookings!
            </p>
            <div className="relative flex items-center px-1 bg-gray-50 border-2 focus-within:border-[#007bff] focus-within:bg-white rounded mt-6">
              <input
                type="text"
                placeholder="Enter Your code"
                className="px-2 py-3 text-black w-full text-sm bg-transparent outline-none"
              />
              <button
                type="button"
                className="px-6 py-2.5 rounded text-white text-sm tracking-wider font-semibold border-none outline-none bg-blue-600 hover:bg-blue-700 active:bg-blue-600"
              >
                Send
              </button>
            </div>
          </div>
          {setTimeout(() => setBookingCount(0), 5000)}
        </div>
      )}
    </div>
  );
};

export default PackageDetails;
