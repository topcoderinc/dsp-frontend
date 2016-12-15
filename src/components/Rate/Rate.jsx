import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import StarRatingComponent from 'react-star-rating-component';
import styles from './Rate.scss';

export const Rate = ({ value, onChange, size }) => (
  <StarRatingComponent
    name="rate"
    starCount={5}
    value={parseInt(value, 10)}
    onStarClick={onChange}
    renderStarIcon={(nextValue, prevValue) => <span className={nextValue <= prevValue ? styles.star_full : styles.star_empty} />}
    editing={!!onChange}
    className={size === 'big' ? styles.rate_big : styles.rate}
  />
);

Rate.propTypes = {
  value: PropTypes.any.isRequired,
  size: PropTypes.oneOf(['big', 'small']),
  onChange: PropTypes.func,
};

Rate.defaultProps = {
  size: 'small',
};

export default CSSModules(Rate, styles);
