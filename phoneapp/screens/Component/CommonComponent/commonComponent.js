/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
    TouchableOpacity,
    View,
    Image,
    TextInput,
    Text,
} from 'react-native';
import { HMTextInputStyle } from "./commonComponentStyle";
import { IMG_USER, IMG_EYE_SHOW, IMG_ARROW, IMG_RADIO_BUTTON_SELECTED } from '../../../assets/image/imgConst';

export const HMTextInput = (props) => {
    return (
        <View style={HMTextInputStyle.inputContainerStyle}>
            <View style={HMTextInputStyle.textInputStyle}>
                {props.shouldDisplayLeftImage && <Image style={HMTextInputStyle.emailLogoStyle}
                    resizeMode="contain"
                    source={props.imageHolder || IMG_USER} />}
                <TextInput
                    secureTextEntry={props.secureText || false}
                    style={HMTextInputStyle.textInputStyle}
                    placeholderTextColor="#757575"
                    placeholder={props.placeholder || ""}
                    onChangeText={props.onChangeText} />

                {props.secureText && <TouchableOpacity>
                    <Image style={HMTextInputStyle.emailLogoStyle} resizeMode="contain" source={IMG_EYE_SHOW} />
                </TouchableOpacity>}
            </View>
            <View style={HMTextInputStyle.separatorStyle} />
        </View>
    );
}

export const HMButton = (props) => {
    return (
        <View style={HMTextInputStyle.buttonMainContainerStyle}>
            <TouchableOpacity
                style={HMTextInputStyle.buttonTextContainerStyle}
                onPress={props.onPress}>
                <Text style={HMTextInputStyle.buttonTextStyle}>{props.title}</Text>
                {props.displayImage && <Image source={IMG_ARROW} style={HMTextInputStyle.arrowImageStyle} />}
            </TouchableOpacity>
        </View>
    );
}

export const HMRadioButton = (props) => {
    return (
        <View style={props.customContainerStyle || HMTextInputStyle.radioComponentCustomStyle}>
            <TouchableOpacity style={HMTextInputStyle.radioImgContainerStyle || props.customImageViewContainerStyle}>
                <Image style={HMTextInputStyle.radioImageStyle || props.customImageStyle} source={props.imageName || IMG_RADIO_BUTTON_SELECTED}></Image>
            </TouchableOpacity>
            <Text style={HMTextInputStyle.radioTitleStyle || props.customTextStyle}>{props.title}</Text>
        </View >
    );
}