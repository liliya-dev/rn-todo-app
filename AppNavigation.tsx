import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack' ;
import { Categories } from './src/components/Categories';
import { TodoList } from './src/components/TodoList';
import { TodoScreen } from './src/components/TodoScreen';
import { AddForm } from './src/components/AddForm';

const AppNavigator = createStackNavigator({
  Categories: Categories,
  TodoList: TodoList,
  Todo: TodoScreen,
  AddForm: AddForm,
},
{
  initialRouteName: 'Categories',
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: '#000'
    },
    headerTintColor: '#fff'
  }
}

);

export const AppNavigation = createAppContainer(AppNavigator)