import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import styles from './FeedbackItem.scss';

const getImage = (name) => `${window.location.origin}/img/avatars/${name}`;

export const FeedbackItem = ({feedback}) => (
  <div styleName="feedback-item">
    <img src={getImage(feedback.avatarImgSrc)} alt="avatar pic" styleName="user-avatar" />
    <div styleName="feedback-head">
      <div styleName="username">
        <h4>{feedback.name}</h4>
        <p styleName="time">{feedback.time}</p>
      </div>
      <div styleName="rating" />
    </div>
    <p styleName="comment">
      {feedback.comment}
    </p>
  </div>
);

FeedbackItem.propTypes = {
  feedback: PropTypes.object.isRequired,
};

export default CSSModules(FeedbackItem, styles);
