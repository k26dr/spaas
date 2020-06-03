import { StyleSheet } from "react-native";
import { BACKGROUND_COLOR_BLACK_MAT, TEXT_SEPARATOR_STYLE, TEXT_INPUT_SEPARATOR_STYLE, SIGN_UP_TEXT_COLOR, TEXT_INPUT_SEPARATOR_COLOR, FORGET_PASSWORD_TEXT_COLOR, WHITE_TEXT_COLOR, LOCHINVAR_COLOR } from "../../assets/app-color";

export const homeStyle = StyleSheet.create({
    arrowImageStyle: {
        marginLeft: 20,
        alignSelf: "center",
    },
    facebookButtonContainer: {
        height: 50,
        flex: 1,
        backgroundColor: "#4267B2",
        justifyContent: "center"
    },
    facebookButton: {
        alignSelf: "center"
    },
    signUpContainerStyle: {
        height: 40,
        borderRadius: 20,
        backgroundColor: LOCHINVAR_COLOR,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 40,
    },
    signUpButtonTextContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center"
    },
    signUpButtonText: {
        alignSelf: "center",
        fontSize: 18,
        color: WHITE_TEXT_COLOR,
    },
    dontHaveAccountContainerStyle: {
        margin: 20,
        flex: 1,
        flexDirection: "row",
        justifyContent: "center"
    },
    inputContainerStyle: {
        height: 50,
        marginLeft: 20,
        marginRight: 20,
    },
    textInputStyle: {
        flex: 1,
        flexDirection: "row",
        fontSize: 18,
        color: WHITE_TEXT_COLOR
    },
    forgetPasswordContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-end",
        marginRight: 20,
        marginTop: 20
    },
    forgetPasswordButtonStyle: {
        alignSelf: "flex-end"
    },
    forgetPasswordTextStyle: {
        color: FORGET_PASSWORD_TEXT_COLOR
    },
    signupTextStyle: {
        color: SIGN_UP_TEXT_COLOR
    },
    separatorStyle: {
        height: 1,
        backgroundColor: TEXT_INPUT_SEPARATOR_COLOR
    },
    emailLogoStyle: {
        height: "100%",
        width: 20,
        marginRight: 20,
    },
    logo: {
        alignSelf: "center",
        height: 60,
        width: 60,
    },
    container: {
        top: 0,
        flex: 1,
        backgroundColor: BACKGROUND_COLOR_BLACK_MAT
    },
    scrollContainer: {
        flex: 1,
    },
    imgContainer: {
        flexDirection: "row",
        justifyContent: "center",
        height: 200,
    },
    imageView: {
        flex: 1,
    },
    addButtonContainerStyle: {
        alignSelf: "flex-end",
        marginBottom: 20,
        marginRight: 20
    },
    listItemContainerStyle: {
        flex: 1,
        margin: 10,
        height: 50,
        justifyContent: "center"
    },
    listItemStyle: {
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: 'row'
    },
    itemTextStyle: {
        color: "white",
        fontSize: 18
    },
    numberStyle: {
        alignSelf: "center"
    },
    separatoryStyle: {
        height: 1, width: "100%",
        backgroundColor: TEXT_INPUT_SEPARATOR_COLOR
    }
});

