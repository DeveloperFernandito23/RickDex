import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Text, View, Image, SafeAreaView } from 'react-native'

const LIMIT = 42
const URL_API = 'https://rickandmortyapi.com/api/character?page='

let characters = []

/* async function fetchCharacter() {
	try {
		for (let i = 1; i <= LIMIT; i++) {
			const response = await fetch('https://rickandmortyapi.com/api/character');
			const json = await response.json();

			json.results.forEach((item) => {
				characters.push(item)
			})
		}

		setData(characters);
	} catch (error) {
		console.error(error);
	} finally {
		setLoading(false);
	}
	console.log(characters)
}
 */
const FetchData = async () => {
	const [isLoading, setLoading] = useState(true);
	const [dataFetch, setData] = useState([]);

	const fetchCharacter = async () => {
		try {
			const feetch = async () => {
				for (let i = 1; i <= LIMIT; i++) {
					const response = await fetch(`${URL_API}${i}`);
					const json = await response.json();

					json.results.forEach((item) => {
						characters.push(item)
					})
				}
			}
			console.log('TODO MORAPIO HIJO DEP UTA')

			await feetch()

			setData(JSON.parse(characters));
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
		console.log(characters)
	}

	/* const getMovies = async () => {
		try {
			const response = await fetch('https://rickandmortyapi.com/api/character');
			const json = await response.json();
			console.log(json);
			setData(json.results);
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	}; */

	useEffect(async () => {
		await fetchCharacter();
	}, []);

	return (
		<SafeAreaView className=' flex-1 bg-white'>
			{isLoading ? (
				<ActivityIndicator />
			) : (
				<FlatList
					data={dataFetch}
					keyExtractor={(item) => item.name}
					ListFooterComponent={() =>
						isLoading ? <ActivityIndicator /> : null
					}
					renderItem={({ item }) => (
						<View className='p-2 flex-column items-center max-w-s'>
							<Image
								className='w-24 h-24 mr-8'
								source={{
									uri: item.image,
								}}
							/>
							<Text className='font-bold text-xl'>{item.name}</Text>
						</View>
					)}
				/>
			)}
		</SafeAreaView>
	);
};

export default FetchData;