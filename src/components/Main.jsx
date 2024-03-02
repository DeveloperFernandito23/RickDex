import React, { useEffect, useState } from 'react';
import { View, ImageBackground, Image, Text, StyleSheet } from 'react-native';
import FetchData from './FetchData';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-web';
import * as Font from 'expo-font';

//cambiar estilo
const Main = () => {
	const navigator = useNavigation();
	const [fontsLoaded, setFontsLoaded] = useState(false)

	const [scrollY, setScrollY] = useState(0);

	const handleScroll = (event) => {
		const offsetY = event.nativeEvent.contentOffset.y;
		setScrollY(offsetY);
	};

	const getOpacity = () => {
		const triggerOffset = 500;
		const maxOpacity = 1;

		return Math.min(1, scrollY / triggerOffset) * maxOpacity;
	};

	const loadFonts = async () => {
		await Font.loadAsync({
			'rickDexFont': require('../fonts/rickDexFont.ttf')
		})

		setFontsLoaded(true)
	}

	const startMain = () => {
		navigator.setOptions({
			title: 'RickDex',
		});

		loadFonts()
	}

	const styles = StyleSheet.create({
		textWithBorder: {
			fontFamily: 'rickDexFont',
			fontSize: 100,
			letterSpacing: 5,
			color: '#02B1C7',
			'-webkit-text-stroke': '2px #559B6A',
			position: 'absolute',
			zIndex: 1,
			margin: '2rem'
		},
	});

	useEffect(() => {
		startMain()
	}, []);

	return (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
			<ImageBackground
				source={require('../images/background.jpg')}
				resizeMode={'cover'}
				style={{ flex: 1, width: '100%', height: '100%' }}
			>
				<ScrollView onScroll={handleScroll} scrollEventThrottle={16}>
					<View style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', flex: 1, alignItems: 'center' }}>
						<Text
						style={styles.textWithBorder} >{/* #559B6A */}
							RickDex
						</Text>
						<Image
							className='w-40 h-40 mr-8'
							source={require('../images/portal.png')}
							style={{ margin: 0, marginTop: '1rem', position: 'relative' }}
						/>
						<FetchData />
					</View>
				</ScrollView>
				<View style={{ margin: 0, position: 'absolute', bottom: 10, right: 0, zIndex: 100, opacity: getOpacity() }}>
					<Image
						className='w-16 h-16 mr-8'
						source={require('../images/portal.png')}
					/>
				</View>
			</ImageBackground>
		</View >
	);
};

export default Main;