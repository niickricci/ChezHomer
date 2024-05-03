import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import {
  AuthenScreen,
  SeConnecterScreen,
  AideScreen,
} from "./composantes/Authen";
import ArdoiseScreen from "./composantes/ArdoiseScreen";
import PanierScreen from "./composantes/PanierScreen";
import CommandeScreen from "./composantes/CommandeScreen";
import CommandeInfoScreen from "./composantes/CommandeInfoScreen";
import RestoInfoScreen from "./composantes/RestoInfoScreen";
import AccueilScreen from "./composantes/AccueilScreen";
import { I18n } from "i18n-js";
import { obtenirI18n } from "./Locales/i18n";

const { Navigator, Screen } = createNativeStackNavigator();

export default function App() {
  const i18n = obtenirI18n();
  return (
    <NavigationContainer>
      <Navigator
        initialRouteName="Authen"
        screenOptions={{
          headerTitleAlign: "center",
        }}
      >
        <Screen
          name="Accueil"
          component={AccueilScreen}
          options={{
            title: "Chez Homer",
          }}
        />
        <Screen name="Aide" component={AideScreen} />
        <Screen
          name="Authen"
          component={AuthenScreen}
          options={{ headerShown: false }}
        />
        <Screen
          name="SeConnecter"
          component={SeConnecterScreen}
          options={{ title: "" }}
        />
        <Screen name="Ardoise" component={ArdoiseScreen} options={{ title: i18n.t("menuTitle") }}/>
        <Screen name="Panier" component={PanierScreen} options={{ title: i18n.t("cartTitle") }}/>
        <Screen name="Commandes" component={CommandeScreen} options={{ title: i18n.t("ordersTitle") }}/>
        <Screen
          name="CommandeInfo"
          component={CommandeInfoScreen}
          options={{ title: i18n.t("orderDetailsTitle") }}
        />
        <Screen
          name="RestoInfo"
          component={RestoInfoScreen}
          options={{ title: i18n.t('contactUsTitle')} }
        />
      </Navigator>
      <Toast />
    </NavigationContainer>
  );
}
