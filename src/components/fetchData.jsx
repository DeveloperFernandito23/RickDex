import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View, Image } from 'react-native';

const FetchData = () => {
	const [isLoading, setLoading] = useState(true);
	const [dataFetch, setData] = useState([]);

	const getMovies = async () => {
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
	};

	useEffect(() => {
		getMovies();
	}, []);

	return ( 
		<View >
			{isLoading ? (
				<ActivityIndicator />
			) : (
				<FlatList
					data={dataFetch}
					keyExtractor={({id}) => id}
					renderItem={({item}) => (
						<View className="bg-black rounded-lg shadow-md p-4 flex flex-col items-center">
							<Image source={{ uri: item.image }} className="w-32 h-32 object-cover rounded-full mb-4" />
							<Text className="text-gray-200 font-bold text-lg mb-2 text-center">{item.name}</Text>
							<Text className="text-gray-500 text-sm text-center">{item.status}</Text>
						</View>
					)}
				/>
			)}
		</View>
	);
};

export default FetchData;