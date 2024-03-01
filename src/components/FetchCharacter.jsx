import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Text, View, Image, SafeAreaView, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { GENDERS, STATES } from './FetchData.jsx'

const LIMIT = 42
const URL_API = 'https://rickandmortyapi.com/api/character/'

const FetchCharacter = ({ idCharacter }) => {
	let navigator = useNavigation()

	const [isLoading, setLoading] = useState(true);
	const [character, setData] = useState([]);

	const fetchCharacter = async () => {
		try {
			const response = await fetch(`${URL_API}${idCharacter}`);
			const json = await response.json();

			setData(json)
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	}

	useEffect(() => {
		fetchCharacter()
		navigator.setOptions({
			title: `${character.name} - ${character.id}`
		})
	})

	let originCharacter = character.origin?.name
	let locationCharacter = character.location?.name

	return (
		<SafeAreaView className=' flex-1 bg-white'>
			<View className='p-2 flex-column items-center max-w-s'>
				<Image
					className={'w-52 h-52 mr-8 rounded-xl'}
					style={{ margin: 0 }}
					source={{
						uri: character.image,
					}}
				/>
				<Text className='font-bold text-l'>{character.species}</Text>
				<Text className='font-bold text-l'>{character.type}</Text>
				<Text className='font-bold text-l'>{GENDERS[character.gender]}</Text>
				<Text className='font-bold text-l'>Origen: {originCharacter == 'unknown' ? 'Desconocido' : originCharacter}</Text>
				<Text className='font-bold text-l'>Localización Actual: {locationCharacter == 'unknown' ? 'Desconocido' : locationCharacter}</Text>
			</View>
		</SafeAreaView>
	);
};

export default FetchCharacter;