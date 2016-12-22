import React from 'react';
import {shallow} from 'enzyme';
import _ from 'lodash';
import {expect} from 'chai';

import MissionSidebarItem from './MissionSidebarItem';

const missionSidebarItemProps = {
  uid: 'missionitem0',
  autoContinue: true,
  command: 16,
  lat: -6.205251886842353,
  lng: 106.8541431427002,
  alt: 0,
  frame: 3,
  id: 3,
  param1: 0,
  param2: 0,
  param3: 0,
  param4: 0,
  type: 'missionItem',
  onUpdate: _.noop,
  onDelete: _.noop,
};

const setup = () => {
  const props = {...missionSidebarItemProps};

  const enzymeWrapper = shallow(<MissionSidebarItem {...props} />);

  return {
    props,
    enzymeWrapper,
  };
};

describe('MissionSidebarItem', () => {
  it('should have all props defined', () => {
    const {enzymeWrapper} = setup();

    expect(enzymeWrapper.props().uid).to.be.defined;
    expect(enzymeWrapper.props().autoContinue).to.be.defined;
    expect(enzymeWrapper.props().command).to.be.defined;
    expect(enzymeWrapper.props().lat).to.be.defined;
    expect(enzymeWrapper.props().lng).to.be.defined;
    expect(enzymeWrapper.props().alt).to.be.defined;
    expect(enzymeWrapper.props().frame).to.be.defined;
    expect(enzymeWrapper.props().id).to.be.defined;
    expect(enzymeWrapper.props().param1).to.be.defined;
    expect(enzymeWrapper.props().param2).to.be.defined;
    expect(enzymeWrapper.props().param3).to.be.defined;
    expect(enzymeWrapper.props().param4).to.be.defined;
    expect(enzymeWrapper.props().type).to.be.defined;
    expect(enzymeWrapper.props().onUpdate).to.be.defined;
    expect(enzymeWrapper.props().onDelete).to.be.defined;
  });
});
