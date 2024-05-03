import {
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Animated,
} from "react-native";
import Toast from "react-native-toast-message";
import {obtenirI18n} from "../Locales/i18n";

import { Text, View } from "react-native";
import { useState, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";

import { BarreOutils, Bouton } from "./BarreOutils";
import ItemMenu from "./ItemMenu";

import { obtenirMenuJSON } from "../utils";
import { nbItemPanier, ajouterItemPanier } from "../panier";

import stylesCommuns from "../styles";
import Tuilerie from "./Tuilerie";

export default function ArdoiseScreen({ navigation }) {
  const [menuJSON, setMenu] = useState([]);
  const [Selection, setSelection] = useState(null);
  const [nbItemsPanier, setNbItemsPanier] = useState(0);
  const [loading, setLoading] = useState(true);
  const [fadeAnim] = useState(new Animated.Value(0));
  const i18n = obtenirI18n();

  useEffect(() => {
    setNbItemsPanier(nbItemPanier());
  }, [nbItemPanier()]);

  useEffect(() => {
    obtenirMenuJSON()
      .then((menu) => {
        setMenu(menu);
        setLoading(false);
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();
      })
      .catch((error) => {
        console.error(
          "Une erreur s'est produite lors du chargement du menu :",
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
      headerRight: () => {
        return (
          <AntDesign
            name="shoppingcart"
            size={25}
            color="#111F30"
            onPress={() => navigation.navigate("Panier")}
          >
            <Text>{nbItemPanier()}</Text>
          </AntDesign>
        );
      },
    });
  }, [navigation, nbItemsPanier]);

  function choisirItem(item) {
    console.log("Choisir item");
    console.log("Ajouter au panier: " + Selection);
    ajouterItemPanier(Selection);
    Toast.show({
      type: "success",
      position: "top",
      text1: i18n.t("addToCartToast_succ"),
      text2: Selection.nomItem,
      visibilityTime: 3000,
    });
    setNbItemsPanier(nbItemPanier());
    setSelection(null);
  }

  return (
    <View style={[stylesCommuns.app, { backgroundColor: "#fff" }]}>
      {loading ? (
        <ActivityIndicator size="large" color="#111F30" style={{ flex: 3 }} />
      ) : (
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
          <ScrollView>
            {menuJSON.map((cat) => {
              return (
                <Catégorie
                  key={cat.titre}
                  titre={cat.titre}
                  couleur={
                    cat.titre === "Déjeuner"
                      ? "#F9D9D9"
                      : cat.titre === "Sandwichs"
                      ? "#D9F0F9"
                      : cat.titre === "Salades"
                      ? "#E5F9D9"
                      : cat.titre === "Smoothies"
                      ? "#DCD9F9"
                      : cat.titre === "Breuvages"
                      ? "#ECE1C6"
                      : "white"
                  }
                >
                  <Tuilerie>
                    {cat.items.map((item) => (
                      <ItemMenu
                        key={item.idItem}
                        titre={item.nomItem}
                        prix={item.prix}
                        image={item.image}
                        onPress_cb={() => {
                          if (Selection != item) {
                            setSelection(item);
                          } else {
                            setSelection(null);
                          }
                        }}
                        sélectionné={Selection == item}
                      />
                    ))}
                  </Tuilerie>
                </Catégorie>
              );
            })}
          </ScrollView>
        </Animated.View>
      )}
      <BarreOutils>
        <Bouton
          texte={i18n.t("add_to_cart")}
          onPress_cb={() => {
            if (Selection != null) {
              choisirItem(Selection);
            }
          }}
        />
      </BarreOutils>
    </View>
  );
}

function Catégorie({ titre, couleur, children }) {
  return (
    <View style={[styles.section, { backgroundColor: couleur }]}>
      <Text style={styles.sectionDesc}>{titre}</Text>
      <ScrollView horizontal={true}>{children}</ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionDesc: {
    textAlign: "left",
    color: "#111F30",
    fontSize: 22,
  },
  section: {
    margin: 10,
    padding: 10,
    borderRadius: 10,
  },
});
