import React, { useState } from 'react';
import { View, TextInput, Button, TouchableOpacity, Text, StyleSheet ,ImageBackground} from 'react-native';
import AuthService from '../AuthService';

const image  = {uri: 'https://images.unsplash.com/photo-1620820186187-fc32e79adb74?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29mZmVlJTIwYmFja2dyb3VuZHxlbnwwfHwwfHx8MA%3D%3D'}

const AuthScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    try {
      await AuthService.signUpWithEmailAndPassword(email, password);
      console.log('User signed up successfully!');

      // After successful sign-up, navigate to the HomeTabs screen
      navigation.replace('Home');
    } catch (error: any) {
      console.error('Error signing up:', error.message);
    }
  };

  const handleSignIn = async () => {
    try {
      await AuthService.signInWithEmailAndPassword(email, password);
      console.log('User signed in successfully!');

      // After successful sign-in, navigate to the HomeTabs screen
      navigation.replace('Home');
    } catch (error: any) {
      console.error('Error signing in:', error.message);
    }
  };

  return (
    <ImageBackground source={image} style={styles.container} resizeMode='cover'>
      <View style={styles.centeredContainer}>
        <View style={styles.form}>
          <Text style={styles.title}>Log in to your account</Text>

          <TextInput
            style={styles.input}
            value={email}
            onChangeText={(text) => setEmail(text)}
            placeholder="Email"
            autoCorrect={false}
            autoCapitalize="none"
            autoFocus
          />

          <TextInput
            style={styles.input}
            value={password}
            onChangeText={(text) => setPassword(text)}
            placeholder="Password"
            secureTextEntry
            autoCorrect={false}
            autoCapitalize="none"
          />

          <TouchableOpacity style={styles.button} onPress={handleSignUp}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.socialLogins}>
          <Text>Or quickly log in with:</Text>

          <TouchableOpacity style={styles.loginButton}>
            <Text>Facebook</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.loginButton}>
            <Text>Google</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.cta}>
          <Text>Home | Sign up | Forgot your password?</Text>
        </View>
      </View>
    </ImageBackground>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', // Light gray background color
  },
  centeredContainer: {
    width: 320,
    height: 500,
    justifyContent: 'center',
    position: 'absolute',
    top: '50%',
    left: '46%',
    marginLeft: -150, // Half of the width
    marginTop: -250, // Half of the height
    borderRadius: 27,
    borderWidth: 2,
    backgroundColor: 'white',
  },
  form: {
    width: '80%',
    padding: 12,
    alignSelf: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    color: '#333', // Dark gray text color
  },
  input: {
    height: 40,
    borderColor: '#CCC', // Light gray border color
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    backgroundColor: '#FFF', // White background color
  },
  button: {
    backgroundColor: '#EBA133', // Blue button color
    borderWidth: 1,
    borderColor: '#2980B9', // Darker blue border color
    borderRadius: 4,
    padding: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF', // White text color
    fontWeight: '500',
    fontSize: 15,
  },
  socialLogins: {
    marginTop: 20,
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: '#E74C3C', // Red button color
    borderWidth: 1,
    borderColor: '#C0392B', // Darker red border color
    borderRadius: 4,
    padding: 10,
    
    alignItems: 'center',
    marginBottom: 10,
  },
  cta: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  ctaText: {
    color: '#555', // Dark gray text color
  },
  
});


export default AuthScreen;
