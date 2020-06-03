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
    Image,
    TouchableOpacity,
} from 'react-native';
import { IMG_LOGO, IMG_AT_SYMBOL } from '../../assets/image/imgConst';
import { forgotPasswordStyle } from "./forgotPasswordStyle";
import { Actions } from 'react-native-router-flux';
import { HMTextInput, HMButton } from '../Component/CommonComponent/commonComponent';

export default class forgotPassword extends React.Component {
    render() {
        return (
            <View style={forgotPasswordStyle.container}>
                <ScrollView
                    style={forgotPasswordStyle.scrollContainer}>
                    <View style={forgotPasswordStyle.imgContainer}>
                        <Image style={forgotPasswordStyle.logo} source={IMG_LOGO} />
                    </View>

                    <HMTextInput
                        shouldDisplayLeftImage={true}
                        placeholder={"Email"}
                        imageHolder={IMG_AT_SYMBOL} />

                    <HMButton
                        title={"SEND EMAIL"}
                        displayImage={true}
                        onPress={() =>
                            Actions.login()}
                    />
                </ScrollView>
            </View>
        );
    }
}