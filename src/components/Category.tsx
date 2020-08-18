import React from 'react';
import { View, Image, Text, StyleSheet, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import { Category } from '../interfaces';
import { removeCategoryFromBase } from '../store/async';
import { removeCategory } from '../store/categories';


interface Props {
  category: Category;
  selectCategory: (title: string) => (void);
}

export const CategoryItem: React.FC<Props> = ({ category, selectCategory }: Props) => {
  const dispatch = useDispatch();

  const handleRemove = (id: string, title: string) => {
    Alert.alert(
      'Confirmation',
      `Are you sure that you want to delete ${title}`,
      [
        {
          text: 'Delete',
          onPress: () =>  {
            dispatch(removeCategory(id));
            dispatch(removeCategoryFromBase(id));
          }
        },
        {
          text: 'Cancel',
          style: 'cancel'
        },
      ],
      { cancelable: true }
    );
   
  }
  return (
    <View style={styles.category}>
      <TouchableOpacity  
        onPress={() => selectCategory(category.title)}
        onLongPress={() => handleRemove(category.id, category.title)}
      >
        <Image source={require('../../assets/images/All.png')}/>
        <Text style={styles.text}>{category.title}</Text>
      </TouchableOpacity>
    </View>
  )
}


const styles = StyleSheet.create({
  category: {
    width: '30%',
    marginVertical: 25,
    alignItems: 'center'
  }, 
  text: {
    fontFamily: 'lemonada-thin',
    fontSize: 14,
    textAlign: 'center',
  },
});
