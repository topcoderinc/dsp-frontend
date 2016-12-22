import {handleActions} from 'redux-actions';


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
  categories: [
    {categoryImgSrc: 'delivery-category-pic.png', categoryName: 'Delivery', iconName: 'icon-delivery-category'},
    {categoryImgSrc: 'mapping-category-pic.png', categoryName: 'Mapping', iconName: 'icon-mapping-category'},
    {categoryImgSrc: 'monitoring-category-pic.png', categoryName: 'Monitoring', iconName: 'icon-monitoring-category'},
    {categoryImgSrc: 'photography-category-pic.png', categoryName: 'Photography', iconName: 'icon-photography-category'},
    {categoryImgSrc: 'filming-category-pic.png', categoryName: 'Filming', iconName: 'icon-filming-category'},
    {categoryImgSrc: 'construction-category-pic.png', categoryName: 'Construction', iconName: 'icon-construction-category'},
    {categoryImgSrc: 'delivery-category-pic.png', categoryName: 'Delivery', iconName: 'icon-delivery-category'},
    {categoryImgSrc: 'mapping-category-pic.png', categoryName: 'Mapping', iconName: 'icon-mapping-category'},
    {categoryImgSrc: 'monitoring-category-pic.png', categoryName: 'Monitoring', iconName: 'icon-monitoring-category'},
    {categoryImgSrc: 'photography-category-pic.png', categoryName: 'Photography', iconName: 'icon-photography-category'},
  ],

  feedbacks: [
    {
      avatarImgSrc: 'avatar-1.png',
      name: 'Selina Gomez',
      time: '5 minutes ago',
      comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinartempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc eget odio. Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
    },
    {
      avatarImgSrc: 'avatar-2.png',
      name: 'Chris Evan',
      time: '5 minutes ago',
      comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinartempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc eget odio. Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
    },
    {
      avatarImgSrc: 'avatar-3.png',
      name: 'Chris Brown',
      time: '5 minutes ago',
      comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinartempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc eget odio. Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
    },
    {
      avatarImgSrc: 'avatar-4.png',
      name: 'Taylor Swift',
      time: '5 minutes ago',
      comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinartempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc eget odio. Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
    },
    {
      avatarImgSrc: 'avatar-5.png',
      name: 'elly Chen',
      time: '5 minutes ago',
      comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinartempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc eget odio. Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
    },
  ],

});
