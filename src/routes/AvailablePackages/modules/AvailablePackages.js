import { handleActions } from 'redux-actions';


// ------------------------------------
// Actions
// ------------------------------------


export const sendRequest = (values) => new Promise((resolve) => {
  alert(JSON.stringify(values, null, 2));
  resolve();
});


export const actions = {
};

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({

}, {
  // initial data
  availablePackagesData: [
    {
      packageType: 'Bronze Package', packageIcon: 'icon-bronze',
      description: 'Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis ', delvSpeed: '5 mph',
      costPerMile: '$ 10.00', insuranceClaim: 'No',
      maxWeight: '1 kg', packagePrice: '$50.00', regularPrice: '$75.00',
    },
    {
      packageType: 'Silver Package', packageIcon: 'icon-silver',
      description: 'Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis ', delvSpeed: '5 mph',
      costPerMile: '$ 12.00', insuranceClaim: 'up to $6k',
      maxWeight: '2 kg', packagePrice: '$70.00', regularPrice: '$100.00',
    },
    {
      packageType: 'Gold Package', packageIcon: 'icon-gold',
      description: 'Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis ', delvSpeed: '5 mph',
      costPerMile: '$ 14.00', insuranceClaim: 'up to $7k',
      maxWeight: '3 kg', packagePrice: '$100.00', regularPrice: '$125.00',
    },
  ],


});
