import React from 'react';
import { IMaskInput } from "react-imask";
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const PhoneInput = ({ value, setValue, placeholder, secureTextEntry, icon, autoCap }) => {
  // Define the country code for Brazil
  return (
    <View style={styles.container}>
      {icon && <AntDesign name={icon} size={24} color="black" style={styles.icon} />}
      <TextInput
        onFocus={ () => {
          if (value == ''){
            setValue('+55')
          }
        } }
        value={value} // Include the country code in the value
        onChangeText={setValue}
        placeholder={placeholder}
        style={styles.input}
        secureTextEntry={secureTextEntry}
        keyboardType='numeric'
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
    flexDirection: 'row',
  },
  input: {
    fontSize: 15,
    height: 40,
    flex: 1,
  },
  icon: {
    alignItems: 'center',
    marginTop: 6.5,
    marginRight: 10,
  },
});

export default PhoneInput;