import React, { Component } from 'react'
import { Text, StyleSheet, View,ScrollView, Dimensions, Alert } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import auth from '@react-native-firebase/auth'
import database from '@react-native-firebase/database';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/FontAwesome'
import { GoogleSignin, statusCodes, } from '@react-native-community/google-signin';
import AsyncStorage from '@react-native-community/async-storage';
import SlpashScreen from '../../components/SlpashScreen';

const width = Dimensions.get('screen').width
const heigth = Dimensions.get('screen').height

export default class RegisterScreen extends Component {
    state = { 
        email: '', 
        prn: '',
        classAndYear: '',
        errorMessage: null ,
        loading:false,
        class: '',
        year: '',
        div: '',
        dataClass: [{label: 'Computer', value: 'C'}, {label: 'EnTC', value: 'E'}, {label: 'Mechanical', value: 'M'}],
        dataYear: [{label: 'FE', value: 'FE'},{label: 'SE', value: 'SE'},{label: 'TE', value: 'TE'},{label: 'BE', value: 'BE'}],
        dataDiv: [{label: '1', value: '1'},{label: '2', value: '2'},{label: 'SS', value: 'SS'}],
        isSigninInProgress: false,
        wantTouseEmail: false,
        editable: true,
        validPRN: ['BETATESTER00','BETATESTER01','BETATESTER02','BETATESTER03','BETATESTER04','BETATESTER05','BETATESTER06','BETATESTER07','BETATESTER08','BETATESTER09','BETATESTER10','BETATESTER11','BETATESTER12','BETATESTER13','BETATESTER14','BETATESTER15','BETATESTER16','BETATESTER17','BETATESTER18','BETATESTER19','BETATESTER20','BETATESTER21','BETATESTER22','BETATESTER23','BETATESTER24','BETATESTER25','BETATESTER26','BETATESTER27','BETATESTER28','BETATESTER29','BETATESTER30','BETATESTER31','BETATESTER32','BETATESTER33','BETATESTER34','BETATESTER35','BETATESTER36','BETATESTER37','BETATESTER38','BETATESTER39','BETATESTER40','BETATESTER41','BETATESTER42','BETATESTER43','BETATESTER44','BETATESTER45','BETATESTER46','BETATESTER47','BETATESTER48','BETATESTER49','BETATESTER50','BETATESTER51','BETATESTER52','BETATESTER53','BETATESTER54','BETATESTER55','BETATESTER56','BETATESTER57','BETATESTER58','BETATESTER59','BETATESTER60','BETATESTER61','BETATESTER62','BETATESTER63','BETATESTER64','BETATESTER65','BETATESTER66','BETATESTER67','BETATESTER68','BETATESTER69','BETATESTER70','BETATESTERi1','BETATESTERi2','BETATESTERi3','BETATESTERi4','BETATESTERi5','BETATESTERi6','BETATESTERi7','BETATESTERi8','BETATESTERi9','BETATESTERi10','BETATESTERi11','BETATESTERi12','BETATESTERi13','BETATESTERi14','BETATESTERi15'],
    }

    componentDidMount() {
        GoogleSignin.configure({
            webClientId: "1095803181729-plorjsc7202l5koepequdtv0apag1snb.apps.googleusercontent.com", // client ID of type WEB for your server(needed to verify user ID and offline access)
            offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
            forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
        });

        console.log('data stored')
        this.getData()
    }

    storeData = async ( value ) => {
        try {
            console.log('Store data')
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('User_Cred', jsonValue)
          } catch (e) {
            console.log('error: ', e)
          }
    }

