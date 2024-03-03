import React, {useCallback} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';

interface IndexSelectorProps {
  selected: number;
  setSelected: (index: number) => void;
}

const IndexSelector: React.FC<IndexSelectorProps> = ({
  selected,
  setSelected,
}) => {
  const handlePress = useCallback(
    (index: number) => {
      setSelected(index);
    },
    [setSelected],
  );

  return (
    <View style={styles.container}>
      <Text>Select index of address:</Text>
      <TouchableOpacity
        style={[styles.button, selected === 0 && styles.selectedButton]}
        onPress={() => handlePress(0)}>
        <Text
          style={[
            styles.buttonText,
            selected === 0 && styles.selectedButtonText,
          ]}>
          0
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, selected === 1 && styles.selectedButton]}
        onPress={() => handlePress(1)}>
        <Text
          style={[
            styles.buttonText,
            selected === 1 && styles.selectedButtonText,
          ]}>
          1
        </Text>
      </TouchableOpacity>
    </View>
  );
};

// TODO-UI: use theming library and unify colors and metrics
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 8,
  },
  selectedButton: {
    backgroundColor: '#2196f3',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  selectedButtonText: {
    color: '#fff',
  },
});

export default IndexSelector;
