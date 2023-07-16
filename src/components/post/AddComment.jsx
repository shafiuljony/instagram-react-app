import { useState, useContext } from "react";
import PropTypes from "prop-types";
import FirebaseContext from "../../context/firebase";
import UserContext from "../../context/user";

export default function AddComment({docId, comments, setComments, commentInput}){
    const [comment, setComment] = useState('');
    const  { firebase, FieldValue } = useContext(FirebaseContext);
    const { user: { displayName } } = useContext(UserContext); //destructuring user object from UserContext

    const handleSubmitComment = (event) => {
        event.preventDefault();

        setComments([{displayName, comment}, ...comments]);
        setComment('');

        //give me a new array with the new comment added to the top of the array
        //put the new comment at the top of the array
        //concatenate the new comment with the previous comments
        //then we have a new array with the new comment at the top of the array

        return null;
    }


    return (
        <div className="border-t border-gray-primary">
            <form 
                className="flex justify-between pl-0 pr-5"
                method="POST"
                onSubmit={(event) => comment.length >= 1 ? handleSubmitComment(event) : event.preventDefault()}
            >
                <input
                    aria-label="Add a comment"
                    autoComplete="off"
                    className="text-sm text-gray-base w-full mr-3 py-5 px-4"
                    type="text"
                    name="add-comment"
                    placeholder="Add a comment..."
                    value={comment}
                    onChange={({target}) => setComment(target.value)}
                    ref={commentInput}
                />
                <button 
                    className={`text-sm font-bold text-blue-medium ${!comment && 'opacity-25'}`}
                    type="button"
                    disabled={comment.length < 1}
                    onClick={handleSubmitComment}
                >
                    Post
                </button>
            </form>
        </div>    
    )
}

AddComment.propTypes = {
    docId: PropTypes.string.isRequired,
    comments: PropTypes.array.isRequired,
    setComments: PropTypes.func.isRequired,
    commentInput: PropTypes.object.isRequired
}