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
            device: props
        }
        this.manager = new BleManager();
        this.connectedDevice = null;
        this.uart_listener = null;
    }
    render() {
        return (
            <View style={unlockDeviceStyle.container}>
                <HMButton
                    title={"UNLOCK DEVICE"}
                    displayImage={false}
                    onPress={this.unlockBleDevice.bind(this)}
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
        const UART_RX_UUID = "6e400003-b5a3-f393-e0a9-e50e24dcca9e";
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

        setTimeout(() => {
            console.log("stop device scan")
            this.manager.stopDeviceScan();
        }, 10000);

        this.manager.startDeviceScan(null, null, async (error, device) => {
            if (error) {
                // Handle error (scanning will be stopped automatically)
                return;
            }

            if (device.id == this.state.device.ble_device_id) {
                console.log("found device")
                this.manager.stopDeviceScan()

                // Connect to device
                await device.connect()
                    .then(device => device.discoverAllServicesAndCharacteristics() )
                    .catch(console.log);
                this.connectedDevice = device;

                // Listen for response
                this.uart_listener = device.monitorCharacteristicForService(UART_SERVICE_UUID, UART_RX_UUID, (error, ch) => {
                    if (error) { console.log(error); return; }
                    const message = Buffer.from(ch.value, 'base64').toString('utf8');
                    console.log("RX: " + message);
                });

                // Send unlock message
                const message = Buffer.from(UNLOCK_PASSWORD, 'utf8').toString('base64');
                const tx_char = await device.writeCharacteristicWithoutResponseForService(UART_SERVICE_UUID, UART_TX_UUID, message);
                console.log("Sent TX: " + tx_char.value);
            }
            return;
        });

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
        if (this.uart_listener)
            this.uart_listener.remove();
        if (this.manager)
            this.manager.destroy()
    }
}
