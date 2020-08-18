import React, { useState } from 'react';
import { View, Button, Image, Text, StyleSheet } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import { addNewCategory } from '../store/async';
import { addCategory } from '../store/categories';

export const AddCategoryForm = () => {
  const [isAdding, setIsAdding] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const dispatch = useDispatch();
  const handleAdd = () => {
    setIsAdding(false);
    dispatch(addNewCategory(inputValue))
    setInputValue('');
  }

  return (
    <View style={styles.wrapper}>
      {
        isAdding
        ? (
          <View style={styles.form}>
            <TextInput 
              keyboardType='default'
              style={styles.input} 
              placeholder='Enter the category title'
              value={inputValue}
              onChangeText={(text) => setInputValue(text)}
            />
            <Button color='#3ab37c' title='Add' onPress={handleAdd}/>
          </View>
        )
        : (
          <TouchableOpacity 
            style={styles.addButton}
            onPress={() => setIsAdding(true)}
          >
            <Image source={require('../../assets/images/addButton.png')}/>
            <Text style={styles.text}>Add new category</Text>
          </TouchableOpacity>
        )
      }
    </View>
  )
}


const styles = StyleSheet.create({
  addButton: {
    alignItems: 'center'
  }, 
  text: {
    fontFamily: 'lemonada-thin',
    fontSize: 14,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    padding: 15,
    backgroundColor: 'white',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  form: {
    width: '100%',
    alignItems: 'center',
  }, 
  wrapper: {
    width: '100%',
    alignItems: 'center'
  }
});