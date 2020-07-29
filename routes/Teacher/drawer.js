import React from 'react';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer} from 'react-navigation'
import {Dimensions, Button, View} from 'react-native'
import HomeStack from './homeStack';
import CustomSidebarMenu from './customSidebarMenu';
import AddNotice from '../../screens/Teacher/addNotice';
import MyNotice from '../../screens/Teacher/myNotice';
import About from '../../screens/about'


// drawer navigation options
const TeacherRootDrawerNavigator = createDrawerNavigator({

  Home: {
    screen: HomeStack,
  },
  AddNotice:{
    screen: AddNotice,
    
  },
  MyNotice:{
    screen: MyNotice,
  },
  About:{
    screen: About
  }
},
{
  contentComponent: CustomSidebarMenu,
  drawerWidth: Dimensions.get('window').width - 130,
}
);

export default createAppContainer(TeacherRootDrawerNavigator)