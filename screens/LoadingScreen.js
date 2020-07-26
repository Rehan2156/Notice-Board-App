import React, { useState } from 'react'
import { Text, StyleSheet, View, ActivityIndicator } from 'react-native'
import auth from '@react-native-firebase/auth'

export default function LoadingScreen({navigation}) {

    useState(() => {
        auth().onAuthStateChanged(user => {
            navigation.navigate(user ? 'Navigator' : 'LoginStack')
        })
    })

    return (
        <View style={styles.container}>
            <Text> Loading.... </Text>
            <Text> </Text>
            <ActivityIndicator size='large' />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
    }
})
