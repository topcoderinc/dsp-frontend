import React, {PropTypes} from 'react';

/**
 * Fires onClick only when cursor doesn't move
 * Used in react-slick because slick always fires onClick when dragging the slider
 */

class ClickWithoutDrag extends React.Component {
  constructor(props) {
    super(props);
    this.isClick = false;

    this.onMouseUp = (e) => {
      if (this.isClick) {
        this.props.onClick(e);
      }
    };
    this.onMouseMove = () => {
      this.isClick = false;
    };
    this.onMouseDown = () => {
      this.isClick = true;
    };
  }

  render() {
    return (
      <a href="javascript:" onMouseUp={this.onMouseUp} onMouseMove={this.onMouseMove} onMouseDown={this.onMouseDown}>
        {this.props.children}
      </a>
    );
  }
}

ClickWithoutDrag.propTypes = {
  children: PropTypes.any.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ClickWithoutDrag;
