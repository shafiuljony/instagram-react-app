import useUser from "../../hooks/use-user" ;
import User from "./User";
import Suggestions from "./Suggestions";

export default function Sidebar() {
    const  {
        user: { docId, fullName, username, userId, following} 
    }  = useUser();

    // console.log('docId',docId);
    return (
        <div className="p-4">
            <User username={username} fullName={fullName} />
            <Suggestions userId={userId} following={following} loggedInUserDocId={docId}/>
        </div>
    )
}