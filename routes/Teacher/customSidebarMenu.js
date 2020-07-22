//This is an example code for Navigation Drawer with Custom Side bar//
import React,{Component} from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
// import Icon from 'react-native-vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome'
import auth from '@react-native-firebase/auth'
import {Button} from 'react-native-elements'
import AsyncStorage from '@react-native-community/async-storage';


export default class CustomSidebarMenu extends Component {

  state={
    user:'',
    name:''
  }

  componentDidMount(){
    this.getData()
  }

  getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('User_Cred')
      jsonValue != null ? JSON.parse(jsonValue) : null;
      console.log(jsonValue)
      if(jsonValue != null) {
          var employeeId = JSON.parse(jsonValue).employeeId
          var email = JSON.parse(jsonValue).email
          var user = JSON.parse(jsonValue).user
          var name = JSON.parse(jsonValue).name        

          this.setState({
            user: user,
            name: name
          })
      }
    } catch(e) {
        console.log('error: ', e)
    }
  }

  constructor() {
    super();
    //Setting up the Main Top Large Image of the Custom Sidebar
    this.proileImage =
    'https://static.wixstatic.com/media/e32ac7_d39ea08678ab45749acecbd799fde031~mv2.png/v1/fit/w_1000,h_766,al_c,q_80/file.png';
    //Array of the sidebar navigation option with icon and screen to navigate
    //This screens can be any screen defined in Drawer Navigator in App.js
    //You can find the Icons from here https://material.io/tools/icons/
    this.items = [
      {
        navOptionThumb: 'home',
        navOptionName: 'Home',
        screenToNavigate: 'Home',
      },
      {
        navOptionThumb: 'envelope',
        navOptionName: 'Add Notice',
        screenToNavigate: 'AddNotice',
      },
      {
        navOptionThumb: 'user',
        navOptionName: 'My Notices',
        screenToNavigate: 'MyNotice',
      }
    ];
  }
  render() {
    return (
        <View style={styles.sideMenuContainer}>
          {/*Top Large Image */}
          <Image
            source={{ uri: this.proileImage }}
            style={styles.sideMenuProfileIcon}
          />
          <Text style={styles.head}>User : {this.state.user}</Text>
          <Text style={styles.head}>Name : {this.state.name}</Text>
          {/*Divider between Top Image and Sidebar Option*/}
          <View
            style={{
              width: '100%',
              height: 1,
              backgroundColor: '#e2e2e2',
              marginTop: 15,
            }}
          />
          {/*Setting up Navigation Options from option array using loop*/}
          <View style={{ width: '100%' }}>
            {this.items.map((item, key) => (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingTop: 10,
                  paddingBottom: 10,
                  // backgroundColor: global.currentScreenIndex === key ? '#ffffff':'#e0dbdb',
                }}
                key={key}>
                <View style={{ marginRight: 10, marginLeft: 20 }}>
                  <Icon name={item.navOptionThumb} size={25} color="#808080" />
                </View>
                <Text
                  style={{
                    fontSize: 15,
                    // color: global.currentScreenIndex === key ? 'black' : 'red',
                    fontFamily:'Nunito-Bold'
                  }}
                  onPress={() => {
                    global.currentScreenIndex = key;
                    this.props.navigation.navigate(item.screenToNavigate);
                  }}>
                  {item.navOptionName}
                </Text>
              </View>
            ))}
          </View>
          <View>
          <Button
            title='Log Out'
            titleStyle={{fontFamily:'Nunito-Bold'}}
            buttonStyle={{marginTop:20,width:'100%'}}
            icon={
              <Icon
                name="sign-out"
                size={15}
                color="white"
                style={{paddingRight:8}}
              />
            }
            onPress={() => {
                auth()
                .signOut()
                .then(() => {
                  console.log('Logged Out')
                })
            }}
          />
          </View>
        </View>
      );
  }
}
const styles = StyleSheet.create({
//   sideMenuContainer: {
//     width: '100%',
//     height: '100%',
//     backgroundColor: '#424242',
//     alignItems: 'center',
//     paddingTop: 20,
//     fontFamily:'nunito-bold'
//   },
//   sideMenuProfileIcon: {
//     resizeMode: 'center',
//     width: 300,
//     height: 150,
//     marginTop: 20,
//     borderRadius: 150 / 2,
//     opacity:0.8
//   },
//   qtext:{
//       position:"absolute",
//       marginTop:100,
//       fontFamily:'Acme',
//       fontSize:45,
//       color: '#C2F2B0',
//   }
sideMenuContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 20,
  },
  sideMenuProfileIcon: {
    resizeMode: 'center',
    width: 700,
    height: 200,
    marginTop: 10,
    borderRadius: 150 / 2,
    
  },
  head:{
    fontFamily:'Nunito-Bold',
    fontSize:20
  }
});