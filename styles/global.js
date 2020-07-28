import { StyleSheet, Dimensions } from 'react-native';

const width = Dimensions.get('window').width
const heigth = Dimensions.get('window').height

export const globalStyles = StyleSheet.create({
  body:{
    backgroundColor:'#fff',
    padding: heigth * 0.003,
    height:'100%',
  },
})