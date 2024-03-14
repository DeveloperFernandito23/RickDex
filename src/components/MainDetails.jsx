import React from 'react';
import { View, Text } from 'react-native-web';
import FetchCharacter from './FetchCharacter.jsx';
import { ScrollView } from 'react-native-web';


const MainDetails = ({ route }) => {

    const { idCharacter } = route.params

    return (
        <ScrollView>
            <FetchCharacter idCharacter={idCharacter} />
        </ScrollView>
    );
};

export default MainDetails;