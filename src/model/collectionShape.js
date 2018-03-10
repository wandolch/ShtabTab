import PropTypes from 'prop-types';

export const collectionShape = PropTypes.shape({
  title: PropTypes.string,
  id: PropTypes.string,
  index: PropTypes.number,
  created: PropTypes.string,
  creatorId: PropTypes.string
});
