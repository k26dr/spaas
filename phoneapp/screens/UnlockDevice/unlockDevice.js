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
    PermissionsAndroid
} from 'react-native';
import { unlockDeviceStyle } from "./unlockDeviceStyle";
import { HMTextInput, HMButton } from '../Component/CommonComponent/commonComponent';
import { Actions } from 'react-native-router-flux';
import { BleManager } from "react-native-ble-plx";
import { Buffer } from "buffer";

export default class unlockDevice extends React.Component {
    constructor(props) {
        super(props);
        this.requestCoarseLocationPermission();
        this.state = {
            device: props,
            connected: 0, // 0=no, 1=yes, 2=failed
            is_ble_device_id:false
        }
        this.manager = new BleManager();
        this.connectedDevice = null;
        this.uart_listener = null;
        this.stopscantimer = null;

        this.manager.startDeviceScan(null, null, async (error, device) => {
            const UART_SERVICE_UUID = "6e400001-b5a3-f393-e0a9-e50e24dcca9e";
            const UART_RX_UUID = "6e400003-b5a3-f393-e0a9-e50e24dcca9e";
            const UNLOCK_PASSWORD = "wigglemelegs\n";

            if (error) {
                // Handle error (scanning will be stopped automatically)
                return;
            }

            if (device.id == this.state.device.ble_device_id) {
                this.state.is_ble_device_id=true;
                console.log("found device")
                this.manager.stopDeviceScan()

                // Connect to device
                await device.connect()
                    .then(device => device.discoverAllServicesAndCharacteristics() )
                    .catch(console.log);
                this.connectedDevice = device;
                this.setState({ ...this.state, connected: 1 })

                // Listen for response
                this.uart_listener = device.monitorCharacteristicForService(UART_SERVICE_UUID, UART_RX_UUID, (error, ch) => {
                    if (error) { console.log(error); return; }
                    const message = Buffer.from(ch.value, 'base64').toString('utf8');
                    console.log("RX: " + message);
                });
            }
            else{
                this.state.is_ble_device_id=false;
            }
            return;
        });

        this.stopscantimer = setTimeout(() => {
            console.log("stop device scan")
            if (this.state.connected === 0)
                this.setState({ ...this.state, connected: 2 })
            this.manager.stopDeviceScan();
        }, 5000);


    }

    connectedText() {
        if (this.state.connected === 0) 
            return "Connecting..."
        else if (this.state.connected === 1) 
            return "Connected" 
        else if (this.state.connected === 2) 
            return "Failed to connect. Go back and try again." 
    }
    render() {
        return (
            <View style={unlockDeviceStyle.container}>
                <Text style={unlockDeviceStyle.connectedText}>{this.connectedText()}</Text>                
                <HMButton
                    title={this.state.is_ble_device_id?"TOGGLE LIGHT":"UNLOCK DEVICE"}
                    displayImage={false}
                    onPress={this.state.is_ble_device_id?Actions.pop():this.unlockBleDevice.bind(this)}
                />
                <HMButton
                    title={"FORGET DEVICE"}
                    displayImage={false}
                    onPress={() =>
                        Actions.pop()}
                />
            </View>
        );
    }
    async unlockBleDevice (e) {
        const UART_SERVICE_UUID = "6e400001-b5a3-f393-e0a9-e50e24dcca9e";
        const UART_TX_UUID = "6e400002-b5a3-f393-e0a9-e50e24dcca9e";
        const UNLOCK_PASSWORD = "wigglemelegs\n";

        console.log("unlock triggered")

        if (this.connectedDevice) {
            // Send unlock message
            const device = this.connectedDevice;
            const message = Buffer.from(UNLOCK_PASSWORD, 'utf8').toString('base64');
            const tx_char = await device.writeCharacteristicWithoutResponseForService(UART_SERVICE_UUID, UART_TX_UUID, message);
            console.log("Sent TX: " + tx_char.value);
            return;
        }

    }
    async requestCoarseLocationPermission() {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
                {
                    title: 'SPAAS Coarse Location Permission',
                    message:
                    'SPAAS needs access to your coarse location ' +
                    'so it can locate your helmet.',
                    buttonNegative: 'Deny',
                    buttonPositive: 'OK',
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('You can use coarse location');
            } else {
                console.log('Coarse location permission denied');
            }
        } catch (err) {
            console.warn(err);
        }
    }
    async componentWillUnmount() {
        if (this.stopscantimer)
            clearTimeout(this.stopscantimer);
        if (this.uart_listener)
            this.uart_listener.remove();
        if (this.manager)
            this.manager.destroy()
    }
}
