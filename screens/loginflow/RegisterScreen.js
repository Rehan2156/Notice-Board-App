import React, { Component } from 'react'
import { Text, StyleSheet, View, Button,TouchableHighlight } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import auth from '@react-native-firebase/auth'
import database from '@react-native-firebase/database';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Ionicons'


export default class RegisterScreen extends Component {
    state = { 
        email: '', 
        password: '', 
        prn: '',
        classAndYear: '',
        errorMessage: null ,
        class: '',
        year: '',
        div: '',
        dataClass: [{label: 'Computer', value: 'C'}, {label: 'EnTC', value: 'E'}, {label: 'Mechanical', value: 'M'}],
        dataYear: [{label: 'FE', value: 'FE'},{label: 'SE', value: 'SE'},{label: 'TE', value: 'TE'},{label: 'BE', value: 'BE'}],
        dataDiv: [{label: '1', value: '1'},{label: '2', value: '2'},{label: 'SS', value: 'SS'}]
    }

    handleSignUp = () => {
        console.log('handleSignUp')
        auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(() => {
            console.log('hogaya')
            database()
            .ref('Users/Student/'+auth().currentUser.uid)
            .set({
                prn: this.state.prn,
                email: this.state.email,
                user: 'Student',
                year_div: this.state.year + '' + this.state.class + '' + this.state.div,
            })
        })
        .catch(error => this.setState({ errorMessage: error.message }))
    }

    render() {
        return (
            <View style={styles.container}>
                {this.state.errorMessage &&
                <Text style={{ color: 'red' }}>
                    {this.state.errorMessage}
                </Text>}
                <TextInput
                    placeholder="PRN Number"
                    autoCapitalize="none"
                    style={styles.textInput}
                    onChangeText={prn => this.setState({ prn })}
                    value={this.state.prn}
                />
                <View style={styles.dropdown}>
                    <DropDownPicker 
                        placeholder = "Branch"
                        items={this.state.dataClass}
                        defaultIndex={0}
                        containerStyle={{height: 40}}
                        onChangeItem={item => {
                            console.log(item.label, item.value)
                            this.setState({
                                class: item.value
                            })
                        }}      
                        style={styles.picker}              
                    />
                    <DropDownPicker 
                        placeholder = "Year"
                        items={this.state.dataYear}
                        defaultIndex={1}
                        containerStyle={{height: 40}}
                        onChangeItem={item => {
                            console.log(item.label, item.value)
                            this.setState({
                                year: item.value
                            })
                        }}     
                        style={styles.picker}              
                    />
                    <DropDownPicker 
                        placeholder = "Division"
                        items={this.state.dataDiv}
                        defaultIndex={2}
                        containerStyle={{height: 40}}
                        onChangeItem={item => {
                            console.log(item.label, item.value)
                            this.setState({
                                div: item.value
                            })
                        }}  
                        style={styles.picker}              
                    />
                </View>
                <TextInput
                    placeholder="Email"
                    autoCapitalize="none"
                    style={styles.textInput}
                    onChangeText={email => this.setState({ email })}
                    value={this.state.email}
                />
                <TextInput
                    secureTextEntry
                    placeholder="Password"
                    autoCapitalize="none"
                    style={styles.textInput}
                    onChangeText={password => this.setState({ password })}
                    value={this.state.password}
                />
                <TouchableHighlight style={styles.myBtn} onPress={this.handleSignUp}>
            <Text style={styles.btnText}>Login</Text>
          </TouchableHighlight>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent:'center',
        borderRadius: 6,
        elevation: 3,
        backgroundColor: '#fff',
        shadowOffset: { width: 1, height: 1 },
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 2,
        marginHorizontal: 4,
        marginVertical: 6,
        padding:15,
        marginLeft:30,
        marginRight:30,
        marginTop:'20%',
        marginBottom:'20%',
    },
    textInput: {
      justifyContent:'center',
      width: '90%',
    // height:55,
    borderRadius:5,
    fontSize:16,
    // paddingLeft:45,
    // backgroundColor:'rgba(0,0,0,0.35)',
    // color:'rgba(255,255,255,0.7)',
    // marginHorizontal:25,
    fontFamily:'Nunito-Bold',
    borderColor:'black',
    borderWidth:1,
    padding:10,
    margin:20,
    paddingLeft:45,
    paddingRight:45
    },
    myBtn: {
      // width:WIDTH - 55,
      height:45,
      borderRadius:25,
      backgroundColor:'#84D7F7',
      justifyContent:'center',
      marginTop:20,
      marginHorizontal:25,
    },
    btnText: {
      fontSize: 20,
      textAlign:'center',
      color: '#fff',
      // fontWeight:'bold',
      fontFamily:'Nunito-Bold'
  
    }, 
    navBtn: {
      padding: 14,
      alignItems: 'center',
      marginTop: 20,
    },
    navText: {
      fontSize: 18,
      fontFamily:'Nunito-Bold',
      color: '#84D7F9',
    },
    inputIcon:{
      position:'absolute',
      top:30,
      left:28
    },
    eyeIcon:{
      position:'absolute',
      top:30,
      left:250
    },
  })

