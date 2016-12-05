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
  requestItems: [{
    status: 'new',
    requestId: '123ASDD',
    deliveryDate: '18 Oct 2016, 10:00 AM',
    distance: '99.99 miles',
    serviceType: 'Simple Delivery',
    deliveryLocation: 'Street address lorem, City, State 12355',
    payout: 999.99,
    deliveryObject: 'Delivery Object lorem ipsum',
    packageType: 'Package Lorem Ipsum',
    pickUpLocation: 'Street address lorem, City, State 12355',
    dropOffLocation: 'Street address lorem, City, State 12355',
    weight: '50 lbs',
    requestedDeliveryTime: '18 Oct 2016, 10:00 AM',
    customer: {
      name: 'James Smith',
      address: 'Street address lorem, City, State 12355',
      phone: '123 - 564 - 1231',
      email: 'email@email.com',
    },
  }, {
    status: 'new',
    requestId: '123ASDD',
    deliveryDate: '18 Oct 2016, 10:00 AM',
    distance: '99.99 miles',
    serviceType: 'Simple Delivery',
    deliveryLocation: 'Street address lorem, City, State 12355',
    payout: 999.99,
    packageType: 'Package Lorem Ipsum',
    pickUpLocation: 'Street address lorem, City, State 12355',
    dropOffLocation: 'Street address lorem, City, State 12355',
    weight: '50 lbs',
    requestedDeliveryTime: '18 Oct 2016, 10:00 AM',
    customer: {
      name: 'James Smith',
      address: 'Street address lorem, City, State 12355',
      phone: '123 - 564 - 1231',
      email: 'email@email.com',
    },
  }, {
    status: 'new',
    requestId: '123ASDD',
    deliveryDate: '18 Oct 2016, 10:00 AM',
    distance: '99.99 miles',
    serviceType: 'Simple Delivery',
    deliveryLocation: 'Street address lorem, City, State 12355',
    payout: 999.99,
    packageType: 'Package Lorem Ipsum',
    pickUpLocation: 'Street address lorem, City, State 12355',
    dropOffLocation: 'Street address lorem, City, State 12355',
    weight: '50 lbs',
    requestedDeliveryTime: '18 Oct 2016, 10:00 AM',
    customer: {
      name: 'James Smith',
      address: 'Street address lorem, City, State 12355',
      phone: '123 - 564 - 1231',
      email: 'email@email.com',
    },
  }, {
    status: 'new',
    requestId: '123ASDD',
    deliveryDate: '18 Oct 2016, 10:00 AM',
    distance: '99.99 miles',
    serviceType: 'Simple Delivery',
    deliveryLocation: 'Street address lorem, City, State 12355',
    payout: 999.99,
    packageType: 'Package Lorem Ipsum',
    pickUpLocation: 'Street address lorem, City, State 12355',
    dropOffLocation: 'Street address lorem, City, State 12355',
    weight: '50 lbs',
    requestedDeliveryTime: '18 Oct 2016, 10:00 AM',
    customer: {
      name: 'James Smith',
      address: 'Street address lorem, City, State 12355',
      phone: '123 - 564 - 1231',
      email: 'email@email.com',
    },
  }, {
    status: 'scheduled',
    requestId: '123ASDD',
    deliveryDate: '18 Oct 2016, 10:00 AM',
    distance: '99.99 miles',
    serviceType: 'Simple Delivery',
    deliveryLocation: 'Street address lorem, City, State 12355',
    payout: 999.99,
    packageType: 'Package Lorem Ipsum',
    pickUpLocation: 'Street address lorem, City, State 12355',
    dropOffLocation: 'Street address lorem, City, State 12355',
    weight: '50 lbs',
    requestedDeliveryTime: '18 Oct 2016, 10:00 AM',
    customer: {
      name: 'James Smith',
      address: 'Street address lorem, City, State 12355',
      phone: '123 - 564 - 1231',
      email: 'email@email.com',
    },
  }, {
    status: 'scheduled',
    requestId: '123ASDD',
    deliveryDate: '18 Oct 2016, 10:00 AM',
    distance: '99.99 miles',
    serviceType: 'Simple Delivery',
    deliveryLocation: 'Street address lorem, City, State 12355',
    payout: 999.99,
    packageType: 'Package Lorem Ipsum',
    pickUpLocation: 'Street address lorem, City, State 12355',
    dropOffLocation: 'Street address lorem, City, State 12355',
    weight: '50 lbs',
    requestedDeliveryTime: '18 Oct 2016, 10:00 AM',
    customer: {
      name: 'James Smith',
      address: 'Street address lorem, City, State 12355',
      phone: '123 - 564 - 1231',
      email: 'email@email.com',
    },
  }, {
    status: 'in_progress',
    requestId: '123ASDD',
    deliveryDate: '18 Oct 2016, 10:00 AM',
    distance: '99.99 miles',
    serviceType: 'Simple Delivery',
    deliveryLocation: 'Street address lorem, City, State 12355',
    payout: 999.99,
    packageType: 'Package Lorem Ipsum',
    pickUpLocation: 'Street address lorem, City, State 12355',
    dropOffLocation: 'Street address lorem, City, State 12355',
    weight: '50 lbs',
    requestedDeliveryTime: '18 Oct 2016, 10:00 AM',
    customer: {
      name: 'James Smith',
      address: 'Street address lorem, City, State 12355',
      phone: '123 - 564 - 1231',
      email: 'email@email.com',
    },
  }, {
    status: 'in_progress',
    requestId: '123ASDD',
    deliveryDate: '18 Oct 2016, 10:00 AM',
    distance: '99.99 miles',
    serviceType: 'Simple Delivery',
    deliveryLocation: 'Street address lorem, City, State 12355',
    payout: 999.99,
    packageType: 'Package Lorem Ipsum',
    pickUpLocation: 'Street address lorem, City, State 12355',
    dropOffLocation: 'Street address lorem, City, State 12355',
    weight: '50 lbs',
    requestedDeliveryTime: '18 Oct 2016, 10:00 AM',
    customer: {
      name: 'James Smith',
      address: 'Street address lorem, City, State 12355',
      phone: '123 - 564 - 1231',
      email: 'email@email.com',
    },
  }, {
    status: 'completed',
    requestId: '123ASDD',
    deliveryDate: '18 Oct 2016, 10:00 AM',
    distance: '99.99 miles',
    serviceType: 'Simple Delivery',
    deliveryLocation: 'Street address lorem, City, State 12355',
    payout: 999.99,
    packageType: 'Package Lorem Ipsum',
    pickUpLocation: 'Street address lorem, City, State 12355',
    dropOffLocation: 'Street address lorem, City, State 12355',
    weight: '50 lbs',
    requestedDeliveryTime: '18 Oct 2016, 10:00 AM',
    customer: {
      name: 'James Smith',
      address: 'Street address lorem, City, State 12355',
      phone: '123 - 564 - 1231',
      email: 'email@email.com',
    },
  }],
});
