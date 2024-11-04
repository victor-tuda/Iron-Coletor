import { React, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity
  } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';

import { Auth } from 'aws-amplify';
//import { FirstContainer } from '../../../components/HomeScreen/FirstContainer/index.js'

const Stack = createNativeStackNavigator();

const HomeScreen = () => {
    return(
        <Text>Relatorios</Text>
    )
}

export default HomeScreen;