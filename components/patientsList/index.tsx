import React, { useEffect } from "react";
import { View, Text, Image, FlatList, StyleSheet } from "react-native";
/* Utils */
import { formatDate } from "../../utils/FormatDate";
/* Styles */
import stylesLight from "../../assets/css/stylesLight";
import stylesDark from "../../assets/css/stylesDark";

const PatientList = ({ patients, statusDarkMode }: any) => {

  /* useEffect(() => {
    
  }, [isDarkMode]); */
  /* console.log(isDarkMode); */
  
  const modeStyle = statusDarkMode ? stylesDark : stylesLight;

  const renderItem = ({ item }: any) => (
    <View style={styles.container}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View>
        <Text style={modeStyle.textColor}>Id: {item.id}</Text>
        <Text style={modeStyle.textColor}>Paciente: {item.patientName}</Text>
        <Text style={modeStyle.textColor}>Malestar: {item.discomfort}</Text>
        <Text style={modeStyle.textColor}>Doctor: {item.doctor}</Text>
        <Text style={modeStyle.textColor}>Telefono: {item.phone}</Text>
        <Text style={modeStyle.textColor}>Fecha: {formatDate(item.date)}</Text>
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
  text: {
    fontSize: 16,
  },
});

export default PatientList;
