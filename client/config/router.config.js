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
        redirect: '/dashboard',
      },
      {
        path: '/',
        redirect: '/dashboard',
      },
      // Dashboard
      {
        path: '/dashboard',
        icon: 'dashboard',
        name: 'dashboard',
        component: './Dashboard',
      },
      // dataset
      {
        path: '/dataset',
        icon: 'database',
        name: 'dataset',
        routes: [
          {
            path: '/dataset/dataimport',
            icon: 'download',
            name: 'getDataIn',
            component: './Dataset/DataImport',
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
      // Prediction
      {
        path: '/prediction',
        icon: 'area-chart',
        name: 'prediction',
        routes: [
          {
            path: '/prediction/numerical',
            icon: 'bar-chart',
            name: 'numerical',
            component: './Prediction/Numerical',
          },
          {
            path: '/prediction/categorical',
            icon: 'pie-chart',
            name: 'categorical',
            component: './Prediction/Categorical',
          },
          {
            path: '/prediction/timeserial',
            icon: 'pie-chart',
            name: 'timeserial',
            component: './Prediction/TimeSerial',
          },
        ],
      },
      // Config
      {
        path: '/config',
        icon: 'profile',
        name: 'configuration',
        component: './Configuration',
      },
    ],
  },
];
