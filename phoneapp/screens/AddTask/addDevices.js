/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
    ScrollView,
    View,
    Text,
    Alert,
} from 'react-native';
import { addDevicesStyle } from "./addDevicesStyle";
import { HMTextInput, HMButton } from '../Component/CommonComponent/commonComponent';
import { Actions } from 'react-native-router-flux';
export default class addDevices extends React.Component {    
    constructor(props){
        super(props);
        this.state={
            code : ""
        };
    }
    validate_data(){
        const {code}=this.state;
        if(code==""){
            alert("Please fill device code.");
            return false;
        }
        return true;
    }
    async api_call(){
        if(this.validate_data()){
            let data = {
                method: 'POST',
                body: null,
                headers: {
                  'Content-Type': 'application/json',
                  'SPAAS-ACCESS-TOKEN':global.ACCESS_TOKEN
                }
              }
              let resp= fetch('http://api.spaasmobility.com/device/'+this.state.code, data)
                      .then(response => response.json())  // promise
                      .then((responseJson) => {
                        if(responseJson.success){
                            try{
                                //this.add_device(responseJson);
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
    async getToken() {
        try {
            const access_token = await AsyncStorage.getItem('access_token');
          alert(access_token);
        } catch (error) {
          alert("Something went wrong");
        }
      }
    add_device_local_storage(responseJson){
        global.DEVICE_LIST.push({
            ble_device_id: responseJson.ble_device_id,
            display_name: responseJson.display_name,
            device_type: responseJson.device_type,
            code: responseJson.code,
        });
        Actions.home();
    }
    render() {
        //this.getToken();
        return (
            <View style={addDevicesStyle.container}>
                <ScrollView
                    style={addDevicesStyle.scrollContainer}>
                    <View style={addDevicesStyle.taskContainer}>
                        <Text style={addDevicesStyle.addTasktextStyle}>Device Code</Text>
                        <HMTextInput
                            placeholder={"6-Character Device Code"}
                            shouldDisplayLeftImage={false}
                            onChangeText={(value)=>this.setState({code : value})} />
                    </View>
                    <HMButton
                        title={"ADD"}
                        displayImage={false}
                        onPress={() => this.api_call()} />
                </ScrollView>
            </View>
        );
    }
}
