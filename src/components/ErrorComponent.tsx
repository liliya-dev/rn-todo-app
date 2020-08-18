import React from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface Props {
  tryToReload: () => (void);
}

export const ErrorComponent: React.FC<Props> = ({ tryToReload }:Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Sorry, something went wrong. Check your internet connection</Text>
      <Image 
        source={require('../../assets/images/error.png')}
      />
      <TouchableOpacity style={styles.button} onPress={tryToReload}>
        <Text style={styles.text}>Try again</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'lemonada',
    color: 'red',
    textAlign: 'center'
  }, 
  container: {
    alignItems: 'center',
    marginTop: 20,
    width: '100%'
  },
  button: {
    padding: 15,
    backgroundColor: 'white',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5.84,
    elevation: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  }
})