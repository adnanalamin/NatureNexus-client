import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useContext, useState } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const MyWishlist = () => {
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPages] = useState(10);
  const navigate = useNavigate();
  const { data: wishlistData = [], refetch } = useQuery({
    queryKey: ["wishlistData", user.email, itemsPerPage, currentPage],
    queryFn: async () => {
      const res = await axiosPublic.get(`/wishlist?email=${user.email}&size=${itemsPerPage}&page=${currentPage}`);
      return res.data;
    },
  });

  const { data: bookingCountData = 0 } = useQuery({
    queryKey: ["bookingCount"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/wishlistCount`);
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

  const handleDeleteWishlist = (newData) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't Dlete it",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic.delete(`/deletewishlist/${newData._id}`).then((res) => {
          refetch();
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "Wishlist has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };
  const handleViewPackege = (event) => {
    const _id = event;
    if (_id) {
      navigate(`/PackageDetails/${_id}`);
    }
  };
  return (
    <div className="font-roboto overflow-x-auto">
      <Helmet>
      <title>Nature Nexus | My WishList</title>
      </Helmet>
      <div className="mt-6 mb-12 w-full mx-auto text-center overflow-x-auto">
        <h3 className="font-bold text-3xl w-full mx-auto">My Wishlist</h3>
      </div>
      <table className="min-w-full divide-y divide-gray-200 overflow-x-auto">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left font-roboto font-semibold text-xs  text-gray-500 uppercase tracking-wider">
              Package Name
            </th>
            <th className="px-6 py-3 text-left font-roboto font-semibold text-xs  text-gray-500 uppercase tracking-wider">
              Tour Type
            </th>
            <th className="px-6 py-3 text-left font-roboto font-semibold text-xs  text-gray-500 uppercase tracking-wider">
              Price
            </th>
            <th className="px-6 py-3 text-left font-roboto font-semibold text-xs  text-gray-500 uppercase tracking-wider">
              Locatios
            </th>
            <th className="px-6 py-3  font-roboto font-semibold text-xs text-center text-gray-500 uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {wishlistData.map((newData) => (
            <tr key={newData._id}>
              <td className="px-6 py-4 whitespace-nowrap font-roboto font-semibold">
                {newData.packageName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap font-roboto font-semibold">
                {newData.packageType}
              </td>
              <td className="px-6 py-4 whitespace-nowrap font-roboto font-semibold">
                {newData.packagePrice}
              </td>
              <td className="px-6 py-4 whitespace-nowrap font-roboto font-semibold">
                {newData.packageLocatio}
              </td>
              <td className="px-6 py-4 whitespace-nowrap font-roboto font-semibold text-center">
                <button
                  onClick={() => handleViewPackege(newData.packageId)}
                  className="px-4 py-2  text-white font-roboto font-semibold bg-[#135D66] hover:bg-[#135c66d0] rounded-md  focus:outline-none focus:shadow-outline-blue  transition duration-150 ease-in-out"
                >
                  Visit Details
                </button>
                <button
                  onClick={() => handleDeleteWishlist(newData)}
                  className="ml-2 px-4 py-2  font-roboto font-semibold text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-red active:bg-red-600 transition duration-150 ease-in-out"
                >
                  Delete{" "}
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
  );
};

export default MyWishlist;
