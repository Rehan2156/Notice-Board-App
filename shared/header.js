import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Header({navigation,title }) {

  const openMenu = () => {
    navigation.openDrawer();
  }

  return (
    <View style={styles.header}>
      <Icon name='bars' size={28} onPress={openMenu} style={styles.drawer} />
      <View>
        <Text style={styles.headerText}>{title}</Text>
      </View>
      {/* <MaterialIcons name='person' size={28} onPress={()=>navigation.navigate('Account')} style={styles.person} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height:'100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontFamily: 'Acme-Regular',
    fontSize: 25,
    color: '#333',
    // letterSpacing: 1,
  },
  drawer: {
    position: 'absolute',
    left: 1,
  },
  person:{
    position: 'absolute',
    right: 16,
  }

});