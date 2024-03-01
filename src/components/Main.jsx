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
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
			<ImageBackground
				source={require('../images/background.jpg')}
				resizeMode={'cover'}
				style={{ flex: 1, width: '100%', height: '100%' }}
			>
				<View style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', flex: 1 }}>
					<FetchData />
				</View>
			</ImageBackground>
		</View>
	);
};

export default Main;