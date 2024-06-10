import { useContext, useState } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";

const MyAssignedTours = () => {
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPages] = useState(10);
  

  const { data: bookingData = [], refetch } = useQuery({
    queryKey: ["bookingData", user.displayName, itemsPerPage, currentPage],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/myBooking?name=${user.displayName}&size=${itemsPerPage}&page=${currentPage}`
      );
      return res.data;
    },
  });

  const { data: bookingCountData = 0 } = useQuery({
    queryKey: ["bookingCount"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/myTotalBooking`);
      return res.data.count;
    },
  });
  const numberOfPages = Math.ceil(bookingCountData / itemsPerPage);
  const pages = [...Array(numberOfPages).keys()];

  const handleReject = (id) => {
    axiosPublic.patch(`/booking/status/${id}`).then((res) => {
      refetch();
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          title: "Rejected!",
          text: "Booking has been Rejected.",
          icon: "success",
        });
      }
    });
  };
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
  const handleAccept = (id) => {
    axiosPublic.patch(`/acceptedbooking/status/${id}`).then((res) => {
      refetch();
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          title: "Accepted!",
          text: "Booking has been Accepted.",
          icon: "success",
        });
      }
    });
  };
  return (
    <div>
      <Helmet>
      <title>Nature Nexus | My Assign Tour</title>
      </Helmet>
      <div className="overflow-x-auto font-[sans-serif]">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100 whitespace-nowrap">
            <tr>
              <th className="pl-4 w-8">
                <input id="checkbox" type="checkbox" className="hidden peer" />
              </th>
              <th className="p-4 text-left text-sm font-semibold text-black">
                Packages name
              </th>
              <th className="p-4 text-left text-sm font-semibold text-black">
                Tourist name
              </th>
              <th className="p-4 text-left text-sm font-semibold text-black">
                Tour date
              </th>
              <th className="p-4 text-left text-sm font-semibold text-black">
                Tour price
              </th>
              <th className="p-4 text-center text-sm font-semibold text-black">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="whitespace-nowrap divide-y divide-gray-200">
            {bookingData.map((data) => (
              <tr key={data._id}>
                <td className="pl-4 w-8"></td>
                <td className="p-4 text-sm">
                  <div className="flex items-lef cursor-pointer w-max">
                    <div className="">
                      <p className="text-sm text-black text-left">
                        {data.packageName}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-sm">{data.name}</td>
                <td className="px-6 py-3">{data.tourDate}</td>
                <td className="px-6 py-3">$ {data.price}</td>
                <td className="px-6 py-3 text-center">
                  <button
                    onClick={() => handleAccept(data._id)}
                    className="mr-4 px-4 py-2  text-white font-roboto font-semibold bg-[#135D66] rounded-md hover:bg-[#135c66d0] focus:outline-none focus:shadow-outline-blue  transition duration-150 ease-in-out"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleReject(data._id)}
                    className=" ml-2 px-4 py-2  font-roboto font-semibold text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-red active:bg-red-600 transition duration-150 ease-in-out"
                  >
                    Reject
                  </button>
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
    </div>
  );
};

export default MyAssignedTours;
