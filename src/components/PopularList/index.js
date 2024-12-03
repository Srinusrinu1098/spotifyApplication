import {Link} from 'react-router-dom'
import './PopularStyle.css'

const PopularList = props => {
  const {popular} = props
  const {image, id, name} = popular
  return (
    <Link to={`/playlists-details/${id}`} style={{textDecoration: 'none'}}>
      <li className="image-container">
        <img className="image" src={image} alt={name} />
        <p className="text">{name}</p>
      </li>
    </Link>
  )
}

export default PopularList
