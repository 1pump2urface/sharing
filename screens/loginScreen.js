
import React from 'react';
import { StyleSheet, Text, View, Image, KeyboardAvoidingView, TextInput, TouchableOpacity, Alert, Modal,ScrollView } from 'react-native';
import * as firebase from "firebase"
import db from "../config"




export default class LoginScreen extends React.Component {
    constructor(){
        super();
        this.state ={
            emailid:"",
            password:"",
            firstName:"",
            lastName:"",
            address:"",
            contact:"",
            confirmPassword:"",
            isModalVisible:false

        }
    }
    showModal=()=>{
        return (
            <Modal
            animationType= "fade"
            transparent={true}
            visible={this.state.isModalVisible}
            >
                <View style = {styles.modalContainer} >
                    <ScrollView style = {{width:"100%"}}>
                        <KeyboardAvoidingView style ={styles.KeyboardAvoidingView}>
                            <Text style = {styles.modalTitle}>
                                Registration Form
                            </Text>
                            <TextInput style = {styles.formTextInput}
                            placeholder={"first name"}
                            maxLength = {8}
                            onChangeText = {()=>{
                                this.setState({
                                    firstName:text

                                })
                            }}/>
                              <TextInput style = {styles.formTextInput}
                            placeholder={"last name"}
                            maxLength = {8}
                            onChangeText = {()=>{
                                this.setState({
                                    lastName:text
                                    
                                })
                            }}/>
                              <TextInput style = {styles.formTextInput}
                            placeholder={"contact"}
                            maxLength = {10}
                            keyboardType = {"numeric"}
                            onChangeText = {()=>{
                                this.setState({
                                    contact:text
                                    
                                })
                            }}/>
                              <TextInput style = {styles.formTextInput}
                            placeholder={"address"}
                           multiline = {true}
                            onChangeText = {()=>{
                                this.setState({
                                    address:text
                                    
                                })
                            }}/>
                              <TextInput style = {styles.formTextInput}
                            placeholder={"emailid"}
                            keyboardType = {"email-address"}
                          
                            onChangeText = {(text)=>{
                                this.setState({
                                    emailid:text
                                    
                                })
                            }}/>
                              <TextInput style = {styles.formTextInput}
                            placeholder={"password"}
                            secureTextEntry = {true}
                            onChangeText = {(text)=>{
                                this.setState({
                                    password:text
                                    
                                })
                            }}/>
                              <TextInput style = {styles.formTextInput}
                            placeholder={"confirm password"}
                            secureTextEntry = {true}
                            onChangeText = {(text)=>{
                                this.setState({
                                    confirmPassword:text
                                    
                                })
                            }}/>
                            <View>
                                <TouchableOpacity style = {styles.registerButton} onPress = {()=>{
                                    this.signup(this.state.emailid,this.state.password,this.state.confirmPassword)
                                }}>
                                    <Text style = {styles.registerButtonText}>
                                        Register
                                    </Text>
                                </TouchableOpacity>

                            </View>
                            <View>
                                <TouchableOpacity style = {styles.cancelButton} onPress = {()=>{
                                    this.setState({
                                        isModalVisible:false
                                    })
                                }}>
                                    <Text style = {styles.registerButtonText}>
                                        Register
                                    </Text>
                                </TouchableOpacity>

                            </View>
                             
                        </KeyboardAvoidingView>


                    </ScrollView>

                </View>
              </Modal>

           
        )
    }
    signup = (emailid,password, confirmPassword)=>{
        if(password!==confirmPassword){
            return Alert.alert("password doesn't match")
        }
        else{
            

        
        firebase.auth().createUserWithEmailAndPassword(emailid,password).then(()=>{
            db.collection("users").add({
                firstName:this.state.firstName , lastName:this.state.lastName , contact:this.state.contact, emailid:this.state.emailid,address:this.state.address
            })
            return Alert.alert( 'User Added Successfully', '', [ {text: 'OK', onPress: () => this.setState({"isModalVisible" : false})}, ] ); })
        .catch(function(error){
            var errorCode = error.code
            var errorMessage = error.errorMessage
            return Alert.alert(errorMessage)
        })
    }}
    login = (emailid,password)=>{
        firebase.auth().signInWithEmailAndPassword(emailid,password).then(()=>{
            return Alert.alert("successfully logged in")
        })

        .catch(function(error){
            var errorCode = error.code
            var errorMessage = error.errorMessage
            return Alert.alert(errorMessage)
        })
                
            
        }
      
    
  render(){
    return (

          <View style = {styles.container}>
              <View style = {{justifyContent:"center" , alignItems: "center"}}> 
                {this.showModal()}
              </View>
            <View style = {styles.profileContainer}>
                <Text style = {styles.title}>Book Santa</Text>
            </View>
          <View style = {styles.buttonContainer}>
              <TextInput style = {styles.loginBox}
              placeholder = "abc@example.com"
              keyboardType = "email-address"
              onChangeText= {(text)=>{
            emailid: text
              }}/>
               <TextInput style = {styles.loginBox}
              placeholder = "Enter Password"
              secureTextEntry = {true}
              onChangeText= {(text)=>{
            password: text
              }}/>
          
          
              <TouchableOpacity style = {[styles.button,{marginBottom:20,marginTop:20}]}
              onPress = {()=>{this.login(this.state.emailid,this.state.password)}}>
                  <Text style = {styles.buttonText}>
                      Login

                  </Text>
              </TouchableOpacity>
              <TouchableOpacity style = {[styles.button,{marginBottom:20,marginTop:20}]}
              onPress = {()=>{this.setState({isModalvisible:true})}}>
                  <Text style = {styles.buttonText}>
                      Sign Up

                  </Text>
              </TouchableOpacity>
          </View>

        
</View>
      
    );
  }
}
const styles = StyleSheet.create({ 
    container:{ flex:1, backgroundColor:'#F8BE85', alignItems: 'center', justifyContent: 'center' },
     profileContainer:{ flex:1, justifyContent:'center', alignItems:'center', }, 
     title :{ fontSize:65, fontWeight:'300', paddingBottom:30, color : '#ff3d00' },
      loginBox:{ width: 300, height: 40, borderBottomWidth: 1.5, borderColor : '#ff8a65', fontSize: 20, margin:10, paddingLeft:10 },
       KeyboardAvoidingView:{ flex:1, justifyContent:'center', alignItems:'center' },
        modalTitle :{ justifyContent:'center', alignSelf:'center', fontSize:30, color:'#ff5722', margin:50 }, 
        modalContainer:{ flex:1, borderRadius:20, justifyContent:'center', alignItems:'center', backgroundColor:"#ffff",
         marginRight:30, marginLeft : 30, marginTop:80, marginBottom:80, }, 
         formTextInput:{ width:"75%", height:35, alignSelf:'center', borderColor:'#ffab91', borderRadius:10, borderWidth:1, marginTop:20, padding:10 }, 
         registerButton:{ width:200, height:40, alignItems:'center', justifyContent:'center', borderWidth:1, borderRadius:10, marginTop:30 },
          registerButtonText:{ color:'#ff5722', fontSize:15, fontWeight:'bold' }, 
          cancelButton:{ width:200, height:30, justifyContent:'center', alignItems:'center', marginTop:5, },
           button:{ width:300, height:50, justifyContent:'center', alignItems:'center', borderRadius:25, backgroundColor:"#ff9800", shadowColor: "#000", 
           shadowOffset: { width: 0, height: 8, }, shadowOpacity: 0.30, shadowRadius: 10.32, elevation: 16, padding: 10 }, 
           buttonText:{ color:'#ffff', fontWeight:'200', fontSize:20 } })
    
