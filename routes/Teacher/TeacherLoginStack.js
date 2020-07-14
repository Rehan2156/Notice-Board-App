import React from 'react';
import {createStackNavigator} from 'react-navigation-stack'
import Header from '../../shared/header'
import LoginTS from '../../screens/Teacher/LoginTS';
import RegisterTS from '../../screens/Teacher/RegisterTS';

const screens = {
    Login:{
        screen: LoginTS,
        navigationOptions:({navigation})=>{
            // title:'MESCOE Notice Board',
            return{
            headerTitle:()=> <Header title='Teacher Login'/>
            }
        }
    },
    Register:{
        screen: RegisterTS,
        navigationOptions:({navigation})=>{
            // title:'MESCOE Notice Board',
            return{
            headerTitle:()=> <Header title='Teacher Register'/>
            }
        }
    }
}

const TeacherLoginStack = createStackNavigator(screens,{
    defaultNavigationOptions:{
        headerTintColor:'#444', 
        headerStyle:{backgroundColor:'#84D7F7',height:60}
    }
});

export default TeacherLoginStack