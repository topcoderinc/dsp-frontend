import React, {PropTypes} from 'react';
import CSSModules from 'react-css-modules';
import cn from 'classnames';
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
import Zones from './Zones';

const shouldHaveDetails = (status) => (status === 'in-progress' || status === 'completed');

export const StatusDetailView = ({title, status, fcStreamSrc, bcStreamSrc, showPerformance, zones}) => (
  <div styleName="status-detail-view">
    <Breadcrumb
      items={[
        {text: 'Profile', path: '/'},
        {text: 'My Request Status', path: '/my-request-status'},
        {text: title},
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
              <div styleName={cn({'column-route-small': true, imagery: zones && zones.length > 0})}>
                <StatusDetailMapRoute isSmall />
              </div>
              {
                zones && zones.length > 0 ?
                (<div styleName="column-zones-completed">
                  <h2 styleName="section-title">Zones</h2>
                  <div styleName="zones-wrap-completed">
                    <Zones zones={zones} />
                  </div>
                </div>) : null
              }
            </div>
            {
              showPerformance ?
              (
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
              ) : null
            }
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
            <div styleName={cn({'column-route': true, imagery: zones && zones.length > 0})}>
              <section styleName="section">
                <h2 styleName="section-title">Route</h2>
                <div styleName="route-big-wrap">
                  <StatusDetailMapRoute showMapLegends />
                </div>
              </section>
            </div>
            {
              zones && zones.length > 0 ?
              (<div styleName="column-zones">
                <section styleName="section">
                  <h2 styleName="section-title">Zones</h2>
                  <div styleName="zones-wrap">
                    <Zones zones={zones} />
                  </div>
                </section>
              </div>) : null
            }
            <div styleName="column-cameras">
              <section styleName="section">
                <h2 styleName="section-title">Real Time Camera</h2>
                <StatusDetailCamera title="Front Camera" streamSrc={shouldHaveDetails(status) ? fcStreamSrc : null} />
                <StatusDetailCamera title="Back Camera" streamSrc={shouldHaveDetails(status) ? bcStreamSrc : null} />
              </section>
            </div>
          </div>
          {
            shouldHaveDetails(status) ?
              (<section styleName="section">
                <MissionGallery title="Mission Gallery" />
              </section>) : null
          }
        </div>
      </div>
    )}
  </div>
);

StatusDetailView.propTypes = {
  title: PropTypes.string.isRequired,
  status: StatusLabel.propTypes.value,
  fcStreamSrc: PropTypes.string,
  bcStreamSrc: PropTypes.string,
  showPerformance: PropTypes.bool.isRequired,
  zones: PropTypes.array,
};

export default CSSModules(StatusDetailView, styles, {allowMultiple: true});
