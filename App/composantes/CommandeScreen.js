import { Pressable, StyleSheet } from "react-native";
import { Text, View, Animated, ActivityIndicator } from "react-native";
import { FlatList } from "react-native";
import { useState, useEffect, useRef } from "react";
import { obtenirCommandesJSON } from "../utils";
import { AntDesign } from "@expo/vector-icons";

import stylesCommuns from "../styles";

export default function CommandeScreen({ navigation }) {
  const [commandesJSON, setCommandesJSON] = useState([obtenirCommandesJSON()]);
  const [loading, setLoading] = useState(true);
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    obtenirCommandesJSON()
      .then((commande) => {
        setCommandesJSON(commande);
        console.log("Commandes: ", commande);
        setLoading(false);
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }).start();
      })
      .catch((error) => {
        console.error(
          "Une erreur s'est produite lors du chargement des commandes :",
          error
        );
        setLoading(false);
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

  function renderItem({ item, index }) {
    return (
      <Pressable
        style={styles.item}
        onPress={() =>
          navigation.navigate("CommandeInfo", {
            idCommande: item.id,
            nomClient: item.nom,
            prenomClient: item.prénom,
          })
        }
      >
        <Text style={styles.itemDesc}>ID: {item.id}</Text>
        <Text style={styles.itemDesc}>
          {item.prénom} {item.nom}
        </Text>
        {item.statut == "En attente" && (
          <AntDesign name="hourglass" size={30} color="orange" />
        )}
        {item.statut == "Prête" && (
          <AntDesign name="check" size={25} color="green" />
        )}
      </Pressable>
    );
  }

  return (
    <View style={stylesCommuns.app}>
      {/* {loading ? (
        <ActivityIndicator size="large" color="#111F30" style={{ flex: 3 }} />
      ) : ( */}
      <Animated.View //Source: https://reactnative.dev/docs/animations#animated-api
        style={{
          opacity: fadeAnim,
          //transform: [{ scale: fadeAnim }],
          transform: [
            {
              //Source: https://reactnative.dev/docs/animations#interpolation
              translateY: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [50, 0],
              }),
            },
          ],
          flex: 1,
        }}
      >
        <FlatList data={commandesJSON} renderItem={renderItem} />
      </Animated.View>
      {/* )} */}
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: "column",
    justifyContent: "center",
    borderBottomColor: "#111F30",
    borderBottomWidth: 1,
    alignItems: "center",
    padding: 10,
    // height: 60,
    gap: 10,
  },
  itemDesc: {
    fontSize: 16,
    flex: 0,
    fontWeight: "500",
  },
});
