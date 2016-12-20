import React, {PropTypes} from 'react';
import CSSModules from 'react-css-modules';
import styles from './BrowseProviderView.scss';
import BrowseProviderHeader from './BrowseProviderHeader';
import ProvidersGrid from './ProvidersGrid';
import ProvidersFilter from './ProvidersFilter';
import ProviderMapContainer from '../containers/ProviderMapContainer';

export const BrowseProviderView = ({providers, handleFilterToggle, toggleFilterValue}) => (
  <div styleName="browse-provider-view">
    <div styleName="row">
      <div styleName="left-col">
        <BrowseProviderHeader handleFilterToggle={handleFilterToggle} toggleFilterValue={toggleFilterValue} />

        {!toggleFilterValue && <ProvidersGrid providers={providers} />}
        {toggleFilterValue && <ProvidersFilter handleFilterToggle={handleFilterToggle} toggleFilterValue={toggleFilterValue} />}

      </div>
      <div styleName="right-col">
        <ProviderMapContainer />
      </div>
    </div>

  </div>
);

BrowseProviderView.propTypes = {
  providers: PropTypes.array.isRequired,
};

export default CSSModules(BrowseProviderView, styles);
