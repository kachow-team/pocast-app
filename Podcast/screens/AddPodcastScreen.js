import React, { Component } from 'react';
import { useState, useEffect } from 'react';
import { Button, View, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import CheckBox from '@react-native-community/checkbox';
import PickerIcon from '../icons/PickerIcon';

const AddPodcastScreen = (props) => {
    const [inappropriateContent, setInappropriateContent] = useState(false);
    const [excludeEpisode, setExcludeEpisode] = useState(false);
    const [podcastTrailer, setPodcastTrailer] = useState(false);
    const [availability, setAvailability] = useState(null);
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
                value={inappropriateContent}
                onValueChange={(newValue) => {setInappropriateContent(newValue)}}
            />
            <Text>Ненормативный контент</Text>
            <CheckBox
                value={excludeEpisode}
                onValueChange={(newValue) => {setExcludeEpisode(newValue)}}
            />
            <Text>Исключить эпизод из экспорта</Text>
            <CheckBox
                value={podcastTrailer}
                onValueChange={(newValue) => {setPodcastTrailer(newValue)}}
            />
            <Text>Трейлер подкаста</Text>
            <RNPickerSelect
                style={pickerSelectStyles}
                useNativeAndroidPickerStyle={false}
                placeholder={{
                    label: 'Выберите автора',
                    value: null,
                    color: '#9EA0A4'
                }}
                items={[
                    {label: 'Андрей Иванов', value: 'Андрей Иванов'},
                    {label: 'Фонд поддержки сурикатов', value: 'Фонд поддержки сурикатов'},
                    {label: 'Фонд ремонта Молнии МакКвина', value: 'Фонд ремонта Молнии МакКвина'},
                ]}
                onValueChange={value => {setAvailability(value)}}
                value={availability}
                Icon={() => (<PickerIcon />)}
            />
            <Text>При публикации записи с эпизодом, он становится доступным для всех пользователей --доделать под пикер--</Text>
            <TouchableOpacity>
                <Text>--далее--</Text>
            </TouchableOpacity>
        </View>
    );
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