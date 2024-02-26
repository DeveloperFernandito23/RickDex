import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View, Image } from 'react-native';
import { NativeWindStyleSheet } from 'nativewind';

NativeWindStyleSheet.setOutput({
	default: 'native',
});

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
						<View> 
							<Text>
								{item.name}
							</Text>
							
							<Image source={{ uri: item.image }} className='w-32 h-32' />

						</View>
					)}
				/>
			)}
		</View>
	);
};

export default FetchData;