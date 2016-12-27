import _ from 'lodash';
import { expect } from 'chai';

import reducer, * as module from './MissionPlanner';

const defaultState = {
  mission: {
    id: '',
    missionName: '',
    plannedHomePosition: null,
    missionItems: [],
    status: 'waiting',
  },
};

const newMissionName = 'another mission name';

const mission = {
  id: 'abc123456789',
  missionName: 'test mission name',
  plannedHomePosition: {
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
  missionItems: [
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
  ],
  status: 'waiting',
};

const newMissionItem = {
  autoContinue: true,
  command: 16,
  coordinate: [
    -6.30525,
    106.9541,
    12,
  ],
  frame: 2,
  param1: 1,
  param2: 2,
  param3: 3,
  param4: 4,
  type: 'missionItem',
};

const newPlannedHomePosition = {
  autoContinue: true,
  command: 21,
  coordinate: [
    -7.204569263907068,
    107.80788040161133,
    0,
  ],
  frame: 0,
  param1: 1,
  param2: 2,
  param3: 3,
  param4: 4,
  type: 'missionItem',
};

const defaultMissionItem = {
  autoContinue: true,
  command: 16,
  coordinate: [
    0,
    0,
    0,
  ],
  frame: 0,
  id: 0,
  param1: 0,
  param2: 0,
  param3: 0,
  param4: 0,
  type: 'missionItem',
};

const newMarkerPosition = {
  lat: -7.204569263907068,
  lng: 107.80788040161133,
};

describe('MissionPlanner', () => {
  describe('reducer', () => {
    it('should return the initial state', () => {
      expect(
        reducer(undefined, {})
      ).to.deep.equal(
        _.cloneDeep(defaultState)
      );
    });

    it('should handle LOADED', () => {
      const action = {
        type: module.LOADED,
        payload: { mission: _.cloneDeep(mission) },
      };

      expect(
        reducer({}, action)
      ).to.deep.equal(
        { mission: _.cloneDeep(mission) }
      );
    });

    it('should handle UPDATED', () => {
      const action = {
        type: module.UPDATED,
        payload: { mission: _.cloneDeep(mission) },
      };

      expect(
        reducer({}, action)
      ).to.deep.equal(
        { mission: _.cloneDeep(mission) }
      );
    });

    it('should handle UPDATE_MISSION_ITEM for missitonItem', () => {
      const initialState = { mission: _.cloneDeep(mission) };
      const action = {
        type: module.UPDATE_MISSION_ITEM,
        payload: { id: 3, missionItem: _.cloneDeep(newMissionItem) },
      };
      const newMission = _.cloneDeep(mission);
      newMission.missionItems.splice(2, 1, _.cloneDeep(newMissionItem));

      const newState = { mission: newMission };

      expect(
        reducer(initialState, action)
      ).to.deep.equal(
        newState
      );
    });

    it('should handle UPDATE_MISSION_ITEM for plannedHomePosition', () => {
      const initialState = { mission: _.cloneDeep(mission) };
      const action = {
        type: module.UPDATE_MISSION_ITEM,
        payload: { id: 0, missionItem: _.cloneDeep(newPlannedHomePosition) },
      };
      const newMission = _.cloneDeep(mission);
      newMission.plannedHomePosition = _.cloneDeep(newPlannedHomePosition);

      const newState = { mission: newMission };

      expect(
        reducer(initialState, action)
      ).to.deep.equal(
        newState
      );
    });

    it('should handle ADD_MISSION_ITEM for an empty mission', () => {
      const initialState = _.cloneDeep(defaultState);
      const action = {
        type: module.ADD_MISSION_ITEM,
        payload: { markerPosition: _.cloneDeep(newMarkerPosition), uids: ['missionitemnew', 'homepointnew'] },
      };
      const newMission = _.cloneDeep(defaultState).mission;
      newMission.plannedHomePosition = {
        ..._.cloneDeep(defaultMissionItem),
        coordinate: [newMarkerPosition.lat, newMarkerPosition.lng, defaultMissionItem.coordinate[2]],
        uid: 'homepointnew',
      };
      newMission.missionItems.push({
        ..._.cloneDeep(defaultMissionItem),
        coordinate: [newMarkerPosition.lat, newMarkerPosition.lng, defaultMissionItem.coordinate[2]],
        id: 1,
        command: 22,
        uid: 'missionitemnew',
      });

      const newState = { mission: newMission };

      expect(
        reducer(initialState, action)
      ).to.deep.equal(
        newState
      );
    });

    it('should handle ADD_MISSION_ITEM for a mission with home point only', () => {
      const initialState = _.cloneDeep(defaultState);
      initialState.mission.plannedHomePosition = newPlannedHomePosition;
      const action = {
        type: module.ADD_MISSION_ITEM,
        payload: { markerPosition: _.cloneDeep(newMarkerPosition), uids: ['missionitemnew'] },
      };
      const newMission = _.cloneDeep(initialState).mission;
      newMission.missionItems.push({
        ..._.cloneDeep(defaultMissionItem),
        coordinate: [newMarkerPosition.lat, newMarkerPosition.lng, defaultMissionItem.coordinate[2]],
        id: 1,
        command: 22,
        uid: 'missionitemnew',
      });

      const newState = { mission: newMission };

      expect(
        reducer(initialState, action)
      ).to.deep.equal(
        newState
      );
    });

    it('should handle ADD_MISSION_ITEM for a mission with several points', () => {
      const initialState = { mission: _.cloneDeep(mission) };
      const action = {
        type: module.ADD_MISSION_ITEM,
        payload: { markerPosition: _.cloneDeep(newMarkerPosition), uids: ['missionitemnew'] },
      };
      const newMission = _.cloneDeep(initialState).mission;
      newMission.missionItems.push({
        ..._.cloneDeep(defaultMissionItem),
        coordinate: [newMarkerPosition.lat, newMarkerPosition.lng, defaultMissionItem.coordinate[2]],
        id: newMission.missionItems.length + 1,
        uid: 'missionitemnew',
      });

      const newState = { mission: newMission };

      expect(
        reducer(initialState, action)
      ).to.deep.equal(
        newState
      );
    });

    it('should handle DELETE_MISSION_ITEM', () => {
      const initialState = { mission: _.cloneDeep(mission) };
      const action = {
        type: module.DELETE_MISSION_ITEM,
        payload: { missionItemId: 3 },
      };
      const newMission = _.cloneDeep(initialState).mission;
      newMission.missionItems.splice(2, 1);
      newMission.missionItems = newMission.missionItems.map((item, index) => ({ ...item, id: index + 1 }));

      const newState = { mission: newMission };

      expect(
        reducer(initialState, action)
      ).to.deep.equal(
        newState
      );
    });

    it('should handle CLEAR_MISSION', () => {
      const initialState = { mission: _.cloneDeep(mission) };
      const action = {
        type: module.CLEAR_MISSION,
        payload: { missionItemId: 3 },
      };
      const newMission = _.cloneDeep(initialState).mission;
      newMission.plannedHomePosition = null;
      newMission.missionItems = [];

      const newState = { mission: newMission };

      expect(
        reducer(initialState, action)
      ).to.deep.equal(
        newState
      );
    });

    it('should handle UPDATE_MISSION_NAME', () => {
      const initialState = { mission: _.cloneDeep(mission) };
      const action = {
        type: module.UPDATE_MISSION_NAME,
        payload: { missionName: newMissionName },
      };
      const newMission = _.cloneDeep(initialState).mission;
      newMission.missionName = newMissionName;

      const newState = { mission: newMission };

      expect(
        reducer(initialState, action)
      ).to.deep.equal(
        newState
      );
    });
  });
});
