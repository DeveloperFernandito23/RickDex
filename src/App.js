import React from 'react';
import { NativeWindStyleSheet } from 'nativewind';
import MainStack from './MainStack.js';
import { PartyProvider } from './components/PartyProvider.jsx';

NativeWindStyleSheet.setOutput({
	default: 'native',
});

export default function App() {
	return <PartyProvider>
		<MainStack />
	</PartyProvider>
}