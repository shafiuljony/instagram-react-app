import { useRef } from "react"
import PropTypes from "prop-types"
import Header from "./Header"
import Image from "./image"
import Actions from "./Actions"

export default function Post({content}){
    const commentInput = useRef(null);
    const handleFocus = () => commentInput.current.focus();
    //  console.log('content',content);

    //header, image, actions (like & comment icons), footer, comments
    

    return (
        <div className="rounded col-span-4 border bg-white border-gray-primary mb-12">
            <Header username={content.username} />
            <Image src={content.imageSrc} caption={content.caption} />
            <Actions docId={content.docId} totalLikes={content.likes.length} likedPhoto={content.userLikedPhoto} handleFocus={handleFocus} />
        </div>
    )
}

Post.propTypes = {
    content: PropTypes.shape({
        username: PropTypes.string.isRequired,
        imageSrc: PropTypes.string.isRequired,
        caption: PropTypes.string.isRequired,
        docId: PropTypes.string.isRequired,
        userLikedPhoto: PropTypes.bool.isRequired,
        likes: PropTypes.array.isRequired,
        comments: PropTypes.array.isRequired,
        dateCreated: PropTypes.number.isRequired
    })
}