import PropTypes from 'prop-types';

export const userShape = PropTypes.shape({
  name: PropTypes.string,
  givenName: PropTypes.string,
  familyName: PropTypes.string,
  picture: PropTypes.string,
  created: PropTypes.string,
  email: PropTypes.string,
  id: PropTypes.string
});
