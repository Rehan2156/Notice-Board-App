import React,{useCallback} from 'react';
import {View, Text,StyleSheet,SafeAreaView,ScrollView,TouchableOpacity,Linking,Button} from 'react-native'

const Notice = ({navigation}) => {

    const OpenURLButton = ({ url, children }) => {
        const handlePress = useCallback(async () => {
          // Checking if the link is supported for links with custom URL scheme.
          const supported = await Linking.canOpenURL(url);
      
          if (supported) {
            // Opening the link with some app, if the URL scheme is "http" the web link should be opened
            // by some browser in the mobile
            await Linking.openURL(url);
          } else {
            Alert.alert(`Don't know how to open this URL: ${url}`);
          }
        }, [url]);
      
        return <Button title={children} onPress={handlePress} />;
      };
      
      

    return ( 
        <View style={styles.card}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
            <Text style={styles.head}>{navigation.getParam('head')}</Text>
            <Text style={styles.text}>{navigation.getParam('text')}</Text>
        <View style={styles.viewButton}>
        <OpenURLButton url={navigation.getParam('downloadURL')}>View file</OpenURLButton>
        </View>
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
      marginTop:20,
      marginBottom:20
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
    },
    viewButton:{
        padding:50,
        paddingBottom:20,
    }

})
 
export default Notice;