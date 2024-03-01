import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import Main from '../src/components/Main.jsx'
import MainDetails from '../src/components/MainDetails.jsx'
import Favicon from 'react-favicon'


const Stack = createNativeStackNavigator()

export default function MainStack() {
    return <NavigationContainer>
        <Favicon url='../src/images/favicon.ico' />

        <Stack.Navigator>

            <Stack.Screen
                name='Main'
                component={Main}
                options={{
                    headerShown: false
                }}
            />

            <Stack.Screen
                name='MainDetails'
                component={MainDetails}
            />

        </Stack.Navigator>
    </NavigationContainer>
}