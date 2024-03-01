import React from 'react'
import { View, ImageBackground } from 'react-native'
import FetchData from './FetchData.jsx'
import { useNavigation } from '@react-navigation/native'

//cambiar estilo
const Main = () => {
	let navigator = useNavigation()

	navigator.setOptions({
		title: 'RickDex'
	})

	return (
		<ImageBackground
			source={{ uri: '../images/background.jpg' }}
			resizeMode={'cover'}
			style={{ flex: 1 }}
		>
			<View className='w-full' style={{ flex: 1 }}>
				<FetchData />
			</View>
		</ImageBackground>
	);
};

export default Main;