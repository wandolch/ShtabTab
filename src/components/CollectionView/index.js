import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './index.css';
import { collectionShape } from '../../model/collectionShape';

class CollectionView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showMenu: false
    };
  }

  onShareClick = () => {
    this.props.onCollectionShare(this.props.item.id);
  };

  onDeleteClick = () => {
    this.props.onDelete(this.props.item.id);
  };

  onToggleView = () => {
    this.props.onToggleView(this.props.item.id);
  };

  closeContext = () => {
    this.setState({ showMenu: false }, () => {
      document.removeEventListener('click', this.closeContext);
    });
  };

  showContext = (event) => {
    event.preventDefault();

    this.setState(
      {
        showMenu: true
      },
      () => {
        document.addEventListener('click', this.closeContext);
      }
    );
  };

  renderContextMenu() {
    if (this.state.showMenu) {
      return (
        <div
          styleName="context-menu"
          onClick={this.closeContext}
          ref={(el) => { this.contextMenu = el; }}>
          <div styleName="context-btn">Edit</div>
          <div onClick={this.onDeleteClick} styleName="context-btn">Remove</div>
          <div onClick={this.onShareClick} styleName="context-btn">Share</div>
          <div onClick={this.onToggleView} styleName="context-btn">
            {this.props.item.defaultStyle ? 'Alternative view' : 'Default view'}
          </div>
        </div>
      );
    } return null;
  }

  render() {
    return (
      <div styleName="wrapper">
        <div className={`${styles['collection-container']} ${this.props.isActive ? styles['is-active'] : ''}`}>
          <Link
            to={`/collection/${this.props.item.id}`}
            styleName="collection-link">{this.props.item.title}
          </Link>
          <i
            onClick={this.showContext}
            styleName="options"
            className="material-icons">more_vert
          </i>
        </div>
        {this.renderContextMenu()}
      </div>
    );
  }
}

CollectionView.propTypes = {
  item: collectionShape,
  isActive: PropTypes.bool,
  onCollectionShare: PropTypes.func,
  onDelete: PropTypes.func,
  onToggleView: PropTypes.func
};

export default CSSModules(CollectionView, styles);
