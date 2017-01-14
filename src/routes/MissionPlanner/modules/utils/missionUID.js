import _ from 'lodash';

export const getUID = () => _.uniqueId('missionitem');

/*
  As missionItems and plannedHomePosition don't have their own native uniqe identifiers inside a mission
  we will add custom unique ids to use them later as "key" property to prevent rerendering
 */
export const poluteMissionWithUID = (mission) => {
  const polutedMission = _.cloneDeep(mission);

  if (polutedMission.plannedHomePosition) {
    polutedMission.plannedHomePosition.uid = getUID();
  }

  if (polutedMission.missionItems) {
    polutedMission.missionItems = polutedMission.missionItems.map((single) => {
      single.uid = getUID();
      return single;
    });
  }

  return polutedMission;
};

/*
  When we update mission, we send a mission to the server and get it back from the server
  we load mission which we got from the server to be in sync
  but to prevent redrawing we copy uids
 */
export const cloneMissionUID = (sourceMission, targetMission) => {
  const polutedMission = _.cloneDeep(targetMission);

  if (polutedMission.plannedHomePosition && sourceMission.plannedHomePosition) {
    polutedMission.plannedHomePosition.uid = sourceMission.plannedHomePosition.uid;
  }

  // simple check to ensure that at least missionItems quantity hasn't been changed on the server
  if (polutedMission.missionItems.length === sourceMission.missionItems.length) {
    for (let i = 0; i < polutedMission.missionItems.length; i++) {
      polutedMission.missionItems[i].uid = sourceMission.missionItems[i].uid;
    }
  }

  return polutedMission;
};

/*
  Clear mission from UIDs before sending to the server
 */
export const clearMissionUID = (mission) => {
  const clearedMission = _.cloneDeep(mission);

  if (clearedMission.plannedHomePosition) {
    delete clearedMission.plannedHomePosition.uid;
  }

  for (const missionItem of clearedMission.missionItems) {
    delete missionItem.uid;
  }

  return clearedMission;
};
