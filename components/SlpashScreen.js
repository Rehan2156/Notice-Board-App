import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Modal, ActivityIndicator, Image, Dimensions } from 'react-native'

const width = Dimensions.get('window').width
const heigth = Dimensions.get('window').height
 
export default function SlpashScreen({ head = "Starting" }) {
    const [dots, setDots] = useState('')

    useEffect(() => {
        setTimeout(() => {
            if(dots.length <= 7) {
                setDots(dots + '.')
            } else {
                setDots('')
            }
        }, 800)
    })

    return (
        <Modal
            animationType="fade"
            transparent={false}
            visible={true}
            onRequestClose={() => {
                //   Alert.alert("Modal has been closed.");
                }}
            >
                    <View style={styles.containerR}>
                        <Image style ={styles.img} source={require('../assets/img/mes_logo1.png')} />
                        <Text style={{fontFamily:'Nunito-Regular',fontSize:20}}>{ head }</Text>
                        <Text style={{fontFamily:'Nunito-Regular',fontSize:20}}>Please Wait{ dots } </Text>
                    </View>
                </Modal>
    )
}

const styles = StyleSheet.create({
    containerR: {
        flex: 1,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 60,
      },
      img:{
        width: width * 0.43,
        height: heigth * 0.33,
        margin: 20,
      },
})
