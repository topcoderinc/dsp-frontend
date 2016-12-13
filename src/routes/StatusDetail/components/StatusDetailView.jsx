import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import Breadcrumb from 'components/Breadcrumb';
import StatusLabel from 'components/StatusLabel';
import StatusProjectInfo from '../containers/StatusProjectInfoContainer';
import OverallDronePerformance from '../containers/OverallDronePerformanceContainer';
import DroneGraphPerformance from '../containers/DroneGraphPerformanceContainer';
import StatusDetailMapRoute from '../containers/StatusDetailMapRouteContainer';
import StatusDetailInfo from '../containers/StatusDetailInfoContainer';
import MissionGallery from '../containers/MissionGalleryContainer';
import ModalRatePilot from '../containers/ModalRatePilotContainer';
import StatusDetailHeader from './StatusDetailHeader';
import StatusDetailCamera from './StatusDetailCamera';
import styles from './StatusDetailView.scss';

export const StatusDetailView = ({ title, status, fcStreamSrc, bcStreamSrc }) => (
  <div styleName="status-detail-view">
    <Breadcrumb
      items={[
        { text: 'Profile', path: '/' },
        { text: 'My Request Status', path: '/my-request-status' },
        { text: title },
      ]}
    />
    {status === 'completed' ? (
      <div styleName="wrap">
        <StatusDetailHeader status={status} title={title}>
          <ModalRatePilot />
        </StatusDetailHeader>
        <div styleName="panel">
          <div styleName="sections">
            <div styleName="columns">
              <div styleName="column-project-info">
                <StatusProjectInfo />
              </div>
              <div styleName="column-route-small">
                <StatusDetailMapRoute isSmall />
              </div>
            </div>
            <section styleName="section">
              <h2 styleName="section-title">Deploy Mission Parameters</h2>
              <div styleName="columns">
                <div styleName="column-overall-performance">
                  <OverallDronePerformance />
                </div>
                <div styleName="column-graph-performance">
                  <DroneGraphPerformance />
                </div>
              </div>
            </section>
          </div>
          <section styleName="section">
            <MissionGallery title="Mission results" />
          </section>
        </div>
      </div>
    ) : (
      <div styleName="wrap">
        <StatusDetailHeader status={status} title={title} />
        <div styleName="panel">
          <StatusDetailInfo />
        </div>
        <div styleName="panel">
          <div styleName="columns">
            <div styleName="column-route">
              <section styleName="section">
                <h2 styleName="section-title">Route</h2>
                <div styleName="route-big-wrap">
                  <StatusDetailMapRoute distance={''} showMapLegends />
                </div>
              </section>
            </div>
            <div styleName="column-cameras">
              <section styleName="section">
                <h2 styleName="section-title">Real Time Camera</h2>
                <StatusDetailCamera title="Front Camera" streamSrc={fcStreamSrc} />
                <StatusDetailCamera title="Back Camera" streamSrc={bcStreamSrc} />
              </section>
            </div>
          </div>
          <section styleName="section">
            <MissionGallery title="Mission Gallery" />
          </section>
        </div>
      </div>
    )}
  </div>
);

StatusDetailView.propTypes = {
  title: PropTypes.string.isRequired,
  status: StatusLabel.propTypes.value,
  fcStreamSrc: PropTypes.string.isRequired,
  bcStreamSrc: PropTypes.string.isRequired,
};

export default CSSModules(StatusDetailView, styles);
