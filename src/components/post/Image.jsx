import PropTypes from 'prop-types';

export default function Image({ src, caption }) {
    return (
        <div className="post__image">
            <img src={src} alt={caption} loading='lazy' />
        </div>
    )
}

Image.propTypes = {
    src: PropTypes.string.isRequired,
    caption: PropTypes.string.isRequired
}