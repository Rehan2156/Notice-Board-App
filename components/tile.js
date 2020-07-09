import React from 'react';
import { Text, StyleSheet, View, Alert  } from 'react-native'

const Tile = ({title}) => {
    return ( 
        <View style={styles.list}>
            <Text>{title}</Text>
        </View>
     );
}

const styles = StyleSheet.create({
    list:{
        textAlign:'left',
        padding:20,
        borderBottomWidth:1,
    }
})
export default Tile;