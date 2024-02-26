import React from 'react';
import { View } from 'react-native';
import FetchData from './FetchData.jsx';


const Main = () =>{
	return (
		<View className='flex flex-row flex-wrap justify-center'> 
			<FetchData />
		</View>
	);
};

export default Main;