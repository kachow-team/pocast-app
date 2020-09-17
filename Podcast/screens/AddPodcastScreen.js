import React, { Component } from 'react';
import { useState, useEffect } from 'react';
import { Button, View, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import CheckBox from '@react-native-community/checkbox';
import PickerIcon from '../icons/PickerIcon';

class AddPodcastScreen extends React.Component {
    state = {
        inappropriateContent: false,
        excludeEpisode: false,
        podcastTrailer: false,
        availability: 'Всем пользователям'
    };
    render() {
        return (
            <View>
                <TouchableOpacity>
                    <Text>--image picker--</Text>
                </TouchableOpacity>
                <Text>Название</Text>
                <TextInput placeholder="Введите наззвание подкаста"></TextInput>
                <Text>Описание подкаста</Text>
                <TextInput></TextInput>
                <Text>Загрузите Ваш подкаст</Text>
                <Text>Выберите готовый аудиофайл из Вашего телефона и добавьте его</Text>
                <TouchableOpacity>
                    <Text>-file input--</Text>
                </TouchableOpacity>
                <Text>--line--</Text>
                <CheckBox
                    value={this.state.inappropriateContent}
                    onValueChange={(newValue) => {this.setState({inappropriateContent: newValue})}}
                />
                <Text>Ненормативный контент</Text>
                <CheckBox
                    value={this.state.excludeEpisode}
                    onValueChange={(newValue) => {this.setState({excludeEpisode: newValue})}}
                />
                <Text>Исключить эпизод из экспорта</Text>
                <CheckBox
                    value={this.state.podcastTrailer}
                    onValueChange={(newValue) => {this.setState({podcastTrailer: newValue})}}
                />
                <Text>Трейлер подкаста</Text>
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
                <TouchableOpacity>
                    <Text>--далее--</Text>
                </TouchableOpacity>
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
    },
    iconContainer: {
      top: 8,
      right: 34,
    }
});

export default AddPodcastScreen;