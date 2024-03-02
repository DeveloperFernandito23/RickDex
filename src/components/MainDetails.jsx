import React from 'react';
import { View, Text } from 'react-native';
import FetchCharacter from './FetchCharacter.jsx';


const MainDetails = ({ route }) => {

    const { idCharacter } = route.params

    return (
        <View className='w-full'>
            <FetchCharacter idCharacter={idCharacter} />
        </View>
    );
};

export default MainDetails;