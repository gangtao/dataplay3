export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [{
      path: '/user',
      redirect: '/user/login'
    }, {
      path: '/user/login',
      component: './User/Login'
    }, {
      path: '/user/register',
      component: './User/Register'
    }, {
      path: '/user/register-result',
      component: './User/RegisterResult'
    }, ],
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    authority: ['admin', 'user'],
    routes: [
      // root
      {
        path: '/',
        redirect: '/dataset/view'
      },
      // dataset
      {
        path: '/dataset',
        icon: 'database',
        name: 'dataset',
        routes: [{
          path: '/dataset/view',
          icon: 'table',
          name: 'viewDataset',
          component: './Dataset/View'
        },{
          path: '/dataset/getDataIn',
          icon: 'download',
          name: 'getDataIn',
          component: './Dataset/GetdataIn'
        }]
      },
      // Analysis
      {
        path: '/visualization',
        icon: 'area-chart',
        name: 'visualization',
        routes: [{
          path: '/visualization/gg',
          icon: 'bar-chart',
          name: 'gg',
          component: './Visualization/GG'
        }]
      }
    ],
  },
];