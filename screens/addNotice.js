import React, { Component } from 'react'
import { Text, StyleSheet,SafeAreaView, View, Alert,Dimensions,TextInput,TouchableOpacity,ScrollView, Image, ProgressBarAndroid, Platform, ActivityIndicator, ProgressBarAndroidComponent  } from 'react-native'
import { CheckBox,Button } from 'react-native-elements'
import {globalStyles} from '../styles/global'
import database from '@react-native-firebase/database';
import DocumentPicker from 'react-native-document-picker';
import storage from '@react-native-firebase/storage'
import RNFS from 'react-native-fs'
import OneSignal from 'react-native-onesignal';


const { width: WIDTH } = Dimensions.get('window')

export default class AddNotice extends Component {

    state = {
        head: "",
        notice: "",
        all: false,
        fe: false,
        fec1: false,
        fec2: false,
        fecss: false,
        fem1: false,
        fem2: false,
        fee1: false,
        fee2: false,
        se: false,
        sec1: false,
        sec2: false,
        secss: false,
        sem1: false,
        sem2: false,
        see1: false,
        see2: false,
        te: false,
        tec1: false,
        tec2: false,
        tecss: false,
        tem1: false,
        tem2: false,
        tee1: false,
        tee2: false,
        be: false,
        bec1: false,
        bec2: false,
        becss: false,
        bem1: false,
        bem2: false,
        bee1: false,
        bee2: false,
        files: null,
        downloadLink: '',
        progress:'0',
        uplaoding: false,
    }

    findDate = () => {
        var date = new Date();
        return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
    }

    findTime = () => {
        var date = new Date();
        var hours = date.getHours();
        var minutes = date.getMinutes();

        // Check whether AM or PM 
        var newformat = hours >= 12 ? 'PM' : 'AM';

        // Find current hour in AM-PM Format 
        hours = hours % 12;

        // To display "0" as "12" 
        hours = hours ? hours : 12;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        return hours + ':' + minutes + ' ' + newformat

    }

    pushNotification = () => {
        console.log('Pressed This')
        let headers = {
            "Content-Type": "application/json; charset=utf-8",
            Authorization: "YjhmNTI0N2MtMzI1OS00MjNkLWJmODQtNmZkNmU3NTBjNjE3"
          };
      
          let endpoint = "https://onesignal.com/api/v1/notifications";
      
          let params = {
            method: "POST",
            headers: headers,
            body: JSON.stringify({
              app_id: "82d014e8-838d-4e74-ac0a-ab31f4f8a2ae",
              included_segments: ["All"],
              contents: { en: this.state.head }
            })
          };
          fetch(endpoint, params).then(res => console.log("After :", res));
    }

    uploadImage = async () => {
        const files = this.state.files
        const fileName = files.name
        console.log(fileName)

        var storageRef = storage().ref(`images/${fileName}`);
        console.log(files.uri)

        const data = await RNFS.readFile(files.uri, 'base64')

        this.setState({
            uplaoding: true,
        })
        await storageRef.putString(data, 'base64')
            .on('state_changed', snapshot => {
                console.log('sanpshot: ' + snapshot.state)
                var progress = (snapshot.bytesTransferred/snapshot.totalBytes) * 100
                console.log('progress: ' + progress)
                this.setState({
                    progress: progress
                })

                if (snapshot.state === storage.TaskState.SUCCESS) {
                    console.log('Sucessful');
                }
            },
                error => {
                    unsubscribe();
                    console.log('Image upload error: ' + error.toString())
                },
                () => {
                    storageRef.getDownloadURL()
                        .then(downloadURL => {
                            console.log('file is here: ' + downloadURL);
                            this.setState({ downloadLink: downloadURL })
                            this.uploadTheDetails()
                        })
                }
            )
    }

