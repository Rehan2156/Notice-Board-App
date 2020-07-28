import React from 'react';
import { StyleSheet, Text, View, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const width = Dimensions.get('window').width
const heigth = Dimensions.get('window').height

export default function Header({navigation,title }) {

  const openMenu = () => {
    navigation.openDrawer();
  }

  return (
    <View style={styles.header}>
      {navigation && <Icon name='bars' size={28} onPress={openMenu} style={styles.drawer} />}
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
    fontSize: heigth * 0.034,
    color: '#333',
    letterSpacing: 0.2,
  },
  drawer: {
    position: 'absolute',
    left: 1,
  },
  person:{
    position: 'absolute',
    right: heigth * 0.02,
  }
});