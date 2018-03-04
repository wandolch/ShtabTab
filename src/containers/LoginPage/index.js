import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';
import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';
import PropTypes from 'prop-types';
import styles from './index.css';
import { doSignIn } from '../../actions/commonActions';


const googleLoginStyle = {
  fontSize: '100px'
};

class LoginPage extends Component {
  responseGoogle = (response) => {
    this.props.dispatch(doSignIn(response.tokenId));
  };

  failGoogle() {
    // TODO error
  }

  render() {
    return (
      <div>
        <GoogleLogin
          clientId="814580486195-msr1p79efvrn7u99c4md7gucd1rot2ks.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={this.responseGoogle}
          style={googleLoginStyle}
          onFailure={this.failGoogle}/>
      </div>
    );
  }
}

LoginPage.propTypes = {
  dispatch: PropTypes.func.isRequired
};

export default connect()(CSSModules(LoginPage, styles));
