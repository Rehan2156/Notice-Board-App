import React from 'react';
import { Text, StyleSheet, View, Alert  } from 'react-native'

const Tile = ({title,date,time}) => {
    return ( 
        <View style={styles.list}>
            <Text style={styles.head}>{title}</Text>
            <View style={styles.date}>
            <Text style={styles.data}>{date}</Text>
            <Text style={styles.data}>{time}</Text>
            </View>
        </View>
     );
}

const styles = StyleSheet.create({
    list:{
        textAlign:'left',
        padding:15,
        borderBottomWidth:0.8,
        fontFamily:'Nunito-Bold',
        flex:1,
        flexDirection:'row',
    },
    date:{
        flex:1,
        // flexDirection:'row',
        // alignContent:'flex-end',
        alignItems:'flex-end',
        // justifyContent:'flex-end'   
    },
    data:{
        fontFamily:'Nunito-Regular',
    },
    head:{
        fontFamily:'Nunito-Bold',
        fontSize:20,
        maxWidth:'80%'
    }
})
export default Tile;