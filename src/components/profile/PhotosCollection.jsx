import PropTyoes from 'prop-types';
import Skeleton from 'react-loading-skeleton';


export default function PhotosCollection({ photos }) {




    return (
        <div>this is the photos collection</div>
    )
}

PhotosCollection.propTypes = {
    photos: PropTyoes.array.isRequired
}