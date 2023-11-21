import { StatusBar, View, Text, Image, TouchableOpacity, TextInput, FlatList, Dimensions, Platform, ImageBackground,KeyboardAvoidingView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {themeColors} from '../theme';
import { ActivityIndicator } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import CoffeeCard from '../components/coffeeCard';
import { BellIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline'
import { MapPinIcon } from 'react-native-heroicons/solid'

const {width, height} = Dimensions.get('window');
const ios = Platform.OS == 'ios';

interface Category {
  id: number;
  type: string;
  coffees: Coffee[];
}

interface Coffee {
  id: number;
  name: string;
  price: number;
  volume?: string;
  stars?: number;
  image?: string;
  desc?: string;
}


export default function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState(1);
  const [categories ,setCategories]  = useState<Category[]>([]);
  const [coffeeItems,setcoffeeItems] = useState<Coffee[]>([]);
  const [loading,setloading] = useState(true);



  useEffect(() => {
    console.log("yes");
    const fetchData = async () => {
      try {
        const response = await fetch('http://10.12.0.112:3000/coffee-types');
        
        if (response.ok) {
          const data = await response.json();
          setcoffeeItems(data[0].coffees);
           setCategories(data);
           setloading(false);
      
        } else {
          console.error('Failed to fetch data:', response.status, response.statusText);
        
        }
      } catch (error) {
        console.error('Error fetching data:', error);
   
      }
    };

    fetchData();
  }, []);
 // const [categories,setCatogaries] = useState([]);
  
      return (
        
         <View className ="flex-auto">
        {loading  ? (<ImageBackground  source={{uri : 'https://m.media-amazon.com/images/M/MV5BODE4NWNkMDctYWVlNS00YWJhLWIxNjMtMjQyMDUxNmJhNGRhXkEyXkFqcGdeQXVyMTA0MTM5NjI2._V1_FMjpg_UX1000_.jpg' }}  className="flex-1" />) :(
    
        <View className="flex-1 relative bg-white">
          <StatusBar />
    
          <Image 
            source={require('../assets/images/beansBackground1.png')} 
            style={{height: height*0.2}} 
            className="w-full absolute -top-5 opacity-10" />
          <SafeAreaView className={ios? '-mb-8': ''}>
            {/* avatar and bell icon */}
            <View className="mx-4 mt-2 flex-row justify-between items-center ">
              <Image source={require('../assets/images/avatar.png')} 
                className=" h-8 w-8  rounded-full" />
              
              <View className="flex-row items-center space-x-2">
                <MapPinIcon size="25" color={themeColors.bgLight} />
                <Text className="font-semibold text-base">
                  New York, NYC
                </Text>
              </View>
              <BellIcon size="29" color="black" />
            </View>
            {/* search bar */}
            <KeyboardAvoidingView className="mx-5 shadow" style={{marginTop: height*0.045}}>
              
              <View className="flex-row items-center rounded-full p-1 bg-[#e6e6e6]">
                <TextInput placeholder='Search' className="p-4 flex-1 font-semibold text-gray-700" />
                <TouchableOpacity 
                  className="rounded-full p-2" 
                  style={{backgroundColor: themeColors.bgLight}}>
                  <MagnifyingGlassIcon size="25" strokeWidth={2} color="white" />
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
            {/* categories */}
            <View className="px-3 mt-3 mb-8" >
      <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={categories}
      keyExtractor={(item ) => item.id.toString()}
      className="overflow-visible"
      renderItem={({ item }) => {
        const isActive = item.id === activeCategory;
        let activeTextClass = isActive ? 'text-white' : 'text-gray-700';
     
         const handleCategoryPress = () => {
          // Toggle active category
            // If the category is active, set coffeeItems to item.coffees
             setcoffeeItems(isActive ? coffeeItems : item.coffees);
            // console.log(item.coffees.name);
          
           setActiveCategory(isActive ? 0 : item.id); 
          
        };

        return (
          <TouchableOpacity
            onPress={handleCategoryPress}
            style={{
              backgroundColor: isActive ? themeColors.bgLight : 'rgba(0,0,0,0.07)',
            }}
            className="p-4 px-5 mr-2 rounded-full shadow"
          >
            <Text className={"font-semibold " + activeTextClass}>{item.type}</Text>
          </TouchableOpacity>
        );
      }}
    />
            </View>
              
          </SafeAreaView>
    
          {coffeeItems.length > 0 && (
            <View style={{ flex: 1, justifyContent: 'center', marginBottom: 8, marginTop: ios ? 10 : undefined }}>
              <View style={{ overflow: 'visible' }}>
                <Carousel
                  containerCustomStyle={{ overflow: 'visible' }}
                  data={coffeeItems}
                  renderItem={({ item }) => <CoffeeCard item={item} />}
                  firstItem={1}
                  loop={true}
                  inactiveSlideScale={0.75}
                  inactiveSlideOpacity={0.75}
                  sliderWidth={width}
                  itemWidth={width * 0.63}
                  slideStyle={{ alignItems: 'center' }}
                />
              </View>
            </View>
          )}
          
          
        </View>
              
      ) }
      </View>
      )
      
    
    
}
