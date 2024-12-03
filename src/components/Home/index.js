import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import {GiHamburgerMenu} from 'react-icons/gi'
import './HomeStyle.css'
import Loading from '../Loading'
import PopularList from '../PopularList'

const status = {
  initial: 'INITIAL',
  pending: 'PENDING',
  success: 'SUCCESS',
  failed: 'FAILED',
}

class Home extends Component {
  state = {activeStatus: status.initial, thumbnails: [], topHeading: ''}

  componentDidMount = () => {
    this.getAll()
  }

  getAll = async () => {
    const Token = Cookies.get('jwt_token')
    try {
      this.setState({activeStatus: status.pending})
      const url = 'https://apis2.ccbp.in/spotify-clone/featured-playlists'
      const options = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      }
      const response = await fetch(url, options)
      const data = await response.json()
      if (response.ok) {
        console.log(data)
        const updatedResponse = data.playlists.items.map(each => ({
          id: each.id,
          image: each.images[0].url,
          name: each.name,
        }))
        this.setState({
          thumbnails: updatedResponse,
          topHeading: data.message,
          activeStatus: status.success,
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  renderPending = () => <Loading />

  renderSuccess = () => {
    const {thumbnails, topHeading} = this.state
    console.log(thumbnails)
    return (
      <div className="main-container">
        <nav className="nav-bar">
          <img
            src="https://i.ibb.co/tMjFXWf/music.png"
            alt="website logo"
            className="music-img"
          />
          <div className="flex">
            <GiHamburgerMenu style={{color: '#ffffff'}} />
          </div>
        </nav>
        <h1 className="heading">{topHeading}</h1>
        <ul className="unordered-list">
          {thumbnails.map(each => (
            <PopularList key={each.id} popular={each} />
          ))}
        </ul>
      </div>
    )
  }

  render() {
    const {activeStatus} = this.state
    let content
    const Token = Cookies.get('jwt_token')
    if (Token === undefined) {
      return <Redirect to="/login" />
    }

    switch (activeStatus) {
      case status.pending:
        content = this.renderPending()
        break
      case status.failed:
        content = this.renderFailed()
        break
      case status.success:
        content = this.renderSuccess()
        break
      default:
        break
    }

    return <>{content}</>
  }
}

export default Home
