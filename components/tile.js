import React from 'react';
import { Text, StyleSheet, View, Alert  } from 'react-native'

const Tile = ({title}) => {
    return ( 
        <View style={styles.list}>
            <Text style={styles.head}>{title}</Text>
        </View>
     );
}

const styles = StyleSheet.create({
    list:{
        textAlign:'left',
        padding:20,
        borderBottomWidth:0.8,
        fontFamily:'Nunito-Bold',
    },
    head:{
        fontFamily:'Nunito-Bold',
        fontSize:20
    }
})
export default Tile;