import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { LogBox, createContext } from 'react-native';
import Login from "./screens/login/Login";
import List from "./screens/list/List";
import Regiter from "./screens/register/Register";

const App = () => {
  const Stack = createStackNavigator();
  LogBox.ignoreAllLogs();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Listado" component={List} />
        <Stack.Screen name="Registro" component={Regiter} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
