import React from 'react';
import { shallow } from 'enzyme';
import _ from 'lodash';
import { expect } from 'chai';

import MissionMap from './MissionMap';

const markers = [
  {
    position: {
      lat: -6.204569263907068,
      lng: 106.80788040161133,
    },
  },
  {
    position: {
      lat: -6.176068968489495,
      lng: 106.85096740722656,
    },
  },
  {
    position: {
      lat: -6.1897219964816745,
      lng: 106.85791969299316,
    },
  },
  {
    position: {
      lat: -6.205251886842353,
      lng: 106.8541431427002,
    },
  },
  {
    position: {
      lat: -6.202180076671433,
      lng: 106.83877944946289,
    },
  },
  {
    position: {
      lat: -6.207726387569505,
      lng: 106.81929588317871,
    },
  },
];

const setup = () => {
  const props = {
    markers,
    onMapClick: _.noop,
  };

  const enzymeWrapper = shallow(<MissionMap {...props} />);

  return {
    props,
    enzymeWrapper,
  };
};

describe('MissionMap', () => {
  it('should have all props defined', () => {
    const { enzymeWrapper } = setup();

    expect(enzymeWrapper.props().markers).to.be.defined;
    expect(enzymeWrapper.props().onMapClick).to.be.defined;
  });
});
