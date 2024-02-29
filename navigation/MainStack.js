import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import Main from '../src/components/Main.jsx'
import MainDetails from '../src/components/MainDetails.jsx'

const Stack = createNativeStackNavigator()

export default function MainStack() {
    return <NavigationContainer>
        <Stack.Navigator>

            <Stack.Screen
                name = 'Main'
                component = { Main }
            />

            <Stack.Screen
                name = 'MainDetails'
                component = { MainDetails }
            />

        </Stack.Navigator>
    </NavigationContainer>;
}