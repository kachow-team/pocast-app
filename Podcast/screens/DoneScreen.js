import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import CreatePodcastButton from "../components/CreatePodcastButton";
import * as React from "react";
import AddPodcastScreen from "./AddPodcastScreen";
import PlusIcon from "../components/PlusIcon";

function DoneScreen({navigation}) {
    return (
        <View style={styles.donationsScreen}>
            <View style={styles.icon}>
                <PlusIcon/>
            </View>
            <Text style={styles.header}>Подкаст добавлен</Text>
            <Text style={styles.text}>Раскажите своим подписчикам о новом подкасте, чтобы получить больше слушателей.</Text>
            <Text style={styles.text}>о новом подкасте, чтобы получить</Text>
            <Text style={styles.text}>больше слушателей.</Text>

            <Text style={styles.text}>подкастами вашего сообщества.</Text>
            <TouchableOpacity
                style={styles.createPodcastButton}
            >
                <CreatePodcastButton/>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    donationsScreen: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        alignItems: 'center',
        justifyContent: 'center'
    },
    createPodcastButton: {
        backgroundColor: "#4986CC",
        borderRadius: 10,
        display: "flex",
        flexDirection: "row",
        padding: 0,
        marginTop: 16
    },
    icon: {
        marginBottom: 12
    },
    header: {

        "fontStyle": "normal",
        "fontWeight": "600",
        "fontSize": 20,
        "lineHeight": 24,
        "textAlign": "center",
        "letterSpacing": 0.38,
        "color": "#000000",
        marginBottom: 12

    },
    text: {
        "fontStyle": "normal",
        "fontWeight": "normal",
        "fontSize": 16,
        "lineHeight": 20,
        "display": "flex",
        "alignItems": "center",
        "textAlign": "center",
        "letterSpacing": -0.32,
        "color": "#818C99"
    }

});


export default DoneScreen;
