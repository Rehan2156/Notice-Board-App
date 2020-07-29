import React from 'react';
import { Text, StyleSheet, View, Alert, Dimensions  } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

const width = Dimensions.get('screen').width
const heigth = Dimensions.get('screen').height

const Tile = ({title,date,time,theme}) => {
    return ( 
        <View style={styles.list}>
            <Icon name={'thumb-tack'} size={ heigth * 0.035} color="#EE6135" style={{ position: 'absolute', alignSelf: 'center', marginHorizontal: width * 0.02 }}/>
            <Text style={styles.head}>{title}</Text>
            <View style={styles.date}>
            <Text style={styles.data}>{date}</Text>
            <View style={{flex:1, flexDirection:'row'}}>
            <Icon name={'clock-o'} size={ heigth * 0.024 } color="#808080" style={{paddingRight:2, paddingTop:3}}/>
            <Text style={styles.data}>{time}</Text>
            </View>
            </View>
        </View>
     );
}

const styles = StyleSheet.create({
    list:{
        textAlign:'left',
        padding: heigth * 0.024,
        borderBottomWidth: 2,
        fontFamily:'Nunito-Bold',
        flex: 1,
        flexDirection:'row',
        borderBottomColor:'#C1CAD7',
        margin: heigth * 0.004,
        position: 'relative',
    },
    date:{
        flex:1,
        alignItems:'flex-end',
    },
    data:{
        fontFamily:'Nunito-Regular',
        color:'#899CA4'
    },
    head:{
        fontFamily:'Nunito-Bold',
        fontSize: heigth * 0.024,
        marginHorizontal: width * 0.04,
        maxWidth:'67%',
        textAlignVertical: 'center'
    }
})
export default Tile;