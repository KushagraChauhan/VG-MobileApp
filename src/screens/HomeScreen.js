import React, {useEffect, useState} from 'react';
import { View, Text,TextInput, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomNavBar from '../components/BottomNavBar';
import Header from '../components/Header';

const HomeScreen = ({navigation}) => {
  const [firstName, setFirstName] = useState('');

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const storedFullName = await AsyncStorage.getItem('full_name'); 
        if (storedFullName) {
          const firstName = storedFullName.split(' ')[0]; // Extract first name
          setFirstName(firstName);
        }
      } catch (error) {
        console.error('Error retrieving name from AsyncStorage:', error);
      }
    };
  
    fetchUserName();
  }, []);
  
  return (
    <View style={styles.container}>
      {/* Header */}
      <Header
        title={`Namaste ${firstName || 'Guest'}!`}
        subtitle="Continue your journey into the unknowns of Sanatan with us."
      />

      {/* Main Content */}
      <ScrollView contentContainerStyle={styles.content}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search something..."
            placeholderTextColor="#999"
          />
        </View>

        {/* Cards */}
        {/* Cards Container */}
        <View style={styles.cardContainer}>
          {/* Course Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Explore our courses</Text>
            <View style={styles.card}>
              <Image
                source={require('../assets/Blooming Buds.webp')}
                style={styles.cardImage}
                resizeMode="cover"
              />
              <TouchableOpacity style={styles.ctaButton}>
                <Text style={styles.ctaButtonText}>Explore</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Workshop Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Take part in our Workshops</Text>
            <View style={styles.card}>
              <Image
                source={require('../assets/Blooming Buds.webp')}
                style={styles.cardImage}
                resizeMode="cover"
              />
              <TouchableOpacity style={styles.ctaButton}>
                <Text style={styles.ctaButtonText}>Join</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation Bar */}
      <BottomNavBar navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
  },
  content: {
    padding: 20,
    paddingBottom: 80,
  },
  searchContainer: {
    marginBottom: 30,
  },
  searchInput: {
    backgroundColor: 'white',
    borderRadius: 25,
    padding: 15,
    fontSize: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardContainer: {
    gap: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    paddingLeft: 10,
    textAlign:'center'
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 25,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    height: 175,
  },
  cardImage: {
    height: '80%',
    width: '80%',
    borderRadius: 25,
    marginTop: 20,
    paddingLeft: 20
  },
  ctaButton: {
    backgroundColor: '#000',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    position: 'absolute',
    bottom: '40%',
    right: '10%', // Positions button at 70% of card width (100% - 15%*2 = 70%)
    transform: [{ translateX: 15 }] // Fine-tune positioning
  },
  ctaButtonText:{
    color: '#FFF',
    fontWeight: 'bold'
  }
});

export default HomeScreen;