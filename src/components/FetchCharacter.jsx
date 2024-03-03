import React, { useEffect, useState } from 'react';
import { Text, View, ActivityIndicator, Image, SafeAreaView, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { GENDERS } from './FetchData';

const URL_API = 'https://rickandmortyapi.com/api/character/';

const FetchCharacter = ({ idCharacter }) => {
	let navigator = useNavigation();

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



	let statusImagePath;
	if (characterStatus == 'Vivo' || characterStatus == 'Viva') {
		statusImagePath = require('../images/details-icons/state/alive.png')
	} else if (characterStatus == 'Muerto' || characterStatus == 'Muerta') {
		statusImagePath = require('../images/details-icons/state/dead.png')
	} else {
		statusImagePath = require('../images/details-icons/question.png')
	}

	let specieImagePath = characterSpecies == 'Human' ? require('../images/details-icons/specie/human.png') : require('../images/details-icons/specie/alien.png')

	let typeImagePath = characterType == '' ? require('../images/details-icons/type/normal.png') : require('../images/details-icons/type/potion.png')

	let genderImagePath
	if (characterGender == 'Masculino') {
		genderImagePath = require('../images/details-icons/gender/male.png')
	} else if (characterGender == 'Femenino') {
		genderImagePath = require('../images/details-icons/gender/female.png')
	} else if (characterGender == 'Sin género') {
		genderImagePath = require('../images/details-icons/gender/genderless.png')
	} else {
		genderImagePath = require('../images/details-icons/question.png')
	}

	let originImagePath = characterOrigin == 'unknown' ? require('../images/details-icons/question.png') : require('../images/details-icons/origin/planets.png')

	let locationImagePath = characterLocation == 'unknown' ? require('../images/details-icons/question.png') : require('../images/details-icons/location/citadel.png')



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
								className={'mr-8 rounded-xl'}
								style={{ margin: 0, width: 'min(33rem, 100%)', height: 'min(27rem)' }} //Queda pendiente poner esto responsivo para el fffuuuucking phonne de tu colega
								source={{
									uri: character.image
								}}
							/>
							<View className='justify-around'>
								<View>
									<Image source={statusImagePath} />
									<Text className='font-bold text-3xl text-white'>Estado: {characterStatus}</Text>
								</View>
								<View>
									<Image source={specieImagePath} />
									<Text className='font-bold text-3xl text-white'>Especie: {characterSpecies}</Text>
								</View>
								<View>
									<Image source={typeImagePath} />
									<Text className='font-bold text-3xl text-white'>Tipo: {characterType != '' ? characterType : 'Normal'}</Text>
								</View>
								<View>
									<Image source={genderImagePath} />
									<Text className='font-bold text-3xl text-white'>Género: {characterGender}</Text>
								</View>
								<View>
									<Image source={originImagePath} />
									<Text className='font-bold text-3xl text-white'>Origen: {characterOrigin != 'unknown' ? characterOrigin : 'Desconocido'}</Text>
								</View>
								<View>
									<Image source={locationImagePath} />
									<Text className='font-bold text-3xl text-white'>Localización Actual: {characterLocation != 'unknown' ? characterLocation : 'Desconocida'}</Text>
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