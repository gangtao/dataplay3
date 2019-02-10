export default {
  //Route
  queryRouteList: '/routes',

  // User
  queryUserInfo: '/user',
  logoutUser: '/user/logout',
  loginUser: 'POST /user/login',
  queryUser: '/user/:id',
  queryUserList: '/users',
  updateUser: 'Patch /user/:id',
  createUser: 'POST /user',
  removeUser: 'DELETE /user/:id',
  removeUserList: 'POST /users/delete',

  //Dataset
  queryDatasetList: '/datasets',
  queryDataset: '/datasets/:id',

  //Post
  queryPostList: '/posts',

  //Dashboard
  queryDashboard: '/dashboard',
}
