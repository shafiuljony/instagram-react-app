import useUser from "../../hooks/use-user" ;
import User from "./User";
import Suggestions from "./Suggestions";

export default function Sidebar() {
    const  {user: fullname, userName, userId }  = useUser();

    // console.log(fullname, userName, userId);
    return (
        <div className="p-4">
            <User />
            <Suggestions />
        </div>
    )
}