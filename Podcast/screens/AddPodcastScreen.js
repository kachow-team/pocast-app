import React, { Component } from 'react';
import { useState, useEffect } from 'react';
import { Button, View, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import CheckBox from '@react-native-community/checkbox';
import PickerIcon from '../icons/PickerIcon';
import DocumentPicker from 'react-native-document-picker';
import ImageIcon from '../components/ImageIcon';
import UploadFileButton from '../components/UploadFileButton';
import EditAudioButton from '../components/EditAudioButton';
import NextButton from '../components/NextButton';

class AddPodcastScreen extends React.Component {
    state = {
        pickedFile: null,
        inappropriateContent: false,
        excludeEpisode: false,
        podcastTrailer: false,
        availability: 'Всем пользователям',
        podcastName: '',
        podcastDescription: ''
    };
    async pickAudio() {
        try {
            const res = await DocumentPicker.pick({
              type: [DocumentPicker.types.audio],
            });
            console.log(
              res.uri,
              res.type, // mime type
              res.name,
              res.size
            );
            this.setState({pickedFile: {uri: res.uri, name: res.name}});
          } catch (err) {
            if (DocumentPicker.isCancel(err)) {
              // User cancelled the picker, exit any dialogs or menus and move on
            } else {
              throw err;
            }
          }
    }
    render() {
        return (
            <View style={styles.screen}>
                <View
                    style={{
                        marginHorizontal: 20,
                        marginVertical: 20,
                        flexDirection: 'row'
                    }}>
                    <TouchableOpacity>
                        <ImageIcon />
                    </TouchableOpacity>
                    <View>
                        <Text style={{marginLeft: 13, marginBottom: 10, ...styles.text}}>Название</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Введите наззвание подкаста"
                            onChangeText={value => this.setState({podcastName: value})}
                        />
                    </View>
                </View>
                <Text style={{...styles.text, marginLeft: 20, marginBottom: 12}}>Описание подкаста</Text>
                <TextInput
                    style={{...styles.textInput, marginRight: 20}}
                    multiline={true}
                    onChangeText={value => this.setState({podcastDescription: value})}
                />
                {this.state.pickedFile == null ?
                    <View
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                        <Text style={{...styles.header, marginTop: 30}}>Загрузите Ваш подкаст</Text>
                        <Text style={{...styles.text2, marginHorizontal: 15, marginBottom: 20}}>Выберите готовый аудиофайл из Вашего телефона и добавьте его</Text>
                        <TouchableOpacity onPress={() => {this.pickAudio()}}>
                            <UploadFileButton />
                        </TouchableOpacity>
                    </View>
                :
                    <View
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                        <Text style={{...styles.header, marginTop: 30}}>{this.state.pickedFile.name}</Text>
                        <Text style={{...styles.text2, marginHorizontal: 15, marginBottom: 20}}>Вы можете добавить таймкоды и скорректировать подкаст в режиме редактирования</Text>
                        <TouchableOpacity onPress={() => {this.props.navigation.navigate('AudioEditScreen', this.state.pickedFile)}}>
                            <EditAudioButton />
                        </TouchableOpacity>
                    </View>
                }
                <View
                    style={{
                        flexDirection: 'row',
                        marginTop: 20
                    }}>
                    <CheckBox
                        value={this.state.inappropriateContent}
                        onValueChange={(newValue) => {this.setState({inappropriateContent: newValue})}}
                    />
                    <Text>Ненормативный контент</Text>
                </View>
                <View
                    style={{
                        flexDirection: 'row'
                    }}>
                    <CheckBox
                        value={this.state.excludeEpisode}
                        onValueChange={(newValue) => {this.setState({excludeEpisode: newValue})}}
                    />
                    <Text>Исключить эпизод из экспорта</Text>
                </View>
                <View
                    style={{
                        flexDirection: 'row'
                    }}>
                    <CheckBox
                        value={this.state.podcastTrailer}
                        onValueChange={(newValue) => {this.setState({podcastTrailer: newValue})}}
                    />
                    <Text>Трейлер подкаста</Text>
                </View>
                <RNPickerSelect
                    style={pickerSelectStyles}
                    useNativeAndroidPickerStyle={false}
                    items={[
                        {label: 'Всем пользователям', value: 'Всем пользователям'},
                        {label: 'Только друзьям', value: 'Только друзьям'},
                        {label: 'Только мне', value: 'Только мне'},
                    ]}
                    onValueChange={value => {this.setState({availability: value})}}
                    value={this.state.availability}
                    Icon={() => (<PickerIcon />)}
                />
                {this.state.availability == 'Всем пользователям' && <Text>При публикации записи с эпизодом, он становится доступным для всех пользователей</Text>}
                {this.state.availability == 'Только друзьям' && <Text>При публикации записи с эпизодом, он становится доступным только для друзей</Text>}
                {this.state.availability == 'Только мне' && <Text>При публикации записи с эпизодом, он становится доступным только Вам</Text>}
                <View style={{marginHorizontal:20}}>
                <TouchableOpacity onPress={() => {this.props.navigation.navigate('DoneScreen', {podcastName: this.state.podcastName, podcastDescription: this.state.podcastDescription})}}>
                    <NextButton />
                </TouchableOpacity>
                </View>
            </View>
        );
    }
};

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
    marginLeft: '5.5%',
      "backgroundColor": "#F2F3F5",
      "borderWidth": 0.5,
      "borderColor": "rgba(0, 0, 0, 0.12)",
      "borderStyle": "solid",
      "borderTopLeftRadius": 10,
      "borderTopRightRadius": 10,
      "borderBottomRightRadius": 10,
      "borderBottomLeftRadius": 10,
      "width": '88%',
      "height": 40,
      "paddingLeft": 15,
      marginBottom: 30,
      paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
      marginLeft: '5.5%',
      "backgroundColor": "#F2F3F5",
      "borderWidth": 0.5,
      "borderColor": "rgba(0, 0, 0, 0.12)",
      "borderStyle": "solid",
      "borderTopLeftRadius": 10,
      "borderTopRightRadius": 10,
      "borderBottomRightRadius": 10,
      "borderBottomLeftRadius": 10,
      "width": '88%',
      "height": 40,
      "paddingLeft": 15,
      marginBottom: 30,
      paddingRight: 30, // to ensure the text is never behind the icon,
      color: 'black'
    }
});

const styles = StyleSheet.create({
    iconContainer: {
      top: 8,
      right: 34,
    },
    screen: {
        backgroundColor: "#FFFFFF"
    },
    text: {
        //fontFamily: SF Pro Text;
        'fontStyle': 'normal',
        'fontWeight': 'normal',
        'fontSize': 14,
        'lineHeight': 18,
        /* identical to box height, or 129% */
        'letterSpacing': -0.154,
        /* Light Text / Subhead */
        'color': '#6D7885'
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
    text2: {
        //font-family: SF Pro Text;
        'fontStyle': 'normal',
        'fontWeight': 'normal',
        'fontSize': 16,
        'lineHeight': 20,
        /* or 125% */
        'display': 'flex',
        'alignItems': 'center',
        'textAlign': 'center',
        'letterSpacing': -0.32,
        /* Light Text / Secondary */
        'color': '#818C99'
    }
});

export default AddPodcastScreen;
