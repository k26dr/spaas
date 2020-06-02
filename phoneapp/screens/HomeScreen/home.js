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
    Image,
    FlatList,
    TouchableOpacity,
} from 'react-native';
import { IMG_NUMBER1, IMG_ADD } from '../../assets/image/imgConst';
import { homeStyle } from "./homeStyle";
import { TEXT_INPUT_SEPARATOR_COLOR } from '../../assets/app-color';
import { Actions } from 'react-native-router-flux';

export default class home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            DEVICE_LIST: []
        };
    }
    async api_call(){
        //if(this.validate_data()){
            let data = {
                method: 'GET',
                body: null,
                headers: {
                  'Content-Type': 'application/json',
                  'SPAAS-ACCESS-TOKEN':global.ACCESS_TOKEN
                }
              }
              let resp= fetch('http://api.spaasmobility.com/devices', data)
                      .then(response => response.json())  // promise
                      .then((responseJson) => {
                        if(responseJson){
                            try{
                                this.setState(
                                    {
                                        DEVICE_LIST: responseJson,
                                    },
                                );                     
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
        //}
    }
    renderList(item) {
        return (
            <TouchableOpacity style={homeStyle.listItemContainerStyle}
                onPress={() => Actions.unlockDevice(item)}
            >
                <View style={homeStyle.listItemStyle}>
                    <Text style={homeStyle.itemTextStyle}>{item.display_name}</Text>
                    <Image style={homeStyle.numberStyle} source={IMG_NUMBER1} />
                </View>
                <View style={homeStyle.separatorStyle}></View>
            </TouchableOpacity>
        );
    }

    render() {
        this.api_call();
        return (
            <View style={homeStyle.container}>
                <FlatList
                    data={this.state.DEVICE_LIST}
                    renderItem={({ item }) => this.renderList(item)}
                    keyExtractor={item => item.id}
                />
                <TouchableOpacity
                    style={homeStyle.addButtonContainerStyle}
                    onPress={() => Actions.addDevice()}
                >
                    <Image source={IMG_ADD} />
                </TouchableOpacity>
            </View>
        );
    }
}
