import PropTypes from 'prop-types';

export const userShape = PropTypes.shape({
  name: PropTypes.string,
  picture: PropTypes.string,
  created: PropTypes.string,
  email: PropTypes.string,
  _id: PropTypes.string
});
