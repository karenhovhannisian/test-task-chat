import {useContext} from "react";
import mainContext from "./mainContext"
export const useSession = () => {
    const { user, messages } = useContext(mainContext);
    return {user, messages }
}
