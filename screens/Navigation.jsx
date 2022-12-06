import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { Home } from "./Home";
import { FullPost } from "./FullPost";
import {MainScreen} from "./MainScreen";
import {Login} from "./Login";
import {Register} from "./Register";

const Stack = createNativeStackNavigator();

export const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Login" component={Login} options={{ title: 'Вход' }} />
                <Stack.Screen name="Register" component={Register} options={{ title: 'Регистрация' }} />
                <Stack.Screen name="MainScreen" component={MainScreen} options={{ title: 'Главная' }} />
                <Stack.Screen name="Home" component={Home} options={{ title: 'Товары' }} />
                <Stack.Screen name="FullPost" component={FullPost} />

            </Stack.Navigator>
        </NavigationContainer>
    )
}