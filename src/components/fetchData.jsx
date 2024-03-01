import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Text, View, Image, SafeAreaView, Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const LIMIT = 42
const URL_API = 'https://rickandmortyapi.com/api/character?page='
const GENDERS = {
	Male: 'Masculino',
	Female: 'Femenino',
	unknown: 'Desconocido',
	Genderless: 'Sin género'
}
const STATES = {
	Alive: "border-green-500",
	Dead: "border-red-500",
	unknown: "border-gray-500"
}

const FetchData = () => {
	let navigator = useNavigation()

	const [isLoading, setLoading] = useState(true);
	const [characters, setData] = useState([]);

	const fetchCharacters = async () => {
		try {
			let dataFetch = []

			for (let i = 1; i <= LIMIT; i++) {
				const response = await fetch(`${URL_API}${i}`);
				const json = await response.json();

				dataFetch = dataFetch.concat(json.results)
			}

			//setData(dataFetch.filter(item => item.name.includes('Rick')))
			setData(dataFetch)
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	}

	useEffect(() => {
		fetchCharacters();
	}, []);

	return (
		<SafeAreaView className='flex-1 w-full'>
			{isLoading ? (
				<ActivityIndicator />
			) : (
				<FlatList
					data={characters}
					keyExtractor={(item) => item.id}
					//contentContainerStyle={{ flexGrow: 1 }} // Ajusta el estilo del contenedor de contenido
					/* style={{ flex: 1 }} // Ajusta el estilo de FlatList */
					ListFooterComponent={() =>
						isLoading ? <ActivityIndicator /> : null
					}
					renderItem={({ item }) => (
						<View className='p-2 flex-column items-center max-w-s'>
							<Pressable onPress={() => {
								navigator.navigate('MainDetails', {
									idCharacter: item.id
								})

							}}>
								<Image
									className={'w-52 h-52 mr-8 rounded-full border-4 ' + STATES[item.status]}
									style={{ margin: 0 }}
									source={{
										uri: item.image,
									}}
								/>
								<Text className='font-bold text-xl text-center text-white'>{item.name}</Text>
								<Text className='font-bold text-l text-center text-white'>{GENDERS[item.gender]}</Text>
							</Pressable>
						</View>
					)
					}
				/>
			)}
		</SafeAreaView >
	);
};

export default FetchData;