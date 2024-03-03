import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';
import IndexSelector from 'src/components/IndexSelector';
import {StackParamLists} from 'src/navigation/stack-param-lists';
import {getAddressFromMnemonic} from 'src/services/auth-service';

export const LoginScreen = () => {
  const {replace} =
    useNavigation<NativeStackNavigationProp<StackParamLists, 'Wallet'>>();

  const [wordsInput, setWordsInput] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [parseErrorMessage, setParseErrorMessage] = useState<
    string | undefined
  >();

  const handleLogin = useCallback(() => {
    try {
      const address = getAddressFromMnemonic(wordsInput, selectedIndex);

      setParseErrorMessage(undefined);

      replace('Wallet', {address});
    } catch (error) {
      console.debug('Error:', error);
      setParseErrorMessage('Wrong mnemonic format');
    }
  }, [replace, selectedIndex, wordsInput]);

  // Clear error message when user changes input
  useEffect(() => {
    setParseErrorMessage(undefined);
  }, [wordsInput]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome</Text>
      <View style={styles.inputAndInfoContainer}>
        <Text style={styles.wordsInfo}>
          Please input your 24 words, separated by spaces
        </Text>
        <TextInput
          style={styles.input}
          placeholder={'abandon cherry ...'}
          onChangeText={setWordsInput}
          value={wordsInput}
          multiline
        />

        <IndexSelector
          selected={selectedIndex}
          setSelected={setSelectedIndex}
        />

        {parseErrorMessage && (
          <Text style={styles.wordsInputError}>{parseErrorMessage}</Text>
        )}
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Import wallet"
          onPress={handleLogin}
          disabled={!wordsInput}
        />
      </View>
    </View>
  );
};

// TODO-UI: use theming library and unify colors and metrics
const styles = StyleSheet.create({
  buttonContainer: {marginTop: 20},
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  wordsInfo: {
    fontSize: 14,
    marginBottom: 5,
    alignSelf: 'flex-start',
    paddingHorizontal: 5,
  },
  wordsInputError: {
    fontSize: 14,
    marginBottom: 20,
    alignSelf: 'flex-start',
    color: 'red',
    paddingHorizontal: 5,
  },
  input: {
    marginBottom: 5,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'grey',
    padding: 8,
    fontSize: 20,
    textAlignVertical: 'top',
    height: 200,
  },
  inputAndInfoContainer: {
    width: '80%',
  },
});
