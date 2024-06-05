import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";


const useGuide = () => {
    const { user, loading } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const { data: isGuide, isPending: isGuideLoading } = useQuery({
    queryKey: [user?.email, "isGuide"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosPublic.get(`/users/guid/${user.email}`);
      return res.data?.TourGuide;
    },
  });
  return [isGuide, isGuideLoading];
};

export default useGuide;