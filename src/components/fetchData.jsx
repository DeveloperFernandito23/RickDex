import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';

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
		<View style={{flex: 1, padding: 24}}>
			{isLoading ? (
				<ActivityIndicator />
			) : (
				<FlatList
					data={dataFetch}
					keyExtractor={({id}) => id}
					renderItem={({item}) => (
						<Text>
							{item.name}
						</Text>
					)}
				/>
			)}
		</View>
	);
};

export default FetchData;