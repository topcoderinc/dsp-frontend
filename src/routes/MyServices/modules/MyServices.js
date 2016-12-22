import {handleActions, createAction} from 'redux-actions';
import Reactable from 'reactable';

const unsafe = Reactable.unsafe;

const rowActions =
  `<ul>
    <li>
      <a href="service-details">
      <div class="icon-view-detail icon-row"></div>
      <div class="view-detail">View-Detail</div>
      </a>
    </li>
    <li> <div class="icon-edit-row icon-row"></div>
      <div class="view-detail">Edit</div>
    </li>
    <li>
      <div class="icon-delete-row icon-row"></div>
      <div class="view-detail">Delete</div>
    </li>
  </ul>`;

// ------------------------------------
// Actions
// ------------------------------------
export const itemPerPageAction = createAction('CHANGE_ITEM_SIZE');
export const displayedRowsAction = createAction('DISPLAYED_ROWS');

export const sendRequest = (values) => new Promise((resolve) => {
  alert(JSON.stringify(values, null, 2));
  resolve();
});


export const actions = {
  itemPerPageAction,
  displayedRowsAction,
};

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [itemPerPageAction]: (state, action) => ({
    ...state, items: action.payload,
  }),
  [displayedRowsAction]: (state, action) => ({
    ...state, displaying: action.payload,
  }),
}, {
  // initial data
  items: {value: 10, label: '10'},
  displaying: {start: 1, end: 10, currentPage: 0},
  servicesTableData: [
    {Service: unsafe('<a herf="javascript:;">Service name lorem ipsum</a>'), Pricing: '$ 9.99 / mile', 'Service Description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor', '': unsafe(rowActions),
    },
    {Service: unsafe('<a herf="javascript:;">Service name lorem ipsum</a>'), Pricing: '$ 9.99 / mile', 'Service Description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor', '': unsafe(rowActions),
    },
    {Service: unsafe('<a herf="javascript:;">Service name lorem ipsum</a>'), Pricing: '$ 9.99 / mile', 'Service Description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor', '': unsafe(rowActions),
    },
    {Service: unsafe('<a herf="javascript:;">Service name lorem ipsum</a>'), Pricing: '$ 9.99 / mile', 'Service Description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor', '': unsafe(rowActions),
    },
    {Service: unsafe('<a herf="javascript:;">Service name lorem ipsum</a>'), Pricing: '$ 9.99 / mile', 'Service Description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor', '': unsafe(rowActions),
    },
    {Service: unsafe('<a herf="javascript:;">Service name lorem ipsum</a>'), Pricing: '$ 9.99 / mile', 'Service Description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor', '': unsafe(rowActions),
    },
    {Service: unsafe('<a herf="javascript:;">Service name lorem ipsum</a>'), Pricing: '$ 9.99 / mile', 'Service Description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor', '': unsafe(rowActions),
    },
    {Service: unsafe('<a herf="javascript:;">Service name lorem ipsum</a>'), Pricing: '$ 9.99 / mile', 'Service Description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor', '': unsafe(rowActions),
    },
    {Service: unsafe('<a herf="javascript:;">Service name lorem ipsum</a>'), Pricing: '$ 9.99 / mile', 'Service Description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor', '': unsafe(rowActions),
    },
    {Service: unsafe('<a herf="javascript:;">Service name lorem ipsum</a>'), Pricing: '$ 9.99 / mile', 'Service Description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor', '': unsafe(rowActions),
    },
    {Service: unsafe('<a herf="javascript:;">Service name porem ipsum</a>'), Pricing: '$ 9.99 / mile', 'Service Description': 'Oorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor', '': unsafe(rowActions),
    },
    {Service: unsafe('<a herf="javascript:;">Service name aorem ipsum</a>'), Pricing: '$ 9.99 / mile', 'Service Description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor', '': unsafe(rowActions),
    },
    {Service: unsafe('<a herf="javascript:;">Service name  xorem ipsum</a>'), Pricing: '$ 9.99 / mile', 'Service Description': 'Gorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor', '': unsafe(rowActions),
    },
    {Service: unsafe('<a herf="javascript:;">Service name korem ipsum</a>'), Pricing: '$ 8.99 / mile', 'Service Description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor', '': unsafe(rowActions),
    },
    {Service: unsafe('<a herf="javascript:;">Service name eorem ipsum</a>'), Pricing: '$ 2.99 / mile', 'Service Description': 'Lorem ipsum solor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor', '': unsafe(rowActions),
    },
    {Service: unsafe('<a herf="javascript:;">Service name worem ipsum</a>'), Pricing: '$ 6.99 / mile', 'Service Description': 'Worem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor', '': unsafe(rowActions),
    },
    {Service: unsafe('<a herf="javascript:;">Service name lorem ipsum</a>'), Pricing: '$ 4.99 / mile', 'Service Description': 'Lorem ipsum molor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor', '': unsafe(rowActions),
    },
    {Service: unsafe('<a herf="javascript:;">Service name lorem ipsum</a>'), Pricing: '$ 9.99 / mile', 'Service Description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor', '': unsafe(rowActions),
    },
    {Service: unsafe('<a herf="javascript:;">Service name lorem ipsum</a>'), Pricing: '$ 9.99 / mile', 'Service Description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor', '': unsafe(rowActions),
    },
    {Service: unsafe('<a herf="javascript:;">Service name lorem ipsum</a>'), Pricing: '$ 9.99 / mile', 'Service Description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor', '': unsafe(rowActions),
    },
    {Service: unsafe('<a herf="javascript:;">Service name lorem ipsum</a>'), Pricing: '$ 9.99 / mile', 'Service Description': 'Iorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor', '': unsafe(rowActions),
    },
    {Service: unsafe('<a herf="javascript:;">Service name lorem ipsum</a>'), Pricing: '$ 9.99 / mile', 'Service Description': 'Torem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor', '': unsafe(rowActions),
    },
    {Service: unsafe('<a herf="javascript:;">Service name lorem ipsum</a>'), Pricing: '$ 9.99 / mile', 'Service Description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor', '': unsafe(rowActions),
    },
    {Service: unsafe('<a herf="javascript:;">Service name lorem ipsum</a>'), Pricing: '$ 9.99 / mile', 'Service Description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor', '': unsafe(rowActions),
    },
    {Service: unsafe('<a herf="javascript:;">Service name lorem ipsum</a>'), Pricing: '$ 9.99 / mile', 'Service Description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor', '': unsafe(rowActions),
    },
    {Service: unsafe('<a herf="javascript:;">Service name lorem ipsum</a>'), Pricing: '$ 9.99 / mile', 'Service Description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor', '': unsafe(rowActions),
    },
    {Service: unsafe('<a herf="javascript:;">Service name lorem ipsum</a>'), Pricing: '$ 9.99 / mile', 'Service Description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor', '': unsafe(rowActions),
    },
    {Service: unsafe('<a herf="javascript:;">Service name lorem ipsum</a>'), Pricing: '$ 9.99 / mile', 'Service Description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor', '': unsafe(rowActions),
    },
    {Service: unsafe('<a herf="javascript:;">Service name lorem ipsum</a>'), Pricing: '$ 9.99 / mile', 'Service Description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor', '': unsafe(rowActions),
    },
    {Service: unsafe('<a herf="javascript:;">Service name lorem ipsum</a>'), Pricing: '$ 9.99 / mile', 'Service Description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor', '': unsafe(rowActions),
    },
    {Service: unsafe('<a herf="javascript:;">Service name lorem ipsum</a>'), Pricing: '$ 9.99 / mile', 'Service Description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor', '': unsafe(rowActions),
    },
    {Service: unsafe('<a herf="javascript:;">Service name lorem ipsum</a>'), Pricing: '$ 9.99 / mile', 'Service Description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor', '': unsafe(rowActions),
    },
    {Service: unsafe('<a herf="javascript:;">Service name porem ipsum</a>'), Pricing: '$ 9.99 / mile', 'Service Description': 'Oorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor', '': unsafe(rowActions),
    },
    {Service: unsafe('<a herf="javascript:;">Service name aorem ipsum</a>'), Pricing: '$ 9.99 / mile', 'Service Description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor', '': unsafe(rowActions),
    },
    {Service: unsafe('<a herf="javascript:;">Service name  xorem ipsum</a>'), Pricing: '$ 9.99 / mile', 'Service Description': 'Gorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor', '': unsafe(rowActions),
    },
    {Service: unsafe('<a herf="javascript:;">Service name korem ipsum</a>'), Pricing: '$ 8.99 / mile', 'Service Description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor', '': unsafe(rowActions),
    },
    {Service: unsafe('<a herf="javascript:;">Service name eorem ipsum</a>'), Pricing: '$ 2.99 / mile', 'Service Description': 'Lorem ipsum solor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor', '': unsafe(rowActions),
    },
    {Service: unsafe('<a herf="javascript:;">Service name worem ipsum</a>'), Pricing: '$ 6.99 / mile', 'Service Description': 'Worem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor', '': unsafe(rowActions),
    },
    {Service: unsafe('<a herf="javascript:;">Service name lorem ipsum</a>'), Pricing: '$ 4.99 / mile', 'Service Description': 'Lorem ipsum molor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor', '': unsafe(rowActions),
    },
    {Service: unsafe('<a herf="javascript:;">Service name lorem ipsum</a>'), Pricing: '$ 9.99 / mile', 'Service Description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor', '': unsafe(rowActions),
    },
    {Service: unsafe('<a herf="javascript:;">Service name lorem ipsum</a>'), Pricing: '$ 9.99 / mile', 'Service Description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor', '': unsafe(rowActions),
    },
    {Service: unsafe('<a herf="javascript:;">Service name lorem ipsum</a>'), Pricing: '$ 9.99 / mile', 'Service Description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor', '': unsafe(rowActions),
    },
    {Service: unsafe('<a herf="javascript:;">Service name lorem ipsum</a>'), Pricing: '$ 9.99 / mile', 'Service Description': 'Iorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor', '': unsafe(rowActions),
    },
    {Service: unsafe('<a herf="javascript:;">Service name lorem ipsum</a>'), Pricing: '$ 9.99 / mile', 'Service Description': 'Torem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor', '': unsafe(rowActions),
    },

  ],
});
