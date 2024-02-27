import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View, Image, SafeAreaView } from 'react-native';

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
					renderItem={({item}) => (
						<View className='p-2 flex-row items-center'>
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