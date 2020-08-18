import React, { useState } from 'react';
import { TouchableOpacity, View, StyleSheet, Text } from 'react-native';

const styles = StyleSheet.create({
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  }, 
  link: {
    fontSize: 13,
    fontFamily: 'lemonada-thin',
    color: 'black',
    width: '100%',
    textAlign: 'center',
  }, 
  category: {
    width: '23%',
    borderBottomWidth: 1,
    borderColor: "#3ab37c",
    borderRadius: 1,
  }, 
  active: {
    color: "#3ab37c",
  }
});

interface Props {
  changeVisible: (option: string) => (void);
}
const Navigation: React.FC<Props> = ({ changeVisible }: Props) => {
  const [activeButton, setActiveButton] = useState('unfinished');
  const pressHandler = (option: string) => {
    changeVisible(option);
    setActiveButton(option);
  }
  return (
    <View style={styles.navigation}>
      <TouchableOpacity style={styles.category} onPress={() => pressHandler('all')}>
        <Text 
          style={ activeButton === 'all' ? {...styles.link, ...styles.active } : styles.link}
        >
          All
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.category} onPress={() => pressHandler('unfinished')}>
      <Text 
          style={ activeButton === 'unfinished' ? {...styles.link, ...styles.active } : styles.link}
        >
          Unfinished
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.category} onPress={() => pressHandler('completed')}>
        <Text 
          style={ activeButton === 'completed' ? {...styles.link, ...styles.active } : styles.link}
        >
          Completed
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.category} onPress={() => pressHandler('overdue')}>
        <Text 
          style={ activeButton === 'overdue' ? {...styles.link, ...styles.active } : styles.link}
        >
          Overdue
        </Text>
      </TouchableOpacity>
    </View>
  )
};

export default Navigation;