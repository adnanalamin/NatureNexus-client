import { useContext, useState } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const MyBooking = () => {
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPages] = useState(10);
  const { data: bookingtData = [], refetch } = useQuery({
    queryKey: ["bookingtData", user.email, itemsPerPage, currentPage],
    queryFn: async () => {
      const res = await axiosPublic.get(`/getbooking?email=${user.email}&size=${itemsPerPage}&page=${currentPage}`);
      return res.data;
    },
  });
  const handelCancelBooking = (newData) => {
    axiosPublic.delete(`/deletebooking/${newData._id}`).then((res) => {
      refetch();
      if (res.data.deletedCount > 0) {
        Swal.fire({
          title: "Canceled!",
          text: "Booking has been Cancel.",
          icon: "success",
        });
      }
    });
  };

  const { data: bookingCountData = 0 } = useQuery({
    queryKey: ["bookingCount"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/myTotalBooking`);
      return res.data.count;
    },
  });
  const numberOfPages = Math.ceil(bookingCountData / itemsPerPage);
  const pages = [...Array(numberOfPages).keys()];

  const handelItemsPerPages = (e) => {
    const val = parseInt(e.target.value);
    setItemsPerPages(val);
    setCurrentPage(0);
  };
  const handelPrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handelNextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };
  return (
    <div className="font-roboto">
      <div className="mt-6 mb-12 w-full mx-auto text-center">
        <h3 className="font-bold text-3xl w-full mx-auto">My Booking</h3>
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Package Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Guide Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Tour Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Tour Price
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {bookingtData.map((newData) => (
            <tr key={newData._id}>
              <td className="px-6 py-4 whitespace-nowrap">
                {newData.packageName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {newData.tourGuide}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {newData.tourDate}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{newData.price}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                  {newData.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center">
                {(newData.status === "In Review" ||
                  newData.status === "Rejected") && (
                  <button
                    onClick={() => handelCancelBooking(newData)}
                    className="px-4 py-2 font-medium text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-red active:bg-red-600 transition duration-150 ease-in-out"
                  >
                    Cancel
                  </button>
                )}
                {newData.status === "Accepted" && (
                  <button className="px-4 py-2 font-medium text-white bg-[#135D66] rounded-md hover:bg-[#135c66d0] focus:outline-none focus:shadow-outline-blue  transition duration-150 ease-in-out">
                    Pay
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="md:flex m-12">
          <p className="text-sm text-gray-500 flex-1"></p>

          <div className="flex items-center max-md:mt-4">
            <p className="text-sm text-gray-500">Display</p>
            <select
              onChange={handelItemsPerPages}
              value={itemsPerPage}
              className="text-sm text-gray-500 border border-gray-400 rounded h-7 mx-4 px-1 outline-none"
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
            </select>

            <ul className="flex space-x-1 ml-2">
              <li
                onClick={handelPrevPage}
                className="flex items-center justify-center cursor-pointer bg-blue-100 w-7 h-7 rounded"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-3 fill-gray-500"
                  viewBox="0 0 55.753 55.753"
                >
                  <path
                    d="M12.745 23.915c.283-.282.59-.52.913-.727L35.266 1.581a5.4 5.4 0 0 1 7.637 7.638L24.294 27.828l18.705 18.706a5.4 5.4 0 0 1-7.636 7.637L13.658 32.464a5.367 5.367 0 0 1-.913-.727 5.367 5.367 0 0 1-1.572-3.911 5.369 5.369 0 0 1 1.572-3.911z"
                    data-original="#000000"
                  />
                </svg>
              </li>
              {pages.map((page) => (
                <li
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={
                    currentPage === page
                      ? " flex items-center justify-center cursor-pointer text-sm bg-[#007bff] text-white w-7 h-7 rounded"
                      : "flex items-center justify-center cursor-pointer text-sm w-7 h-7 text-gray-500 rounded"
                  }
                >
                  {page + 1}
                </li>
              ))}
              <li
                onClick={handelNextPage}
                className="flex items-center justify-center cursor-pointer bg-blue-100 w-7 h-7 rounded"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-3 fill-gray-500 rotate-180"
                  viewBox="0 0 55.753 55.753"
                >
                  <path
                    d="M12.745 23.915c.283-.282.59-.52.913-.727L35.266 1.581a5.4 5.4 0 0 1 7.637 7.638L24.294 27.828l18.705 18.706a5.4 5.4 0 0 1-7.636 7.637L13.658 32.464a5.367 5.367 0 0 1-.913-.727 5.367 5.367 0 0 1-1.572-3.911 5.369 5.369 0 0 1 1.572-3.911z"
                    data-original="#000000"
                  />
                </svg>
              </li>
            </ul>
          </div>
        </div>
    </div>
  );
};

export default MyBooking;
