import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import styles from './index.css';
import TransformService from '../../services/TransformService';
import { bookmarkShape } from '../../model/bookmarkShape';

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
          <div>{this.props.item.title}</div>
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
