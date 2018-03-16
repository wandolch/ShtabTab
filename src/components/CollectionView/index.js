import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './index.css';
import { collectionShape } from '../../model/collectionShape';

class CollectionView extends Component {
  render() {
    return (
      <div className={`${styles['collection-container']} ${this.props.isActive ? styles['is-active'] : ''}`}>
        <Link
          to={`/collection/${this.props.item.id}`}
          styleName="collection-link">{this.props.item.title}
        </Link>
      </div>
    );
  }
}

CollectionView.propTypes = {
  item: collectionShape,
  isActive: PropTypes.bool
};

export default CSSModules(CollectionView, styles);
