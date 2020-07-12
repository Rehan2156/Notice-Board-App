import React, { Component } from 'react'
import { Text, StyleSheet, View, Button } from 'react-native'

export default class FirstPage extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Button 
                    title = 'Student'
                    onPress = {() => {
                        this.props.navigation.navigate('Student')
                    }}
                />
                <Text></Text>
                <Button
                    title = 'Teacher' 
                    onPress = {() => {
                        this.props.navigation.navigate('Teacher')
                    }}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
    }
})
