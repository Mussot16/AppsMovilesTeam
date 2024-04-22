import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();

  const services = [
    { id: 1, name: 'Service 1' },
    { id: 2, name: 'Service 2' },
    // Add more services as needed
  ];

  const handleSelectService = (serviceId) => {
    navigation.navigate('Appointment', { serviceId });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select a Service</Text>
      {services.map((service) => (
        <TouchableOpacity
          key={service.id}
          style={styles.serviceButton}
          onPress={() => handleSelectService(service.id)}
        >
          <Text style={styles.serviceText}>{service.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  // Add your styles here
});

export default HomeScreen;