import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, TextInput, View, Image, SafeAreaView, Pressable, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LIMIT = 42;
const URL_API = 'https://rickandmortyapi.com/api/character?page=';

let allCharacters = []

export const GENDERS = {
	Male: 'Masculino',
	Female: 'Femenino',
	unknown: 'Desconocido',
	Genderless: 'Sin género'
};
export const STATES = {
	Alive: 'border-green-500',
	Dead: 'border-red-500',
	unknown: 'border-gray-500'
};

const FetchData = () => {
	let navigator = useNavigation();

	const [isLoading, setLoading] = useState(true);
	const [characters, setData] = useState([]);
	const [highlightedId, setHighlightedId] = useState(null);
	const [query, setQuery] = useState('');

	const fetchCharacters = async () => {
		try {
			let dataFetch = [];

			for (let i = 1; i <= LIMIT; i++) {
				const response = await fetch(`${URL_API}${i}`);
				const json = await response.json();

				dataFetch = dataFetch.concat(json.results);
			}

			setData(dataFetch);

			allCharacters = dataFetch
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	const handleQuery = (text) => {
		setQuery(text)

		let filteredData = allCharacters.filter((character) => character?.name.toLowerCase().includes(text))
		
		setData(filteredData)
	}

	const overMouse = (id) => setHighlightedId(id)

	const leaveMouse = () => setHighlightedId(null)

	const styles = StyleSheet.create({
		defaultStyle: {
			backgroundColor: 'rgba(75, 85, 99, 0.75)',
			gap: 8
		},

		hoverStyle: {
			backgroundColor: 'rgb(75, 85, 99)',
			gap: 8
		}
	});

	useEffect(() => {
		fetchCharacters();
	}, []);

	return (
		<SafeAreaView className='flex-1 w-full'>
			<TextInput
				placeholder='Buscar Personaje...'
				clearButtonMode='always'
				style={{
					paddingHorizontal: 20,
					paddingVertical: 10,
					borderColor: '#ccc',
					borderWidth: 1,
					borderRadius: 8,
					width: 'min(25rem, 83%)',
					margin: 'auto',
					color: 'white',
					backgroundColor: 'rgb(75, 85, 99)',
					marginTop: 33,
					marginBottom: 33,
				}}
				autoCapitalize='none'
				autoComplete={false}
				value={query}
				onChange={(text) => handleQuery(text?.nativeEvent?.text)}
			/>
			{isLoading ? (
				<ActivityIndicator />
			) : characters.length === 0 ? (
				<Text className='text-xl text-center text-white font-bold'>No Hay Personajes... :(</Text> //FERDINANNNNNNNNDOOOOOO ESTO HABRÁ QUE PONERLO BONICO NOOOOO??? :)))
			) : (
				<FlatList
					data={characters}
					keyExtractor={(item) => item.id}
					contentContainerStyle={{
						display: 'grid',
						gridTemplateColumns: 'repeat(auto-fit, minmax(20rem, 1fr))',
						gridGap: '4rem',
						padding: 10,
						width: '90%',
						margin: 'auto'
					}}

					ListFooterComponent={() =>
						isLoading ? <ActivityIndicator /> : null
					}

					renderItem={({ item }) => (
						<View className='p-2 flex-column items-center max-w-s'>
							<Pressable
								onPress={() => {
									navigator.navigate('MainDetails', {
										idCharacter: item.id
									});
								}}
								className='items-center rounded-3xl p-8'
								style={[styles.defaultStyle, highlightedId === item.id && styles.hoverStyle]}
								onMouseOver={() => overMouse(item.id)}
								onMouseLeave={() => leaveMouse()}
							>
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
					)}
				/>
			)}
		</SafeAreaView >
	);
}

export default FetchData; 