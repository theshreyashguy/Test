import { StatusBar, View, Text, TouchableOpacity, Image, Dimensions, Platform, Alert } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeftCircleIcon, MinusIcon, PlusIcon } from 'react-native-heroicons/outline';
import { HeartIcon, StarIcon } from 'react-native-heroicons/solid';
import { themeColors } from '../theme';
import { ShoppingBag } from 'react-native-feather';
import { ScrollView } from 'react-native';
import RNUpiPayment from 'react-native-upi-payment';
import {HomeIcon as HomeSolid, HeartIcon as HeartSolid, ShoppingBagIcon as BagSolid} from 'react-native-heroicons/outline';
import {HomeIcon as HomeOutline, HeartIcon as HeartOutline, ShoppingBagIcon as BagOutline } from 'react-native-heroicons/outline';
interface FavouriteScreenProps {
  route: {
    params: {
      name: string;
      price: number;
      stars: number;
      desc: string;
      volume: string;
    };
  };
}


const {width, height} = Dimensions.get('window');
const ios = Platform.OS == 'ios';


export default function FavouriteScreen(props: FavouriteScreenProps) {
  const item = props.route.params;
  const [size, setSize] = useState('small');
  const [vol,setVol] = useState(1);
  const navigation = useNavigation();
  const makePayment = async (cost: number,vol: number,size: string) => {
    // Define payment parameters
    const cst = cost  * vol

    RNUpiPayment.initializePayment(
      {
        vpa: '7972810671@ybl', // or can be john@ybl or mobileNo@upi
        payeeName: 'John Doe',
        amount: cst,
        transactionRef: 'aasf-332-aoei-fn',
      },
      successCallback,
      failureCallback
    );
    function successCallback(data: any) {
      console.log(data);
      Alert.alert(
        'Payment Successful',
        'Your order has been placed successfully.',
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
      );
  
      // You can perform additional actions related to order processing here
      console.log('Order processing...');
    }
    
    function failureCallback(data: any) {
      // do whatever with the data
      console.log(data);
      Alert.alert(
        'Payment Not Completed',
        'Your order was not placed',
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
      );
  
      // You can perform additional actions related to order processing here
      console.log('Order processing...');
    }
    console.log("hello it's working")
  };

  return (
    <View className="flex-1">
      <StatusBar barStyle="light-content" />
      <Image 
        source={require('../assets/images/beansBackground2.png')} 
        style={{height: 300, borderBottomLeftRadius: 50, borderBottomRightRadius: 50}} 
        className="w-full absolute" />
      <SafeAreaView className="space-y-4 flex-1">
        <View className="mx-4 flex-row justify-between items-center">
          <TouchableOpacity className=" rounded-full " onPress={()=> navigation.goBack()}>
            <ArrowLeftCircleIcon size="50" strokeWidth={1.2} color="white" />
          </TouchableOpacity>

          <TouchableOpacity className=" rounded-full border-2 border-white p-2">
            <HeartIcon size="24" color="white" />
          </TouchableOpacity>
        </View>
        
        <View 
          style={{
            shadowColor: themeColors.bgDark,
            shadowRadius: 30,
            shadowOffset: {width: 0, height: 30},
            shadowOpacity: 0.9,
          }}
          className="flex-row justify-center">
          <Image source={require(`../assets/images/coffee2.png`)} className="h-60 w-60" style={{marginTop: ios? 0:50}} />
        </View>
        
        <View 
          style={{backgroundColor: themeColors.bgLight}} 
          className="flex-row justify-center items-center mx-4 rounded-3xl p-1 px-2 space-x-1 opacity-90 w-16">
          <StarIcon size="15" color="white" />
          <Text className="text-base font-semibold text-white">{item.stars}</Text>
        </View>
        <ScrollView>
        <View className="px-4 flex-row justify-between items-center">
            <Text style={{color: themeColors.text}} className="text-2xl font-semibold">
              {item.name}
            </Text>
            <Text style={{color: themeColors.text}} className="text-lg font-semibold">
              $ {item.price}
            </Text>
            
        </View>
        
        <View className="px-4 space-y-2">
          <Text style={{color: themeColors.text}} className="text-lg font-bold">Coffee size</Text>
          <View className="flex-row justify-between">
            <TouchableOpacity 
             onPress={()=> setSize('small')}
             style={{backgroundColor: size=='small'? themeColors.bgLight: 'rgba(0,0,0,0.07)'}} 
             className="p-3 px-8 rounded-full">
              <Text className={size=='small'? "text-white": "text-gray-700"}>Small</Text>
            </TouchableOpacity>
            <TouchableOpacity 
             onPress={()=> setSize('medium')}
             style={{backgroundColor: size=='medium'? themeColors.bgLight: 'rgba(0,0,0,0.07)'}}
              className="p-3 px-8 rounded-full">
              <Text className={size=='medium'? "text-white": "text-gray-700"}>Medium</Text>
            </TouchableOpacity>
            <TouchableOpacity 
             onPress={()=> setSize('large')}
             style={{backgroundColor: size=='large'? themeColors.bgLight: 'rgba(0,0,0,0.07)'}} 
             className="p-3 px-8 rounded-full">
              <Text className={size=='large'? "text-white": "text-gray-700"}>Large</Text>
            </TouchableOpacity>
          </View>
        </View>
        

        <View className="px-4 space-y-2">
          <Text style={{color: themeColors.text}} className="text-lg font-bold">About</Text>
          <Text className="text-gray-600">
            {item.desc}
          </Text>
        </View>
        
        </ScrollView>

        
      </SafeAreaView>

      <View className={`space-y-4 ${ios? 'mb-6': 'mb-1'}`}>
          <View className="flex-row justify-between items-center px-4 mb-2">
              <View className="flex-row items-center space-x-1">
                <Text className="text-base text-gray-700 font-semibold opacity-60">
                  Volume 
                </Text>
                <Text className="text-base text-black font-semibold"> {item.volume}</Text>
              </View>
              <View 
                className="flex-row items-center space-x-4 border-gray-500 border rounded-full p-1 px-4">
                <TouchableOpacity onPress={()=>{vol !=0 ? setVol(vol-1): vol}}>
                  <MinusIcon size="20" strokeWidth={3} color={themeColors.text} />
                </TouchableOpacity>
                {/* item volume */}
                <Text style={{color: themeColors.text}} className="font-extrabold text-lg">{vol}</Text>
                <TouchableOpacity  onPress={()=>{setVol(vol+1)}}>
                  <PlusIcon size="20" strokeWidth={3} color={themeColors.text} />
                </TouchableOpacity>
              </View>
          </View>
          {/* buy now button */}
          <View className="flex-row justify-between px-2">
            <TouchableOpacity className="p-4 rounded-full border border-gray-400">
            <View style={{ width: 30, height: 30, backgroundColor: 'gray' }}>
            <BagOutline size="30" strokeWidth={2} color="white" />
              </View>
            </TouchableOpacity>
            <TouchableOpacity 
              style={{backgroundColor: themeColors.bgLight}} 
              className="p-4 rounded-full flex-1 ml-4"
              onPress={() =>makePayment(item.price,vol,size)}
              >
              <Text className="text-center text-white text-base font-semibold">Buy now</Text>
            </TouchableOpacity>
          </View>
        </View>
        
      
    </View>
  )
}