import React, { Component } from 'react'
import { Text, StyleSheet, View, Button } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import auth from '@react-native-firebase/auth'
import database from '@react-native-firebase/database';

export default class RegisterTS extends Component {
    state = { 
        email: '', 
        password: '', 
        employeeId: '',
        name: '',
        errorMessage: null 
    }

    handleSignUp = () => {
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
                    placeholder="Employee Id"
                    autoCapitalize="none"
                    style={styles.textInput}
                    onChangeText={employeeId => this.setState({ employeeId })}
                    value={this.state.employeeId}
                />
                <TextInput
                    placeholder="name"
                    autoCapitalize="none"
                    style={styles.textInput}
                    onChangeText={name => this.setState({ name })}
                    value={this.state.name
                    }
                />
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
    }
  })

