import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons, AntDesign, Octicons, FontAwesome } from '@expo/vector-icons';
import 'react-native-gesture-handler';

import telaLogin from './pages/login'
import disponibilidade from './pages/disponibilidade';
import manutencao from './pages/manutencao';

const Stack = createNativeStackNavigator();

const Tab = createMaterialBottomTabNavigator();

function TelaAll() {
  return(
    <Tab.Navigator
            initialRouteName="Disponibilidade"
            activeColor="#e91e63"
            labelStyle={{ fontSize: 12, color: "#fff" }}
            barStyle={{ backgroundColor: '#3b2fa3'}}
        >
            <Tab.Screen
                name="Disponibilidade"
                component={disponibilidade}
                options={{
                    tabBarLabel: '',
                    tabBarIcon: ({ color }) => (
                        <Octicons name="feed-discussion" color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="Manutencao"
                component={manutencao}
                options={{
                    tabBarLabel: "",
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="plus" color={color} size={26} />
                    ),
                }}
            />
        </Tab.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={telaLogin} options={{ headerShown: false }}/>
        <Stack.Screen name="Post" component={TelaAll} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}