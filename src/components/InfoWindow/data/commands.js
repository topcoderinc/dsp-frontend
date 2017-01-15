/* eslint-disable */
/**
 * Copyright (c) 2016 Topcoder Inc, All rights reserved.
 */

/**
 * The MAV supported commands reference
 *
 * @author       TCSCODER
 * @version      1.0.0
 */

const commands = [
    {
        value: 16,
        label: 'MAV_CMD_NAV_WAYPOINT'
    },
    {
        value: 82,
        label: 'MAV_CMD_NAV_SPLINE_WAYPOINT'
    },
    {
        value: 21,
        label: 'MAV_CMD_NAV_LAND'
    },
    {
        value: 22,
        label: 'MAV_CMD_NAV_TAKEOFF'
    },
    {
        value: 177,
        label: 'MAV_CMD_DO_JUMP'
    },
    {
        value: 189,
        label: 'MAV_CMD_DO_LAND_START'
    },
    {
        value: 112,
        label: 'MAV_CMD_CONDITION_DELAY'
    },
    {
        value: 203,
        label: 'Take a Picture'
    }
]

export default commands;
