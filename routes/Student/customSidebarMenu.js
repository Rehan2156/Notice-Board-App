import React,{ useState, useEffect} from 'react';
import { View, StyleSheet, Image, Text, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import auth from '@react-native-firebase/auth'
import {Button} from 'react-native-elements'
import AsyncStorage from '@react-native-community/async-storage';

const width = Dimensions.get('screen').width
const heigth = Dimensions.get('screen').height

export default function customSidebarMenu({ navigation }) {

  const [items, setItems] = useState([
    {
      navOptionThumb: 'home',
      navOptionName: 'Home',
      screenToNavigate: 'Home',
    }
  ])
  const [user, setUser] = useState(null)
  const [classroom, setClassroom] = useState(null)

  useEffect(() => {
    if(user == null && classroom == null) {
      try {
        AsyncStorage.getItem('User_Cred').then( jsonValue => {
          jsonValue != null ? JSON.parse(jsonValue) : null;
          console.log(jsonValue)
          if(jsonValue != null) {
            var Class = JSON.parse(jsonValue).class 
            var year = JSON.parse(jsonValue).year
            var div = JSON.parse(jsonValue).div
            var user = JSON.parse(jsonValue).user
            setUser(user)
            setClassroom(year + '' + Class + '' + div)
          }
        })
      } catch(e) {
          console.log('error: ', e)
      }
    }
  })

  return (
    <View style={styles.sideMenuContainer}>
      {/*Top Large Image */}
      <Image
        source={require('../../assets/img/mes_logo1.png')}
        style={styles.sideMenuProfileIcon}
      />
      <View
        style={{
          width: '100%',
          height: 1,
          backgroundColor: '#d2d2d2',
          marginVertical: heigth * 0.02
        }}
      />
      <Text style={styles.head}>User : {user}</Text>
      <Text style={styles.head}>Class : {classroom}</Text>
      {/*Divider between Top Image and Sidebar Option*/}
      <View
        style={{
          width: '100%',
          height: 1,
          backgroundColor: '#d2d2d2',
          marginVertical: heigth * 0.02
        }}
      />
      {/*Setting up Navigation Options from option array using loop*/}
      <View style={{ width: '100%' }}>
        {items.map((item, key) => (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingTop: heigth * 0.016,
              paddingBottom: heigth * 0.016,
              backgroundColor: global.currentScreenIndex === key ? '#ffffff':'#e0dbdb',
            }}
            key={key}>
            <View style={{ marginHorizontal: width * 0.045}}>
              <Icon name={item.navOptionThumb} size={ heigth * 0.033 } color="#808080" />
            </View>
            <Text
              style={{
                fontSize: heigth * 0.023,
                color: global.currentScreenIndex === key ? 'black' : 'red',
                fontFamily:'Nunito-Bold'
              }}
              onPress={() => {
                global.currentScreenIndex = key;
                navigation.navigate(item.screenToNavigate);
              }}>
              {item.navOptionName}
            </Text>
          </View>
        ))}
      </View>
      <View>
      <Button
        title='Log Out'
        titleStyle={{
          fontFamily:'Nunito-Bold',
          fontSize: heigth * 0.025
        }}
        buttonStyle={{
          marginTop: heigth * 0.02,
          width: width * 0.6,
        }}
        icon={
          <Icon
            name="sign-out"
            size={ heigth * 0.03}
            color="white"
            style={{
              position: 'absolute',
              left: width * 0.02,
            }}
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


const styles = StyleSheet.create({
  sideMenuContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: heigth * 0.05,
  },
  sideMenuProfileIcon: {
    resizeMode: 'center',
    height: heigth * 0.25,
    marginTop: heigth * 0.009,
    
  },
  head:{
    fontFamily:'Nunito-Bold',
    fontSize: heigth * 0.025,
    marginVertical: heigth * 0.003
  }
});