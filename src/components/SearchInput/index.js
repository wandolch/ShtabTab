import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import styles from './index.css';

class SearchInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: ''
    };
  }

  dataSearch = (event) => {
    this.setState({ term: event.target.value });
    this.props.onSearch(event.target.value);
  };

  render() {
    return (
      <div>
        <input
          value={this.state.term}
          type="text"
          autoFocus
          styleName="input"
          placeholder="Search"
          onChange={this.dataSearch}/>
      </div>
    );
  }
}

SearchInput.propTypes = {
  onSearch: PropTypes.func
};

export default CSSModules(SearchInput, styles);
