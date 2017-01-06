import React, {PropTypes} from 'react';
import CSSModules from 'react-css-modules';
import styles from './StatusProjectInfo.scss';

export const StatusProjectInfo = ({name, address, contactName, tel}) => (
  <table styleName="status-project-info">
    <tbody>
      <tr>
        <th>Project name:</th>
        <td>{name}</td>
      </tr>
      <tr>
        <th>Address:</th>
        <td>{address}</td>
      </tr>
      <tr>
        <th>Contact name:</th>
        <td>{contactName}</td>
      </tr>
      <tr>
        <th>Telephone:</th>
        <td>{tel}</td>
      </tr>
    </tbody>
  </table>
);

StatusProjectInfo.propTypes = {
  name: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  contactName: PropTypes.string.isRequired,
  tel: PropTypes.string.isRequired,
};

export default CSSModules(StatusProjectInfo, styles);
