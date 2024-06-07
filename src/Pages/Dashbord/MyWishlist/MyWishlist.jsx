import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useContext } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const MyWishlist = () => {
  const { user } = useContext(AuthContext);
  const email = user.email;
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const { data: wishlistData = [], refetch } = useQuery({
    queryKey: ["wishlistData"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/wishlist/${email}`);
      return res.data;
    },
  });

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
    <div>
      <table className="min-w-full divide-y divide-gray-200">
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
                  className="px-4 py-2  text-white font-roboto font-semibold bg-[#135D66] rounded-md hover:bg-[#135c66d0] focus:outline-none focus:shadow-outline-blue active:bg-blue-600 transition duration-150 ease-in-out"
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
    </div>
  );
};

export default MyWishlist;
