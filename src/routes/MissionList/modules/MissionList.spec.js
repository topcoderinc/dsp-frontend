import _ from 'lodash';
import {expect} from 'chai';

import reducer, * as module from './MissionList';

const defaultState = {
  missions: [],
};

const missions = [
  {
    id: '1',
    missionName: 'Mission 1',
  },
  {
    id: '2',
    missionName: 'Mission 2',
  },
  {
    id: '3',
    missionName: 'Mission 3',
  },
];

describe('MissionList', () => {
  describe('reducer', () => {
    it('should return the initial state', () => {
      expect(
        reducer(null, {})
      ).to.deep.equal(
        _.cloneDeep(defaultState)
      );
    });

    it('should handle LOADED', () => {
      const action = {
        type: module.LOADED,
        payload: {missions: _.cloneDeep(missions)},
      };

      expect(
        reducer({}, action)
      ).to.deep.equal(
        {missions: _.cloneDeep(missions)}
      );
    });

    it('should handle DELETE_MISSION', () => {
      const initialState = {missions: _.cloneDeep(missions)};
      const action = {
        type: module.DELETE_MISSION,
        payload: {missionId: '2'},
      };
      const newState = _.cloneDeep(initialState);
      newState.missions.splice(1, 1);

      expect(
        reducer(initialState, action)
      ).to.deep.equal(
        newState
      );
    });
  });
});
