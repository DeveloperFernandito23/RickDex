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

	console.log(Object.values(dataFetch));

	return (
		<View style={{ flex: 1, padding: 24 }}>
			{isLoading ? (
				<ActivityIndicator />
			) : (
				<FlatList
					data={Object.values(dataFetch)}
					keyExtractor={({ id }) => id}
					renderItem={({ item }) => (
						<View className="relative">
							<Text>
								{item.name}
							</Text>
							<Image
								className="w-10 h-10 opacity-95 "
								source={item.image}
							/>
						</View>
					)}
				/>
			)}
		</View>
	);
};

export default FetchData;