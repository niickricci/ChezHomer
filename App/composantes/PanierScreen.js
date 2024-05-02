import { Pressable, ScrollView, SectionList, StyleSheet } from "react-native";
import { Text, View } from "react-native";
import { FlatList } from "react-native";
import { useState, useEffect, useRef } from "react";
import { AntDesign } from "@expo/vector-icons";
import { BarreOutils, Bouton } from "./BarreOutils";
import ItemMenu from "./ItemMenu";
import Tuilerie from "./Tuilerie";
import { placerCommandeJSON } from "../utils";
import {
  supprimerItemPanier,
  initPanier,
  obtenirPanier,
  nbItemPanier,
} from "../panier";
import stylesCommuns from "../styles";
import Toast from "react-native-toast-message";

export default function PanierScreen({ navigation }) {
  const [itemSélectionné, setItemSélectionné] = useState(null);
  const [statutCommande, setStatutCommande] = useState(null);
  const [panierJSON, setPanier] = useState([]);
  const [facture, setFacture] = useState(0);

  useEffect(() => {
    setPanier(obtenirPanier());
  }, [nbItemPanier()]);

  useEffect(() => {
    setFacture(panierJSON.reduce((acc, item) => acc + item.prix, 0));
  }, [panierJSON]);

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
  function supprimerItem() {
    if (itemSélectionné != null) {
      console.log("Supprimer item: ", itemSélectionné.idItem);
      supprimerItemPanier(itemSélectionné);
      setPanier(obtenirPanier());
      Toast.show({
        type: "success",
        text1: "Item supprimé ❌",
        text2: itemSélectionné.nomItem + " a été retiré du panier avec succès",
      });
    } else {
      console.log("Aucun item sélectionné");
    }
  }

  function commanderItems() {
    if (panierJSON.length > 0) {
      let commande = panierJSON.map((item) => {
        return {
          idItem: item.idItem,
          image: item.image,
          nomItem: item.nomItem,
          prix: item.prix,
        };
      });
      placerCommandeJSON(commande)
        .then((res) => {
          initPanier();
          setPanier(obtenirPanier());
          Toast.show({
            type: "success",
            text1: "Commande réussie ✅",
            text2: "Votre commande a été placée avec succès",
          });
          setStatutCommande("Commande réussie!");
        })
        .catch((err) => {
          Toast.show({
            type: "error",
            text1: "Commande échouée ❌",
            text2: "Erreur lors de la commande...",
          });
          setStatutCommande("Erreur lors de la commande...");
        });
    }
  }

  return (
    <View style={stylesCommuns.app}>
      <View style={styles.sectionHaut}>
        {panierJSON.length === 0 ? (
          <Text style={styles.textFacture}>Votre panier est vide...</Text>
        ) : (
          <ScrollView>
            <Tuilerie>
              {panierJSON.map((item) => {
                return (
                  <ItemMenu
                    key={item.idItem}
                    titre={item.nomItem}
                    prix={item.prix}
                    image={item.image}
                    onPress_cb={() => {
                      if (itemSélectionné != item) {
                        setItemSélectionné(item);
                      } else {
                        setItemSélectionné(null);
                      }
                    }}
                    sélectionné={itemSélectionné == item}
                  />
                );
              })}
            </Tuilerie>
          </ScrollView>
        )}
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
            supprimerItem();
          }}
        />
        <Bouton
          texte="Commander"
          onPress_cb={() => {
            commanderItems();
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
