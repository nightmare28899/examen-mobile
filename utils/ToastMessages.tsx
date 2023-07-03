import { ToastAndroid } from "react-native";

export function ToastMessage(message: string) {
    return ToastAndroid.show(message, ToastAndroid.SHORT);
}