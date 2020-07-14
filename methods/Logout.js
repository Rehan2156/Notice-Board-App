import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import auth from '@react-native-firebase/auth'

export default class Logout extends Component {

    componentDidMount() {
        auth().signOut()
    }

    render() {
        return (
            <View>
            </View>
        )
    }
}
