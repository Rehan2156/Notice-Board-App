import React from 'react';
import {createStackNavigator} from 'react-navigation-stack'
import Header from '../../shared/header'
import RegisterTS from '../../screens/Teacher/RegisterTS';

const screens = {
    Register:{
        screen: RegisterTS,
        navigationOptions:({navigation})=>{
            // title:'MESCOE Notice Board',
            return{
            headerTitle:()=> <Header title='Faculty Login'/>
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