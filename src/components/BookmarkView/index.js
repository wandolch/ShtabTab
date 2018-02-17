import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import styles from './index.css';
import TransformService from '../../services/TransformService';
import { bookmarkShape } from '../../model/bookmarkShape';

const bookmarkSizes = {
  0: '90px',
  1: '130px',
  2: '190px'
};

const bookmarkPaddings = {
  0: '10px',
  1: '15px',
  2: '30px'
};

const bookmarkImageSizes = {
  0: '70px',
  1: '100px',
  2: '145px'
};

class BookmarksView extends Component {
  render() {
    const bookmarkWrapperCss = {
      backgroundColor: `rgb(${this.props.item.rgb})`,
      height: bookmarkSizes[this.props.item.frequency]
    };
    const bookmarkImageCss = {
      backgroundImage: `url(${this.props.item.image})`,
      height: bookmarkImageSizes[this.props.item.frequency]
    };
    const textBlockCss = {
      color: TransformService.getContrastColor(this.props.item.rgb),
      marginBottom: bookmarkPaddings[this.props.item.frequency]
    };

    return (
      <a
        href={this.props.item.link}
        target="_blank"
        style={bookmarkWrapperCss}
        styleName="bookmark-wrapper">
        <div styleName="bookmark-text" style={textBlockCss}>
          <div styleName="bookmark-title">{this.props.item.title}</div>
          <div styleName="bookmark-link-text">{TransformService.extractHostname(this.props.item.link)}</div>
        </div>
        <div
          styleName="bookmark-image-wrapper"
          style={bookmarkImageCss} />
      </a>
    );
  }
}

BookmarksView.propTypes = {
  item: bookmarkShape
};

export default CSSModules(BookmarksView, styles);
