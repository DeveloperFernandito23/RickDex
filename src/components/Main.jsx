import React, { useEffect } from 'react'
import { View, ImageBackground } from 'react-native'
import FetchData from './FetchData.jsx'
import { useNavigation } from '@react-navigation/native'

//cambiar estilo
const Main = () => {
	const navigator = useNavigation()

	useEffect(() => {
		navigator.setOptions({
			title: 'RickDex',
		});
	}, []);

	return (
		<ImageBackground
			source={require('../images/background.jpg')}
			resizeMode={'cover'}
			style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}
		>
			<FetchData />
		</ImageBackground>
	);
};

export default Main;