import React from 'react';
import { shallow } from 'enzyme';
import _ from 'lodash';
import { expect } from 'chai';

import MissionSidebar from './MissionSidebar';

const missionItemsExt = [
  {
    uid: 'missionitem0',
    autoContinue: true,
    command: 21,
    coordinate: [
      -6.204569263907068,
      106.80788040161133,
      0,
    ],
    frame: 0,
    id: 0,
    param1: 0,
    param2: 0,
    param3: 0,
    param4: 0,
    type: 'missionItem',
  },
  {
    uid: 'missionitem1',
    autoContinue: true,
    command: 22,
    coordinate: [
      -6.176068968489495,
      106.85096740722656,
      0,
    ],
    frame: 3,
    id: 1,
    param1: 0,
    param2: 0,
    param3: 0,
    param4: 0,
    type: 'missionItem',
  },
  {
    uid: 'missionitem2',
    autoContinue: true,
    command: 16,
    coordinate: [
      -6.1897219964816745,
      106.85791969299316,
      0,
    ],
    frame: 3,
    id: 2,
    param1: 0,
    param2: 0,
    param3: 0,
    param4: 0,
    type: 'missionItem',
  },
  {
    uid: 'missionitem3',
    autoContinue: true,
    command: 16,
    coordinate: [
      -6.205251886842353,
      106.8541431427002,
      0,
    ],
    frame: 3,
    id: 3,
    param1: 0,
    param2: 0,
    param3: 0,
    param4: 0,
    type: 'missionItem',
  },
  {
    uid: 'missionitem4',
    autoContinue: true,
    command: 16,
    coordinate: [
      -6.202180076671433,
      106.83877944946289,
      0,
    ],
    frame: 3,
    id: 4,
    param1: 0,
    param2: 0,
    param3: 0,
    param4: 0,
    type: 'missionItem',
  },
  {
    uid: 'missionitem5',
    autoContinue: true,
    command: 16,
    coordinate: [
      -6.207726387569505,
      106.81929588317871,
      0,
    ],
    frame: 3,
    id: 5,
    param1: 0,
    param2: 0,
    param3: 0,
    param4: 0,
    type: 'missionItem',
  },
];

const MissionSidebarProps = {
  missionItems: missionItemsExt,
  onUpdate: _.noop,
  onDelete: _.noop,
};

const setup = () => {
  const props = {...MissionSidebarProps};

  const enzymeWrapper = shallow(<MissionSidebar {...props} />);

  return {
    props,
    enzymeWrapper,
  };
};

describe('MissionSidebar', () => {
  it('should have all props defined', () => {
    const { enzymeWrapper } = setup();

    expect(enzymeWrapper.props().missionItems).to.be.defined;
    expect(enzymeWrapper.props().onUpdate).to.be.defined;
    expect(enzymeWrapper.props().onDelete).to.be.defined;
  });
});
