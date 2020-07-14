import React from 'react';
import {createStackNavigator} from 'react-navigation-stack'
import Header from '../../shared/header'
import LoginScreen from '../../screens/Student/LoginScreen';
import RegisterScreen from '../../screens/Student/RegisterScreen';

const screens = {
    Login:{
        screen: LoginScreen,
        navigationOptions:({navigation})=>{
            // title:'MESCOE Notice Board',
            return{
            headerTitle:()=> <Header title='Student Login'/>
            }
        }
    },
    Register:{
        screen: RegisterScreen,
        navigationOptions:({navigation})=>{
            // title:'MESCOE Notice Board',
            return{
            headerTitle:()=> <Header title='Student Register'/>
            }
        }
    }
}

const StudentLoginStack = createStackNavigator(screens,{
    defaultNavigationOptions:{
        headerTintColor:'#444', 
        headerStyle:{backgroundColor:'#84D7F7',height:60}
    }
});

export default StudentLoginStack