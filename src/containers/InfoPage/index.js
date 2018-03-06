import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';
import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';
import PropTypes from 'prop-types';
import styles from './index.css';
import { doSignIn, applicationError } from '../../actions/commonActions';
import { getUser } from '../../states/commonState';
import { userShape } from '../../model/userShape';

const googleLoginStyle = {
  fontSize: '100px'
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
      <div>
        <h1>Welcome to ShtabTab</h1>
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

InfoPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  user: userShape,
  history: PropTypes.object
};

export default connect(state => ({
  user: getUser(state)
}))(CSSModules(InfoPage, styles));

