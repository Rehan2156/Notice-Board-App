import React from 'react';
import {createStackNavigator} from 'react-navigation-stack'
import {createAppContainer} from 'react-navigation'
import Notice from '../../screens/notice'
import Header from '../../shared/header'
import StudentHome from '../../screens/Student/home';
import About from '../../screens/about';

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
        }
    }
}

const HomeStack = createStackNavigator(screens,{
    defaultNavigationOptions:{
        headerTintColor:'#444', 
        headerTitleStyle:{fontFamily: 'Acme-Regular',fontSize: 25,letterSpacing: 0.2},
        headerStyle:{backgroundColor:'#84D7F7',height:60,}
    }
});

export default createAppContainer(HomeStack);
