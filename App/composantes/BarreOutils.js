import { StyleSheet, Text, View, Pressable } from "react-native";

export function BarreOutils({ children }) {
  return <View style={styles.barre_outils}>{children}</View>;
}

export function Bouton({ texte, onPress_cb, style }) {
  return (
    <Pressable style={[styles.bouton, style]} onPress={onPress_cb}>
      <Text style={styles.étiquetteBouton}>{texte}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  barre_outils: {
    flexDirection: "row",
    paddingTop: 8,
    justifyContent: "space-around",
    backgroundColor: "#111F30",
  },
  bouton: {
    backgroundColor: "#111F30",
    padding: 8,
    marginBottom: 10,
    borderRadius: 10,
  },
  étiquetteBouton: {
    fontSize: 20,
    paddingTop: 2,
    color: "white",
    paddingBottom: 2,
  },
});
