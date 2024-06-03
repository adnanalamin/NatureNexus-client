import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const Users = () => {
  const axiosSecure = useAxiosSecure();
  const { data: user = [], refetch } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const handleMakeAdmin = (newUser) => {
    axiosSecure.patch(`/users/admin/${newUser._id}`).then((res) => {
      if (res.data.modifiedCount > 0) {
        refetch();
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
        refetch();
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
            refetch();
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
  return (
    <div>
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

              {newUser.role === 'admin' ? <td className="px-6 py-4 whitespace-nowrap font-roboto font-bold text-center">
                Admin
              </td>: <td className="px-6 py-4 whitespace-nowrap text-center">
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
              </td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
