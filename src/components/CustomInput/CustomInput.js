import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';

import { AntDesign } from '@expo/vector-icons';

const CustomInput = ({value, setValue, placeholder, secureTextEntry, icon, autoCap}) => {
  return (
    <View style={styles.container}>
      {icon && <AntDesign name={icon} size={24} color="black" style={styles.icon} />}
      <TextInput
        value={value}
        onChangeText={setValue}
        placeholder={placeholder}
        style={styles.input}
        secureTextEntry={secureTextEntry}
        autoCapitalize={autoCap}
        
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '100%',

    borderColor: '#e8e8e8',
    borderWidth: 1,
    borderRadius: 10,

    paddingHorizontal: 10,
    marginVertical: 5,

    flexDirection: 'row'
  },
  input: {
   fontSize: 15,
   height: 40,
   flex: 1
  },
  icon: {
    alignItems: 'center',
    marginTop: 6.5,
    marginRight: 10
  }
});

export default CustomInput;
