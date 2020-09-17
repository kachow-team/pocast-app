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
    const [timecodes, changetimecodes] = useState([1]);

    return (
        <View style={styles.donationsScreen}>
            <View style={styles.icon}>
                <AudioLine/>
            </View>
            <View>
                <Text style={styles.header}>Таймкоды</Text>
                <View style={{flexDirection: 'row', alignItems: 'center', marginBottom:10, marginTop: 10}}
                onPress={() => {
                    let a = timecodes.push(1);
                    changetimecodes(a);
                }}
                >
                    <View style={{marginRight: 24}}>
                    <PlusBlueButton onPress={() => {
                        let a = timecodes.push(1);
                        changetimecodes([1,2,3]);
                    }}/>
                    </View>
                    <Text onPress={() => {
                        let a = timecodes.push(1);
                        changetimecodes([1,2,3]);
                    }}>Добавить таймкод</Text>
                </View>
                {timecodes.map((item) =>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <View style={{marginBottom: 10}}>
                        <RemoveCircle/>
                        </View>
                        <TextInput
                            style={{...styles.textInput,
                            width:'60%'
                            }}
                            placeholder="Название"
                        />
                        <TextInput
                            style={{...styles.textInput,
                                width:'20%'
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
    donationsScreen: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        alignItems: 'center',
        justifyContent: 'center',
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
        "color": "#818C99"

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

    }

});


export default AudioEditScreen;
