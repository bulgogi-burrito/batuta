import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux'
import store from './store'
import Settings from './components/settings'

export default function App() {
  return (
    <Provider store={store} >
    <View style={styles.container}>
      <Text>First Commit</Text>
      <Settings /> 
      <StatusBar style="auto" />
    </View>
    </Provider>     
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
