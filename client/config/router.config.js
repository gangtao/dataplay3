export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      {
        path: '/user',
        redirect: '/user/login',
      },
      {
        path: '/user/login',
        component: './User/Login',
      },
      {
        path: '/user/register',
        component: './User/Register',
      },
      {
        path: '/user/register-result',
        component: './User/RegisterResult',
      },
    ],
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
        path: '/ui',
        redirect: '/dataset/getDataIn',
      },
      {
        path: '/',
        redirect: '/dataset/getDataIn',
      },
      // dataset
      {
        path: '/dataset',
        icon: 'database',
        name: 'dataset',
        routes: [
          {
            path: '/dataset/getDataIn',
            icon: 'download',
            name: 'getDataIn',
            component: './Dataset/GetdataIn',
          },
          {
            path: '/dataset/view',
            icon: 'table',
            name: 'viewDataset',
            component: './Dataset/View',
          },
          {
            path: '/dataset/query',
            icon: 'search',
            name: 'queryDataset',
            component: './Dataset/Query',
          },
        ],
      },
      // Analysis
      {
        path: '/visualization',
        icon: 'area-chart',
        name: 'visualization',
        routes: [
          {
            path: '/visualization/gg',
            icon: 'bar-chart',
            name: 'gg',
            component: './Visualization/GG',
          },
          {
            path: '/visualization/td',
            icon: 'pie-chart',
            name: 'typeDriven',
            component: './Visualization/TD',
          },
        ],
      },
    ],
  },
];
