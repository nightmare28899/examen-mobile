import React from "react";
import { View, Text, Image, FlatList, StyleSheet } from "react-native";
/* Utils */
import { formatDate } from "../../utils/FormatDate";

const PatientList = ({ patients }: any) => {
  const renderItem = ({ item }: any) => (
    <View style={styles.container}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View>
        <Text>Id: {item.id}</Text>
        <Text>Paciente: {item.patientName}</Text>
        <Text>Malestar: {item.discomfort}</Text>
        <Text>Doctor: {item.doctor}</Text>
        <Text>Telefono: {item.phone}</Text>
        <Text>Fecha: {formatDate(item.date)}</Text>
      </View>
    </View>
  );

  return (
    <View>
      <FlatList
        data={patients}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  image: {
    width: 65,
    height: 65,
    marginRight: 10,
  },
});

export default PatientList;
