import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Alert} from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import SocialSignInButtons from '../../components/SocialSignInButtons';
import {useNavigation} from '@react-navigation/core';
import { useForm } from 'react-hook-form'
import { useRoute } from '@react-navigation/native'
import VerificationCode from '../../components/VerificationCode'

import { Auth } from 'aws-amplify';

const ConfirmEmailScreen = () => {
  const route = useRoute();
  const { control, handleSubmit } = useForm();
  const [code, setCode] = useState('');
  const [ username ] = useState(route?.params?.email)
  
  
  const navigation = useNavigation();
  

  const onConfirmPressed = async data => {
    try{
      const response = await Auth.confirmSignUp(username, code)
      navigation.navigate('SignIn');
    } catch(error){
      Alert.alert("Oops", error.message);
    }
    
  };

  const onSignInPress = () => {
    navigation.navigate('SignIn');
  };

  const onResendPress = async () => {
    try{
      const response = await Auth.resendSignUp(username)
    } catch(error){
      Alert.alert("Oops", error.message);
    }
    
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <VerificationCode />

        <View>
        <CustomButton
          text="Reenviar o código"
          onPress={onResendPress}
          type="SECONDARY"
        />

        <CustomButton
          text="Voltar para Sign In"
          onPress={onSignInPress}
          type="TERTIARY"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  cont1: {
    alignItems: 'center',
    padding: 20,
    marginTop: 100,
  },
  cont2: {
    alignItems: 'center',
    padding: 20,  
    marginBottom: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#051C60',
    margin: 10,
  },
  text: {
    color: 'gray',
    marginVertical: 10,
  },
  link: {
    color: '#FDB075',
  },
});

export default ConfirmEmailScreen;