    uploadTheDetails = async () => {
        console.log('hello')
        if (this.state.head !== "" && this.state.notice !== "") {
            database()
                .ref('/notice/' + Date.now())
                .set({
                    head: this.state.head,
                    text: this.state.notice,
                    downloadURL: this.state.downloadLink,
                    date: this.findDate(),
                    time: this.findTime(),
                    all: this.state.all,
                    fec1: this.state.fec1,
                    fec2: this.state.fec2,
                    fecss: this.state.fecss,
                    fem1: this.state.fem1,
                    fem2: this.state.fem2,
                    fee1: this.state.fee1,
                    fee2: this.state.fee2,
                    sec1: this.state.sec1,
                    sec2: this.state.sec2,
                    secss: this.state.secss,
                    sem1: this.state.sem1,
                    sem2: this.state.sem2,
                    see1: this.state.see1,
                    see2: this.state.see2,
                    tec1: this.state.tec1,
                    tec2: this.state.tec2,
                    tecss: this.state.tecss,
                    tem1: this.state.tem1,
                    tem2: this.state.tem2,
                    tee1: this.state.tee1,
                    tee2: this.state.tee2,
                    bec1: this.state.bec1,
                    bec2: this.state.bec2,
                    becss: this.state.becss,
                    bem1: this.state.bem1,
                    bem2: this.state.bem2,
                    bee1: this.state.bee1,
                    bee2: this.state.bee2,

                })
                .then(() => {
                    this.pushNotification()
                    this.setState({ 
                        uplaoding: false
                    })
                    Alert.alert('Success', 'Notice is sent sucessfully')
                    this.props.navigation.navigate('Home')
                });
        } else {
            Alert.alert("Fill Every Info please")
        }
    }
    selectOneFile = async () => {
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles],
            });
            console.log('res : ' + JSON.stringify(res));
            console.log('URI : ' + res.uri);
            console.log('Type : ' + res.type);
            console.log('File Name : ' + res.name);
            console.log('File Size : ' + res.size);

            if(((res.size / 1024) / 1024) >= 10) {
                console.log('hello: ' + res.size)
                throw " Size of this document is too large "
            } else {
                this.setState({ files: res });
            }

        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                alert('Canceled from single doc picker');
            } else {
                alert('Error: ' + JSON.stringify(err));
                throw err;
            }
        }
    }

    //    classes=([
    //        {name:'FE',type:1,st:'fe',key:1},
    //        {name:'FE comp 1',type:2,st:'fec1',key:2},
    //        {name:'FE comp 2',type:2,st:'fec2',key:3},
    //        {name:'FE comp ss',type:2,st:'fecss',key:4},
    //        {name:'FE mech 1',type:2,st:'fem1',key:5},
    //        {name:'FE mech 2',type:2,st:'fem2',key:6},
    //        {name:'FE entc 1',type:2,st:'fee1',key:7},
    //        {name:'FE entc 2',type:2,st:'fee2',key:8},
    //        {name:'SE',type:1,st:'se',key:9},
    //    ])

    render() {
        if(this.state.uplaoding) {
            return(
                <View style={styles.container}>
                    <Text> Uploading </Text>
                    <Text> Please Wait</Text>
                    <ActivityIndicator size='large' />
                </View>
            )
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
                        onChangeText={val => this.setState({ head: val })}
                        selectedValue={this.state.head}
                        placeholder={'Heading'}
                        placeholderTextColor={'rgba(255,255,255,0.7)'}
                        underlineColorAndroid='transparent'
                    />

                    <TextInput
                        style={styles.textInput}
                        onChangeText={val => this.setState({ notice: val })}
                        selectedValue={this.state.notice}
                        placeholder={'Type the notice'}
                        placeholderTextColor={'rgba(255,255,255,0.7)'}
                        underlineColorAndroid='transparent'
                        multiline={true}
                    />

                    <Button
                        title="Select File to upload"
                        type="solid"
                        raised
                        onPress={() => this.selectOneFile()}
                    />
                    { this.state.files && <View>
                            <Image
                                source={this.state.files}
                                style={styles.image}
                            />
                    </View> } 
    
                    <Text style={styles.label}>Select class to send the notice </Text>

                    <View style={styles.checkboxContainer}>
                        <CheckBox
                            center
                            title='All students FE, SE, TE, BE'
                            checked={this.state.all}
                            onPress={() => {
                                this.setState({ all: !this.state.all }); if (this.state.all == true) {
                                    this.setState({
                                        fe: false, fec1: false, fec2: false, fecss: false, fem1: false, fem2: false, fee1: false, fee2: false, se: false,
                                        sec1: false,
                                        sec2: false,
                                        secss: false,
                                        sem1: false,
                                        sem2: false,
                                        see1: false,
                                        see2: false,
                                        te: false,
                                        tec1: false,
                                        tec2: false,
                                        tecss: false,
                                        tem1: false,
                                        tem2: false,
                                        tee1: false,
                                        tee2: false,
                                        be: false,
                                        bec1: false,
                                        bec2: false,
                                        becss: false,
                                        bem1: false,
                                        bem2: false,
                                        bee1: false,
                                        bee2: false,
                                    })
                                } else {
                                    this.setState({
                                        fe: true, fec1: true, fec2: true, fecss: true, fem1: true, fem2: true, fee1: true, fee2: true, se: true,
                                        sec1: true,
                                        sec2: true,
                                        secss: true,
                                        sem1: true,
                                        sem2: true,
                                        see1: true,
                                        see2: true,
                                        te: true,
                                        tec1: true,
                                        tec2: true,
                                        tecss: true,
                                        tem1: true,
                                        tem2: true,
                                        tee1: true,
                                        tee2: true,
                                        be: true,
                                        bec1: true,
                                        bec2: true,
                                        becss: true,
                                        bem1: true,
                                        bem2: true,
                                        bee1: true,
                                        bee2: true,
                                    })
                                }
                            }}
                        />
                    </View>

                    <View style={styles.line}></View>

                    <View style={styles.checkboxContainer}>
                        <CheckBox
                            center
                            title='FE'
                            checked={this.state.fe}
                            onPress={() => { this.setState({ fe: !this.state.fe }); if (this.state.fe == true) { this.setState({ fec1: false, fec2: false, fecss: false, fem1: false, fem2: false, fee1: false, fee2: false }) } else { this.setState({ fec1: true, fec2: true, fecss: true, fem1: true, fem2: true, fee1: true, fee2: true }) } }}
                        />
                    </View>

                    <View style={styles.checkboxContainer}>
                        <CheckBox
                            title='FE comp 1'
                            checked={this.state.fec1}
                            onPress={() => this.setState({ fec1: !this.state.fec1 })}
                        />
                        <CheckBox
                            title='FE comp 2'
                            checked={this.state.fec2}
                            onPress={() => this.setState({ fec2: !this.state.fec2 })}
                        />
                    </View>

                    <View style={styles.checkboxContainer}>
                        <CheckBox
                            title='FE comp second shift'
                            checked={this.state.fecss}
                            onPress={() => this.setState({ fecss: !this.state.fecss })}
                        />
                    </View>

                    {/* ---------------------------------------- */}
                    <View style={styles.checkboxContainer}>
                        <CheckBox
                            title='FE mech 1'
                            checked={this.state.fem1}
                            onPress={() => this.setState({ fem1: !this.state.fem1 })}
                        />
                        <CheckBox
                            title='FE mech 2'
                            checked={this.state.fem2}
                            onPress={() => this.setState({ fem2: !this.state.fem2 })}
                        />
                    </View>
                    {/* ------------------------------------- */}

                    <View style={styles.checkboxContainer}>
                        <CheckBox
                            title='FE ENTC 1'
                            checked={this.state.fee1}
                            onPress={() => this.setState({ fee1: !this.state.fee1 })}
                        />
                        <CheckBox
                            title='FE ENTC 2'
                            checked={this.state.fee2}
                            onPress={() => this.setState({ fee2: !this.state.fee2 })}
                        />
                    </View>

                    <View style={styles.line}></View>

                    {/* ----------------------------------------- */}

                    <View style={styles.checkboxContainer}>
                        <CheckBox
                            center
                            title='SE'
                            checked={this.state.se}
                            onPress={() => { this.setState({ se: !this.state.se }); if (this.state.se == true) { this.setState({ sec1: false, sec2: false, secss: false, sem1: false, sem2: false, see1: false, see2: false }) } else { this.setState({ sec1: true, sec2: true, secss: true, sem1: true, sem2: true, see1: true, see2: true }) } }}
                        />
                    </View>

                    <View style={styles.checkboxContainer}>
                        <CheckBox
                            title='SE comp 1'
                            checked={this.state.sec1}
                            onPress={() => this.setState({ sec1: !this.state.sec1 })}
                        />
                        <CheckBox
                            title='SE comp 2'
                            checked={this.state.sec2}
                            onPress={() => this.setState({ sec2: !this.state.sec2 })}
                        />
                    </View>

                    <View style={styles.checkboxContainer}>
                        <CheckBox
                            title='SE comp second shift'
                            checked={this.state.secss}
                            onPress={() => this.setState({ secss: !this.state.secss })}
                        />
                    </View>

                    {/* ---------------------------------------- */}
                    <View style={styles.checkboxContainer}>
                        <CheckBox
                            title='SE mech 1'
                            checked={this.state.sem1}
                            onPress={() => this.setState({ sem1: !this.state.sem1 })}
                        />
                        <CheckBox
                            title='SE mech 2'
                            checked={this.state.sem2}
                            onPress={() => this.setState({ sem2: !this.state.sem2 })}
                        />
                    </View>
                    {/* ------------------------------------- */}

                    <View style={styles.checkboxContainer}>
                        <CheckBox
                            title='SE ENTC 1'
                            checked={this.state.see1}
                            onPress={() => this.setState({ see1: !this.state.see1 })}
                        />
                        <CheckBox
                            title='SE ENTC 2'
                            checked={this.state.see2}
                            onPress={() => this.setState({ see2: !this.state.see2 })}
                        />
                    </View>

                    <View style={styles.line}></View>
                    {/* ----------------------------------------- */}

                    <View style={styles.checkboxContainer}>
                        <CheckBox
                            center
                            title='TE'
                            checked={this.state.te}
                            onPress={() => { this.setState({ te: !this.state.te }); if (this.state.te == true) { this.setState({ tec1: false, tec2: false, tecss: false, tem1: false, tem2: false, tee1: false, tee2: false }) } else { this.setState({ tec1: true, tec2: true, tecss: true, tem1: true, tem2: true, tee1: true, tee2: true }) } }}
                        />
                    </View>

                    <View style={styles.checkboxContainer}>
                        <CheckBox
                            title='TE comp 1'
                            checked={this.state.tec1}
                            onPress={() => this.setState({ tec1: !this.state.tec1 })}
                        />
                        <CheckBox
                            title='TE comp 2'
                            checked={this.state.tec2}
                            onPress={() => this.setState({ tec2: !this.state.tec2 })}
                        />
                    </View>

                    <View style={styles.checkboxContainer}>
                        <CheckBox
                            title='TE comp second shift'
                            checked={this.state.tecss}
                            onPress={() => this.setState({ tecss: !this.state.tecss })}
                        />
                    </View>

                    {/* ---------------------------------------- */}
                    <View style={styles.checkboxContainer}>
                        <CheckBox
                            title='TE mech 1'
                            checked={this.state.tem1}
                            onPress={() => this.setState({ tem1: !this.state.tem1 })}
                        />
                        <CheckBox
                            title='TE mech 2'
                            checked={this.state.tem2}
                            onPress={() => this.setState({ tem2: !this.state.tem2 })}
                        />
                    </View>
                    {/* ------------------------------------- */}

                    <View style={styles.checkboxContainer}>
                        <CheckBox
                            title='TE ENTC 1'
                            checked={this.state.tee1}
                            onPress={() => this.setState({ tee1: !this.state.tee1 })}
                        />
                        <CheckBox
                            title='TE ENTC 2'
                            checked={this.state.tee2}
                            onPress={() => this.setState({ tee2: !this.state.tee2 })}
                        />
                    </View>

                    <View style={styles.line}></View>
                    {/* ----------------------------------------- */}

                    <View style={styles.checkboxContainer}>
                        <CheckBox
                            center
                            title='BE'
                            checked={this.state.be}
                            onPress={() => { this.setState({ be: !this.state.be }); if (this.state.be == true) { this.setState({ bec1: false, bec2: false, becss: false, bem1: false, bem2: false, bee1: false, bee2: false }) } else { this.setState({ bec1: true, bec2: true, becss: true, bem1: true, bem2: true, bee1: true, bee2: true }) } }}
                        />
                    </View>

                    <View style={styles.checkboxContainer}>
                        <CheckBox
                            title='BE comp 1'
                            checked={this.state.bec1}
                            onPress={() => this.setState({ bec1: !this.state.bec1 })}
                        />
                        <CheckBox
                            title='BE comp 2'
                            checked={this.state.bec2}
                            onPress={() => this.setState({ bec2: !this.state.bec2 })}
                        />
                    </View>

                    <View style={styles.checkboxContainer}>
                        <CheckBox
                            title='BE comp second shift'
                            checked={this.state.becss}
                            onPress={() => this.setState({ becss: !this.state.becss })}
                        />
                    </View>

                    {/* ---------------------------------------- */}
                    <View style={styles.checkboxContainer}>
                        <CheckBox
                            title='BE mech 1'
                            checked={this.state.bem1}
                            onPress={() => this.setState({ bem1: !this.state.bem1 })}
                        />
                        <CheckBox
                            title='BE mech 2'
                            checked={this.state.bem2}
                            onPress={() => this.setState({ bem2: !this.state.bem2 })}
                        />
                    </View>
                    {/* ------------------------------------- */}

                    <View style={styles.checkboxContainer}>
                        <CheckBox
                            title='BE ENTC 1'
                            checked={this.state.bee1}
                            onPress={() => this.setState({ bee1: !this.state.bee1 })}
                        />
                        <CheckBox
                            title='BE ENTC 2'
                            checked={this.state.bee2}
                            onPress={() => this.setState({ bee2: !this.state.bee2 })}
                        />
                    </View>

                    {/* ----------------------------------------- */}
                    <View style={styles.line}></View>


                    {/* ----------------------------------------- */}




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
                            this.uploadImage()
                        }}
                    />
                    {/* </View> */}
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    body: {
        backgroundColor: '#fff',
        padding: 30,
        // borderTopLeftRadius:150,
        // flex:1,
        // padding:20
        height: '100%',
        // flex:1
    },
    container: {
      flex: 1,
      backgroundColor: '#fff',
      padding: 10,
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center'
    },
    checkbox: {
        alignSelf: "center",
    },
    checkboxContainer: {
        flexDirection: "row",
        marginBottom: 20,
    },
    line: {
        borderBottomWidth: 2,
        marginBottom: 15,
        borderBottomColor: '#C1CAD7',
    },
    label: {
        fontSize: 15,
        color: 'black',
        margin: 5,
        padding: 10,
        fontFamily: 'Nunito-Bold',
    },
    headInput: {
        alignSelf: 'center',
        width: WIDTH - 90,
        height: 55,
        borderRadius: 5,
        fontSize: 16,
        paddingLeft: 20,
        backgroundColor: 'rgba(0,0,0,0.35)',
        color: 'rgba(255,255,255,0.7)',
        marginHorizontal: 25,
        fontFamily: 'Nunito-Bold',
        margin: 20,
    },
    textInput: {
        alignSelf: 'center',
        width: WIDTH - 90,
        height: 100,
        borderRadius: 5,
        fontSize: 16,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: 'rgba(0,0,0,0.35)',
        color: 'rgba(255,255,255,0.7)',
        marginHorizontal: 25,
        fontFamily: 'Nunito-Bold',
        margin: 20,
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
        fontFamily: 'Nunito-Bold',
        color: '#fff'
    },
    box: {
        padding: 20,
        margin: 5,
        marginTop: 80,
        backgroundColor: '#424242',
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