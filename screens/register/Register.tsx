import React, { useContext, useState } from "react";
import {
  TextInput,
  Button,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
/* utils */
import { ToastMessage } from "../../utils/ToastMessages";
import { RootStackParamList } from "../../interface/navigation";
import { formatDate } from "../../utils/FormatDate";
type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Login"
>;

const RegisterForm = () => {
  const [patientName, setpatientName] = useState("");
  const [doctor, setDoctor] = useState("");
  const [phone, setphone] = useState("");
  const [discomfort, setdiscomfort] = useState("");
  const [image, setImage] = useState("https://via.placeholder.com/200");

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const handleDateChange = (date: any) => {
    setSelectedDate(date);
    setShowDatePicker(false);
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const cleanInputs = () => {
    setpatientName("");
    setDoctor("");
    setphone("");
    setdiscomfort("");
    setImage("https://via.placeholder.com/200");
  };

  const getNewId = async () => {
    try {
      const lastId = await AsyncStorage.getItem("lastId");
      let newId = 1;

      if (lastId !== null) {
        newId = parseInt(lastId) + 1;
      }

      await AsyncStorage.setItem("lastId", newId.toString());
      return newId;
    } catch (error) {
      console.error("Error al obtener el nuevo id:", error);
      return 1;
    }
  };

  const handleSubmit = async () => {
    try {
      const newId = await getNewId();

      const formData = {
        id: newId,
        date: selectedDate,
        patientName,
        doctor,
        phone,
        discomfort,
        image,
      };

      if (
        formData.date !== null &&
        formData.patientName !== "" &&
        formData.doctor !== "" &&
        formData.phone !== "" &&
        formData.discomfort !== "" &&
        formData.image !== ""
      ) {
        const value = await AsyncStorage.getItem("formData");

        if (value) {
          const data = JSON.parse(value);
          const newData = [...data, formData];
          await AsyncStorage.setItem("formData", JSON.stringify(newData));

          ToastMessage("Data saved successfully!");
          cleanInputs();
          navigation.navigate("Listado");
        } else {
          await AsyncStorage.setItem("formData", JSON.stringify([formData]));
          ToastMessage("Data saved successfully!");
          cleanInputs();
          navigation.navigate("Listado");
        }
      } else {
        ToastMessage("All fields are required!");
      }
    } catch (error) {
      console.error("Error al guardar los datos:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const consult = await AsyncStorage.removeItem("formData");
      if (consult !== null) {
        ToastMessage("Data deleted successfully!");
        navigation.navigate("Listado");
      } else {
        ToastMessage("Data is empty!");
      }
    } catch (error) {
      console.error("Error al eliminar los datos:", error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.colorBlue}>Fecha</Text>
      <TextInput
        style={styles.input}
        placeholder="Fecha de la consulta"
        value={formatDate(selectedDate)}
        editable={false}
      />
      <Button
        title="Seleccionar fecha"
        onPress={() => setShowDatePicker(true)}
      />
      <DateTimePickerModal
        isVisible={showDatePicker}
        mode="date"
        locale="es-ES"
        onConfirm={handleDateChange}
        onCancel={() => setShowDatePicker(false)}
      />
      <Text style={[styles.colorBlue, styles.space]}>Paciente</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre del Paciente"
        value={patientName}
        onChangeText={setpatientName}
        maxLength={150}
      />
      <Text style={styles.colorBlue}>Doctor</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre del Doctor"
        value={doctor}
        onChangeText={setDoctor}
        maxLength={150}
      />
      <Text style={styles.colorBlue}>Teléfono</Text>
      <TextInput
        style={styles.input}
        placeholder="Teléfono del doctor"
        value={phone}
        onChangeText={setphone}
        maxLength={10}
        keyboardType="numeric"
      />
      <Text style={styles.colorBlue}>Malestar/Sintomas</Text>
      <TextInput
        style={styles.input}
        placeholder="Describe el malestar presentado"
        value={discomfort}
        onChangeText={setdiscomfort}
        maxLength={1024}
        multiline
      />
      <TouchableOpacity style={styles.buttonImage} onPress={pickImage}>
        <Text style={styles.text}>Capturar receta</Text>
      </TouchableOpacity>
      <Image source={{ uri: image }} style={styles.image} />

      <TouchableOpacity style={styles.buttonSave} onPress={handleSubmit}>
        <Text style={styles.text}>Guardar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonDelete} onPress={handleDelete}>
        <Text style={styles.text}>Eliminar registros</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: "stretch",
    paddingHorizontal: 16,
    marginTop: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderBottomWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#007AFF",
    paddingVertical: 16,
  },
  colorBlue: {
    color: "#007AFF",
  },
  textHeader: {
    fontSize: 36,
    marginVertical: 60,
    color: "#111",
  },
  textSubHeader: {
    fontSize: 25,
    color: "#111",
  },
  containerDate: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  datePicker: {
    width: 200,
    marginBottom: 20,
  },
  dateInput: {
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    alignItems: "flex-start",
  },
  placeholderText: {
    color: "gray",
  },
  dateText: {
    fontSize: 16,
  },
  btnTextConfirm: {
    color: "blue",
  },
  space: {
    marginTop: 10,
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
    alignSelf: "center",
    marginBottom: 20,
  },
  camera: {
    flex: 1,
    marginBottom: 20,
  },
  button: {
    alignSelf: "center",
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 18,
    color: "white",
    alignSelf: "center",
  },
  buttonImage: {
    alignSelf: "center",
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#007AFF",
    elevation: 4,
    width: "60%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonSave: {
    alignSelf: "center",
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#007AFF",
    marginBottom: 30,
    elevation: 4,
    width: "60%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonDelete: {
    alignSelf: "center",
    padding: 15,
    borderRadius: 10,
    backgroundColor: "red",
    marginBottom: 40,
    elevation: 4,
    width: "60%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});

export default RegisterForm;
