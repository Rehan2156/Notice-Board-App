import React, { useState } from 'react'
import auth from '@react-native-firebase/auth'
import SlpashScreen from '../components/SlpashScreen'

export default function LoadingScreen({navigation}) {
    useState(() => {
        setTimeout(() => {
            auth().onAuthStateChanged(user => {
                navigation.navigate(user ? 'Navigator' : 'LoginStack')
            })
        },1000)
    })
    
    return ( <SlpashScreen head="Loading" /> )
}
