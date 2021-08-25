import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import HomeScreen from './screens/Home';
import LogDetails from './screens/LogDetails';
import CreateLog from './screens/CreateLog';
import EditLog from './screens/EditLog';

const Stack = createNativeStackNavigator();

const MainStack = _props => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{headerShown: false}}
        >
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{animationTypeForReplace: 'push'}}
          />
          <Stack.Screen
            name="LogDetails"
            component={LogDetails}
            options={{animationTypeForReplace: 'push'}}
          />
          <Stack.Screen
            name="CreateLog"
            component={CreateLog}
            options={{animationTypeForReplace: 'push'}}
          />
          <Stack.Screen
            name="EditLog"
            component={EditLog}
            options={{animationTypeForReplace: 'push'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default MainStack;
