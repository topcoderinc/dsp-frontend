import { handleActions } from 'redux-actions';


// ------------------------------------
// Actions
// ------------------------------------

export const actions = {
};

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({

}, {
  location: 'Jakarta, Indonesia',
  selectedCategory: 'Category',
  categories: [
    { name: 'Category1' },
    { name: 'Category2' },
  ],
  user: {
    name: 'John Doe',
  },
  notifications: [
    { id: 1 },
    { id: 2 },
  ],
});
