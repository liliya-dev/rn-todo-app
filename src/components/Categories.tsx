import React, { useEffect, useState } from 'react';
import { View, StyleSheet} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../store/index';
import { Category } from '../interfaces';
import { loadCategoriesFromDataBase, loadTodosFromDataBase} from '../store/async';
import { getIsLoading } from '../store/index';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { CategoryItem } from './Category';
import { AddCategoryForm } from './AddCategoryForm';
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState
} from 'react-navigation';
import { Loader } from './Loader';
import { NavigationStackScreenProps } from 'react-navigation-stack';

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>,
  navigationOptions?: Object,
}

async function loadFonts() {
  await Font.loadAsync({
    'lemonada': require('../../assets/fonts/Lemonada-VariableFont_wght.ttf'),
    'lemonada-thin': require('../../assets/fonts/Lemonada.ttf'),
    'source-code': require('../../assets/fonts/SourceCodePro-LightItalic.ttf'),
    'source-code-bolder': require('../../assets/fonts/SourceCodePro-MediumItalic.ttf'),
  })
}
export const Categories: React.FC<Props> = ({ navigation }) => {
  const categories: Category[] = useSelector(getCategories);
  const [fontsAreLoaded, setFontsAreLoaded] = useState(false);
  const isLoadingNow = useSelector(getIsLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadTodosFromDataBase());
    dispatch(loadCategoriesFromDataBase());
  }, [])

 const selectCategory = (title: string) => {
   navigation.navigate('TodoList', {category: title, reload: loadTodosFromDataBase})
 }
  return (
    <View style={styles.container}>
      {
        !fontsAreLoaded
        ? (
          <AppLoading 
            startAsync={loadFonts}
            onError={(err) => console.log(err)}
            onFinish={() => setFontsAreLoaded(true)}
          />
        )
        : (
          <View style={styles.wrapper}>
            <View style={styles.categories}>
              {
                isLoadingNow
                ? <Loader />
                : (
                  categories.map(category => {
                    return <CategoryItem category={category}  key={category.id} selectCategory={selectCategory} />  
                  })
                )
              } 
            </View>
            <AddCategoryForm />
          </View>
        )
      }
    </View>

  )
};

Categories.navigationOptions = {
  headerTitle: 'Your Todo App'
}

const styles = StyleSheet.create({
  categories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    width: '100%',
  },
  container: {
    alignItems: 'flex-start',
    width: '100%',
    paddingHorizontal: 30
  }, 
  wrapper: {
    width: '100%',
    alignItems: 'center'
  }
});
