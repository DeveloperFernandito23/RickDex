import React, { useEffect, useState } from 'react';
import { Text, View, ActivityIndicator, Image, SafeAreaView, ImageBackground, StyleSheet, useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { GENDERS } from './FetchData';

const URL_API = 'https://rickandmortyapi.com/api/character/';

const FetchCharacter = ({ idCharacter }) => {
	const navigator = useNavigation();
	const { width } = useWindowDimensions();
	const [isLoading, setLoading] = useState(true);
	const [character, setData] = useState([]);

	const fetchCharacter = async () => {
		try {
			const response = await fetch(`${URL_API}${idCharacter}`);
			const json = await response.json();

			setData(json);
		} catch (error) {
			console.error(error);
		} finally {
			setTimeout(() => setLoading(false), 500)
		}
	};

	useEffect(() => {
		fetchCharacter();
		navigator.setOptions({
			title: `${character.name} - ${character.id}`
		});
	});

	let characterOrigin = character.origin?.name;
	let characterLocation = character.location?.name;
	let characterGender = GENDERS[character.gender];
	let characterSpecies = character.species;
	let characterType = character.type;

	let isFemale = characterGender === 'Femenino';

	const STATES = {
		Alive: isFemale ? 'Viva' : 'Vivo',
		Dead: isFemale ? 'Muerta' : 'Muerto',
		unknown: 'Desconocido'
	};

	let characterStatus = STATES[character.status];

	let statusImagePath = characterStatus == 'Vivo' || characterStatus == 'Viva' ? require('../images/details-icons/state/alive.png') : characterStatus == 'Muerto' || characterStatus == 'Muerta' ? require('../images/details-icons/state/dead.png') : require('../images/details-icons/question.png');

	let specieImagePath = characterSpecies == 'Human' ? require('../images/details-icons/specie/human.png') : require('../images/details-icons/specie/alien.png')

	let typeImagePath = characterType == '' ? require('../images/details-icons/type/normal.png') : require('../images/details-icons/type/potion.png')

	let genderImagePath = characterGender == 'Masculino' ? require('../images/details-icons/gender/male.png') : characterGender == 'Femenino' ? require('../images/details-icons/gender/female.png') : characterGender == 'Sin género' ? genderImagePath = require('../images/details-icons/gender/genderless.png') : genderImagePath = require('../images/details-icons/question.png')

	let originImagePath = characterOrigin == 'unknown' ? require('../images/details-icons/question.png') : require('../images/details-icons/origin/planets.png')

	let locationImagePath = characterLocation == 'unknown' ? require('../images/details-icons/question.png') : require('../images/details-icons/location/citadel.png')
	// 'min(27rem, 55vh)'

	const styles = StyleSheet.create({
		detailsContainer: {
			flexDirection: 'row',
			alignItems: 'center',
			gap: 15,
		},

		details: {
			fontWeight: 700,
			fontSize: width > 600 ? '2.25rem' : '1.5rem', /* 36px */
			lineHeight: width > 600 ? '2.5rem' : '2rem', /* 40px */
			color: 'white'
		}
	})

	return (
		<SafeAreaView style={{ height: '100vh' }}>
			<ImageBackground
				source={require('../images/background.jpg')}
				resizeMode={'cover'}
				style={{ flex: 1, width: '100%', height: '100%' }}
			>
				<View
					className='p-8'
					style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', flex: 1 }}
				>
					{isLoading ? (
						<ActivityIndicator />
					) : (
						<View
							className='flex-row max-w-s justify-between flex-wrap rounded-3xl p-7'
							style={{ backgroundColor: 'rgb(75, 85, 99)' }}
						>
							<Image
								id='foto'
								className={'mr-8 rounded-xl'}
								style={{ margin: 0, width: 'min(33rem, 100%)', height: width > 600 ? '30rem' : '20rem' }}
								source={{
									uri: character.image
								}}
							/>
							<View className='justify-around' style={{ width: width > 600 ? '50%' : '100%', marginTop: width > 600 ? 0 : 25 }}>
								<View style={styles.detailsContainer}>
									<Image source={statusImagePath} />
									<Text style={styles.details}>Estado: {characterStatus}</Text>
								</View>
								<View style={styles.detailsContainer}>
									<Image source={specieImagePath} />
									<Text style={styles.details}>Especie: {characterSpecies}</Text>
								</View>
								<View style={styles.detailsContainer}>
									<Image source={typeImagePath} />
									<Text style={styles.details}>Tipo: {characterType != '' ? characterType : 'Normal'}</Text>
								</View>
								<View style={styles.detailsContainer}>
									<Image source={genderImagePath} />
									<Text style={styles.details}>Género: {characterGender}</Text>
								</View>
								<View style={styles.detailsContainer}>
									<Image source={originImagePath} />
									<Text style={styles.details}>Origen: {characterOrigin != 'unknown' ? characterOrigin : 'Desconocido'}</Text>
								</View>
								<View style={styles.detailsContainer}>
									<Image source={locationImagePath} />
									<Text style={styles.details}>Localización Actual: {characterLocation != 'unknown' ? characterLocation : 'Desconocida'}</Text>
								</View>
							</View>
						</View>
					)}
				</View>
			</ImageBackground>
		</SafeAreaView >
	);
};

export default FetchCharacter;