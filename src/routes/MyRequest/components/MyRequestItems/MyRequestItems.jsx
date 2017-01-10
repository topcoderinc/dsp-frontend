import React, {PropTypes} from 'react';
import CSSModules from 'react-css-modules';
import _ from 'lodash';
import styles from './MyRequestItems.scss';
import RequestItem from '../RequestItem';


class MyRequestItems extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      openedItems: [],
    };
  }

  _toggleDetail(i) {
    if (_.includes(this.state.openedItems, i)) {
      this.state.openedItems.splice(this.state.openedItems.indexOf(i), 1);
    } else {
      this.state.openedItems.push(i);
    }
    this.setState({openedItems: this.state.openedItems});
  }

  render() {
    const {requestItems, currentStatus, assignDrone, rejectRequest, getDrones} = this.props;
    return (
      <ul>
        {requestItems.map((requestItem, i) => (
          <RequestItem
            isOpen={_.includes(this.state.openedItems, i)}
            _toggleDetail={this._toggleDetail.bind(this)}
            key={i}
            index={i}
            requestItem={requestItem}
            currentStatus={currentStatus}
            assignDrone={assignDrone}
            rejectRequest={rejectRequest}
            getDrones={getDrones}
          />
        ))}
      </ul>
    );
  }
}

MyRequestItems.propTypes = {
  requestItems: PropTypes.array.isRequired,
  currentStatus: PropTypes.string.isRequired,
  assignDrone: PropTypes.func.isRequired,
  rejectRequest: PropTypes.func.isRequired,
  getDrones: PropTypes.func.isRequired,
};

export default CSSModules(MyRequestItems, styles);
