import React, { Component } from 'react'
import { Text, StyleSheet, View, Button,TouchableHighlight,ScrollView,ActivityIndicator } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import auth from '@react-native-firebase/auth'
import database from '@react-native-firebase/database';
import Icon from 'react-native-vector-icons/FontAwesome'


export default class RegisterTS extends Component {
    state = { 
        email: '', 
        password: '', 
        employeeId: '',
        name: '',
        errorMessage: null,
        loading:false 
    }

    handleSignUp = () => {
        this.setState({loading:true})
        console.log('handleSignUp')
        auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(() => {
            console.log('hogaya')
            database()
            .ref('Users/Teachers/'+auth().currentUser.uid)
            .set({
                employeeId: this.state.employeeId,
                email: this.state.email,
                user: 'Teacher',
                name: this.state.name
            })
            this.setState({loading:false})
        })
        .catch(error => this.setState({ errorMessage: error.message, loading:false }))
    }

    render() {
        if(!this.state.loading){
        return (
            <ScrollView>
            <View style={styles.container}>
                {this.state.errorMessage &&
                <Text style={{ color: 'red' }}>
                    {this.state.errorMessage}
                </Text>}
                <View style={styles.inputContainer}>
            <Icon name={'id-card'} size={25} color="#808080" style={styles.inputIcon}/>
                <TextInput
                    placeholder="Employee Id"
                    autoCapitalize="none"
                    style={styles.textInput}
                    onChangeText={employeeId => this.setState({ employeeId })}
                    value={this.state.employeeId}
                />
                </View>
                <View style={styles.inputContainer}>
            <Icon name={'user'} size={25} color="#808080" style={styles.inputIcon}/>
                <TextInput
                    placeholder="name"
                    autoCapitalize="none"
                    style={styles.textInput}
                    onChangeText={name => this.setState({ name })}
                    value={this.state.name
                    }
                />
                </View>
                
                <View style={styles.inputContainer}>
            <Icon name={'envelope'} size={25} color="#808080" style={styles.inputIcon}/>
                <TextInput
                    placeholder="Email"
                    autoCapitalize="none"
                    style={styles.textInput}
                    onChangeText={email => this.setState({ email })}
                    value={this.state.email}
                />
                </View>

                <View style={styles.inputContainer}>
            <Icon name={'lock'} size={25} color="#808080" style={styles.inputIcon}/>
                <TextInput
                    secureTextEntry
                    placeholder="Password"
                    autoCapitalize="none"
                    style={styles.textInput}
                    onChangeText={password => this.setState({ password })}
                    value={this.state.password}
                />
                </View>

                <TouchableHighlight style={styles.myBtn} onPress={this.handleSignUp}>
            <Text style={styles.btnText}>Sign Up</Text>
          </TouchableHighlight>
            </View>
            </ScrollView>
        )
    }else{
        return(
          <View style={styles.loading}>
            <Text> Loading Please Wait ... </Text>
              <ActivityIndicator size = 'large'/>
          </View>
        )
      }
    }
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
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
          marginBottom:'30%'
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
      loading: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
  })

