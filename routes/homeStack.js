import React from 'react';
import {createStackNavigator} from 'react-navigation-stack'
import {createAppContainer} from 'react-navigation'
import Home from '../screens/home'
import Notice from '../screens/notice'
import Header from '../shared/header'

const screens = {
    Home:{
        screen:Home,
        navigationOptions:({navigation})=>{
            // title:'MESCOE Notice Board',
            return{
            headerTitle:()=> <Header navigation={navigation} title='MESCOE Notice Board'/>
            }
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
        headerStyle:{backgroundColor:'#eee',height:60}
    }
});

export default createAppContainer(HomeStack);