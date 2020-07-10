import React,{useState} from 'react';
import { Text, StyleSheet,SafeAreaView, View, Alert,Dimensions,TextInput,TouchableOpacity,ScrollView  } from 'react-native'
import { CheckBox,Button } from 'react-native-elements'
import {globalStyles} from '../styles/global'
import database from '@react-native-firebase/database';

const {width:WIDTH}=Dimensions.get('window')

const AddNotice = ({navigation}) => {
    const [head,setHead]=useState("")
    const [notice,setNotice]=useState("")
    const [std,setStd]=useState(false)
    const [fec1,setfec1]=useState(false)
    const [fec2,setfec2]=useState(false)

    async function uploadTheDetails () {
        console.log('hello')
        if(head !== "" && notice !== "") {

            database()
            .ref('/notice/'+Date.now())
            .set({
                head: head,
                text: notice,
            })
            .then(() => {                
                Alert.alert('Information','User Data is Uploaded')
                navigation.navigate('Home')
            });
        } else {
            Alert.alert("Fill Every Info please")
        }        
    }


    return ( 
        <View style={globalStyles.body}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
            {/* <View style={styles.box}> */}
                {/* <Text style={styles.Header}>Shopkeeper Details </Text> */}
                <TextInput 
                    style={styles.headInput}
                    onChangeText = {val => setHead(val)}
                    selectedValue = {head}
                    placeholder={'Heading'}
                   placeholderTextColor={'rgba(255,255,255,0.7)'}
                   underlineColorAndroid='transparent'
                />

                <TextInput 
                    style={styles.textInput}
                    onChangeText = {val => setNotice(val)}
                    selectedValue = {notice}
                    placeholder={'Type the notice'}
                   placeholderTextColor={'rgba(255,255,255,0.7)'}
                   underlineColorAndroid='transparent'
                   multiline={true}
                />

                <Text style={styles.label}>Select class to send the notice </Text>
                {/* <Picker
                    prompt = "Select the shop Category"
                    selectedValue={this.state.category}
                    onValueChange={(itemValue, itemIndex) => setStd(itemValue)}
                >
                    <Picker.Item label="FE COMP 1" value="FE COMP 1" />
                    <Picker.Item label="FE COMP 2" value="FE COMP 2" />
                    <Picker.Item label="FE COMP SS" value="FE COMP SS" />
                    <Picker.Item label="Liquor" value="Liquor" />
                </Picker> */}
                <View style={styles.checkboxContainer}>
                <CheckBox
                center
                title='FE'
                checked={std}
                onPress={()=>{setStd(!std); if(std==true){setfec1(false); setfec2(false)} else{setfec1(true); setfec2(true)}}}
                />
                </View>

                <View style={styles.checkboxContainer}>
                <CheckBox
                
                title='FE comp 1'
                checked={fec1}
                onPress={()=>setfec1(!fec1)}
                />
                <CheckBox
                
                title='FE comp 2'
                checked={fec2}
                onPress={()=>setfec2(!fec2)}
                />
                
                
                </View>
                

                {/* <TouchableOpacity 
                    style={styles.myBtnB}
                    onPress={uploadTheDetails}
                >
                    <Text style={{margin:5,fontFamily:'nunito-bold'}}> Next </Text>
                </TouchableOpacity> */}
                <Button
                    title="Send Notice"
                    type="solid"
                    raised
                    onPress={()=>uploadTheDetails()}
                />
            {/* </View> */}
            </ScrollView>
            </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      padding: 10,
      paddingTop: 80,
      paddingLeft: 15,
    },
    checkbox: {
        alignSelf: "center",
      },
      checkboxContainer: {
        flexDirection: "row",
        marginBottom: 20,
      },
    label: {
        fontSize: 15,
        color: 'black',
        margin: 5,
        padding: 10,
        fontFamily:'Nunito-Bold',
    },
    headInput: {
        alignSelf:'center',
        width: WIDTH - 90,
        height:55,
        borderRadius:5,
        fontSize:16,
        paddingLeft:20,
        backgroundColor:'rgba(0,0,0,0.35)',
        color:'rgba(255,255,255,0.7)',
        marginHorizontal:25,
        fontFamily:'Nunito-Bold',
        margin:20,
      },
      textInput:{
        alignSelf:'center',
        width: WIDTH - 90,
        height:100,
        borderRadius:5,
        fontSize:16,
        paddingLeft:20,
        paddingRight:20,
        backgroundColor:'rgba(0,0,0,0.35)',
        color:'rgba(255,255,255,0.7)',
        marginHorizontal:25,
        fontFamily:'Nunito-Bold',
        margin:20,
      },

    myBtnA: {
        padding: 10,
        margin: 7,
        borderRadius: 17,
        borderWidth: 2,
        borderColor: '#aaa',
        alignItems: 'center',
    },

    myBtnB: {
        padding: 10,
        margin: 7,
        borderRadius: 17,
        borderWidth: 2,
        borderColor: '#aaa',
        alignItems: 'center',
        backgroundColor: '#fedbd0',
        marginTop: 30,
    },

    Header: {
        fontSize: 28,
        alignSelf: 'center',
        padding: 10,
        paddingBottom: 20,
        fontFamily:'Nunito-Bold',
        color:'#fff'
    },
    box:{
        padding:20,
        margin:5,
        marginTop:80,
        backgroundColor:'#424242',
        shadowOffset: { width: 5, height: 5 },
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 2,
        // borderBottomEndRadius:15,
        // borderTopLeftRadius:15,
        elevation: 15,    
    }
})

 
export default AddNotice;