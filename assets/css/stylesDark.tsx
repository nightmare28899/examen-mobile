import { StyleSheet } from "react-native";

const stylesDark = StyleSheet.create({
  container: {
    backgroundColor: "#202124",
    // Otros estilos para el modo oscuro
  },
  textColor: {
    color: "#ffffff",
    // Otros estilos de texto para el modo oscuro
  },
  containerList: {
    paddingHorizontal: 16,
    backgroundColor: "#848484",
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
  containerSearch: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    backgroundColor: "#848484",
    borderRadius: 8,
    marginVertical: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
});

export default stylesDark;
