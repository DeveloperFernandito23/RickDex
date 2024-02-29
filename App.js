import React from 'react';
import { NativeWindStyleSheet } from 'nativewind';
import MainStack from './navigation/MainStack.js';

NativeWindStyleSheet.setOutput({
	default: 'native',
});

export default function App() {
	return <MainStack />;
}