import React from 'react';
import { Text, StyleSheet, View, Alert  } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'


const Tile = ({title,date,time,theme}) => {
    return ( 
        <View style={styles.list}>
            <Icon name={'thumb-tack'} size={25} color="#EE6135" style={{paddingRight:8}}/>
            <Text style={styles.head}>{title}</Text>
            <View style={styles.date}>
            <Text style={styles.data}>{date}</Text>
            <View style={{flex:1,flexDirection:'row'}}>
            <Icon name={'clock-o'} size={15} color="#808080" style={{paddingRight:2,paddingTop:3}}/>
            <Text style={styles.data}>{time}</Text>
            </View>
            </View>
        </View>
     );
}

const styles = StyleSheet.create({
    list:{
        textAlign:'left',
        padding:15,
        borderBottomWidth:2,
        fontFamily:'Nunito-Bold',
        flex:1,
        flexDirection:'row',
        borderBottomColor:'#C1CAD7',
        margin: 4,
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
        color:'#899CA4'
    },
    head:{
        fontFamily:'Nunito-Bold',
        fontSize:20,
        maxWidth:'67%'
    }
})
export default Tile;