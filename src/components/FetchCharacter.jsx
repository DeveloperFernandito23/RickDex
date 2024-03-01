import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Text, View, Image, SafeAreaView, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const LIMIT = 42
const URL_API = 'https://rickandmortyapi.com/api/character/'

const FetchCharacter = ({ idCharacter }) => {
	let navigator = useNavigation()

	//const [isLoading, setLoading] = useState(true);
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
		fetchCharacter();
	}, []);

	navigator.setOptions({
		title: character.name
	})

	return (
		<SafeAreaView className=' flex-1 bg-white'>
			<View className='p-2 flex-column items-center max-w-s'>
				<Image
					className='w-24 h-24 mr-8'
					source={{
						uri: character.image,
					}}
				/>
				<Text className='font-bold text-xl'>{character.name}</Text>
				<Text className='font-bold text-xl'>{character.name}</Text>
				<Text className='font-bold text-xl'>{character.name}</Text>
				<Text className='font-bold text-xl'>{character.name}</Text>
			</View>
		</SafeAreaView>
	);
};

export default FetchCharacter;