import React, {PropTypes} from 'react';
import CSSModules from 'react-css-modules';
import Dropdown from 'react-dropdown';
import InputRange from 'react-input-range';
import {Radio, RadioGroup} from 'react-icheck';
import cn from 'classnames';
import Button from 'components/Button';
import styles from './ProvidersFilter.scss';

const options = [
  {value: 1, label: 'Any categories'},
  {value: 2, label: 'Category one'},
  {value: 3, label: 'Category two'},
];

const defaultOption = options[0];


class ProvidersFilter extends React.Component {
  constructor() {
    super();
    this.state = {
      priceValues: {
        min: 350,
        max: 1200,
      },
      locValues: {
        min: 20,
        max: 200,
      },
      isHidden: true,
      selectedHourState: -1,
      selectedWeightState: -1,
    };
  }
  handlePriceValuesChange(component, priceValues) {
    this.setState({
      priceValues,
    });
  }
  handleLocValuesChange(component, locValues) {
    this.setState({
      locValues,
    });
  }
  toggleHidden() {
    this.setState({
      isHidden: !this.state.isHidden,
    });
  }
  selectHourRent(index) {
    this.setState({
      selectedHourState: index,
    });
  }
  selectWeight(index) {
    this.setState({
      selectedWeightState: index,
    });
  }

  render() {
    return (
      <div styleName="providers-filter">
        <div className="filter-options">
          <div styleName="filter-row">
            <label styleName="left-col">Categories</label>
            <div styleName="right-col">
              <div styleName="category-dropdown">
                <Dropdown
                  options={options}
                  value={defaultOption}
                  placeholder=""
                />
              </div>
            </div>
          </div>
          {/* categories row end */}
          <div styleName="filter-row" className={styles.priceRange}>
            <label styleName="left-col">Price</label>
            <div styleName="right-col">
              <div styleName="range-slider">
                <InputRange
                  maxValue={2000}
                  minValue={0}
                  value={this.state.priceValues}
                  labelPrefix="$"
                  step={50}
                  onChange={this.handlePriceValuesChange.bind(this)}
                />
              </div>
            </div>
          </div>
          {/* price row end */}
          <div styleName="filter-row" className={styles.locationRange}>
            <label styleName="left-col">Provider Location</label>
            <div styleName="right-col">
              <div styleName="range-slider">
                <InputRange
                  maxValue={300}
                  minValue={0}
                  value={this.state.locValues}
                  labelSuffix="km"
                  step={2}
                  onChange={this.handleLocValuesChange.bind(this)}
                />
              </div>
            </div>
          </div>
          {/* location row end */}
          <div styleName="filter-row" className={styles.houelyRentRow}>
            <label styleName="left-col" className={styles.houelyRentLabel}>Hourly rent of drones</label>
            <div styleName="right-col">
              <div styleName="pick-value">
                <ul>
                  <li onClick={this.selectHourRent.bind(this, 1)} styleName={cn({active: this.state.selectedHourState === 1})}>1</li>
                  <li onClick={this.selectHourRent.bind(this, 2)} styleName={cn({active: this.state.selectedHourState === 2})}>2</li>
                  <li onClick={this.selectHourRent.bind(this, 3)} styleName={cn({active: this.state.selectedHourState === 3})}>3</li>
                  <li onClick={this.selectHourRent.bind(this, 4)} styleName={cn({active: this.state.selectedHourState === 4})}>4</li>
                  <li onClick={this.selectHourRent.bind(this, 5)} styleName={cn({active: this.state.selectedHourState === 5})}>5</li>
                  <li onClick={this.selectHourRent.bind(this, 6)} styleName={cn({active: this.state.selectedHourState === 6})}>+6</li>
                </ul>
              </div>
            </div>
          </div>
          {/* hourly rent row end */}
          <div styleName="filter-row" className={styles.houelyRentRow}>
            <label styleName="left-col" className={styles.houelyWeightLabel}>Carry weight (miles)</label>
            <div styleName="right-col">
              <div styleName="pick-value">
                <ul>
                  <li onClick={this.selectWeight.bind(this, 1)} styleName={cn({active: this.state.selectedWeightState === 1})}>2</li>
                  <li onClick={this.selectWeight.bind(this, 2)} styleName={cn({active: this.state.selectedWeightState === 2})}>5</li>
                  <li onClick={this.selectWeight.bind(this, 3)} styleName={cn({active: this.state.selectedWeightState === 3})}>10</li>
                  <li onClick={this.selectWeight.bind(this, 4)} styleName={cn({active: this.state.selectedWeightState === 4})}>15</li>
                  <li onClick={this.selectWeight.bind(this, 5)} styleName={cn({active: this.state.selectedWeightState === 5})}>20</li>
                  <li onClick={this.selectWeight.bind(this, 6)} styleName={cn({active: this.state.selectedWeightState === 6})}>25</li>
                </ul>
              </div>
            </div>
          </div>
          {/* carry weight row end */}
          <div styleName="filter-row" className={styles.insuranceRow}>
            <label styleName="left-col" className={styles.insuranceLabel}>Insurence for delevery items?</label>
            <div styleName="right-col">
              <div styleName="radio-options">
                <RadioGroup name="radio" value="1">
                  <Radio
                    value="3"
                    radioClass="iradio_circle-blue"
                    increaseArea="20%"
                    label="<span class='label1'>Required</span>"
                  />
                  <Radio
                    value="4"
                    radioClass="iradio_circle-blue"
                    increaseArea="20%"
                    label="<span class='label1'>Not Required</span>"
                  />
                </RadioGroup>
              </div>
            </div>
          </div>
          {/* carry weight row end */}
          <div styleName="actions">
            <Button color="gray" className={styles.btnMargin} onClick={() => this.props.handleFilterToggle(!this.props.toggleFilterValue)}>Cancel</Button>
            <Button type="submit" color="blue">Filter</Button>
          </div>
        </div>
      </div>
    );
  }
}


ProvidersFilter.propTypes = {
  handleFilterToggle: PropTypes.func.isRequired,
  toggleFilterValue: PropTypes.bool,
};

export default CSSModules(ProvidersFilter, styles);
