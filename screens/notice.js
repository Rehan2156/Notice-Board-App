import React from 'react';
import {View, Text,StyleSheet,SafeAreaView,ScrollView} from 'react-native'

const Notice = ({navigation}) => {
    return ( 
        <View style={styles.card}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
            <Text style={styles.head}>{navigation.getParam('head')}</Text>
            <Text style={styles.text}>{navigation.getParam('text')}</Text>
            </ScrollView>
        </View>
     );
}

const styles = StyleSheet.create({
    card: {
      borderRadius: 6,
      elevation: 3,
      backgroundColor: '#fff',
      shadowOffset: { width: 1, height: 1 },
      shadowColor: '#333',
      shadowOpacity: 0.3,
      shadowRadius: 2,
      marginHorizontal: 4,
      marginVertical: 6,
      padding:15,
      marginLeft:30,
      marginRight:30,
      marginTop:20
    },
    head:{
        textAlign:'left',
        // padding:20,
        // fontSize:25,
        // marginTop:10,
        // marginBottom:10,
        fontFamily:'Nunito-Bold',
        marginHorizontal: 18,
    // marginVertical: 20,
    fontSize:25,
    borderBottomWidth:0.5,
    paddingBottom:30

    },
    text:{
        fontFamily:'Nunito-Regular',
        marginHorizontal: 18,
        paddingTop:30,
        fontSize:20
    }

})
 
export default Notice;