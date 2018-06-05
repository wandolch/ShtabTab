import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';
import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';
import PropTypes from 'prop-types';
import styles from './index.css';
import { doSignIn, applicationError } from '../../actions/commonActions';
import { getUser } from '../../states/commonState';
import { userShape } from '../../model/userShape';
import logo from '../../assets/logo.png';
import google from '../../assets/google.svg';

const googleLoginStyle = {
  backgroundColor: 'rbga(0,0,0,0)',
  padding: '20px'
};

class InfoPage extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.user && !this.props.user) {
      localStorage.setItem('st-user', JSON.stringify(nextProps.user));
      this.props.history.push('/');
    }
  }

  responseGoogle = (response) => {
    this.props.dispatch(doSignIn(response.tokenId));
  };

  failGoogle = () => {
    this.props.dispatch(applicationError({ message: 'Login failed' }));
  };

  render() {
    return (
      <div styleName="info-page-wrapper">
        <div styleName="info-page-background" />
        <div styleName="info-page-container">
          <GoogleLogin
            clientId="814580486195-msr1p79efvrn7u99c4md7gucd1rot2ks.apps.googleusercontent.com"
            buttonText="LOGIN VIA GOOGLE"
            onSuccess={this.responseGoogle}
            tag="div"
            type="tag"
            style={googleLoginStyle}
            onFailure={this.failGoogle}>
            <button type="button" styleName="google-button">
              <span styleName="google-button__icon">
                <img src={google} alt="google"/>
              </span>
              <span styleName="google-button__text">Войти через Google</span>
            </button>
          </GoogleLogin>
        </div>
      </div>
    );
  }
}

InfoPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  user: userShape,
  history: PropTypes.object
};

export default connect(state => ({
  user: getUser(state)
}))(CSSModules(InfoPage, styles));

