import { StyleSheet } from "react-native";
import { WHITE_TEXT_COLOR, BACKGROUND_COLOR_BLACK_MAT, RED_COLOR, ORANGE_COLOR, YELLOW_COLOR } from "../../assets/app-color";

export const addDevicesStyle = StyleSheet.create({
    container: {
        height: "100%",
        flex: 1,
        backgroundColor: BACKGROUND_COLOR_BLACK_MAT
    },
    scrollContainer: {
        flex: 1,
    },
    taskContainer: {
        marginTop: 25,
        flex: 1,
    },
    addTasktextStyle: {
        marginLeft: 20,
        fontSize: 18,
        color: WHITE_TEXT_COLOR,
        marginBottom: 10
    },
    priorityTextStyle: {
        marginTop: 20,
        marginLeft: 20,
        fontSize: 18,
        color: WHITE_TEXT_COLOR,
    },
    radioComponentColorStyle1: {
        flexDirection: "row",
        flex: 1,
        backgroundColor: RED_COLOR,
    },
    radioComponentColorStyle2: {
        flexDirection: "row",
        flex: 1,
        backgroundColor: ORANGE_COLOR,
    },
    radioComponentColorStyle3: {
        flexDirection: "row",
        flex: 1,
        backgroundColor: YELLOW_COLOR
    },
    radioButtonsContainer: {
        flex: 1,
        margin: 20,
        height: 60,
        flexDirection: "row"
    }
});