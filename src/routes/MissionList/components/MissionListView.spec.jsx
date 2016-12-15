import React from 'react';
import { shallow } from 'enzyme';
import _ from 'lodash';
import { expect } from 'chai';

import MissionListView from './MissionListView';

const missions = [];

const setup = () => {
  const props = {
    missions,
    deleteMission: _.noop,
  };

  const enzymeWrapper = shallow(<MissionListView {...props} />);

  return {
    props,
    enzymeWrapper,
  };
};

describe('MissionListView', () => {
  it('should have all props defined', () => {
    const { enzymeWrapper } = setup();

    expect(enzymeWrapper.props().missions).to.be.defined;
    expect(enzymeWrapper.props().deleteMission).to.be.defined;
  });
});
