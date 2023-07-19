import { useEffect } from "react";
import Header from '../components/Header';

export default function NotFound() {

    useEffect(() => {
        document.title = "Not Found!"
    }, [])
    return (
        <div className="bg-gray-background">
            <Header />
            <div className="max-auto max-w-screen-lg">
                <h1 className="text-center text-2xl">Oops!</h1>
                <p className="text-center text-2xl">Sorry, an unexpected error has occurred.</p>
            </div>
        </div>
    )
}