import { View, Pressable } from "react-native";
import { useState, useEffect, useRef } from "react";

import ItemMenu from "./ItemMenu";
import Tuilerie from "./Tuilerie";

import { obtenirUneCommandeJSON } from "../utils";
import stylesCommuns from "../styles";

export default function CommandeInfoScreen({ navigation, route }) {
  const [commandeInfo, setCommandeInfo] = useState([]);
  const { idCommande } = route.params;

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

  //   Pour votre information voici la structure du détail d’une commande reçue du serveur :
  // {"id": "1",
  // "items": [{"idItem": "2",
  //  "image": image encodée,
  //  "nomItem": "Croissant",
  //  "prix": 2.5},
  //  {"idItem": "10",
  //  "image": image encodée,
  //  "nomItem": "Salade du marché",
  //  "prix": 3.5
  //  }
  //  ],
  // "nom": "L'éponge",
  // "prénom": "Bob",
  // "statut": "En attente"
  // }

  return (
    <View style={stylesCommuns.app}>
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
  );
}
