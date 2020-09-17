import {KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import CreatePodcastButton from "../components/CreatePodcastButton";
import * as React from "react";
import {useState} from 'react';
import AddPodcastScreen from "./AddPodcastScreen";
import PlusIcon from "../components/PlusIcon";
import AudioLine from "../components/AudioLine";
import PlusBlueButton from "../components/PlusBlueButton";
import RemoveCircle from "../components/RemoveSircle";

function AudioEditScreen({navigation}) {
    const [timecodes, changetimecodes] = useState([]);
    const addCode = () => {
        changetimecodes(timecodes.concat(Math.random() * 1000000000000000000));
    };
    const removeCode = (code) => {
        changetimecodes(
            timecodes.filter((item) => item !== code)
        )
    };

    return (
        <View style={styles.audioeditscreen}>
            <View style={{marginTop: 12}}>
                <AudioLine/>
            </View>
            <View style={{marginTop: 12, width: '100%', marginLeft: 12}}>
                <Text style={styles.header}>Таймкоды</Text>
                <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10, marginTop: 10}}>
                    <View style={{marginRight: 24}}>
                        <TouchableOpacity onPress={() => {
                            addCode();
                        }}>
                            <PlusBlueButton/>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.blueText} onPress={() => {
                        addCode();
                    }}>Добавить таймкод</Text>
                </View>
                {timecodes.map((item) =>
                    <View key={item} style={{flexDirection: 'row', alignItems: 'center'}}>
                        <TouchableOpacity onPress={() => {
                            removeCode(item);
                        }}>
                        <View style={{marginBottom: 10}}>
                            <RemoveCircle/>
                        </View>
                        </TouchableOpacity>
                        <TextInput
                            style={{
                                ...styles.textInput,
                                width: '60%'
                            }}
                            placeholder="Название"
                        />
                        <TextInput
                            style={{
                                ...styles.textInput,
                                width: '20%'
                            }}
                            placeholder="Время"
                        />
                    </View>
                )}

                <Text>Отметки времени с названием темы. Позволяют слушателям легче путешествовать по подкасту.</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    audioeditscreen: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginLeft: 4,
        marginRight: 4
    },
    createPodcastButton: {
        backgroundColor: "#4986CC",
        borderRadius: 10,
        display: "flex",
        flexDirection: "row",
        padding: 0,
        marginTop: 16
    },
    header: {

        "fontStyle": "normal",
        "fontWeight": "600",
        "fontSize": 13,
        "lineHeight": 16,
        "letterSpacing": -0.078,
        "textTransform": "uppercase",
        "color": "#818C99",
        "width": "100%"

    },
    textInput: {
        marginLeft: '5.5%',
        "backgroundColor": "#F2F3F5",
        "borderWidth": 0.5,
        "borderColor": "rgba(0, 0, 0, 0.12)",
        "borderStyle": "solid",
        "borderTopLeftRadius": 10,
        "borderTopRightRadius": 10,
        "borderBottomRightRadius": 10,
        "borderBottomLeftRadius": 10,
        "height": 40,
        "paddingLeft": 12,
        marginBottom: 12,

    },
    blueText: {
        "fontStyle": "normal",
        "fontWeight": "normal",
        "fontSize": 16,
        "lineHeight": 20,
        "letterSpacing": -0.32,
        "color": "#3F8AE0"
    }

});


export default AudioEditScreen;
