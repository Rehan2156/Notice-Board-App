import React from 'react';
import {createStackNavigator} from 'react-navigation-stack'
import {createAppContainer} from 'react-navigation'
import Notice from '../../screens/notice'
import Header from '../../shared/header'
import StudentHome from '../../screens/Student/home';

const screens = {
    Home:{
        screen:StudentHome,
        navigationOptions:({navigation,theme})=>{
            // title:'MESCOE Notice Board',
            return{
            headerTitle:()=> <Header navigation={navigation} title='MESCOE Notice Board' theme={theme}/>
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
        headerStyle:{backgroundColor:'#84D7F7',height:60}
    }
});

export default createAppContainer(HomeStack);
