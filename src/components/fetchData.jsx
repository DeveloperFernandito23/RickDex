import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Text, View, Image, SafeAreaView } from 'react-native'

const LIMIT = 42
const URL_API = 'https://rickandmortyapi.com/api/character?page='


const FetchData = () => {
	const [isLoading, setLoading] = useState(true);
	const [characters, setData] = useState([]);

	const fetchCharacter = async () => {
		try {
			let dataFetch = []

			for (let i = 1; i <= LIMIT; i++) {
				const response = await fetch(`${URL_API}${i}`);
				const json = await response.json();

				dataFetch = dataFetch.concat(json.results)
			}

			setData(dataFetch)
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	}

	useEffect(() => {
		fetchCharacter();
	}, []);

	return (
		<SafeAreaView className=' flex-1 bg-white'>
			{isLoading ? (
				<ActivityIndicator />
			) : (
				<FlatList
					data={characters}
					keyExtractor={(item) => item.id}
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