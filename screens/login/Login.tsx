import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../interface/navigation";
/* Utils */
import { validateEmail } from "../../utils/EmailValidation";
import { ToastMessage } from "../../utils/ToastMessages";

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Login"
>;

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const handleLogin = () => {
    if (email !== "" && password !== "") {
      if (!validateEmail(email)) {
        ToastMessage("Email is not valid!");
      } else {
        if (email === "jhon@mail.com" && password === "77@1$.") {
          ToastMessage("Login success!");
          navigation.navigate("Listado");
          cleanInputs();
        } else {
          ToastMessage("Email or Password is incorrect!");
        }
      }
    } else {
      ToastMessage("Email and Password is required!");
    }
  };

  const cleanInputs = () => {
    setEmail("");
    setPassword("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inicio de sesión</Text>
      <Text style={styles.colorBlue}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingresa tu email"
        keyboardType="email-address"
        onChangeText={(text) => setEmail(text)}
        value={email}
        autoCapitalize="none"
        maxLength={100}
      />
      <Text style={styles.colorBlue}>Contraseña</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingresa tu contraseña"
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
        value={password}
        maxLength={100}
      />
      <Button title="Inicio de sesión" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    paddingHorizontal: 30,
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
  colorBlue: {
    color: "#007AFF",
  },
});

export default LoginScreen;
