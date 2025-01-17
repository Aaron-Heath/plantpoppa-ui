import authenticatedClient from "@/common/api/authenticatedClient";
import { useQuery } from "react-query";

const PATH_NAME = "/user-plant"

const getUserPlants= () => {
    return authenticatedClient.get(PATH_NAME)
}

export default function useGetUserPlants() {
    return useQuery({
        queryFn: getUserPlants,
        queryKey: ["userPlants"]
    })
}