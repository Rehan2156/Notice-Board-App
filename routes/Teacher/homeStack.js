import React from 'react';
import {createStackNavigator} from 'react-navigation-stack'
import {createAppContainer} from 'react-navigation'
import Notice from '../../screens/notice'
import Header from '../../shared/header'
import TeacherHome from '../../screens/Teacher/home';
import AddNotice from '../../screens/Teacher/addNotice';
import MyNotice from '../../screens/Teacher/myNotice';
import About from '../../screens/about'

const screens = {
    Home:{
        screen:TeacherHome,
        navigationOptions:({navigation})=>{
            // title:'MESCOE Notice Board',
            return{
            headerTitle:()=> <Header navigation={navigation} title='MESCOE Notice Board'/>
            }
        }
    },
    AddNotice:{
        screen:AddNotice,
        navigationOptions:{
            title:'Add Notice',
            // headerStyle:{backgroundColor:'#eee'}
        }
    },
    MyNotice:{
        screen:MyNotice,
        navigationOptions:{
            title:'My Notices',
            // headerStyle:{backgroundColor:'#eee'}
        }
    },
    About:{
        screen:About,
        navigationOptions:{
            title:'About the app',
            // headerStyle:{backgroundColor:'#eee'}
        }
    },
    Notice:{
        screen:Notice,
        navigationOptions:{
            title:'Notice',
            // headerStyle:{backgroundColor:'#eee'}
        }
    }
}

const HomeStack = createStackNavigator(screens,{
    defaultNavigationOptions:{
        headerTintColor:'#444', 
        headerTitleStyle:{fontFamily: 'Acme-Regular',fontSize: 25,letterSpacing: 0.2,},
        headerStyle:{backgroundColor:'#84D7F7',height:60}
    }
});

export default createAppContainer(HomeStack);
