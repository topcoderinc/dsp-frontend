import React, { PropTypes } from 'react';
import uncontrollable from 'uncontrollable';
import CSSModules from 'react-css-modules';
import cn from 'classnames';
import styles from './Accordion.scss';

export const Accordion = ({onToggleExpand, isExpanded, children, title}) => (
  <div styleName={cn('accordion', {expanded: isExpanded})}>
    <div styleName="title" onClick={() => onToggleExpand(!isExpanded)}>
      {title}
    </div>
    {isExpanded && <div styleName="content">{children}</div>}
  </div>
);

Accordion.propTypes = {
  onToggleExpand: PropTypes.func,
  isExpanded: PropTypes.bool,
  children: PropTypes.any,
  title: PropTypes.any,
};

export default uncontrollable(CSSModules(Accordion, styles, {allowMultiple: true}), {
  isExpanded: 'onToggleExpand',
});
