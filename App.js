import * as React from "react";
import { Button, View, Text, StyleSheet, Modal, TextInput, useEffect, useContext } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as firebase from 'firebase';
import firebaseConfig from './components/Firebase';
// Pages
import Load from "./pages/Load";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Scanner from './components/scanner';
import Library from './components/library';

//import firebase from "./components/Firebase";
firebase.auth().onAuthStateChanged(user => {
  if (user != null) {
    console.log('We are authenticated now!');
  }

  // Do other things
});

const AuthContext = React.createContext();

function HomeScreen() {
  const { signOut } = React.useContext(AuthContext);

  return (
    <View>
      <Text>Signed in!</Text>
      <Button title="Sign out" onPress={signOut} />
    </View>
  );
}

function SignInScreen() {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const { signIn } = React.useContext(AuthContext);

  return (
    <View>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Sign in" onPress={() => signIn({ username, password })} />
    </View>
  );
}

const MainNavigator = createMaterialTopTabNavigator();
const AuthNavigator = createStackNavigator();


const AuthContainer = () => (
  <AuthNavigator.Navigator>
    <AuthNavigator.Screen name="SignIn" component={SignInScreen} options={{ title: 'Sign in',
      animationTypeForReplace: state.isSignout ? 'pop' : 'push',
      }}
    />
  </AuthNavigator.Navigator>
  );

const MainContainer = () => (
  <MainNavigator.Navigator style={styles.navbar} initialRouteName="Library" tabBarPosition='bottom' tabBarOptions={{indicatorStyle: styles.indicator, style: styles.navbar, activeTintColor: 'white', showIcon: true, showLabel: false,}}>
    
    <MainNavigator.Screen name="Library" component={Library} options={{
    tabBarLabel: 'Library',
    tabBarIcon: ({ color }) => (
    <MaterialCommunityIcons name="book" color={color} size={20} />
    ),
    }}/>
    <MainNavigator.Screen name="Scanner" component={Scanner} options={{
    tabBarLabel: 'Scanner',
    tabBarIcon: ({ color }) => (
    <MaterialCommunityIcons name="camera" color={color} size={20} />
    ),
    }}/>
  </MainNavigator.Navigator>
  );

export default function App({ navigation }) {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async data => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token

        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
      signUp: async data => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token

        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
    }),
    []
  );

  return (
    <NavigationContainer>
      {state.userToken ? <AuthContainer/> : <MainContainer/>}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  navbar: {
    backgroundColor: '#060606FF',
  },
  indicator: {
    backgroundColor: 'red',
    height: 5,
  },
})