import { StyleSheet } from "react-native";
import Toast from "react-native-toast-message";
import {
  Text,
  View,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import { useState, useEffect, useRef } from "react";
import { BarreOutils, Bouton } from "./BarreOutils";

import { obtenirAuthenJSON } from "../utils";

import stylesCommuns from "../styles";

export function AuthenScreen({ navigation }) {
  function créerCompte() {
    console.log("TBD");
  }
  function seConnecter() {
    navigation.navigate("SeConnecter");
  }

  return (
    <View style={stylesCommuns.app}>
      <View style={styles.section_haut}>
        <Text style={styles.titre}>Chez Homer 👨🏻‍🍳</Text>
      </View>
      <View style={styles.section_bas}>
        {/* <Pressable onPress={créerCompte}>
          <Text style={styles.créer_compte}>Créer un compte</Text>
        </Pressable>
        <Pressable onPress={seConnecter}>
          <Text style={styles.se_connecter}>Se connecter</Text>
        </Pressable> */}
        <Bouton texte={"Créer un compte"} onPress_cb={() => créerCompte()} />
        <Bouton texte={"Se connecter"} onPress_cb={() => seConnecter()} />
      </View>
    </View>
  );
}

export function SeConnecterScreen({ navigation }) {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [estValide, setEstValide] = useState(true);

  function seConnecter() {
    obtenirAuthenJSON(username, password)
      .then((res) => {
        console.log("login succès: %s", res);
        Toast.show({
          type: "success",
          position: "top",
          text1: "Connexion réussie ✅",
          visibilityTime: 3000,
        });
        navigation.popToTop();
        navigation.replace("Accueil", { nom: res.nom, prenom: res.prénom });
      })
      .catch((err) => {
        console.log("login échec: %s", err);
        Toast.show({
          type: "error",
          position: "top",
          text1: "Connexion échouée... ❌",
          visibilityTime: 3000,
        });
        setEstValide(false);
      });
  }

  useEffect(() => {
    console.log("UseEffect SeConnecter");
    navigation.setOptions({
      headerRight: () => {
        return (
          <Pressable onPress={() => navigation.navigate("Aide")}>
            <Text>Aide</Text>
          </Pressable>
        );
      },
    });

    return () => console.log("Ramassage SeConnecter");
  }, [navigation]);

  console.log("Refress SeConnecter %s / %s", username, password);

  return (
    <KeyboardAvoidingView
      style={stylesCommuns.app}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.section_haut}>
        <Text style={styles.titre}>Chez Homer 👨🏻‍🍳</Text>
      </View>

      <View style={styles.section_bas}>
        <Text style={{ fontSize: 20, marginBottom: 8, fontWeight: "semibold" }}>
          Connexion:
        </Text>
        <TextInput
          style={[styles.saisie, estValide ? {} : { borderColor: "red" }]}
          placeholder="Nom d'utilisateur"
          autoCorrect={false}
          onChangeText={setUsername}
        />
        <TextInput
          style={[styles.saisie, estValide ? {} : { borderColor: "red" }]}
          placeholder="Mot de passe"
          autoCorrect={false}
          onChangeText={setPassword} // Pour mettre à jour le mot de passe
          secureTextEntry={true} // Pour cacher le mot de passe
        />
        <Bouton texte={"Se connecter"} onPress_cb={seConnecter} />
        {!estValide && (
          <Text style={{ color: "red" }}>
            Nom d'utilisateur ou mot de passe invalide
          </Text>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

export function AideScreen({ navigation }) {
  return (
    <View style={stylesCommuns.app}>
      <View style={styles.section_haut}>
        <Text style={styles.titre}>
          Problèmes communs reliés à l'authentification
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section_haut: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  section_bas: {
    flex: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  titre: {
    fontSize: 48,
  },
  créer_compte: {
    fontSize: 20,
    fontWeight: "bold",
    padding: 10,
  },
  se_connecter: {
    fontSize: 18,
  },
  saisie: {
    borderColor: "gray",
    width: "70%",
    borderWidth: 1,
    borderRadius: 10,
    padding: 8,
    marginBottom: 10,
    textAlign: "center",
    backgroundColor: "white",
  },
});
