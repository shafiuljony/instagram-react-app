import { useState, useEffect } from 'react';


export default function Suggestions() {
    const [ profiles, setProfiles ] = useState(null);

    // go and get the suggested profiles
    // hint: use the firebase service (call using userId)
    //call the async function getSuggestedProfiles
    //store it in state
    //go ahead and render (wait on the profiles as in 'skeleton')
    return (
        <div>
            <p>I am the Suggestions component</p>
        </div>
    )
}