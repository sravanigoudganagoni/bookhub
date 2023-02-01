import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    errorMsg: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}

    const apiUrl = 'https://apis.ccbp.in/login'
    const option = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(apiUrl, option)
    const data = await response.json()
    if (response.ok) {
      const jwtToken = data.jwt_token
      Cookies.set('jwt_token', jwtToken, {expires: 30})
      const {history} = this.props
      history.replace('/')
    } else {
      const errorMsg = data.error_msg
      this.setState({errorMsg})
    }
  }

  render() {
    const {errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="bg-container">
        <img
          src="https://res.cloudinary.com/dm6hv2see/image/upload/v1650634530/samples/Rectangle_1467_1x_muafv2.png"
          className="login-page"
          alt="website login logo"
        />
        <div className="form-container">
          <div>
            <img
              src="https://res.cloudinary.com/dm6hv2see/image/upload/v1650634746/samples/Group_7731_2x_peidyx.png"
              className="bookhub-logo"
              alt="login website logo"
            />
          </div>

          <form className="form" onSubmit={this.onSubmitForm}>
            <label className="label" htmlFor="username">
              Username*
            </label>
            <input
              type="text"
              className="user-input"
              id="username"
              onChange={this.onChangeUsername}
              placeholder="Enter a username"
            />
            <label className="label" htmlFor="password">
              Password*
            </label>
            <input
              type="password"
              className="user-input"
              id="password"
              onChange={this.onChangePassword}
              placeholder="Enter a password"
            />

            <button type="submit" className="login-button">
              Login
            </button>
            <p className="error-message">{errorMsg}</p>
          </form>
        </div>
      </div>
    )
  }
}

export default Login
