import React, {PropTypes} from 'react';
import CSSModules from 'react-css-modules';
import dateFormat from 'dateformat';
import StatusLabel from 'components/StatusLabel';
import {Link} from 'react-router';
import styles from './MyRequestTable.scss';

export const MyRequestTable = ({requests}) => (
  <table styleName="my-request-table">
    <thead styleName="thead">
      <tr>
        <th styleName="th">Service Request Name</th>
        <th styleName="th">Provider</th>
        <th styleName="th">Time of Launch</th>
        <th styleName="th">Status</th>
      </tr>
    </thead>
    <tbody>
      {requests.map((request) => (
        <tr styleName="tr" key={request.id}>
          <td styleName="td"><Link to={`/status-detail/${request.id}`}>{request.title}</Link></td>
          <td styleName="td">{request.provider}</td>
          <td styleName="td">{dateFormat(request.timeOflaunch, 'mmm, d yyyy - hh:MM TT')}</td>
          <td styleName="td"><StatusLabel value={request.status} /></td>
        </tr>
      ))}
    </tbody>
  </table>
);

const MyRequestPropType = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  provider: PropTypes.string.isRequired,
  timeOflaunch: PropTypes.string.isRequired,
  status: StatusLabel.propTypes.value,
};

MyRequestTable.propTypes = {
  requests: PropTypes.arrayOf(PropTypes.shape(MyRequestPropType)),
};

export default CSSModules(MyRequestTable, styles);
