const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors')

// app.use(express.static(path.join(__dirname, 'dist')));

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.get('/api', cors(corsOptions), function (req, res) {
  const data = [
    {
      path: '/',
      element: 'PrivateRoute',
      children: [
        {
          path: '/',
          element: 'Main',
          children: [
            {
              path: '/',
              element: 'Dashboard',
            },
            {
              path: '/sub-menu-1',
              element: 'SubMenu',
            },
            {
              path: '/sub-menu-2',
              element: 'Blank',
            },
            {
              path: '/sub-menus-1',
              element: 'SubMenu',
            },
            {
              path: '/sub-menus-2',
              element: 'Blank',
            },
            {
              path: '/blank',
              element: 'Blank',
            },
            {
              path: '/profile',
              element: 'Profile',
            },
            {
              path: '*',
              element: 'NotFound',
            },
          ],
        }
      ]
    },
    {
      path: '/login',
      element: 'PublicRoute',
      children: [
        {
          path: '/login',
          element: 'Login',
        },
      ],
    },
    {
      path: '/register',
      element: 'PublicRoute',
      children: [
        {
          path: '/register',
          element: 'Register',
        },
      ],
    },
    {
      path: '/forgot-password',
      element: 'PublicRoute',
      children: [
        {
          path: '/forgot-password',
          element: 'ForgetPassword',
        },
      ],
    },
    {
      path: '/recover-password',
      element: 'PublicRoute',
      children: [
        {
          path: '/recover-password',
          element: 'RecoverPassword',
        },
      ],
    },
  ];
  res.json(data);
});

app.get('/api/menu', cors(corsOptions), function (req, res) {
  const data = [
    {
      menuId: 1,
      name: 'menusidebar.label.dashboard',
      icon: 'fas fa-tachometer-alt nav-icon',
      path: '/',
    },
    {
      menuId: 2,
      name: 'menusidebar.label.blank',
      icon: 'fas fa-wrench nav-icon',
      path: '/blank',
    },
    {
      menuId: 3,
      name: 'menusidebar.label.mainMenu',
      icon: 'far fa-caret-square-down nav-icon',
      children: [
        {
          menuId: 4,
          name: 'menusidebar.label.subMenu',
          icon: 'fas fa-hammer nav-icon',
          path: '/sub-menu-1',
          parent: 'menusidebar.label.mainMenu'
        },
        {
          menuId: 5,
          name: 'menusidebar.label.blank2',
          icon: 'fas fa-cogs nav-icon',
          parent: 'menusidebar.label.mainMenu',
          children: [
            {
              menuId: 6,
              name: 'menusidebar.label.subMenu',
              icon: 'fas fa-hammer nav-icon',
              path: '/sub-sub-menu-1',
              parent: 'menusidebar.label.blank2',
            },
            {
              menuId: 7,
              name: 'menusidebar.label.blank',
              icon: 'fas fa-cogs nav-icon',
              path: '/sub-sub-menu-2',
              parent: 'menusidebar.label.blank2',
            },
          ],
        },
      ],
    },
    {
      menuId: 8,
      name: 'menusidebar.label.subMenu2',
      icon: 'far fa-caret-square-down nav-icon',
      children: [
        {
          menuId: 9,
          name: 'menusidebar.label.subMenu',
          icon: 'fas fa-hammer nav-icon',
          path: '/sub-menus-5',
          parent: 'menusidebar.label.subMenu2'
        },
        {
          menuId: 10,
          name: 'menusidebar.label.blank',
          icon: 'fas fa-cogs nav-icon',
          path: '/sub-menus-6',
          parent: 'menusidebar.label.subMenu2'
        },
        {
          menuId: 11,
          name: 'menusidebar.label.blank',
          icon: 'fas fa-cogs nav-icon',
          path: '/sub-menus-7',
          parent: 'menusidebar.label.subMenu2'
        },
      ],
    },
  ];
  res.json(data);
})

// app.get('/*', function (req, res) {
//   res.sendFile(path.join(__dirname, 'dist', 'index.html'));
// });

app.listen(9002);