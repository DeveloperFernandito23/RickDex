import React from 'react';
import { View, Text } from 'react-native';
import FetchCharacter from './FetchCharacter.jsx';


const MainDetails = ({ route }) => {

    const { idCharacter } = route.params

    return (
        <View className='w-full'>
            <FetchCharacter idCharacter={idCharacter} />
            {/* <Text>Hola zarzillo tengo el id { idCharacter }</Text> */}
        </View>
    );
};

export default MainDetails;