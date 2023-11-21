import { View, Text, TouchableOpacity, Image, TextInput, Alert,KeyboardAvoidingView } from 'react-native'
import React, { useEffect } from 'react'
import {useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {ArrowLeftIcon} from 'react-native-heroicons/solid'
import { themeColors } from '../theme'
import { useNavigation } from '@react-navigation/native'
import AuthService from '../AuthService';
import { GoogleSignin ,statusCodes} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';



export default function LoginScreen({navigation}) {
  
  useEffect(() => {
    const configureGoogleSignIn = async () => {
      try {
        await GoogleSignin.hasPlayServices();
        GoogleSignin.configure({
          webClientId: '839903476869-a95c71824dc15atop1f9iqs59lbkq3ef.apps.googleusercontent.com',
        });
        console.log("yes")
      } catch (error) {
        console.log('Error configuring Google Sign-In:', error);
      }
    };

    configureGoogleSignIn();
  }, []);
   

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  async function onGoogleButtonPress() {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();
   
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  
    // Sign-in the user with the credential

    return auth().signInWithCredential(googleCredential);
  }
   const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo)
      Alert.alert(
        `Hello ${userInfo.user.name}`,
        [{ text: 'OK', onPress: () => navigation.replace('Home') }]
      );

    } catch (error) {
      console.log('Google Sign-In error:', error);
      navigation.replace('Home');
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // User cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // Operation (e.g., sign-in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // Play services not available or outdated
      } else {
        // Some other error happened
      }
    }
  };

  const handleSignIn = async () => {
    try {
      await AuthService.signInWithEmailAndPassword(email, password);
      console.log('User signed in successfully!');

      // After successful sign-in, navigate to the HomeTabs screen
      navigation.replace('Home');
    } catch (error) {
      console.error('Error signing in:', error.message);
      
    }
  };
  return (
    <View className="flex-1 bg-slate-300" >
      <SafeAreaView  className="flex ">
        <View className="flex-row justify-start mt-3">
          <TouchableOpacity onPress={()=> navigation.goBack()} 
          className=" rounded-tr-2xl rounded-bl-2xl ml-4">
            <ArrowLeftIcon size="20" color="black" />
          </TouchableOpacity>
        </View>
        <View  className="flex-row justify-center">
          <Image source={require('../assets/images/login.png')} 
          style={{width: 200, height: 200}} />
        </View>
        
        
      </SafeAreaView>
      <View 
        style={{borderTopLeftRadius: 50, borderTopRightRadius: 50}} 
        className="flex-1 bg-white px-8 pt-8">
          <View className="form space-y-2">
          <Text className="text-gray-700 ml-4">Email Address</Text>
            <TextInput
                className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                value={email}
                onChangeText={(text) => setEmail(text)}
                placeholder='Enter Email'
            />
            <Text className="text-gray-700 ml-4">Password</Text>
            <TextInput
                className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-7"
                secureTextEntry
                value={password}
                onChangeText={(text) => setPassword(text)}
                placeholder='Enter Password'
            />
            <TouchableOpacity className="flex items-end">
              <Text className="text-gray-700 mb-5">Forgot Password?</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              className="py-3 bg-yellow-400 rounded-xl"
              onPress={handleSignIn}>
                <Text 
                    className="text-xl font-bold text-center text-gray-700"
                >
                        Login
                </Text>
             </TouchableOpacity>
            
          </View>
          <Text className="text-xl text-gray-700 font-bold text-center py-5">Or</Text>
          <View className="flex-row justify-center space-x-12">
            <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl" onPress={signIn}>
              <Image source={require('../assets/icons/google.png')} className="w-10 h-10" />
            </TouchableOpacity>
          
            <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
              <Image source={require('../assets/icons/facebook.png')} className="w-10 h-10" />
            </TouchableOpacity>
          </View>
          <View className="flex-row justify-center mt-7">
              <Text className="text-gray-500 font-semibold">
                  Don't have an account?
              </Text>
              <TouchableOpacity onPress={()=> navigation.navigate('SignUp')}>
                  <Text className="font-semibold text-yellow-500"> Sign Up</Text>
              </TouchableOpacity>
          </View>
          
      </View>
    </View>
    
  )
}