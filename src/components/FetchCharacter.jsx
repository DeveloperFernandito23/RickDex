import React, { useEffect, useState } from 'react';
import { Text, View, Image, SafeAreaView, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { GENDERS } from './FetchData';

const URL_API = 'https://rickandmortyapi.com/api/character/';

const FetchCharacter = ({ idCharacter }) => {
	let navigator = useNavigation();

	const [character, setData] = useState([]);

	const fetchCharacter = async () => {
		try {
			const response = await fetch(`${URL_API}${idCharacter}`);
			const json = await response.json();

			setData(json);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		fetchCharacter();
		navigator.setOptions({
			title: `${character.name} - ${character.id}`
		});
	});

	let characterOrigin = character.origin?.name;
	let characterLocation = character.location?.name;
	let characterGender = GENDERS[character.gender];
	let characterSpecies = character.species;
	let characterType = character.type;

	let isFemale = characterGender === 'Femenino';

	const STATES = {
		Alive: isFemale ? 'Viva' : 'Vivo',
		Dead: isFemale ? 'Muerta' : 'Muerto',
		unknown: 'Desconocido'
	};

	let characterStatus = STATES[character.status];

	return (
		<SafeAreaView style={{ height: '100vh' }}>
			<ImageBackground
				source={require('../images/background.jpg')}
				resizeMode={'cover'}
				style={{ flex: 1, width: '100%', height: '100%' }}
			>
				<View
					className='p-8'
					style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', flex: 1 }}>
					<View
						className='flex-row max-w-s justify-between flex-wrap rounded-3xl p-7'
						style={{ backgroundColor: 'rgb(75, 85, 99)' }}
					>
						<Image
							className={'mr-8 rounded-xl'}
							style={{ margin: 0, width: '33rem', height: '27rem' }}
							source={{
								uri: character.image
							}}
						/>
						<View className='justify-around'>
							<Text className='font-bold text-3xl right-20 text-white'>Estado: {characterStatus}</Text>
							<Text className='font-bold text-3xl right-20 text-white'>Especie: {characterSpecies}</Text>
							<Text className='font-bold text-3xl right-20 text-white'>Tipo: {characterType != '' ? characterType : 'Normal'}</Text>
							<Text className='font-bold text-3xl right-20 text-white'>Género: {characterGender}</Text>
							<Text className='font-bold text-3xl right-20 text-white'>Origen: {characterOrigin != 'unknown' ? characterOrigin : 'Desconocido'}</Text>
							<Text className='font-bold text-3xl right-20 text-white'>Localización Actual: {characterLocation != 'unknown' ? characterLocation : 'Desconocida'}</Text>
						</View>
					</View>
				</View>
			</ImageBackground>
		</SafeAreaView >
	);
};

export default FetchCharacter;