import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CardPickerView = () => {
  return (
    <View style={styles.container}>
      <Text>Card Picker View</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});

export default CardPickerView;