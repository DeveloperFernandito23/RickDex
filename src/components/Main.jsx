import React, { useEffect, useState, useRef, useContext } from 'react';
import { View, ImageBackground, Image, Text, StyleSheet, Pressable } from 'react-native';
import FetchData from './FetchData';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-web';
import * as Font from 'expo-font';
import { PartyContext } from './PartyProvider';

const Main = () => {
	const navigator = useNavigation();
	const { party, setParty } = useContext(PartyContext);
	const [fontsLoaded, setFontsLoaded] = useState(false);
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
		});

		setFontsLoaded(true);
	};

	const startMain = () => {
		navigator.setOptions({
			title: 'RickDex',
		});

		if(!fontsLoaded) loadFonts();
	};

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

	const scrollViewRef = useRef();

	useEffect(() => {
		startMain();
	}, []);

	return (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
			<ImageBackground
				source={require('../images/background.jpg')}
				resizeMode={'cover'}
				style={{ flex: 1, width: '100%', height: '100%' }}
			>
				<ScrollView ref={scrollViewRef} onScroll={handleScroll} scrollEventThrottle={16} style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
					<View id='start' style={{ flex: 1, alignItems: 'center' }}>
						<Pressable
							className='items-center'
							onPress={() => {
								party === '-false' ? setParty('-true') : setParty('-false')
							}}
						>
							<Text
								style={styles.textWithBorder}>
								RickDex
							</Text>
							<Image
								className='w-40 h-40 mr-8'
								source={require('../images/portal.png')}
								style={{ margin: 0, marginTop: '1rem', position: 'relative' }}
							/>
						</Pressable>
						<FetchData />
					</View>
				</ScrollView>
				<View style={{ margin: 0, position: 'absolute', bottom: 10, right: 0, zIndex: 100, opacity: getOpacity() }}>
					<Pressable
						onPress={() => {
							scrollViewRef.current?.scrollTo({ x: 0, y: 0, animated: true });
						}}>
						<Image
							className='w-16 h-16 mr-8'
							source={require('../images/portal.png')}
						/>
					</Pressable>
				</View>
			</ImageBackground>
		</View >
	);
};

export default Main;