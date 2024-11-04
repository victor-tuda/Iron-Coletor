/*

Concept: https://dribbble.com/shots/5476562-Forgot-Password-Verification/attachments

*/
import { Animated, Image, SafeAreaView, Text, View, Alert } from 'react-native';
import React, { useState } from 'react';

import { confirmSignUp } from 'aws-amplify/auth';

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { useRoute } from '@react-navigation/native'
import {useNavigation} from '@react-navigation/core';

import styles, {
  ACTIVE_CELL_BG_COLOR,
  CELL_BORDER_RADIUS,
  CELL_SIZE,
  DEFAULT_CELL_BG_COLOR,
  NOT_EMPTY_CELL_BG_COLOR,
} from './styles';
import CustomButton from '../../components/CustomButton';

const { Value, Text: AnimatedText, View: AnimatedView } = Animated;

const CELL_COUNT = 6;
const source = {
  uri: 'https://user-images.githubusercontent.com/4661784/56352614-4631a680-61d8-11e9-880d-86ecb053413d.png',
};

const animationsColor = [...new Array(CELL_COUNT)].map(() => new Value(0));
const animationsScale = [...new Array(CELL_COUNT)].map(() => new Value(1));
const animateCell = ({ hasValue, index, isFocused }) => {
  Animated.parallel([
    Animated.timing(animationsColor[index], {
      useNativeDriver: false,
      toValue: isFocused ? 1 : 0,
      duration: 250,
    }),
    Animated.spring(animationsScale[index], {
      useNativeDriver: false,
      toValue: hasValue ? 0 : 1,
      duration: hasValue ? 300 : 250,
    }),
  ]).start();
};




const VerificationCode = ({ sendCodeToParent }) => {
    const route = useRoute();
    const navigation = useNavigation();
    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({ code, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        code,
        setValue,
    });

    const [code, setCode] = useState('');
    const [ username ] = useState(route?.params?.email)


  const onConfirmPressed = async () => {
    try{
      confirmSignUpObject = {
        username: username,
        confirmationCode: code
      }
      await confirmSignUp(confirmSignUpObject)
      navigation.navigate('SignIn');
    } catch(error){
      Alert.alert("Oops", error.message);
    }
    
  };

  const handleButtonClick = () => {
    onConfirmPressed()
  }

  const renderCell = ({ index, symbol, isFocused }) => {
    const hasValue = Boolean(symbol);
    const animatedCellStyle = {
      backgroundColor: hasValue
        ? animationsScale[index].interpolate({
            inputRange: [0, 1],
            outputRange: [NOT_EMPTY_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR],
          })
        : animationsColor[index].interpolate({
            inputRange: [0, 1],
            outputRange: [DEFAULT_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR],
          }),
      borderRadius: animationsScale[index].interpolate({
        inputRange: [0, 1],
        outputRange: [CELL_SIZE, CELL_BORDER_RADIUS],
      }),
      transform: [
        {
          scale: animationsScale[index].interpolate({
            inputRange: [0, 1],
            outputRange: [0.2, 1],
          }),
        },
      ],
    };

    // Run animation on next event loop tik
    // Because we need first return new style prop and then animate this value
    setTimeout(() => {
      animateCell({ hasValue, index, isFocused });
    }, 0);

    return (
      <AnimatedView
        key={index}
        style={[styles.cell, animatedCellStyle]}
        onLayout={getCellOnLayoutHandler(index)}>
        <Text style={styles.cellText}>
          {symbol || (isFocused ? <Cursor /> : null)}
        </Text>
      </AnimatedView>
    );
  };

  return (
    <SafeAreaView style={styles.root}>
      <Text style={styles.title}>Verificação</Text>
      <Image style={styles.icon} source={source} />
      <Text style={styles.subTitle}>
        Por favor, entre com o código de verificação{'\n'}
        que enviamos para seu e-mail.
      </Text>

      <CodeField
        ref={ref}
        {...props}
        value={code}
        onChangeText={setCode}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFiledRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={renderCell}
      />
      <View style={{marginTop: 30}}>
        <CustomButton style={styles.nextButtonText} text={"Checar"} onPress={handleButtonClick} />
      </View>
    </SafeAreaView>
  );
};

export default VerificationCode;
