import React from 'react';
import {createStackNavigator} from 'react-navigation-stack'
import Header from '../shared/header'
import FirstPage from '../screens/FirstPage';
import StudentLoginStack from './StudentLoginStack';
import TeacherLoginStack from './TeacherLoginStack'

const screens = {
    FirstPage:{
        screen: FirstPage,
        navigationOptions:({navigation})=>{
            // title:'MESCOE Notice Board',
            return{
            headerTitle:()=> <Header title='MESCOE Notice Board'/>
            }
        }
    },
    Student:{
        screen: StudentLoginStack,
    },
    Teacher:{
        screen: TeacherLoginStack,
    }
}

const LoginStack = createStackNavigator(screens,{
    defaultNavigationOptions:{
        // headerTintColor:'#444', 
        // headerStyle:{backgroundColor:'#84D7F7',height:60}
        headerShown:false
    }
});

export default LoginStack