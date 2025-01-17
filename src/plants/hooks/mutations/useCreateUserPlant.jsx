import authenticatedClient from "../../../common/api/authenticatedClient";
import { useMutation } from "react-query";
import { useQueryClient } from "react-query"; 

const PATH_NAME =  "/user-plant"

const createUserPlant = (payload) => {
    return authenticatedClient.post(PATH_NAME, payload)
}

export default function useCreateUserPlant() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: createUserPlant,
        mutationKey: ["createUserPlant"],
        onSuccess: () => {
            queryClient.invalidateQueries("userPlants")
        }
    })
}