    getData = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem('User_Cred')
          jsonValue != null ? JSON.parse(jsonValue) : null;
          console.log(jsonValue)
          if(jsonValue != null) {
              var prn = JSON.parse(jsonValue).prn
              var Class = JSON.parse(jsonValue).class 
              var year = JSON.parse(jsonValue).year
              var div = JSON.parse(jsonValue).div
              var user = JSON.parse(jsonValue).user

                this.setState({
                    prn: prn,
                    class: Class ? Class : '',
                    year: year ? year : '',
                    div: div ? div : '',
                    user: user,
                    editable: false,
                })
          }
        } catch(e) {
            console.log('error: ', e)
        }
    }

    render() {
      if(this.state.loading) {
        return(<SlpashScreen head="Registering" /> )
      }

        return (
            <ScrollView>
            <View style={styles.container}>
                {this.state.errorMessage &&
                <Text style={{ color: 'red' }}>
                    {this.state.errorMessage}
                </Text>}

                <View style={styles.inputContainer}>
                    <Icon name={'id-card'} size={23} color="#808080" style={styles.inputIcon}/>
                        <TextInput
                            placeholder="PRN Number"
                            autoCapitalize="none"
                            style={styles.textInput}
                            onChangeText={prn => this.setState({ prn })}
                            value={this.state.prn}
                            editable = { this.state.editable}
                        />
                </View>
                
                <View style={styles.dropdown}>
                    <DropDownPicker 
                        placeholder = "Branch"
                        items={this.state.dataClass}
                        defaultIndex={0}
                        defaultValue = { this.state.class }
                        containerStyle={styles.pickerContainer}
                        onChangeItem={item => {
                            console.log(item.label, item.value)
                            this.setState({
                                class: item.value
                            })
                        }}      
                        style={styles.picker}          
                        disabled = { !this.state.editable  }    
                    />
                    <DropDownPicker 
                        placeholder = "Year"
                        items={this.state.dataYear}
                        defaultValue = { this.state.year }
                        defaultIndex={1}
                        containerStyle={styles.pickerContainer}
                        onChangeItem={item => {
                            console.log(item.label, item.value)
                            this.setState({
                                year: item.value
                            })
                        }}     
                        style={styles.picker}           
                        disabled = { !this.state.editable }       
                    />
                    <DropDownPicker 
                        placeholder = "Division"
                        items={this.state.dataDiv}
                        defaultValue = { this.state.div }
                        defaultIndex={2}
                        containerStyle={styles.pickerContainer}
                        onChangeItem={item => {
                            console.log(item.label, item.value)
                            this.setState({
                                div: item.value
                            })
                        }}  
                        style={styles.picker}              
                        disabled = { !this.state.editable }    
                    />
                </View>
            <TouchableOpacity 
                style={ styles.googleBtn }
                onPress={ async () => {
                    if(this.state.prn != '' && this.state.year != '' && this.state.class != '' && this.state.div != ''){
                      if(this.state.validPRN.includes(this.state.prn)) {
                        this.setState({ loading: true, isSigninInProgress: true })
                        try {
                            await GoogleSignin.hasPlayServices();
                            const info = await GoogleSignin.signIn();
                            const googleCredential = auth.GoogleAuthProvider.credential(info.idToken);
                            await auth().signInWithCredential(googleCredential).then(() => {
                                console.log('Sign in with google !')
                                if(this.state.editable != false) {
                                  console.log(auth().currentUser.uid)
                                  console.log(this.state.prn)
                                  console.log(this.state.year)
                                  console.log(this.state.div)
                                  console.log(this.state.class)
                                  console.log(info.user.email)
                                  console.log(info.user.name)
                                  var myValue = {
                                      prn: this.state.prn,
                                      year: this.state.year, 
                                      class: this.state.class,
                                      div: this.state.div,
                                      email: info.user.email,
                                      user: 'Student',
                                      uid: auth().currentUser.uid,                          
                                  }
                                  database().ref('Users/Student/' + auth().currentUser.uid).set({
                                      prn: this.state.prn,
                                      year_div: this.state.year + '' + this.state.class + '' + this.state.div,
                                      email: info.user.email,
                                      user: 'Student'
                                  }).then(() => {
                                    console.log('Data is Uploaded')
                                  })
                                  this.storeData(myValue)
                                }
                        })
                      } catch (error) {
                        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                          console.log('Cancel: ' + error )
                        } else if (error.code === statusCodes.IN_PROGRESS) {
                          console.log('InProgress: ' + error)
                        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                          console.log('Play Services:' + error )
                        } else {
                          console.log('Other:' + error)
                        }
                        this.setState({ loading: false, isSigninInProgress: false })    
                      }     
                      } else {
                        Alert.alert('Invalid testing PRN number. Please ask the admin')
                      }
                    } else {
                      Alert.alert('Please fill all the details')
                    }       
                }}
            >
                <View style={ styles.googlePack }>
                <Icon  name={'google'} size={ heigth * 0.043 } color={'#fff'} style={ styles.googleIcon } />
                <Text style={ styles.googleText } > Sign in with Google </Text>
                </View>
            </TouchableOpacity>
            </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent:'center',
      borderRadius: 10,
      elevation: 3,
      backgroundColor: '#fff',
      shadowOffset: { width: 1, height: 1 },
      shadowColor: '#333',
      shadowOpacity: 0.3,
      shadowRadius: 2,
      marginHorizontal: width * 0.05,
      marginVertical: heigth * 0.15,
      padding: heigth * 0.013,
    },    
    inputContainer: {
      justifyContent: 'center',
      position: 'relative',
      borderColor: 'black',
      borderWidth: 1.2,
      marginVertical: heigth * 0.04,
      borderRadius: 5,
    },
    textInput: {
      width: '90%',
      height: heigth * 0.065,
      fontSize: heigth * 0.025,
      fontFamily: 'Nunito-Bold',
      padding: heigth * 0.01,
      paddingLeft: heigth * 0.06,
      paddingRight: heigth * 0.02,
      textAlignVertical: 'center'
    },
    inputIcon:{
      position: 'absolute',
      paddingLeft: heigth * 0.009,
    },
    pickerContainer: {
      marginVertical: heigth * 0.006,
      height: heigth * 0.065,
    },
    picker: {
      borderColor: '#888',
    },
    googleBtn: {
      width: '100%',
      marginVertical: heigth * 0.04,
      alignSelf: 'center',
      textAlignVertical: 'center',
      // borderColor: '#4285F4',
      // borderWidth: 2,
      // borderRadius: 10,
    },
    googlePack: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        backgroundColor: '#4285F4',
        borderRadius:30,

    },
    googleIcon: {
        padding: heigth * 0.013,
        display: 'flex',
        alignSelf: 'flex-start',
        textAlignVertical: 'center',
        backgroundColor: '#4285F4',
        borderTopLeftRadius: 30,
        borderBottomLeftRadius: 30,
        borderWidth: 1,
        borderColor: '#4285F4',
    },
    googleText:{
        fontSize: heigth * 0.023,
        color: '#fff',
        fontWeight: 'bold',
        textAlignVertical: 'center',
        marginLeft: heigth * 0.03,
    },
  })

