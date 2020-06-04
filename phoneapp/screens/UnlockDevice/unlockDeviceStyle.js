import { StyleSheet } from "react-native";
import { WHITE_TEXT_COLOR, BACKGROUND_COLOR_BLACK_MAT, RED_COLOR, ORANGE_COLOR, YELLOW_COLOR } from "../../assets/app-color";

export const unlockDeviceStyle = StyleSheet.create({
    container: {
        height: "100%",
        flex: 1,
        backgroundColor: BACKGROUND_COLOR_BLACK_MAT,
        justifyContent: "center",
    },
    connectedText: {
        color: "white",
        fontSize: 18,
        textAlign: 'center'
    }
});
