import PropTypes from "prop-types";

export const cardPropTypes = PropTypes.shape({
  calories: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  image_large: PropTypes.string.isRequired,
  image_mobile: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  proteins: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  _id: PropTypes.string.isRequired,
});

export const menuSectionPropType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  section: PropTypes.string.isRequired,
  key: PropTypes.string.isRequired,
});


