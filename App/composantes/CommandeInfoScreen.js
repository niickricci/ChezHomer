import { View, Pressable, StyleSheet, Text } from "react-native";
import { useState, useEffect, useRef } from "react";
import ItemMenu from "./ItemMenu";
import Tuilerie from "./Tuilerie";
import { BarreOutils, Bouton } from "./BarreOutils";
import { obtenirUneCommandeJSON } from "../utils";
import stylesCommuns from "../styles";

export default function CommandeInfoScreen({ navigation, route }) {
  const [commandeInfo, setCommandeInfo] = useState([]);
  const { idCommande } = route.params;
  const [facture, setFacture] = useState(0);

  useEffect(() => {
    obtenirUneCommandeJSON(idCommande)
      .then((commande) => {
        setCommandeInfo(commande.items);
        console.log("CommandeInfo: ", commande);
      })
      .catch((error) => {
        console.error(
          "Une erreur s'est produite lors du chargement des commandes :",
          error
        );
      });
  }, []);

  useEffect(() => {
    setFacture(commandeInfo.reduce((acc, item) => acc + item.prix, 0));
  }, [commandeInfo]);

  return (
    <View style={stylesCommuns.app}>
      <View style={styles.sectionHaut}>
        <Tuilerie>
          {commandeInfo.map((item) => (
            <ItemMenu
              key={item.idItem}
              titre={item.nomItem}
              prix={item.prix}
              image={item.image}
              onPress_cb={() => {
                null;
              }}
            />
          ))}
        </Tuilerie>
      </View>
      <View style={styles.sectionBas}>
        <View>
          <Facture soustotal={facture} />
        </View>
      </View>
      <BarreOutils>
        <Bouton
          texte="Supprimer"
          onPress_cb={() => {
            console.log("Supprimer");
          }}
        />
        <Bouton
          texte="Modifier"
          onPress_cb={() => {
            console.log("Modifier");
          }}
        />
      </BarreOutils>
    </View>
  );
}

function Facture({ soustotal }) {
  return (
    <View>
      <Text style={styles.textFacture}>
        Sous-Total: {soustotal.toFixed(2)}$
      </Text>
      <Text style={styles.textFacture}>
        TVQ: {(soustotal * 0.09975).toFixed(2)}$
      </Text>
      <Text style={styles.textFacture}>
        TPS: {(soustotal * 0.05).toFixed(2)}$
      </Text>
      <Text style={[styles.textFacture, { marginBottom: 40 }]}>
        Total: {(soustotal * 1.14975).toFixed(2)}$
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionHaut: {
    flex: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  sectionBas: {
    flex: 1,
    borderTop: "solid",
    borderColor: "rgba(0, 0, 0, 0.2)",
    borderWidth: 1,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  textFacture: {
    fontSize: 20,
    fontWeight: "500",
  },
});
