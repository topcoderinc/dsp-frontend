import React, {PropTypes} from 'react';
import CSSModules from 'react-css-modules';
import styles from './Tabs.scss';

export const Tabs = ({tabList, onSelect, activeTab}) => (
  <ul styleName="tab-list">
    {(tabList || []).map((tab, i) => (
      <li onClick={() => onSelect(i)} styleName={activeTab === i ? 'active-tab' : null} key={i}>{tab.name}</li>
    ))}
  </ul>
);

Tabs.propTypes = {
  tabList: PropTypes.array.isRequired,
  activeTab: PropTypes.number.isRequired,
  onSelect: PropTypes.func,
};

export default CSSModules(Tabs, styles);
