import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { Category } from '../interfaces';
import { getCategories } from '../store';

const styles = StyleSheet.create({
  categories: {
    marginVertical: 30,
    width: '100%'
  }, 
  category: {
    backgroundColor: '#FAFAFA',
    paddingVertical: 10,
    borderWidth: 0.5,
    marginBottom: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  }, 
  activeCategory: {
    backgroundColor: '#D8D8D8',
    justifyContent: 'space-between'
  },
  image: {
    marginRight: 20,
    width: 20,
    height: 20,
  }, 
  left: {
    flexDirection: 'row'
  }
})

interface Props {
  handleCategoryPress: (title: string) => (void);
  selectedCategory: string,
}

export const Picker:React.FC<Props> = ({ selectedCategory, handleCategoryPress }: Props) => {
  const categories: Category[] = useSelector(getCategories);
  const [isCategoriesListVisible, setIsCategoriesListVisible] = useState(false);

  const pressHandler = (title: string) => {
    handleCategoryPress(title);
    setIsCategoriesListVisible(false);
  }
  
  return (
    <View style={styles.categories}>
      <TouchableOpacity 
        style={{...styles.category,...styles.activeCategory}} 
        onPress={() => setIsCategoriesListVisible(!isCategoriesListVisible)}
      >
        <View style={styles.left}>
          <Image 
            style={styles.image}
            source={categories.find(category => category.title === selectedCategory).image}
          />
          <Text>
            {selectedCategory!=='All' ? selectedCategory : 'Add without category'}
          </Text>
        </View>
        <Image 
          style={styles.image}
          source={require('../../assets/images/showAll.png')}
        />
      </TouchableOpacity>
      {
        isCategoriesListVisible && (
          categories.filter(category => category.title !== selectedCategory && category.title !== 'All').map(category => (
            <TouchableOpacity 
              key={category.id}
              style={styles.category}
              onPress={() => pressHandler(category.title)}
            >
              <Image 
                style={styles.image}
                source={category.image}
              />
              <Text>
                {category.title}
              </Text>
          </TouchableOpacity>
          ))
        )
      }
    </View>
  )
}