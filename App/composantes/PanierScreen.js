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
import {obtenirI18n} from "../Locales/i18n";

export default function PanierScreen({ navigation }) {
  const [itemSélectionné, setItemSélectionné] = useState(null);
  const [statutCommande, setStatutCommande] = useState(null);
  const [panierJSON, setPanier] = useState([]);
  const [facture, setFacture] = useState(0);
  const i18n = obtenirI18n();

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
        text1: i18n.t('itemRemovedToats_succ'),
        text2: itemSélectionné.nomItem + i18n.t('itemHasBeenRemoved'),
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
            text1: i18n.t('order_success'),
            text2: i18n.t('order_placed'),
          });
          setStatutCommande("Commande réussie!");
        })
        .catch((err) => {
          Toast.show({
            type: "error",
            text1: i18n.t('order_error'),
            text2: i18n.t('order_fail'),
          });
          setStatutCommande("Erreur lors de la commande...");
        });
    }
  }

  return (
    <View style={stylesCommuns.app}>
      <View style={styles.sectionHaut}>
        {panierJSON.length === 0 ? (
          <Text style={styles.textFacture}>{i18n.t('empty_cart')}</Text>
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
          texte={i18n.t('remove')}
          onPress_cb={() => {
            supprimerItem();
          }}
        />
        <Bouton
          texte={i18n.t('checkout')}
          onPress_cb={() => {
            commanderItems();
          }}
        />
      </BarreOutils>
    </View>
  );
}

function Facture({ soustotal }) {
  const i18n = obtenirI18n();
  return (
    <View>
      <Text style={styles.textFacture}>
        {i18n.t('subtotal')}: {soustotal.toFixed(2)}$
      </Text>
      <Text style={styles.textFacture}>
        TVQ: {(soustotal * 0.09975).toFixed(2)}$
      </Text>
      <Text style={styles.textFacture}>
        TPS: {(soustotal * 0.05).toFixed(2)}$
      </Text>
      <Text style={[styles.textFacture, { marginBottom: 40 }]}>
        {i18n.t('total')}: {(soustotal * 1.14975).toFixed(2)}$
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
