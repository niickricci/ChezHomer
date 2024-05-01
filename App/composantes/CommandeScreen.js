import { StyleSheet } from "react-native";
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

  //   Commandes:  [{"id": "1", "nom": "L'éponge", "prénom": "Bob", "statut": "En attente"}, {"id": "2", "nom": "90", "prénom": "joe", "statut": "En attente"}, {"id": "3", "nom": "Au pays des merveilles", "prénom": "alice", "statut": "En attente"}, {"id": "4", "nom": "Simpson", "prénom": "Bart", "statut": "En attente"}, {"id": "5", "nom": "Simpson", "prénom": "Bart", "statut": "En attente"}]
  function renderItem({ item, index }) {
    return (
      <View style={styles.item}>
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
      </View>
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
