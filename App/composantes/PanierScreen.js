import { Pressable, ScrollView, SectionList, StyleSheet } from "react-native";
import { Text, View } from "react-native";
import { FlatList } from "react-native";
import { useState, useEffect, useRef } from "react";

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

export default function PanierScreen({ navigation }) {
  const [itemSélectionné, setItemSélectionné] = useState(null);
  const [statutCommande, setStatutCommande] = useState(null);
  const [panierJSON, setPanier] = useState([]);
  const [facture, setFacture] = useState(0);

  useEffect(() => {
    setPanier(obtenirPanier());
  }, []);

  useEffect(() => {
    setFacture(panierJSON.reduce((acc, item) => acc + item.prix, 0));
  }, [panierJSON]);

  function supprimerItem() {
    console.log("Supprimer item");
  }

  function commanderItems() {
    console.log("Commander item");
  }

  return (
    <View style={stylesCommuns.app}>
      <View style={styles.sectionHaut}>
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
                    setItemSélectionné(item);
                  }}
                  sélectionné={itemSélectionné === item}
                />
              );
            })}
          </Tuilerie>
        </ScrollView>
      </View>
      <View style={styles.sectionBas}></View>
      <Facture soustotal={facture} />
    </View>
  );
}

function Facture({ soustotal }) {
  return (
    <View style={stylesCommuns.app}>
      <Text>Sous-Total: {soustotal}$</Text>
      <Text>TVQ: {(soustotal * 0.09975).toFixed(2)}$</Text>
      <Text>TPS: {(soustotal * 0.05).toFixed(2)}$</Text>
      <Text>Total: {(soustotal * 1.14975).toFixed(2)}$</Text>
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
    alignItems: "center",
    justifyContent: "center",
  },
});
