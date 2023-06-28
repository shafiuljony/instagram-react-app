import useUser from "../../hooks/use-user" ;
import User from "./User";
import Suggestions from "./Suggestions";

export default function Sidebar() {
    const  {user: {fullName, userName, userId} }  = useUser();

    // console.log(fullName);
    return (
        <div className="p-4">
            <User userName={userName} fullName={fullName} />
            <Suggestions userId={userId}/>
        </div>
    )
}