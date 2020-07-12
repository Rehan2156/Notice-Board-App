import React, { Component } from 'react'
import { Text, StyleSheet, View, Button } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import auth from '@react-native-firebase/auth'
import database from '@react-native-firebase/database';
import DropDownPicker from 'react-native-dropdown-picker';

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
        dataClass: [{label: 'Computer', value: 'C'}, {label: 'EnTc', value: 'E'}, {label: 'Mechanical', value: 'M'}],
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
            .ref('User/Student/'+auth().currentUser.uid)
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
                        placeholder = "Class"
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
                <Button title="Sign Up" onPress={this.handleSignUp} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    textInput: {
      height: 40,
      width: '90%',
      borderColor: 'gray',
      borderWidth: 1,
      marginTop: 8
    },
    picker: {
        alignSelf: 'stretch',
        width: 120,
    },
    dropdown: {
        flexDirection: 'row',
        alignItems: 'stretch',
        margin: 10,
    }
  })

