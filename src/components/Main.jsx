import React, { useEffect } from 'react';
import { View, ImageBackground, Image } from 'react-native';
import FetchData from './FetchData';
import { useNavigation } from '@react-navigation/native';

//cambiar estilo
const Main = () => {
	const navigator = useNavigation();

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
				<View style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', flex: 1, alignItems: 'center' }}>
					{/* <Image
						className='w-52 h-52 mr-8'
						source={require('../images/portal.png')}
						style={{ margin: 0, marginTop: '1rem', position: 'relative' }}
					/> */}
					<View style={{ margin: 0, position: 'absolute', bottom: 10, right: 0, zIndex: 100 }}>
						<Image
							className='w-16 h-16 mr-8'
							source={require('../images/portal.png')}
						/>
					</View>
					<FetchData />
				</View>
			</ImageBackground>
		</View>
	);
};

export default Main;