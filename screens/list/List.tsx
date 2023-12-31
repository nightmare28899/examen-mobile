import React, { useState, useEffect } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../interface/navigation";
import AsyncStorage from "@react-native-async-storage/async-storage";
/* Utils */
import PatientList from "../../components/patientsList/index";
import { PatientRegister } from "../../interface/patientRegister";
import stylesLight from "../../assets/css/stylesLight";
import stylesDark from "../../assets/css/stylesDark";

const SearchBar = () => {
  const [searchText, setSearchText] = useState("");
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const [patients, setPatients] = useState<PatientRegister[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const isFocused = useIsFocused();
  type LoginScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    "Login"
  >;

  const modeStyle = isDarkMode ? stylesDark : stylesLight;
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    const loadData = async () => {
      const value = await AsyncStorage.getItem("formData");
      if (value !== null) {
        const data = JSON.parse(value);
        setPatients(data);
      } else {
        setPatients([]);
      }
    };
    loadData();
  }, [patients, isFocused]);

  const recordsOrdered = patients.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const searchPatients = () => {
    return patients.filter(
      (patient) =>
        patient.patientName.toLowerCase().includes(searchText.toLowerCase()) ||
        patient.doctor.toLowerCase().includes(searchText.toLowerCase()) ||
        patient.discomfort.toLowerCase().includes(searchText.toLowerCase())
    );
  };

  return (
    <View style={[{ flex: 1, alignSelf: "stretch" }, modeStyle.container]}>
      <View style={[modeStyle.containerSearch]}>
        <Ionicons
          name="ios-search"
          size={20}
          color={!isDarkMode ? "black" : "white"}
          style={modeStyle.searchIcon}
        />
        <TextInput
          style={modeStyle.input}
          placeholder="Buscar..."
          placeholderTextColor={!isDarkMode ? "black" : "white"}
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
        />
      </View>
      <View style={[modeStyle.containerList]}>
        {searchText === "" ? (
          <PatientList
            patients={recordsOrdered}
            statusDarkMode={isDarkMode ? true : false}
          />
        ) : (
          <PatientList
            patients={searchPatients()}
            statusDarkMode={isDarkMode ? true : false}
          />
        )}
      </View>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => navigation.navigate("Registro")}
      >
        <Ionicons name="ios-add" size={44} color="#FFF" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonContainerReverse}
        onPress={toggleDarkMode}
      >
        {isDarkMode ? (
          <Ionicons name="cloudy" size={44} color="#FFF" />
        ) : (
          <Ionicons name="sunny" size={44} color="#FFF" />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    backgroundColor: "#EDEDED",
    borderRadius: 8,
    marginVertical: 8,
  },
  containerList: {
    paddingHorizontal: 16,
    backgroundColor: "#EDEDED",
    borderRadius: 8,
    alignSelf: "stretch",
    marginTop: 6,
    marginBottom: 56,
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 8,
  },
  button: {
    backgroundColor: "#007AFF",
    borderRadius: 8,
    padding: 8,
    marginLeft: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
  buttonContainer: {
    position: "absolute",
    right: "5%",
    bottom: "5%",
    width: "12%",
    aspectRatio: 1,
    borderRadius: 50,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
  },
  buttonContainerReverse: {
    position: "absolute",
    left: "5%",
    bottom: "5%",
    width: "12%",
    aspectRatio: 1,
    borderRadius: 50,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SearchBar;
