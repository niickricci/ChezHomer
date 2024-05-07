import { useEffect, useState, useRef } from "react";
import { StyleSheet, View, Text } from "react-native";

import * as Location from "expo-location";
import MapView from "react-native-maps";
import { Marker, Circle, Callout } from "react-native-maps";
import stylesCommuns from "../styles";
import { AntDesign } from "@expo/vector-icons";
import { obtenirI18n } from "../Locales/i18n";

const RegionMontreal = {
  latitude: 45.57959635115827,
  latitudeDelta: 0.2898489739060395,
  longitude: -73.80305992439389,
  longitudeDelta: 0.24999964982271194,
};

const resto_homer = { latitude: 45.622, longitude: -73.79888 };

export default function RestoInfoScreen({ navigation, route }) {
  const [longitude, setLongitude] = useState();
  const [latitude, setLatitude] = useState();
  const [position, setPosition] = useState(null);
  const i18n = obtenirI18n();

  useEffect(() => {
    Location.requestForegroundPermissionsAsync() // Demande la permission d'accéder à la position de l'appareil
      .then(({ status }) => {
        if (status !== "granted") {
          console.log(`Accès refusé : ${status}`);
          return null;
        }
        console.log("Accès à la position accordé!");
        return Location.getCurrentPositionAsync(); // Obtenir la position actuelle
      })
      .then((position) => {
        setPosition(position); // Mettre à jour la position
        setLongitude(position.coords.longitude); // Mettre à jour la longitude
        setLatitude(position.coords.latitude); // Mettre à jour la latitude
      });
  }, []);
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => {
        return (
          <AntDesign
            name="left"
            size={25}
            color="#111F30"
            onPress={() => navigation.goBack()}
          ></AntDesign>
        );
      },
    });
  }, [navigation]);
  return (
    <View style={stylesCommuns.app}>
      <View style={styles.sectionHaut}>
        <Text style={styles.bienvenue}>Chez Homer 👨🏻‍🍳</Text>
        <Text
          style={[styles.texte, { fontStyle: "italic", fontWeight: "500" }]}
        >
          "You can't buy happiness, but you can buy coffee, and that's pretty
          close."
        </Text>
        <Text style={styles.bienvenue}>140 Bd Curé-Labelle, Rosemère, QC</Text>
        <View>
          <Text style={styles.texteAuteur}>Nicolas Ricci</Text>
          <Text style={styles.texteAuteur}>2024 ©</Text>
        </View>
      </View>
      <View style={styles.sectionBas}>
        <MapView
          style={styles.carte}
          initialRegion={RegionMontreal}
          showsUserLocation={true}
          userInterfaceStyle="dark"
        >
          <Marker
            coordinate={resto_homer}
            title="Chez Homer"
            description="419 rue Saint-Vincent, Montréal, QC"
            pinColor="#E7585D"
          >
            <Callout>
              <Text style={styles.marqueur}>Chez Homer</Text>
            </Callout>
          </Marker>
          <Circle
            center={resto_homer}
            radius={500}
            strokeColor="transparent"
            fillColor="rgba(231, 88, 93, 0.4)"
          />
          <Marker
            coordinate={{ latitude, longitude }}
            title="Votre position"
            description="Vous êtes ici!"
            pinColor="#67D37C"
          >
            <Callout>
              <Text style={styles.marqueur}>{i18n.t('your_position')}</Text>
            </Callout>
          </Marker>
          <Circle
            center={{ latitude, longitude }}
            radius={500}
            strokeColor="transparent"
            fillColor="rgba(103, 211, 124, 0.3)"
          />
        </MapView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionHaut: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    borderBottomWidth: 2,
    borderBlockColor: "#111F30",
  },
  sectionBas: {
    flex: 3,
  },
  carte: {
    width: "100%",
    height: "100%",
  },
  marqueur: {
    fontSize: 22,
  },
  bienvenue: {
    fontSize: 22,
    fontWeight: "400",
  },
  texte: {
    fontSize: 16,
    textAlign: "center",
    fontWeight: "400",
  },
  texteAuteur: {
    fontSize: 12,
    textAlign: "center",
    fontWeight: "400",
  },
});
