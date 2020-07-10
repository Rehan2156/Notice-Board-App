import React, { Component } from 'react'
import { Text, StyleSheet,SafeAreaView, View, Alert,Dimensions,TextInput,TouchableOpacity,ScrollView, Image, ProgressBarAndroid  } from 'react-native'
import { CheckBox,Button } from 'react-native-elements'
import {globalStyles} from '../styles/global'
import database from '@react-native-firebase/database';
import DocumentPicker from 'react-native-document-picker';
import storage from '@react-native-firebase/storage'

const {width:WIDTH}=Dimensions.get('window')

export default class AddNotice extends Component {

    state = {
        head: "",
        notice: "",
        std: "",
        fec1: false,
        fec2: false,
        files: []
    }

    uploadImage = () => {
        this.state.files.forEach(async(data) => {
            const filename = data.name; // Generate unique name
            this.setState({ uploading: true });
            storage()
            .ref(`images/${filename}`)
            .putFile(data.uri)
            .on(
                storage.TaskEvent.STATE_CHANGED,
                snapshot => {
                    if (snapshot.state === storage.TaskState.SUCCESS) {
                        const allImages = "";
                        allImages.push(snapshot.downloadURL);
                        AsyncStorage.setItem('images', JSON.stringify(allImages));
                    }
                    this.setState({
                        downloadURL: allImages
                    });
                },
                error => {
                    unsubscribe();
                    alert('Sorry, Try again.');
                }
            );
        })
      };

    uploadTheDetails= async () => {
        console.log('hello')
        if(this.state.head !== "" && this.state.notice !== "") {
            await this.uploadImage()
            database()
            .ref('/notice/'+Date.now())
            .set({
                head: this.state.head,
                text: this.state.notice,
            })
            .then(() => {                
                Alert.alert('Information','User Data is Uploaded')
                this.props.navigation.navigate('Home')
            });
        } else {
            Alert.alert("Fill Every Info please")
        }        
    }

    selectMultipleFile = async () =>  {
        //Opening Document Picker for selection of multiple file
        try {
          const results = await DocumentPicker.pickMultiple({
            type: [DocumentPicker.types.allFiles],
          });
          for (const res of results) {
            console.log('res : ' + JSON.stringify(res));
            console.log('URI : ' + res.uri);
            console.log('Type : ' + res.type);
            console.log('File Name : ' + res.name);
            console.log('File Size : ' + res.size);
          }
          //Setting the state to show multiple file attributes
          this.setState({
              files: results
          })
        } catch (err) {
          if (DocumentPicker.isCancel(err)) {
            alert('Canceled from multiple doc picker');
          } else {
            alert('Unknown Error: ' + JSON.stringify(err));
            throw err;
          }
        }
      }

    render() {
        return ( 
            <View style={globalStyles.body}>
            <ScrollView
              contentInsetAdjustmentBehavior="automatic"
              style={styles.scrollView}>
                {/* <View style={styles.box}> */}
                    {/* <Text style={styles.Header}>Shopkeeper Details </Text> */}
                    <TextInput 
                        style={styles.headInput}
                        onChangeText = {val => this.setState({ head: val })}
                        selectedValue = {this.state.head}
                        placeholder={'Heading'}
                       placeholderTextColor={'rgba(255,255,255,0.7)'}
                       underlineColorAndroid='transparent'
                    />
    
                    <TextInput 
                        style={styles.textInput}
                        onChangeText = {val => this.setState({ notice: val })}
                        selectedValue = {this.state.notice}
                        placeholder={'Type the notice'}
                       placeholderTextColor={'rgba(255,255,255,0.7)'}
                       underlineColorAndroid='transparent'
                       multiline={true}
                    />
    
                    <Button     
                        title="Select File to upload"
                        type="solid"
                        raised
                        onPress={()=>this.selectMultipleFile()}
                    />
                    <ScrollView>
                        {/*Showing the data of selected Multiple files*/}
                        {this.state.files.map((item, key) => (
                            <View key={key}>
                            {/*<Text style={styles.textStyle}>
                                File Name: {item.name ? item.name : ''}
                                {'\n'}
                                Type: {item.type ? item.type : ''}
                                {'\n'}
                                File Size: {item.size ? item.size : ''}
                                {'\n'}
                                URI: {item.uri ? item.uri : ''}
                                {'\n'}
                            </Text>*/}
                            <Image
                                source={item}
                                style={styles.image}
                            />
                            </View>
                        ))}
                    </ScrollView>
    
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
                    checked={this.state.std}
                    onPress={()=>{this.setState({ std: !this.state.std }); if(this.state.std==true){this.setState({ fec1: false }); this.setState({ fec2: false })} else{this.setState({ fec1: true }); this.setState({ fec2: true })}}}
                    />
                    </View>
    
                    <View style={styles.checkboxContainer}>
                    <CheckBox
                    
                    title='FE comp 1'
                    checked={this.state.fec1}
                    onPress={()=>this.setState({ fec1: !this.state.fec1 })}
                    />
                    <CheckBox
                    
                    title='FE comp 2'
                    checked={this.state.fec2}
                    onPress={()=>this.setState({ fec2: !this.state.fec2 })}
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
                        onPress={() => {
                            console.log('pressed')
                            this.uploadTheDetails()
                        }}
                    />
                {/* </View> */}
                </ScrollView>
                </View>
        );
    }
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
    },
    image: {
        marginTop: 20,
        minWidth: 200,
        height: 200
      },
      progressBarContainer: {
        marginTop: 20
      },
})