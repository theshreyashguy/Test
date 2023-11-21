import { View, Text, Image, TouchableOpacity, ImageBackground } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { themeColors } from '../theme'
import { useNavigation } from '@react-navigation/native'

// https://w.forfun.com/fetch/36/36151c54ea96538fe7075b031332abd3.jpeg
export default function WelcomeScreen() {
    const navigation = useNavigation();
    const img = {uri : 'https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAzL3JtNTk3ZGVzaWduLWMtY2hvbmctMDAzLmpwZw.jpg' };
  return (
    <ImageBackground  source={img}  className="flex-1" >
       
        <View className="flex-1 flex justify-between my-4 ">
            <Text 
                className="text-white font-bold text-4xl mt-5 text-center">
                Let's Get Started!
            </Text>
            {/* <View className="flex-row justify-center">
                <Image source={require("../assets/images/welcome.png")}
                    style={{width: 350, height: 350}} />
            </View> */}
            <View className="space-y-4">
                <TouchableOpacity
                    onPress={()=> navigation.navigate('SignUp')}
                    className="py-3 bg-slate-200 mx-7 rounded-xl">
                        <Text 
                            className="text-xl font-bold text-center text-gray-700"
                        >
                            Sign Up
                        </Text>
                </TouchableOpacity>
                <View className="flex-row justify-center">
                    <Text className="text-white font-semibold">Already have an account?</Text>
                    <TouchableOpacity onPress={()=> navigation.navigate('Login')}>
                        <Text className="font-semibold text-yellow-400"> Log In</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    </ImageBackground>
  )
}