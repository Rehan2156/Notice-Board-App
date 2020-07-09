import React from 'react';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer} from 'react-navigation'
import {Dimensions} from 'react-native'
import HomeStack from './homeStack';
import AddNotice from '../screens/addNotice';
import CustomSidebarMenu from './customSidebarMenu';


// drawer navigation options
const RootDrawerNavigator = createDrawerNavigator({

  Home: {
    screen: HomeStack,
  },
  AddNotice:{
    screen: AddNotice,
    
  },
//   About: {
//     screen: AboutStack,
//   },
},
{
  contentComponent: CustomSidebarMenu,
  drawerWidth: Dimensions.get('window').width - 130,
}
);

export default createAppContainer(RootDrawerNavigator)