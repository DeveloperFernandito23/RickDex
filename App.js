import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import React from 'react';


export default function App() {
  return (
    <View className="flex h-screen items-center justify-center bg-black">
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar />
    </View>
  );
}