import React, {PropTypes} from 'react';
import CSSModules from 'react-css-modules';
import styles from './Tabs.scss';

export const Tabs = ({tabList, activeTab}) => (
  <ul styleName="tab-list">
    {(tabList || []).map((tab, i) => (
      <li onClick={tabList.onClick} styleName={activeTab === i ? 'active-tab' : null} key={i}>{tab.name}</li>
    ))}
  </ul>
);

Tabs.propTypes = {
  tabList: PropTypes.array.isRequired,
  activeTab: PropTypes.number.isRequired,
};

export default CSSModules(Tabs, styles);
