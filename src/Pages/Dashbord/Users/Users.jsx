import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";

const Users = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [searchText, setSearchText] = useState("");
  const axiosSecure = useAxiosSecure();
  const [user, setUser] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const { data } = await axiosSecure.get(
        `/users?filter=${filter}&search=${search}`
      );
      setUser(data);
    };
    getData();
  }, [filter, axiosSecure, search]);

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

  const handleDeleteUser = (newUser) => {
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
        axiosSecure.delete(`/users/${newUser._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "User has been deleted.",
              icon: "success",
            });
          }
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
  return (
    <div>
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

              {newUser.role === "admin" ? (
                <td className="px-6 py-4 whitespace-nowrap font-roboto font-bold text-center">
                  Admin
                </td>
              ) : (
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <button
                    onClick={() => handleMakeAdmin(newUser)}
                    className="px-4 py-2 font-medium font-poppins text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-600 transition duration-150 ease-in-out"
                  >
                    Make Admin
                  </button>
                  <button
                    onClick={() => handleMakeGuide(newUser)}
                    className="ml-2 px-4 py-2 font-medium font-poppins text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-600 transition duration-150 ease-in-out"
                  >
                    Make Guide
                  </button>
                  <button
                    onClick={() => handleDeleteUser(newUser)}
                    className="ml-2 px-4 py-2 font-medium font-poppins text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-red active:bg-red-600 transition duration-150 ease-in-out"
                  >
                    Delete
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
