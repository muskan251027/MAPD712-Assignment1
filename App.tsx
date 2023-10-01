import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import {Picker} from '@react-native-picker/picker';

// Main view of the app
export default function App() {

  // Defining variables
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [measurementSystem, setMeasurementSystem] = useState('metric');
  const [bmi, setBMI] = useState('');
  const [interval, setInterval] = useState('');

  // function to calculate BMI
  const calculateBMI = () => {

    // calculate height and weight in metres and kgs for final BMI depending on different measurement system
    let heightInMeters = measurementSystem === 'metric' ? parseFloat(height) / 100 : parseFloat(height) * 0.0254;
    let weightInKg = measurementSystem === 'metric' ? parseFloat(weight) : parseFloat(weight) * 0.45359;

    if (!isNaN(heightInMeters) && !isNaN(weightInKg) && heightInMeters > 0 && weightInKg > 0) {
      let bmiValue = weightInKg / (heightInMeters * heightInMeters);
      setBMI(bmiValue.toFixed(2));

      // Calculating BMI category
      if (bmiValue < 18.5) {
        setInterval('BMI (<18.5) - Underweight');
      } else if (bmiValue >= 18.5 && bmiValue < 25) {
        setInterval('BMI (18.5-24.9) - Normal weight');
      } else if (bmiValue >= 25 && bmiValue < 30) {
        setInterval('BMI (25-29.9) - Overweight');
      } else {
        setInterval('BMI (>=30) - Overweight');
      }

    } else {
      // False Input
      setBMI('Invalid input');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.mainHeading}>BMI Calculator</Text>
      {/* Get user input for height */}
      <View>
        <Text style={styles.label}>Height {measurementSystem === 'metric' ? '(cm)' : '(in)'}</Text>
        <TextInput
            style={styles.input}
            placeholder="Height"
            onChangeText={(text) => setHeight(text)}
            keyboardType="numeric"
        />
      </View>
      {/* Get user input for weight */}
      <View>
        <Text style={styles.label}>Weight {measurementSystem === 'metric' ? '(kg)' : '(lb)'}</Text>
        <TextInput
            style={styles.input}
            placeholder="Weight"
            onChangeText={(text) => setWeight(text)}
            keyboardType="numeric"
        />
      </View>
      {/* Pick measurement system */}
      <Picker
        style={styles.picker}
        selectedValue={measurementSystem}
        onValueChange={(itemValue) => setMeasurementSystem(itemValue)}
      >
        <Picker.Item label="Metric (kg/cm)" value="metric" />
        <Picker.Item label="Imperial (lb/in)" value="imperial" />
      </Picker>

      <Button title="Calculate BMI" onPress={calculateBMI} />
      {/* Display final information */}
      <Text style={styles.result}>BMI: {bmi}</Text>
      <Text>{interval}</Text>
    </View>
  );
}

{/* Styles for all above elements */}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainHeading: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 25,
    color: 'black'
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  input: {
    width: 250,
    borderColor: 'lightgray',
    borderWidth: 2,
    marginBottom: 20,
    marginTop: 5,
    paddingLeft: 10,
  },
  picker: {
    width: 250,
    marginBottom: 40,
  },
  result: {
    fontSize: 18,
    marginTop: 20,
  },
});
