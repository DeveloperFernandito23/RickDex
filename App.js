import React from 'react';
import { NativeWindStyleSheet } from 'nativewind';
import MainStack from './navigation/MainStack.js';
import { PartyProvider } from './src/components/PartyProvider.jsx';

NativeWindStyleSheet.setOutput({
	default: 'native',
});

export default function App() {
	return <PartyProvider>
		<MainStack />
	</PartyProvider>
}