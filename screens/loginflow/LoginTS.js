import React, { Component } from 'react'
import { Text, StyleSheet, View, Button } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import auth from '@react-native-firebase/auth'

export default class LoginTS extends Component {
    state = { email: '', password: '', errorMessage: null }

    handleLogin = () => {
        console.log('handleLogin')
        auth()
          .signInWithEmailAndPassword(this.state.email, this.state.password)
          .then(() => {
            console.log('loged in')
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
              style={styles.textInput}
              autoCapitalize="none"
              placeholder="Email"
              onChangeText={email => this.setState({ email })}
              value={this.state.email}
            />
            <TextInput
              secureTextEntry
              style={styles.textInput}
              autoCapitalize="none"
              placeholder="Password"
              onChangeText={password => this.setState({ password })}
              value={this.state.password}
            />
            <Button title="Login" onPress={this.handleLogin} />
            <Button
              title="Don't have an account? Sign Up"
              onPress={() => this.props.navigation.navigate('Register')}
            />
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
