import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Home from './paginas/home'; 
import Ponto from './paginas/ponto'; 
import Detalhe from './paginas/detalhe'; 

const AppStack = createStackNavigator();

const Rotas = () => {
    // aqui, o NavigationContainer funciona como o BrowserRouter do React
    return (
        <NavigationContainer>
            <AppStack.Navigator 
                headerMode="none"
                screenOptions={{
                    cardStyle: {
                        backgroundColor: '#f0f0f5'
                    }
                }}
            >
                <AppStack.Screen name="Home" component={Home} />
                <AppStack.Screen name="Ponto" component={Ponto} />
                <AppStack.Screen name="Detalhe" component={Detalhe} />
            </AppStack.Navigator>
        </NavigationContainer>
    );
}

export default Rotas;