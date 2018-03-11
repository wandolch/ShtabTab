import PropTypes from 'prop-types';

export const bookmarkShape = PropTypes.shape({
  title: PropTypes.string,
  hostName: PropTypes.string,
  picture: PropTypes.string,
  link: PropTypes.string,
  rgb: PropTypes.arrayOf(PropTypes.number),
  id: PropTypes.string,
  frequency: PropTypes.number,
  index: PropTypes.number,
  creatorId: PropTypes.string,
  collectionId: PropTypes.string
});
