/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    Image,
    TextInput,
    StatusBar,
    TouchableOpacity,
} from 'react-native';
import { IMG_LOGO, IMG_FB, IMG_ARROW, IMG_AT_SYMBOL, IMG_LOCK, IMG_EYE_SHOW,IMG_EYE_HIDE } from '../../assets/image/imgConst';
import { loginStyle } from "./loginStyle";
import { Actions,ActionConst } from 'react-native-router-flux';
import { HMTextInput, HMButton } from '../Component/CommonComponent/commonComponent';
import { AsyncStorage } from 'react-native';

export default class login extends React.Component {
    constructor(props){
        super(props);
        this.state={
            username : "",
            password : "",
            password_visibility:false
        };
    }
    async storeToken(access_token) {
        try {
            await AsyncStorage.setItem('access_token', access_token);
            alert(access_token);
        } catch (error) {
          alert("Something went wrong", error);
        }
      }
    validate_data(){
        const {username,password}=this.state;
        if(username==""){
            alert("Please fill username.");
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
                  email: this.state.username,
                  password: this.state.password
                }),
                headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'
                }
              }
              let resp= fetch('http://api.spaasmobility.com/login', data)
                      .then(response => response.json())  // promise
                      .then((responseJson) => {
                        if(responseJson.access_token){
                            //alert('response:' + responseJson.access_token);
                            try{
                                //this.storeToken(responseJson.access_token);
                               global.ACCESS_TOKEN=responseJson.access_token;

                               Actions.userFlow({ type: ActionConst.RESET });
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
    showHidePassword(){        
        this.setState({password_visibility : !this.state.password_visibility});        
    }
    render() {
        return (
            <View style={loginStyle.container}>
                <ScrollView
                    style={loginStyle.scrollContainer}>
                    <View style={loginStyle.imgContainer}>
                        <Image style={loginStyle.logo} source={IMG_LOGO} />
                    </View>

                    <HMTextInput
                        shouldDisplayLeftImage={true}
                        placeholder={"Email"}
                        imageHolder={IMG_AT_SYMBOL}
                        onChangeText={(value)=>this.setState({username : value})} />

                    <View style={loginStyle.passwordTextContainer}>
                        <HMTextInput
                            shouldDisplayLeftImage={true}
                            secureText={!this.state.password_visibility}
                            placeholder={"Password"}
                            imageHolder={IMG_LOCK}
                            onChangeText={(value)=>this.setState({password : value})}
                            onPress={()=>this.showHidePassword()}
                            rightImage={this.state.password_visibility? IMG_EYE_SHOW:IMG_EYE_HIDE} />
                    </View>

                    <View style={loginStyle.forgetPasswordContainer}>
                        <TouchableOpacity style={loginStyle.forgetPasswordButtonStyle}
                            onPress={() => Actions.forgotPassword()}
                        >
                            <Text style={loginStyle.forgetPasswordTextStyle}>Forgot Password?</Text>
                        </TouchableOpacity>
                    </View>

                    <HMButton
                        title={"SIGN IN"}
                        displayImage={true}
                        onPress={() =>this.api_call()}
                    />

                    <View style={loginStyle.dontHaveAccountContainerStyle}>
                        <Text style={loginStyle.forgetPasswordTextStyle}>Don't have an account? </Text>
                        <TouchableOpacity style={loginStyle.forgetPasswordButtonStyle}
                            onPress={() => Actions.signup()}
                        >
                            <Text style={loginStyle.signupTextStyle}>Sign up</Text>
                        </TouchableOpacity>
                    </View>

                </ScrollView>
            </View>
        );
    }
}
