import React from 'react';
import { View } from 'react-native';
import FetchData from './FetchData.jsx';


const Main = ({ navigator }) => {
	return (
		<View className='w-full'>
			<FetchData navigator={navigator} />
		</View>
	);
};

export default Main;