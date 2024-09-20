import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Picker } from 'react-native';
import axios from 'axios';

const CurrencyConverter = () => {
  const [amount, setAmount] = useState('');
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [fromCurrency, setFromCurrency] = useState('BRL');
  const [toCurrency, setToCurrency] = useState('USD');

  const convertCurrency = () => {
    axios.get(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
      .then(response => {
        const rate = response.data.rates[toCurrency];
        setConvertedAmount((amount * rate).toFixed(2));
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Conversor de Moedas</Text>
      <TextInput
        style={styles.input}
        placeholder="Valor"
        keyboardType="numeric"
        value={amount}
        onChangeText={text => setAmount(text)}
      />
      <Picker
        selectedValue={fromCurrency}
        style={styles.picker}
        onValueChange={(itemValue) => setFromCurrency(itemValue)}
      >
        <Picker.Item label="Real (BRL)" value="BRL" />
        <Picker.Item label="Dólar (USD)" value="USD" />
        <Picker.Item label="Euro (EUR)" value="EUR" />
      </Picker>
      <Picker
        selectedValue={toCurrency}
        style={styles.picker}
        onValueChange={(itemValue) => setToCurrency(itemValue)}
      >
        <Picker.Item label="Real (BRL)" value="BRL" />
        <Picker.Item label="Dólar (USD)" value="USD" />
        <Picker.Item label="Euro (EUR)" value="EUR" />
      </Picker>
      <Button title="Converter" onPress={convertCurrency} />
      {convertedAmount && (
        <Text style={styles.result}>Valor convertido: {convertedAmount} {toCurrency}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: '80%',
  },
  picker: {
    height: 50,
    width: '80%',
    marginBottom: 20,
  },
  result: {
    fontSize: 20,
    marginTop: 20,
  },
});

export default CurrencyConverter;
