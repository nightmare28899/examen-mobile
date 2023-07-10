import { StyleSheet } from "react-native";

const stylesLight = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    // Otros estilos para el modo claro
  },
  textColor: {
    color: "#000000",
    // Otros estilos de texto para el modo claro
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
  containerSearch: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    backgroundColor: "#EDEDED",
    borderRadius: 8,
    marginVertical: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
});

export default stylesLight;
