import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';

const AppointmentScreen = ({ route }) => {
  const navigation = useNavigation();
  const { serviceId } = route.params;
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleConfirmAppointment = () => {
    // Implement the logic to confirm the appointment
    // You can use the `serviceId` and `selectedDate` to create an appointment
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select a Date and Time</Text>
      {/* Implement a date picker component and pass the `handleDateChange` function as a callback */}
      <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmAppointment}>
        <Text style={styles.confirmText}>Confirm Appointment</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  // Add your styles here
});

export default AppointmentScreen;