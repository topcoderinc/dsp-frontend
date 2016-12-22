import React, {PropTypes} from 'react';
import CSSModules from 'react-css-modules';
import ReactHighcharts from 'react-highcharts';
import SelectDropdown from 'components/SelectDropdown';
import _ from 'lodash';
import styles from './DroneGraphPerformance.scss';

const configReactHighcharts = {
  title: {
    text: '',
  },

  credits: {
    enabled: false,
  },

  chart: {
    type: 'area',
    margin: [58, 64, 0, 64],
    height: 203,
  },

  xAxis: {
    opposite: true,
    type: 'datetime',
    gridLineColor: '#e0e0e0',
    gridLineDashStyle: 'Solid',
    gridLineWidth: 1,
    lineWidth: 0,
    tickWidth: 0,
    labels: {
      style: {
        color: '#939598',
        fontSize: '14px',
      },
    },
    tickInterval: 3600 * 1000,
  },

  yAxis: {
    visible: false,
    max: 13,
  },

  legend: {
    enabled: false,
  },

  plotOptions: {
    series: {
      color: '#ddf2f7',
      fillOpacity: 0.59,
      lineColor: '#12a6d9',
      lineWidth: 4,
      marker: {
        enabled: false,
        states: {
          hover: {
            fillColor: '#ebf7fa',
            lineColor: '#12a6d9',
            lineWidth: 4,
            radius: 6,
          },
        },
      },
    },
  },

  tooltip: {
    xDateFormat: '%H:%M %p',
    headerFormat: '<span style="font-weight: 600">{point.key}</span><br/>',
    pointFormat: '{series.name}: {point.y}',
    backgroundColor: '#1a2226',
    borderWidth: 0,
    shadow: false,
    style: {
      color: '#fff',
      fontSize: '14px',
    },
    padding: 11,
  },

  series: [{}],
};

function getConfig(currentGraphType, graphTypeOptions, dataList) {
  const config = _.cloneDeep(configReactHighcharts);
  const data = dataList[currentGraphType];

  config.series[0].name = _.find(graphTypeOptions, {value: currentGraphType}).label;
  config.series[0].data = data;

  config.tooltip.valueSuffix = currentGraphType === 'altitude' ? ' ft' : ' mph';
  // set the max y-axis 10% more then max value of the data
  config.yAxis.max = Math.ceil(_(data).fromPairs().values().max() * 1.1);

  return config;
}

const graphTypeOptions = [
  {value: 'altitude', label: 'Altitude'},
  {value: 'speed', label: 'Speed'},
];

export const DroneGraphPerformance = ({altitude, speed, currentGraphType, setCurrentGraphType}) => (
  <div styleName="drone-graph-performance">
    <header styleName="header">
      <div>
        <h3 styleName="title">Drone Graph Performance</h3>
        <span styleName="date">11/11/2016 10:00-16:00</span>
      </div>
      <SelectDropdown options={graphTypeOptions} value={currentGraphType} onChange={(value) => setCurrentGraphType(value)} />
    </header>
    <div styleName="content">
      <ReactHighcharts config={getConfig(currentGraphType, graphTypeOptions, {altitude, speed})} />
    </div>
  </div>
);

DroneGraphPerformance.propTypes = {
  altitude: PropTypes.array,
  speed: PropTypes.array,
  currentGraphType: PropTypes.string,
  setCurrentGraphType: PropTypes.func,
};

export default CSSModules(DroneGraphPerformance, styles);
