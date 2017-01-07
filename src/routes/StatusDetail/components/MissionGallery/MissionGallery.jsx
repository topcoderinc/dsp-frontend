import React, {PropTypes} from 'react';
import CSSModules from 'react-css-modules';
import CloudinaryGallery from 'components/CloudinaryGallery';
import styles from './MissionGallery.scss';

export const MissionGallery = ({title, items, note}) => (
  <div>
    <header styleName="header">
      <h2 styleName="title">{title}</h2>
      {note && <p styleName="note">{note}</p>}
    </header>
    <CloudinaryGallery
      items={items}
      count={4}
      height={300}
      noItemsText="No photos or videos until mission’s completed"
    />
  </div>
);

MissionGallery.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  note: PropTypes.string,
};

export default CSSModules(MissionGallery, styles);
