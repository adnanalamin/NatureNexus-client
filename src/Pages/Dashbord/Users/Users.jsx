import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";

const Users = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [searchText, setSearchText] = useState("");
  const axiosSecure = useAxiosSecure();
  const [user, setUser] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPages] = useState(10);

  useEffect(() => {
    const getData = async () => {
      const { data } = await axiosSecure.get(
        `/users?filter=${filter}&search=${search}&size=${itemsPerPage}&page=${currentPage}`
      );
      setUser(data);
    };
    getData();
  }, [filter, axiosSecure, search, itemsPerPage, currentPage]);

  const handleMakeAdmin = (newUser) => {
    axiosSecure.patch(`/users/admin/${newUser._id}`).then((res) => {
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: `${newUser.name} is an Admin Now`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const handleMakeGuide = (newUser) => {
    axiosSecure.patch(`/users/guide/${newUser._id}`).then((res) => {
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: `${newUser.name} is an Tour Guide Now`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();

    setSearch(searchText);
  };

  const clearFilters = () => {
    setSearch("");
    setFilter("");
    setSearchText("");
  };

  const { data: bookingCountData = 0 } = useQuery({
    queryKey: ["bookingCount"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/userCount`);
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
    <div className="overflow-x-auto">
      <Helmet>
      <title>Nature Nexus | User</title>
      </Helmet>
      <div className="flex flex-col justify-between w-full mb-4 md:flex-row gap-3">
        <div className="w-full md:w-3/12">
          <select
            onChange={(e) => {
              setFilter(e.target.value);
            }}
            value={filter}
            id="role"
            name="role"
            className="w-full h-10 border-2 border-sky-500 focus:outline-none focus:border-sky-500 text-sky-500 rounded px-2 md:px-3 py-0 md:py-1 tracking-wider"
          >
            <option value="" selected="">
              Role
            </option>
            <option value="admin">Admin</option>
            <option value="TourGuide">Tour Gouid</option>
            <option value="Tourist">Tourist</option>
          </select>
        </div>

        <form onSubmit={handleSearch}>
          <div className="flex w-full md:w-[600px]">
            <input
              onChange={(e) => setSearchText(e.target.value)}
              value={searchText}
              name="search"
              type="text"
              placeholder="Search by email"
              className="w-full  px-3 h-10 rounded-l border-2 border-sky-500 focus:outline-none focus:border-sky-500"
            />
            <button
              type="submit"
              className="bg-sky-500 text-white rounded-r px-2 md:px-3 py-0 md:py-1"
            >
              Search
            </button>
          </div>
        </form>
        <div className="w-full md:w-3/12">
          <button
            onClick={clearFilters}
            className="w-full h-10 border-2 bg-sky-500 text-white rounded px-2 md:px-3 py-0 md:py-1 font-bold font-roboto"
          >
            Clear Filter
          </button>
        </div>
      </div>

      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr className="bg-base-300">
            <th className="px-6 py-3 font-roboto font-bold text-left text-lg  text-black uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 font-roboto font-bold text-left text-lg  text-black uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 font-roboto font-bold text-left text-lg  text-black uppercase tracking-wider">
              Role
            </th>

            <th className="px-6 py-3 font-roboto font-bold text-center texlgxs  text-black uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {user.map((newUser) => (
            <tr key={newUser._id}>
              <td className="px-6 py-4 whitespace-nowrap font-poppins">
                {newUser.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap font-poppins">
                {newUser.email}
              </td>
              <td className="px-6 py-4 whitespace-nowrap font-poppins">
                {newUser.role}
              </td>

              <td className="px-6 py-4 whitespace-nowrap text-center">
                <button
                  onClick={() => handleMakeAdmin(newUser)}
                  className={`px-4 py-2 font-medium font-poppins text-white rounded-md transition duration-150 ease-in-out ${
                    newUser.role === "admin" || newUser.role === "TourGuide"
                      ? "bg-[#135D66] cursor-not-allowed"
                      : "bg-[#135D66] hover:bg-[#135c66d0] focus:outline-none focus:shadow-outline-blue active:bg-blue-600"
                  }`}
                  disabled={
                    newUser.role === "admin" || newUser.role === "TourGuide"
                  }
                >
                  Make Admin
                </button>
                <button
                  onClick={() => handleMakeGuide(newUser)}
                  className={`ml-2 px-4 py-2 font-medium font-poppins text-white rounded-md transition duration-150 ease-in-out ${
                    newUser.role === "admin" || newUser.role === "TourGuide"
                      ? "bg-[#135D66] cursor-not-allowed"
                      : "bg-[#135D66] hover:bg-[#135c66d0] focus:outline-none focus:shadow-outline-blue active:bg-blue-600"
                  }`}
                  disabled={
                    newUser.role === "admin" || newUser.role === "TourGuide"
                  }
                >
                  Make Guide
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

export default Users;
