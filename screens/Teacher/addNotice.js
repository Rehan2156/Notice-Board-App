import React, { Component } from 'react'
import { Text, StyleSheet,SafeAreaView, View, Alert,Dimensions,TextInput,TouchableOpacity,ScrollView, Image, ProgressBarAndroid, Platform, ActivityIndicator, ProgressBarAndroidComponent,Modal  } from 'react-native'
import { CheckBox,Button } from 'react-native-elements'
import {globalStyles} from '../../styles/global'
import database from '@react-native-firebase/database';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs'
import auth from '@react-native-firebase/auth'
import 'base64-arraybuffer'
import AsyncStorage from '@react-native-community/async-storage';
import SlpashScreen from '../../components/SlpashScreen';

const width = Dimensions.get('screen').width
const heigth = Dimensions.get('screen').height

var AWS = require('aws-sdk');
var dec = require('base64-arraybuffer')

export default class AddNotice extends Component {

    state = {
        head:           "",
        notice:         "",
        files:          null,
        fileData:       null,
        downloadLink:   '',
        uplaoding:      false,
        sendList:       null,
        segment:        [],
        all:            true,
        comp:           true,
        mech:           true,
        entc:           true,
        fe:             true,
        fec1:           true,
        fec2:           true,
        fecss:          true,
        fem1:           true,
        fem2:           true,
        fee1:           true,
        fee2:           true,
        se:             true,
        sec1:           true,
        sec2:           true,
        secss:          true,
        sem1:           true,
        sem2:           true,
        see1:           true,
        see2:           true,
        te:             true,
        tec1:           true,
        tec2:           true,
        tecss:          true,
        tem1:           true,
        tem2:           true,
        tee1:           true,
        tee2:           true,
        be:             true,
        bec1:           true,
        bec2:           true,
        becss:          true,
        bem1:           true,
        bem2:           true,
        bee1:           true,
        bee2:           true,
        name:           null
    }

    componentDidMount() {
      if(this.state.name == null) {
        try {
          AsyncStorage.getItem('User_Cred').then( jsonValue => {
            jsonValue != null ? JSON.parse(jsonValue) : null;
            console.log(jsonValue)
            if(jsonValue != null) {
                var name = JSON.parse(jsonValue).name        
                this.setState({name:name})
            }
          })
        } catch(e) {
            console.log('error: ', e)
        } 
      }   
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
            Authorization: "Basic YjhmNTI0N2MtMzI1OS00MjNkLWJmODQtNmZkNmU3NTBjNjE3"
          };
      
          let endpoint = "https://onesignal.com/api/v1/notifications";

