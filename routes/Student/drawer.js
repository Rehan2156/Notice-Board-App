import React from 'react';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer} from 'react-navigation'
import {Dimensions, Button, View} from 'react-native'
import HomeStack from './homeStack';
import StudentCustomSidebarMenu from './customSidebarMenu';
import About from '../../screens/about';


// drawer navigation options
const StudentRootDrawerNavigator = createDrawerNavigator({
  Home: {
    screen: HomeStack,
  },
  About:{
    screen: About
  }
},
{
  contentComponent: StudentCustomSidebarMenu,
  drawerWidth: Dimensions.get('window').width - 130,
}
);

export default createAppContainer(StudentRootDrawerNavigator)