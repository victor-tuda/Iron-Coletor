// importando bibliotecas react
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';

import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  Alert
} from 'react-native';

// import from expo
import { AntDesign } from '@expo/vector-icons';

// importando bibliotecas amplify
import {  signIn, currentAuthenticatedUser, confirmSignIn, autoSignIn } from 'aws-amplify/auth'
// importando bibliotecas locais
import Logo from '../../../assets/images/iron-logo.png';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import SocialSignInButtons from '../../components/SocialSignInButtons';
import { CLIENT_ID, REGION } from '@env';


// main component
const SignInScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const {height} = useWindowDimensions();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  async function signInController() {
    if (loading) {
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`https://cognito-idp.${REGION}.amazonaws.com/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-amz-json-1.1',
          'X-Amz-Target': 'AWSCognitoIdentityProviderService.InitiateAuth',
        },
        body: JSON.stringify({
          AuthFlow: 'USER_PASSWORD_AUTH',
          ClientId: CLIENT_ID,
          AuthParameters: {
            USERNAME: username,
            PASSWORD: password,
          },
        }),
      });

      const data = await response.json();
      if (data.AuthenticationResult) {
        navigation.navigate('HomeScreenOperador')
      } else if (data.challengeName === 'NEW_PASSWORD_REQUIRED') {
        Alert.alert('New password required');
      } else {
        Alert.alert('Error', data.message || 'Unknown error occurred');
      }

    
    } catch (error) {
      Alert.alert('Error', error.message || JSON.stringify(error));
      console.error('Error in signInController:', error);
    }
    setLoading(false);
  }
  

  const onSignInPressed = async () => {
    try { // Checa se o usuário conseguiu realizar o login
      user = await signInController();
      
      if (user) {
        const userObj =  currentAuthenticatedUser(); // Captura o objeto do usuario
        console.log(userObj);
        const role = userObj.signInUserSession.accessToken.payload["cognito:groups"] // Captura o groupID do usuario
        console.log(role);

        setLoading(false)
      } else {
        // Handle unsuccessful sign-in
        // You can display an error message to the user
      }
    } catch (error) {
      // Handle any errors thrown during sign-in
      // You can also display an error message to the user
      console.log('Error during sign-in:', error);
    }
  };
  

  const onForgotPasswordPressed = () => {
    navigation.navigate('ForgotPassword');
  };

  const onSignUpPress = () => {
    navigation.navigate('SignUp');
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.cont1}>
        <Image
          source={Logo}
          style={[styles.logo, {height: height * 0.3}]}
          resizeMode="contain"
        />
      </View>

      <View style={styles.cont2}>
        <CustomInput
          icon="user"
          placeholder="Email"
          value={username}
          setValue={setUsername}
          autoCap={"none"}
          
        />
        <CustomInput
          icon="lock"
          placeholder="Senha"
          value={password}
          setValue={setPassword}
          secureTextEntry
          autoCap={"none"}
        />

        <CustomButton text={loading ? "Carregando..." : "Entrar" } onPress={onSignInPressed} />

        <CustomButton
          text="Esqueceu a senha?"
          onPress={onForgotPasswordPressed}
          type="TERTIARY"
        />

        <CustomButton
          text="Não tem uma conta? Crie uma aqui."
          onPress={onSignUpPress}
          type="TERTIARY"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  cont1: {
    alignItems: 'center',
    marginTop: 40,
  },
  cont2: {
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: '60%',
    marginLeft: 40,
    maxWidth: 800,
    maxHeight: 1000,
  },
});

export default SignInScreen;