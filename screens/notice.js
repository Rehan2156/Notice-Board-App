import React from 'react';
import {View, Text} from 'react-native'

const Notice = ({navigation}) => {
    return ( 
        <View>
            <Text>{navigation.getParam('head')}</Text>
            <Text>{navigation.getParam('text')}</Text>
        </View>
     );
}
 
export default Notice;