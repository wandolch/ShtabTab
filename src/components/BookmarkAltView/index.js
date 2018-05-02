import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import PropTypes from 'prop-types';
import styles from './index.css';
import TransformService from '../../services/TransformService';
import { bookmarkShape } from '../../model/bookmarkShape';

const faviconSnatcher = 'https://www.google.com/s2/favicons?domain=';

class BookmarkAltView extends Component {
  deleteHandle = (e) => {
    e.preventDefault();
    this.props.onDelete(this.props.item.id);
  };

  sendStat = () => {
    this.props.stat(this.props.item.id);
  };

  render() {
    return (
      <a onClick={this.sendStat} href={this.props.item.link} target="_blank" styleName="bookmark-link">
        <div styleName="bookmark-info">
          <img src={`${faviconSnatcher}${this.props.item.link}`} styleName="favicon" alt="favicon"/>
          <div styleName="bookmark-text">
            <div styleName="bookmrak-title">{this.props.item.title}</div>
            <div styleName="bookmrak-domain">{this.props.item.hostName}</div>
          </div>
        </div>
        <div onClick={this.deleteHandle} styleName="delete-icon">
          <i className="material-icons">clear</i>
        </div>
      </a>
    );
  }
}

BookmarkAltView.propTypes = {
  item: bookmarkShape,
  stat: PropTypes.func,
  onDelete: PropTypes.func
};

export default CSSModules(BookmarkAltView, styles);
