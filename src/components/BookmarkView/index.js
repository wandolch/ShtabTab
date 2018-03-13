import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import styles from './index.css';
import TransformService from '../../services/TransformService';
import { bookmarkShape } from '../../model/bookmarkShape';
import PropTypes from 'prop-types';

const bookmarkSizes = {
  0: '8.94vh',
  1: '12.92vh',
  2: '18.88vh'
};

const bookmarkPaddings = {
  0: '1vh',
  1: '1.5vh',
  2: '2.98vh'
};

const bookmarkImageSizes = {
  0: '6.95vh',
  1: '9.94vh',
  2: '14.41vh'
};

class BookmarksView extends Component {
  deleteHandle = () => {
    this.props.onDelete(this.props.item.id);
  };

  render() {
    const bookmarkWrapperCss = {
      backgroundColor: `rgb(${this.props.item.rgb})`,
      height: bookmarkSizes[this.props.item.frequency]
    };
    const bookmarkImageCss = {
      height: bookmarkImageSizes[this.props.item.frequency]
    };
    if (this.props.item.picture) {
      bookmarkImageCss.backgroundImage = `url(${process.env.ORIGIN_URL + this.props.item.picture})`;
    }
    const textBlockCss = {
      color: TransformService.getContrastColor(this.props.item.rgb),
      marginBottom: bookmarkPaddings[this.props.item.frequency]
    };

    return (
      <div styleName="bookmark-container">
        <div styleName="delete-icon-wrapper">
          <div
            onClick={this.deleteHandle}
            styleName="delete-icon">
            <i className="material-icons">clear</i>
          </div>
        </div>
        <a
          href={this.props.item.link}
          target="_blank"
          style={bookmarkWrapperCss}
          styleName="bookmark-link">
          <div styleName="bookmark-text" style={textBlockCss}>
            <div>{this.props.item.title}</div>
            <div styleName="bookmark-link-text">{this.props.item.hostName}</div>
          </div>
          <div
            styleName="bookmark-image-wrapper"
            style={bookmarkImageCss} />
        </a>
      </div>
    );
  }
}

BookmarksView.propTypes = {
  item: bookmarkShape,
  onDelete: PropTypes.func
};

export default CSSModules(BookmarksView, styles);
