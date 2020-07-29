import React,{useState, useEffect} from 'react';
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
  ])
  const [user, setUser] = useState(null)
  const [name, setName] = useState(null)

  useEffect(() => {
    if(name == null && user == null) {
      try {
        AsyncStorage.getItem('User_Cred').then( jsonValue => {
          jsonValue != null ? JSON.parse(jsonValue) : null;
          console.log(jsonValue)
          if(jsonValue != null) {
              var user = JSON.parse(jsonValue).user
              var name = JSON.parse(jsonValue).name        
              setUser(user)
              setName(name)
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
      {/*Divider between Top Image and Sidebar Option*/}
      <View
        style={{
          width: '100%',
          height: 1,
          backgroundColor: '#d2d2d2',
          marginVertical: heigth * 0.02
        }}
      />
      <Text style={styles.head}>User : {user}</Text>
      <Text style={styles.head}>Name : {name}</Text>
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
            }}
            key={key}>
            <View style={{ marginHorizontal: width * 0.045}}>
              <Icon name={item.navOptionThumb} size={heigth * 0.033} color="#808080" />
            </View>
            <Text
              style={{
                fontSize: heigth * 0.023,
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