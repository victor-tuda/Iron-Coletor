import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Alert} from 'react-native';
import { useForm } from 'react-hook-form'
import {useNavigation} from '@react-navigation/core';

import { Auth, API } from 'aws-amplify';
import { signUp } from 'aws-amplify/auth'
import AWS from 'aws-sdk';

import CustomInput from '../../components/CustomInput';
import PhoneInput from '../../components/PhoneInput';
import CustomButton from '../../components/CustomButton';
import SocialSignInButtons from '../../components/SocialSignInButtons';

import { createAprendiz } from '../../graphql/mutations';


const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

const SignUpScreen = () => {
  const {control, handleSubmit, watch} = useForm();
  const pwd = watch('password');

  const [email, setEmail] = useState("");
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone_number, setPhone_number] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');


  const navigation = useNavigation();

  const onRegisterPressed = async () => {
    try {
      const signUpObject = {
        username: email,
        password,
        attributes: {
          given_name: name,
          middle_name: lastName,
          phone_number: phone_number,
        }
      };

      await signUp(signUpObject);

      navigation.navigate('ConfirmEmail', { email });
  
 


    }catch(error){
      console.log('teste')
      Alert.alert('Oops', error.message)
     }
  };

  const onSignInPress = () => {
    navigation.navigate('SignIn');

  };

  const onTermsOfUsePressed = () => {
    console.warn('onTermsOfUsePressed');
  };

  const onPrivacyPressed = () => {
    console.warn('onPrivacyPressed');
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.cont1}>
        <Text style={styles.title}>Crie uma conta</Text>
      </View>

      <View style={styles.cont2}>
        <CustomInput
          placeholder="Nome"
          value={name}
          setValue={setName}
        />

        <CustomInput
          placeholder="Sobrenome"
          value={lastName}
          setValue={setLastName}
        />

        <CustomInput placeholder="Email" value={email} setValue={setEmail} autoCap={"none"} />
        <PhoneInput placeholder="Telefone" value={phone_number} setValue={setPhone_number} />

        <CustomInput
          placeholder="Senha"
          value={password}
          setValue={setPassword}
          secureTextEntry
          autoCap={"none"}
        />
        <CustomInput
          placeholder="Repita a senha"
          value={passwordRepeat}
          setValue={setPasswordRepeat}
          secureTextEntry
          autoCap={"none"}
        />

        <CustomButton text="Cadastrar" onPress={onRegisterPressed} />

        <Text style={styles.text}>
          Ao registrar, você concorda com nossos{'\n '}
          <Text style={styles.link} onPress={onTermsOfUsePressed}>
            Termos de Uso
          </Text>{' '}
          e{' '}
          <Text style={styles.link} onPress={onPrivacyPressed}>
            Políticas de Privacidade
          </Text>
        </Text>

        <CustomButton
          text="Já tem uma conta? Faça o Login"
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
    marginTop: 40
  },
  cont2: {
    alignItems: 'center',
    padding: 20,
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

export default SignUpScreen;