          let params = {
            method: "POST",
            headers: headers,
            body: JSON.stringify({
              app_id: "82d014e8-838d-4e74-ac0a-ab31f4f8a2ae",
              included_segments: this.state.segment,
              contents: { en: this.state.head },
              data: {en: this.state.notice },
              headings: {en: "MESCOE Notice board"},
            })
          };
          fetch(endpoint, params).then(res => console.log("Thanks"));
    }

    uploadImage = async () => {
        if(this.state.head=="")
        {
            Alert.alert("Warning","Heading is compulsory")
        }
        else if(this.state.files!=null){
            this.setState({uplaoding: true})

        const file = this.state.fileData

        const s3bucket = new AWS.S3({
            accessKeyId: 'AKIARO72JVXM4KLZD6W3',
            secretAccessKey: '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',          
            Bucket: 'noticesmescoe',
            signatureVersion: 'v4',
          });
    //    let contentType = 'image/jpeg';
          let contentDeposition = 'inline;filename="' + file.name + '"';
          const base64 = await RNFS.readFile(file.uri, 'base64');
          const arrayBuffer = dec.decode(base64);
       s3bucket.createBucket(() => {
             const params = {
              Bucket: 'noticesmescoe/images',
              Key: file.name,
              Body: arrayBuffer,
              ContentDisposition: contentDeposition,
            //   ContentType: contentType,
          };
         s3bucket.upload(params, (err, data) => {
            if (err) {
              console.log('error in callback'+err);
            }
            else{
          console.log('success');
          console.log("Response URL : "+ data.Location);
          this.setState({downloadLink:data.Location})
          this.uploadTheDetails() 
            }
          });
        });    

        // const fileName = files.name
        // console.log(fileName)

        // var storageRef = storage().ref(`images/${fileName}`);
        // console.log(files.uri)

        // const data = await RNFS.readFile(files.uri, 'base64')

        // this.setState({
        //     uplaoding: true,
        // })
        // await storageRef.putString(data, 'base64')
        //     .on('state_changed', snapshot => {
        //         console.log('sanpshot: ' + snapshot.state)
        //         var progress = (snapshot.bytesTransferred/snapshot.totalBytes) * 100
        //         console.log('progress: ' + progress)
        //         this.setState({
        //             progress: progress
        //         })

        //         if (snapshot.state === storage.TaskState.SUCCESS) {
        //             console.log('Sucessful');
        //         }
        //     },
        //         error => {
        //             unsubscribe();
        //             console.log('Image upload error: ' + error.toString())
        //         },
        //         () => {
        //             storageRef.getDownloadURL()
        //                 .then(downloadURL => {
        //                     console.log('file is here: ' + downloadURL);
        //                     this.setState({ downloadLink: downloadURL })
        //                     this.uploadTheDetails()
        //                 })
        //         }
        //     )
        }
        else{
            this.setState({
                uplaoding: true,
            })
            this.uploadTheDetails() 
        }
    }

    uploadTheDetails = async () => {
        console.log('hello')
        console.log('sendlist: ', this.state.sendList)
        // if (this.state.head !== "" && this.state.notice !== "") {
            database()
                .ref('/notice/' + Date.now())
                .set({
                    head: this.state.head,
                    text: this.state.notice==""?"":this.state.notice,
                    downloadURL: this.state.downloadLink==""?"":this.state.downloadLink,
                    date: this.findDate(),
                    time: this.findTime(),
                    toSegments: this.createSendList(),
                    uploaderID:auth().currentUser.uid,
                    uploaderName:this.state.name
                })
                .then(() => {
                    this.createSegment()
                    this.pushNotification()
                    this.updateAllBit()
                    this.getNewData()
                    this.setState({ 
                        uplaoding: false
                    })
                    Alert.alert('Success', 'Notice is sent sucessfully')
                    this.props.navigation.navigate('Home')
                });
    }

    updateAllBit = async () => {
        database()
            .ref('Users/Student').once('value', snap => {
                snap.forEach(e => {
                    database()
                        .ref('Users/Student/' + e.key).update({
                            newNotice: 1,
                        })
                })
            }).then(async () => {
                database()
                .ref('Users/Teachers').once('value', snap => {
                    snap.forEach(e => {
                        database()
                            .ref('Users/Teachers/' + e.key).update({
                                newNotice: 1,
                            })
                    })
                }).then(() => {
                    console.log('Done')
                })
            })
    }

    getNewData = async () => {
        console.log('Teacher')
        var myArray = []
          var ref = database().ref("notice/")
          ref.once("value", async (snapshot) => {
            snapshot.forEach( (childSnapshot) => {
              var myJSON=childSnapshot.toJSON()
              if(myJSON.toSegments != null || myJSON.toSegments != undefined) {
                console.log(myJSON.toSegments)
                  var key = myJSON.key
                  var head = myJSON.head
                  var notice = myJSON.text
                  var downURL = myJSON.downloadURL
                  var date = myJSON.date
                  var time = myJSON.time
                  var toSegments = myJSON.toSegments
                  var item = {head: head, text:notice, downloadURL:downURL,date:date,time:time, key:key, toSegments: toSegments}
                  var itemStr = JSON.stringify(item) + '<;>'
                  myArray = [...myArray, itemStr]
              }
            })
            await AsyncStorage.setItem('list_data', myArray.toString())
          })
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

            const file = {
                uri: res.uri,
                name: res.name,
                type: res.type,
             };
             this.setState({fileData:file})
            //  this.uploadImageOnS3(file);

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

    createSendList = () => {
        console.log('Send list')
        var sendList = "Teacher"

        if(this.state.all === true) {
            sendList += ";Student"
        }

        if(this.state.comp === true && this.state.all != true) {
            sendList += ";Co"
        }
        if(this.state.entc === true && this.state.all != true) {
            sendList += ";En"
        }
        if(this.state.mech === true && this.state.all != true) {
            sendList += ";Me"
        }

        if(this.state.fe === true && this.state.all != true) {
            sendList += ";FE"
        }
        if(this.state.se === true && this.state.all != true) {
            sendList += ";SE"
        }
        if(this.state.te === true && this.state.all != true) {
            sendList += ";TE"
        }
        if(this.state.be === true && this.state.all != true) {
            sendList += ";BE"
        }

        if(this.state.fec1 === true && this.state.all != true && this.state.comp != true && this.state.fe != true) {
            sendList += ";FEC1"
        }
        if(this.state.fec2 === true && this.state.all != true && this.state.comp != true && this.state.fe != true) {
            sendList += ";FEC2"
        }
        if(this.state.fecss === true && this.state.all != true && this.state.comp != true && this.state.fe != true) {
            sendList += ";FECSS"
        }
        if(this.state.fee1 === true && this.state.all != true && this.state.entc != true && this.state.fe != true) {
            sendList += ";FEE1"
        }
        if(this.state.fee2 === true && this.state.all != true && this.state.entc != true && this.state.fe != true) {
            sendList += ";FEE2"
        }
        if(this.state.fem1 === true && this.state.all != true && this.state.mech != true && this.state.fe != true) {
            sendList += ";FEM1"
        }
        if(this.state.fem2 === true && this.state.all != true && this.state.mech != true && this.state.fe != true) {
            sendList += ";FEM2"
        }

        if(this.state.sec1 === true && this.state.all != true && this.state.comp != true && this.state.se != true) {
            sendList += ";SEC1"
        }
        if(this.state.sec2 === true && this.state.all != true && this.state.comp != true && this.state.se != true) {
            sendList += ";SEC2"
        }
        if(this.state.secss === true && this.state.all != true && this.state.comp != true && this.state.se != true) {
            sendList += ";SECSS"
        }
        if(this.state.see1 === true && this.state.all != true && this.state.entc != true && this.state.se != true) {
            sendList += ";SEE1"
        }
        if(this.state.see2 === true && this.state.all != true && this.state.entc != true && this.state.se != true) {
            sendList += ";SEE2"
        }
        if(this.state.sem1 === true && this.state.all != true && this.state.mech != true && this.state.se != true) {
            sendList += ";SEM1"
        }
        if(this.state.sem2 === true && this.state.all != true && this.state.mech != true && this.state.se != true) {
            sendList += ";SEM2"
        }

        if(this.state.tec1 === true && this.state.all != true && this.state.comp != true && this.state.te != true) {
            sendList += ";TEC1"
        }
        if(this.state.tec2 === true && this.state.all != true && this.state.comp != true && this.state.te != true) {
            sendList += ";TEC2"
        }
        if(this.state.tecss === true && this.state.all != true && this.state.comp != true && this.state.te != true) {
            sendList += ";TECSS"
        }
        if(this.state.tee1 === true && this.state.all != true && this.state.entc != true && this.state.te != true) {
            sendList += ";TEE1"
        }
        if(this.state.tee2 === true && this.state.all != true && this.state.entc != true && this.state.te != true) {
            sendList += ";TEE2"
        }
        if(this.state.tem1 === true && this.state.all != true && this.state.mech != true && this.state.te != true) {
            sendList += ";TEM1"
        }
        if(this.state.tem2 === true && this.state.all != true && this.state.mech != true && this.state.te != true) {
            sendList += ";TEM2"
        }

        if(this.state.bec1 === true && this.state.all != true && this.state.comp != true && this.state.be != true) {
            sendList += ";BEC1"
        }
        if(this.state.bec2 === true && this.state.all != true && this.state.comp != true && this.state.be != true) {
            sendList += ";BEC2"
        }
        if(this.state.becss === true && this.state.all != true && this.state.comp != true && this.state.be != true) {
            sendList += ";BECSS"
        }
        if(this.state.bee1 === true && this.state.all != true && this.state.entc != true && this.state.be != true) {
            sendList += ";BEE1"
        }
        if(this.state.bee2 === true && this.state.all != true && this.state.entc != true && this.state.be != true) {
            sendList += ";BEE2"
        }
        if(this.state.bem1 === true && this.state.all != true && this.state.mech != true && this.state.be != true) {
            sendList += ";BEM1"
        }
        if(this.state.bem2 === true && this.state.all != true && this.state.mech != true && this.state.be != true) {
            sendList += ";BEM2"
        }

        console.log('Var: ', sendList)
        return sendList
    }

    createSegment = () => {
        console.log('segment')
        var segment = ["Teacher"]

        if(this.state.all === true) {
            segment = [...segment, "Student"]
        }

        if(this.state.comp === true) {
            segment = [...segment, "Co"]
        }
        if(this.state.entc === true) {
            segment = [...segment, "En"]
        }
        if(this.state.mech === true) {
            segment = [...segment, "Me"]
        }

        if(this.state.fe === true) {
            segment = [...segment, "FE"]
        }
        if(this.state.se === true) {
            segment = [...segment, "SE"]
        }
        if(this.state.te === true) {
            segment = [...segment, "TE"]
        }
        if(this.state.be === true) {
            segment = [...segment, "BE"]
        }

        if(this.state.fec1 === true) {
            segment = [...segment, "FEC1"]
        }
        if(this.state.fec2 === true) {
            segment = [...segment, "FEC2"]
        }
        if(this.state.fecss === true) {
            segment = [...segment, "FECSS"]
        }
        if(this.state.fee1 === true) {
            segment = [...segment, "FEE1"]
        }
        if(this.state.fee2 === true) {
            segment = [...segment, "FEE2"]
        }
        if(this.state.fem1 === true) {
            segment = [...segment, "FEM1"]
        }
        if(this.state.fem2 === true) {
            segment = [...segment, "FEM2"]
        }


        if(this.state.sec1 === true) {
            segment = [...segment, "SEC1"]
        }
        if(this.state.sec2 === true) {
            segment = [...segment, "SEC2"]
        }
        if(this.state.secss === true) {
            segment = [...segment, "SECSS"]
        }
        if(this.state.see1 === true) {
            segment = [...segment, "SEE1"]
        }
        if(this.state.see2 === true) {
            segment = [...segment, "SEE2"]
        }
        if(this.state.sem1 === true) {
            segment = [...segment, "SEM1"]
        }
        if(this.state.sem2 === true) {
            segment = [...segment, "SEM2"]
        }


        if(this.state.tec1 === true) {
            segment = [...segment, "TEC1"]
        }
        if(this.state.tec2 === true) {
            segment = [...segment, "TEC2"]
        }
        if(this.state.tecss === true) {
            segment = [...segment, "TECSS"]
        }
        if(this.state.tee1 === true) {
            segment = [...segment, "TEE1"]
        }
        if(this.state.tee2 === true) {
            segment = [...segment, "TEE2"]
        }
        if(this.state.tem1 === true) {
            segment = [...segment, "TEM1"]
        }
        if(this.state.tem2 === true) {
            segment = [...segment, "TEM2"]
        }

        if(this.state.bec1 === true) {
            segment = [...segment, "BEC1"]
        }
        if(this.state.bec2 === true) {
            segment = [...segment, "BEC2"]
        }
        if(this.state.becss === true) {
            segment = [...segment, "BECSS"]
        }
        if(this.state.bee1 === true) {
            segment = [...segment, "BEE1"]
        }
        if(this.state.bee2 === true) {
            segment = [...segment, "BEE2"]
        }
        if(this.state.bem1 === true) {
            segment = [...segment, "BEM1"]
        }
        if(this.state.bem2 === true) {
            segment = [...segment, "BEM2"]
        }

        console.log(segment)

        this.setState({
            segment: segment
        })
    }

    changeInDpartment = (boolVar , whichDep) => {
        this.setState({
            fe:    !boolVar ? boolVar : !boolVar, 
            se:    !boolVar ? boolVar : !boolVar, 
            te:    !boolVar ? boolVar : !boolVar, 
            be:    !boolVar ? boolVar : !boolVar, 
            all:   !boolVar ? boolVar : !boolVar, 
        })

        if(whichDep == 1) {
            this.setState({
                fec1:  !boolVar, 
                fec2:  !boolVar, 
                fecss: !boolVar, 
                sec1:  !boolVar, 
                sec2:  !boolVar, 
                secss: !boolVar,
                tec1:  !boolVar, 
                tec2:  !boolVar, 
                tecss: !boolVar,
                bec1:  !boolVar, 
                bec2:  !boolVar, 
                becss: !boolVar 
            })
        } else if(whichDep == 2) {
            this.setState({
                fem1:  !boolVar, 
                fem2:  !boolVar, 
                femss: !boolVar, 
                sem1:  !boolVar, 
                sem2:  !boolVar, 
                semss: !boolVar,
                tem1:  !boolVar, 
                tem2:  !boolVar, 
                temss: !boolVar,
                bem1:  !boolVar, 
                bem2:  !boolVar, 
                bemss: !boolVar 
            })
        } else {
            this.setState({
                fee1:  !boolVar, 
                fee2:  !boolVar, 
                feess: !boolVar, 
                see1:  !boolVar, 
                see2:  !boolVar, 
                seess: !boolVar,
                tee1:  !boolVar, 
                tee2:  !boolVar, 
                teess: !boolVar,
                bee1:  !boolVar, 
                bee2:  !boolVar, 
                beess: !boolVar 
            })
        }

    }

    changeInYear = (boolVar, whichYear) => {

        this.setState({
            all:  !boolVar ? boolVar : !boolVar, 
            comp: !boolVar ? boolVar : !boolVar,
            mech: !boolVar ? boolVar : !boolVar, 
            entc: !boolVar ? boolVar : !boolVar,
        })

        if(whichYear === 1) {
            this.setState({
                fec1: !boolVar, 
                fec2: !boolVar, 
                fecss:!boolVar, 
                fem1: !boolVar, 
                fem2: !boolVar, 
                fee1: !boolVar, 
                fee2: !boolVar,
            })
        } else if(whichYear === 2) {
            this.setState({
                sec1: !boolVar, 
                sec2: !boolVar, 
                secss:!boolVar, 
                sem1: !boolVar, 
                sem2: !boolVar, 
                see1: !boolVar, 
                see2: !boolVar,
            })
        } else if(whichYear === 3) {
            this.setState({
                tec1: !boolVar, 
                tec2: !boolVar, 
                tecss:!boolVar, 
                tem1: !boolVar, 
                tem2: !boolVar, 
                tee1: !boolVar, 
                tee2: !boolVar,
            })
        } else {
            this.setState({
                bec1: !boolVar, 
                bec2: !boolVar, 
                becss:!boolVar, 
                bem1: !boolVar, 
                bem2: !boolVar, 
                bee1: !boolVar, 
                bee2: !boolVar,
            })    
        }
    }

    changeInClass = (boolVar, whichClass) => {
        this.setState({
            all:  !boolVar ? boolVar : !boolVar, 
            comp: !boolVar ? boolVar : !boolVar,
            mech: !boolVar ? boolVar : !boolVar, 
            entc: !boolVar ? boolVar : !boolVar,
        })

        if(whichClass === 1) {
            this.setState({
                fe: !boolVar ? boolVar : !boolVar,
            })
        } else if(whichClass === 2) {
            this.setState({
                se: !boolVar ? boolVar : !boolVar,
            })
        } else if(whichClass === 3) {
            this.setState({
                te: !boolVar ? boolVar : !boolVar,
            })
        } else {
            this.setState({
                be: !boolVar ? boolVar : !boolVar,
            })
        }
    }

    render() {
        if(this.state.uplaoding) {
            return (<SlpashScreen  head="Uploading Notice"/>)
        }

        return ( 
            <View style={globalStyles.body}>
            <ScrollView
              contentInsetAdjustmentBehavior="automatic"
              style={styles.scrollView}>
                {/* <View style={styles.box}> */}
                    {/* <Text style={styles.Header}>Shopkeeper Details </Text> */}
                    <Text style={styles.label}>Heading (Required)</Text>
                    <TextInput
                        style={styles.headInput}
                        onChangeText={val => this.setState({ head: val })}
                        selectedValue={this.state.head}
                        placeholder={'Type the heading'}
                        // placeholderTextColor={'rgba(255,255,255,0.7)'}
                        underlineColorAndroid='transparent'
                    />
                    <Text style={styles.label}>Notice in words (Optional)</Text>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={val => this.setState({ notice: val })}
                        selectedValue={this.state.notice}
                        placeholder={'Type the notice'}
                        // placeholderTextColor={'rgba(255,255,255,0.7)'}
                        // underlineColorAndroid='transparent'
                        multiline={true}
                    />
                    <View style={styles.btnWidth1}>
                        <Button
                            title="Select file (Optional)"
                            type="solid"
                            raised
                            onPress={() => this.selectOneFile()}
                        />
                    </View>
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
                                this.setState({ 
                                    all: !this.state.all,
                                    comp: !this.state.all, 
                                    mech: !this.state.all, 
                                    entc: !this.state.all,
                                    fe: !this.state.all, 
                                    fec1: !this.state.all, 
                                    fec2: !this.state.all, 
                                    fecss: !this.state.all, 
                                    fem1: !this.state.all, 
                                    fem2: !this.state.all, 
                                    fee1: !this.state.all, 
                                    fee2: !this.state.all, 
                                    se: !this.state.all,
                                    sec1: !this.state.all,
                                    sec2: !this.state.all,
                                    secss: !this.state.all,
                                    sem1: !this.state.all,
                                    sem2: !this.state.all,
                                    see1: !this.state.all,
                                    see2: !this.state.all,
                                    te: !this.state.all,
                                    tec1: !this.state.all,
                                    tec2: !this.state.all,
                                    tecss: !this.state.all,
                                    tem1: !this.state.all,
                                    tem2: !this.state.all,
                                    tee1: !this.state.all,
                                    tee2: !this.state.all,
                                    be: !this.state.all,
                                    bec1: !this.state.all,
                                    bec2: !this.state.all,
                                    becss: !this.state.all,
                                    bem1: !this.state.all,
                                    bem2: !this.state.all,
                                    bee1: !this.state.all,
                                    bee2: !this.state.all
                                }); 
                            }}
                        />
                    </View>

                    {/* ----------------------------------------- */}
                    {/* ----------------------------------------- */}

                    <View style={styles.checkboxContainer}>
                        <CheckBox
                            center
                            title='Computer Department'
                            checked={this.state.comp}
                            onPress={() => { 
                                this.setState({ 
                                    comp: !this.state.comp ,
                                }); 
                                this.changeInDpartment(this.state.comp, 1)
                            }}
                        />
                    </View>

                    {/* ----------------------------------------- */}
                    {/* ----------------------------------------- */}

                    <View style={styles.checkboxContainer}>
                        <CheckBox
                            center
                            title='Mechanical Department'
                            checked={this.state.mech}
                            onPress={() => { 
                                this.setState({ 
                                    mech: !this.state.mech ,
                                }); 
                                this.changeInDpartment(this.state.mech, 2)
                            }}
                        />
                    </View>

                    {/* ----------------------------------------- */}
                    {/* ----------------------------------------- */}

                    <View style={styles.checkboxContainer}>
                        <CheckBox
                            center
                            title='ENTC Department'
                            checked={this.state.entc}
                            onPress={() => { 
                                this.setState({ 
                                    entc: !this.state.entc 
                                }); 
                                this.changeInDpartment(this.state.entc, 3)
                            }}
                        />
                    </View>

                    <View style={styles.line}></View>

                    {/* ----------------------------------------- */}
                    {/* ----------------------------------------- */}

                    <View style={styles.checkboxContainer}>
                        <CheckBox
                            center
                            title='FE'
                            checked={this.state.fe}
                            onPress={() => { 
                                this.setState({ 
                                    fe: !this.state.fe,
                                }); 
                                this.changeInYear(this.state.fe, 1)
                            }}
                        />
                    </View>

                    {/* ----------------------------------------- */}
                    <View style={styles.checkboxContainer}>
                        <CheckBox
                            title='FE COMP 1'
                            checked={this.state.fec1}
                            onPress={() => {
                                this.setState({ 
                                    fec1: !this.state.fec1, 
                                });  
                                this.changeInClass(this.state.fec1, 1)
                            }}
                        />
                        <CheckBox
                            title='FE COMP 2'
                            checked={this.state.fec2}
                            onPress={() => {
                                this.setState({ 
                                    fec2: !this.state.fec2 ,
                                })
                                this.changeInClass(this.state.fec2, 1)
                        }}
                        />
                    </View>

                    <View style={styles.checkboxContainer}>
                        <CheckBox
                            title='FE COMP Second Shift'
                            checked={this.state.fecss}
                            onPress={() => {this.setState({ 
                                    fecss: !this.state.fecss ,
                                })
                                this.changeInClass(this.state.fecss, 1)
                            }}
                        />
                    </View>

                    {/* ---------------------------------------- */}
                    <View style={styles.checkboxContainer}>
                        <CheckBox
                            title='FE MECH 1'
                            checked={this.state.fem1}
                            onPress={() => {this.setState({ 
                                fem1: !this.state.fem1 ,
                                })
                                this.changeInClass(this.state.fem1, 1)
                            }}
                        />
                        <CheckBox
                            title='FE MECH 2'
                            checked={this.state.fem2}
                            onPress={() => {this.setState({ 
                                fem2: !this.state.fem2 ,
                            })
                            this.changeInClass(this.state.fem2, 1)
                        }}
                        />
                    </View>
                    {/* ------------------------------------- */}

                    <View style={styles.checkboxContainer}>
                        <CheckBox
                            title='FE ENTC 1'
                            checked={this.state.fee1}
                            onPress={() => {this.setState({ 
                                    fee1: !this.state.fee1 ,
                                })
                                this.changeInClass(this.state.fee1, 1)
                            }}
                        />
                        <CheckBox
                            title='FE ENTC 2'
                            checked={this.state.fee2}
                            onPress={() => {this.setState({ 
                                fee2: !this.state.fee2 ,
                            })
                            this.changeInClass(this.state.fee2, 1)
                        }}
                        />
                    </View>

                    <View style={styles.line}></View>

                    {/* ----------------------------------------- */}
                    {/* ----------------------------------------- */}

                    <View style={styles.checkboxContainer}>
                        <CheckBox
                            center
                            title='SE'
                            checked={this.state.se}
                            onPress={() => {this.setState({ 
                                se:   !this.state.se ,
                            })
                            this.changeInYear(this.state.se, 2)
                        }} 
                        />
                    </View>

                    {/* ----------------------------------------- */}
                    <View style={styles.checkboxContainer}>
                        <CheckBox
                            title='SE COMP 1'
                            checked={this.state.sec1}
                            onPress={() => {this.setState({ 
                                    sec1: !this.state.sec1 ,
                                })
                                this.changeInClass(this.state.sec1, 2)
                            }}
                        />
                        <CheckBox
                            title='SE COMP 2'
                            checked={this.state.sec2}
                            onPress={() => {this.setState({ 
                                    sec2: !this.state.sec2 ,
                                })
                                this.changeInClass(this.state.sec2, 2)
                            }}
                        />
                    </View>

                    <View style={styles.checkboxContainer}>
                        <CheckBox
                            title='SE COMP Second Shift'
                            checked={this.state.secss}
                            onPress={() => {this.setState({ 
                                    secss: !this.state.secss,
                                })
                                this.changeInClass(this.state.secss, 2)
                            }}
                        />
                    </View>

                    {/* ---------------------------------------- */}
                    <View style={styles.checkboxContainer}>
                        <CheckBox
                            title='SE MECH 1'
                            checked={this.state.sem1}
                            onPress={() => {this.setState({ 
                                    sem1: !this.state.sem1,
                                })
                                this.changeInClass(this.state.sem1, 2)
                            }}
                        />
                        <CheckBox
                            title='SE MECH 2'
                            checked={this.state.sem2}
                            onPress={() => {this.setState({ 
                                    sem2: !this.state.sem2,
                                })
                                this.changeInClass(this.state.sem2, 2)
                            }}
                        />
                    </View>
                    {/* ------------------------------------- */}

                    <View style={styles.checkboxContainer}>
                        <CheckBox
                            title='SE ENTC 1'
                            checked={this.state.see1}
                            onPress={() => {this.setState({ 
                                    see1: !this.state.see1,
                                })
                                this.changeInClass(this.state.see1, 2)
                            }}
                        />
                        <CheckBox
                            title='SE ENTC 2'
                            checked={this.state.see2}
                            onPress={() => {this.setState({ 
                                    see2: !this.state.see2,
                                })
                                this.changeInClass(this.state.see2, 2)
                            }}
                        />
                    </View>

                    <View style={styles.line}></View>
                    {/* ----------------------------------------- */}
                    {/* ----------------------------------------- */}
                    <View style={styles.checkboxContainer}>
                        <CheckBox
                            center
                            title='TE'
                            checked={this.state.te}
                            onPress={() => {this.setState({ 
                                te:   !this.state.te ,
                            })
                            this.changeInYear(this.state.te, 3)
                        }} 
                        />
                    </View>

                    {/* ----------------------------------------- */}
                    <View style={styles.checkboxContainer}>
                        <CheckBox
                            title='TE COMP 1'
                            checked={this.state.tec1}
                            onPress={() => {this.setState({ 
                                    tec1: !this.state.tec1,
                                })
                                this.changeInClass(this.state.tec1, 3)
                            }}
                        />
                        <CheckBox
                            title='TE COMP 2'
                            checked={this.state.tec2}
                            onPress={() => {this.setState({ 
                                    tec2: !this.state.tec2,
                                })
                                this.changeInClass(this.state.tec2, 3)
                            }}
                        />
                    </View>

                    <View style={styles.checkboxContainer}>
                        <CheckBox
                            title='TE COMP Second Shift'
                            checked={this.state.tecss}
                            onPress={() => {this.setState({ 
                                tecss: !this.state.tecss,
                                })
                                this.changeInClass(this.state.tecss, 3)
                            }}
                        />
                    </View>

                    {/* ---------------------------------------- */}
                    <View style={styles.checkboxContainer}>
                        <CheckBox
                            title='TE MECH 1'
                            checked={this.state.tem1}
                            onPress={() => {this.setState({ 
                                tem1: !this.state.tem1,
                                })
                                this.changeInClass(this.state.tem1, 3)
                            }}
                        />
                        <CheckBox
                            title='TE MECH 2'
                            checked={this.state.tem2}
                            onPress={() => {this.setState({ 
                                tem2: !this.state.tem2,
                                })
                                this.changeInClass(this.state.tem2, 3)
                            }}
                        />
                    </View>
                    {/* ------------------------------------- */}

                    <View style={styles.checkboxContainer}>
                        <CheckBox
                            title='TE ENTC 1'
                            checked={this.state.tee1}
                            onPress={() => {this.setState({ 
                                tee1: !this.state.tee1,
                                })
                                this.changeInClass(this.state.tee1, 3)
                            }}
                        />
                        <CheckBox
                            title='TE ENTC 2'
                            checked={this.state.tee2}
                            onPress={() => {this.setState({ 
                                tee2: !this.state.tee2,
                                })
                                this.changeInClass(this.state.tee2, 3)
                            }}
                        />
                    </View>

                    <View style={styles.line}></View>
                    {/* ----------------------------------------- */}
                    {/* ----------------------------------------- */}
                    <View style={styles.checkboxContainer}>
                        <CheckBox
                            center
                            title='BE'
                            checked={this.state.be}
                            onPress={() => {this.setState({ 
                                    be:   !this.state.be ,
                                })
                                this.changeInYear(this.state.be, 4)
                            }}  
                        />
                    </View>

                    {/* ----------------------------------------- */}
                    <View style={styles.checkboxContainer}>
                        <CheckBox
                            title='BE COMP 1'
                            checked={this.state.bec1}
                            onPress={() => {this.setState({ 
                                bec1: !this.state.bec1,
                                })
                                this.changeInClass(this.state.bec1, 4)
                            }}
                        />
                        <CheckBox
                            title='BE COMP 2'
                            checked={this.state.bec2}
                            onPress={() => {this.setState({ 
                                bec2: !this.state.bec2,
                                })
                                this.changeInClass(this.state.bec2, 4)
                            }}
                        />
                    </View>

                    <View style={styles.checkboxContainer}>
                        <CheckBox
                            title='BE COMP Second Shift'
                            checked={this.state.becss}
                            onPress={() => {this.setState({ 
                                becss: !this.state.becss,
                                })
                                this.changeInClass(this.state.becss, 4)
                            }}
                        />
                    </View>

                    {/* ---------------------------------------- */}
                    <View style={styles.checkboxContainer}>
                        <CheckBox
                            title='BE MECH 1'
                            checked={this.state.bem1}
                            onPress={() => {this.setState({ 
                                bem1: !this.state.bem1,
                                })
                                this.changeInClass(this.state.bem1, 4)
                            }}
                        />
                        <CheckBox
                            title='BE MECH 2'
                            checked={this.state.bem2}
                            onPress={() => {this.setState({ 
                                bem2: !this.state.bem2,
                                })
                                this.changeInClass(this.state.bem2, 4)
                            }}
                        />
                    </View>
                    {/* ------------------------------------- */}

                    <View style={styles.checkboxContainer}>
                        <CheckBox
                            title='BE ENTC 1'
                            checked={this.state.bee1}
                            onPress={() => {this.setState({ 
                                bee1: !this.state.bee1,
                                })
                                this.changeInClass(this.state.bee1, 4)
                            }}
                        />
                        <CheckBox
                            title='BE ENTC 2'
                            checked={this.state.bee2}
                            onPress={() => {this.setState({ 
                                bee2: !this.state.bee2,
                                })
                                this.changeInClass(this.state.bee2, 4)
                            }}
                        />
                    </View>

                    {/* ----------------------------------------- */}
                    <View style={styles.line}></View>
                    {/* ----------------------------------------- */}

                    <View style={styles.btnWidth}>
                        <Button
                            title="Send Notice"
                            type="solid"
                            raised
                            onPress={() => {
                                console.log('pressed')
                                this.uploadImage()
                            }}
                        />
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    checkboxContainer: {
        flexDirection: "row",
        marginBottom: heigth * 0.02,
    },
    line: {
        borderBottomWidth: 2,
        marginBottom: heigth * 0.02,
        borderBottomColor: '#C1CAD7',
    },
    label: {
        fontSize: heigth * 0.021,
        color: 'black',
        margin: heigth * 0.004,
        padding: heigth * 0.008,
        fontFamily: 'Nunito-Bold',
    },
    headInput: {
        alignSelf: 'center',
        width: width * 0.8,
        height: heigth * 0.07,
        borderRadius: 5,
        fontSize: heigth * 0.02,
        paddingLeft: heigth * 0.02,
        fontFamily: 'Nunito-Bold',
        margin: heigth * 0.02,
        borderRadius:5,
        borderColor:'black',
        borderWidth:1,
    },
    textInput: {
        alignSelf: 'center',
        width: width * 0.8,
        height: heigth * 0.16,
        borderRadius: 5,
        fontSize: heigth * 0.02,
        paddingLeft: heigth * 0.02,
        paddingRight: heigth * 0.02,
        fontFamily: 'Nunito-Bold',
        margin: heigth * 0.02,
        borderRadius:5,
        borderColor:'black',
        borderWidth:1,
    },
    image: {
        marginTop: heigth * 0.045,
        height: heigth * 0.3
    },
    btnWidth: {
        paddingHorizontal: heigth * 0.02,
        marginTop: heigth * 0.04,
        marginBottom: heigth * 0.06
    },
    btnWidth1: {
        paddingHorizontal: heigth * 0.02,
        marginVertical: heigth * 0.03
    },
})