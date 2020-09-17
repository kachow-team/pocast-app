import React, { Component } from 'react';
import { View, Text } from 'react-native';

const SnippetScreen = ({ route, navigation }) => (
    <View>
        <Text>{route.params.podcastName}</Text>
        <Text>{route.params.podcastDescription}</Text>
    </View>
);

export default SnippetScreen;