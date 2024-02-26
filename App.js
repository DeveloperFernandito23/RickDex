import React from 'react';
import { NativeWindStyleSheet } from "nativewind";
import Main from './src/components/Main.jsx';

NativeWindStyleSheet.setOutput({
  default: "native",
});

export default function App() {
  return <Main />
}

