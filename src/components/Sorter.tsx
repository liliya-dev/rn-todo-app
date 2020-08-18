import React, { useState } from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Image } from 'react-native';
import { options } from '../constants';
import { Option } from '../interfaces';

interface Props {
  onSort: (sortOption: string) => (void),
  sortBy: string
}
export const Sorter: React.FC<Props> = ({ onSort, sortBy }: Props) => {
  const allOptions: Option[] = options;
  const withoutActiveOption = allOptions.filter(option => option.title !== sortBy);
  const active = allOptions.find(option => option.title === sortBy);
  const [areOptionsVisible, setAreOptionsVisible] = useState(false);

  const onSelectOption = (title: string) => {
    setAreOptionsVisible(!areOptionsVisible);
    onSort(title);
  }

  return (
    <View style={styles.sorter}>
      {
        active && (
          <TouchableOpacity style={styles.activeSortOption} onPress={() => onSelectOption(active.title)}>
            <Text style={{...styles.text, ...styles.activeText}}>Sort {active.title}</Text>
            <Image 
              style={styles.image}
              source={require('../../assets/images/showAll.png')}
            />
          </TouchableOpacity>
        )
      }
      {
        areOptionsVisible && withoutActiveOption.map(option => (
          <TouchableOpacity key={option.id} onPress={() => onSelectOption(option.title)}>
            <Text style={styles.text}>Sort {option.title}</Text>
          </TouchableOpacity>
        ))
      }

    </View>
  )
}

const styles = StyleSheet.create({
  sorter: {
    position: 'absolute',
    top: 50,
    left: '15%',
    zIndex: 2,
    width: '70%',
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 20,

  },
  sortOption: {
    width: '100%'
  },
  activeSortOption: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

  },
  activeText: {
    color: '#3ab37c'
  },
  text: {
    fontSize: 13,
    fontFamily: 'lemonada',
  }, 
  image: {
    width: 15,
    height: 15
  }
})