import { Pressable, StyleSheet } from "react-native";
import { Text, View } from "react-native";
import { Image } from "react-native";
import { useState, useEffect } from "react";

export default function ItemMenu({
  sélectionné = false,
  titre,
  prix,
  onPress_cb,
  image,
}) {
  const uri = `data:image/jpg;base64,${image}`;
  // <Image source={{ uri }} style={styles.image} />
  return (
    <Pressable
      onPress={() => {
        onPress_cb(), console.log("ItemMenu: ", titre);
      }}
    >
      <View style={[styles.item, sélectionné ? styles.itemSélectionné : null]}>
        <Image source={{ uri }} style={styles.image} />
        <Text style={styles.itemDesc}>{titre}</Text>
        <Text style={styles.itemDesc}>${prix.toFixed(2)}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  item: {
    flex: 0,
    height: 170,
    width: 170,
    margin: 10,
    paddingTop: 5,
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 10,
    backgroundColor: "rgba(44, 44, 44, 0.16)",
  },
  itemSélectionné: {
    borderWidth: 4,
    borderStyle: "solid",
    borderColor: "#111F30",
  },
  itemDesc: {
    fontSize: 18,
    color: "#111F30",
    flex: 0,
  },
  image: {
    width: 110,
    height: 110,
  },
});
