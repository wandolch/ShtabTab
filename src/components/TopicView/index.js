import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import PropTypes from 'prop-types';
import styles from './index.css';

class TopicView extends Component {
  toggleTopic = () => {
    this.props.onToggle(this.props.topic);
  };

  render() {
    return (
      <div
        className={`${styles.topic} ${this.props.isActive ? styles['is-active'] : ''}`}
        onClick={this.toggleTopic} >{this.props.topic}
      </div>
    );
  }
}

TopicView.propTypes = {
  topic: PropTypes.string,
  isActive: PropTypes.bool,
  onToggle: PropTypes.func
};

export default CSSModules(TopicView, styles);
