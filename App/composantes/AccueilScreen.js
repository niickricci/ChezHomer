import { StyleSheet, Text, View, Pressable, Alert } from "react-native";
import Toast from "react-native-toast-message";
import { useState, useEffect } from "react";

import { AntDesign } from "@expo/vector-icons";

import { nbItemPanier, initPanier } from "../panier";
import stylesCommuns from "../styles";
import Tuilerie from "./Tuilerie";

export default function AccueilScreen({ navigation, route }) {
  const { nom, prenom } = route.params;
  const logoutAlert = () => {
    Alert.alert("Déconnexion", "Voulez-vous vraiment vous déconnecter?", [
      { text: "Annuler", onPress: () => console.log("Annuler") },
      { text: "Oui", onPress: () => navigation.replace("Authen") },
    ]);
  };

  useEffect(() => {
    initPanier();
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => {
        return (
          <AntDesign
            name="logout"
            size={25}
            color="cornflowerblue"
            onPress={() => {
              logoutAlert();
            }}
          ></AntDesign>
        );
      },
      headerRight: () => {
        return (
          <AntDesign
            name="shoppingcart"
            size={25}
            color="cornflowerblue"
            onPress={() => navigation.navigate("Panier")}
          >
            <Text>{nbItemPanier()}</Text>
          </AntDesign>
        );
      },
    });
  }, [navigation]);

  return (
    <View style={stylesCommuns.app}>
      <View style={styles.sectionHaut}>
        <Text style={styles.bienvenue}>
          {"Bonjour " + prenom + " " + nom + "!"}
        </Text>
      </View>
      <View style={styles.sectionBas}></View>
      <Tuilerie>
        <Tuile
          texte={"Menu"}
          onPress_cb={() => navigation.navigate("Ardoise")}
          iconNom={"book"}
        />
        <Tuile
          texte={"Commandes"}
          onPress_cb={() => navigation.navigate("Commandes")}
          iconNom={"profile"}
        />
        <Tuile
          texte={"Nous joindre"}
          onPress_cb={() => navigation.navigate("RestoInfo")}
          iconNom={"phone"}
        />
      </Tuilerie>
    </View>
  );
}

export function Tuile({ texte, onPress_cb, iconNom }) {
  return (
    <Pressable onPress={onPress_cb}>
      <View style={styles.tuile}>
        <View style={styles.tuile_icon}>
          <AntDesign name={iconNom} size={50} color="white" />
        </View>
        <View style={styles.tuile_texte_box}>
          <Text style={styles.tuile_texte}>{texte}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  sectionHaut: {
    flex: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  sectionBas: {
    flex: 0.3,
    alignItems: "center",
    justifyContent: "center",
  },
  bienvenue: {
    fontSize: 22,
  },
  tuile: {
    flex: 0,
    backgroundColor: "#111F30",
    height: 150,
    width: 150,
    margin: 10,
    borderRadius: 10,
  },
  tuile_icon: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  tuile_texte_box: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tuile_texte: {
    fontSize: 22,
    color: "white",
  },
});
