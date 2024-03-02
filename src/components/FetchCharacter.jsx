import React, { useEffect, useState } from 'react';
import { Text, View, Image, SafeAreaView } from 'react-native';
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
		<SafeAreaView className=' flex-1 bg-white'>
			<View className='p-2 flex-column items-center max-w-s'>
				<Image
					className={'w-80 h-72 mr-8 rounded-xl'}
					style={{ margin: 0 }}
					source={{
						uri: character.image,
					}}
				/>
				<Text className='font-bold text-l'>{characterStatus}</Text>
				<Text className='font-bold text-l'>{characterSpecies}</Text>
				<Text className='font-bold text-l'>{characterType}</Text>
				<Text className='font-bold text-l'>{characterGender}</Text>
				<Text className='font-bold text-l'>Origen: {characterOrigin != 'unknown' ? characterOrigin : 'Desconocido'}</Text>
				<Text className='font-bold text-l'>Localización Actual: {characterLocation != 'unknown' ? characterLocation : 'Desconocida'}</Text>
			</View>
		</SafeAreaView>
	);
};

export default FetchCharacter;