import { ActivityIndicator, Modal, StyleSheet, View } from "react-native";



export default function LoadingModal() 
{
    return (
        <Modal animationType="fade" presentationStyle="overFullScreen" transparent={true}>
            <View style={styles.background}></View>
            <View style={styles.loadingView}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        </Modal>
    );
}


const styles = StyleSheet.create({
    loadingView: {
        position: "absolute",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
    background: {
        backgroundColor: "grey",
        opacity: 0.5,
        width: "100%",
        height: "100%",
    }
});