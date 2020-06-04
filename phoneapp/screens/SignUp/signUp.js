/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { signUpStyle } from "./signUpStyle";
import { IMG_LOGO, IMG_AT_SYMBOL, IMG_LOCK, IMG_EYE_SHOW, IMG_ARROW, IMG_USER } from '../../assets/image/imgConst';
import { Actions } from 'react-native-router-flux';
import { HMTextInput, HMButton } from "../Component/CommonComponent/commonComponent";

export default class signup extends React.Component {
  constructor(props){
    super(props);
    this.state={
        firstname : "",
        lastname : "",
        email : "",
        password : ""
    };
  }
validate_data(){
    const {firstname,lastname,email,password}=this.state;
    if(email==""){
        alert("Please fill email.");
        return false;
    }
    else if(password==""){
        alert("Please fill password.");
        return false;
    }
    return true;
}
async api_call(){
    if(this.validate_data()){
        let data = {
            method: 'POST',
            body: JSON.stringify({
              first_name:this.first_name,
              last_namr:this.last_name,
              email: this.state.email,
              password: this.state.password
            }),
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            }
          }
          let resp= fetch('http://api.spaasmobility.com/register', data)
                  .then(response => response.json())  // promise
                  .then((responseJson) => {
                    if(responseJson.user_id){
                        //alert('response:' + responseJson.access_token);
                        try{
                            //AsyncStorage.setItem('IsLogin',true);
                            Actions.home();
                        } catch (error) {
                            // Error saving data
                        }
                    }
                    else{
                        alert('error:' + responseJson.error);
                    }
                    })
                    .catch((error) => {
                        alert(error);
                    });;
    }
  }
  render() {
    return (
      <View style={signUpStyle.container}>
        <ScrollView
          style={signUpStyle.scrollContainer}>
          <View style={signUpStyle.imgContainer}>
            <Image style={signUpStyle.logo} source={IMG_LOGO} />
          </View>

          <HMTextInput
            shouldDisplayLeftImage={true}
            placeholder={"First Name"}
            imageHolder={IMG_USER} 
            onChangeText={(value)=>this.setState({firstname : value})}/>

          <View style={signUpStyle.textInputContainer}>
            <HMTextInput
              shouldDisplayLeftImage={true}
              placeholder={"Last Name"}
              imageHolder={IMG_USER}
              onChangeText={(value)=>this.setState({lastname : value})}/>
          </View>

          <View style={signUpStyle.textInputContainer}>
            <HMTextInput
              shouldDisplayLeftImage={true}
              placeholder={"Email"}
              imageHolder={IMG_AT_SYMBOL}
              onChangeText={(value)=>this.setState({email : value})}/>
          </View>

          <View style={signUpStyle.textInputContainer}>
            <HMTextInput
              shouldDisplayLeftImage={true}
              secureText={true}
              placeholder={"Password"}
              imageHolder={IMG_LOCK}
              onChangeText={(value)=>this.setState({password : value})}/>
          </View>

          <HMButton title={"SIGN UP"} displayImage={true}
            onPress={() =>this.api_call()} />

          <View style={signUpStyle.dontHaveAccountContainerStyle}>
            <Text style={signUpStyle.forgetPasswordTextStyle}>Already a member ? </Text>
            <TouchableOpacity style={signUpStyle.forgetPasswordButtonStyle}
              onPress={() => Actions.pop()}
            >
              <Text style={signUpStyle.signupTextStyle}>Log in</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </View>
    );
  }
}
