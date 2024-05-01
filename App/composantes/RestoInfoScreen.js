import { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import * as Location from "expo-location";
import MapView from "react-native-maps";
import { Marker, Circle, Callout } from "react-native-maps";
import stylesCommuns from '../styles';

const RegionMontreal = {
    "latitude": 45.57959635115827,
    "latitudeDelta": 0.2898489739060395,
    "longitude": -73.80305992439389,
    "longitudeDelta": 0.24999964982271194,
}

const resto_homer = { "latitude": 45.65609, "longitude": -73.77086 };

export default function RestoInfoScreen({ navigation, route }) {
   
  
    return (
        <View style={stylesCommuns.app}>
          
        </View>
    );
}

const styles = StyleSheet.create({
    sectionHaut: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        borderBottomWidth: 2,
        borderBlockColor: "blue"
    },
    sectionBas: {
        flex: 3,
    },
    carte: {
        width: "100%",
        height: "100%"
    },
    marqueur: {
        fontSize: 22,
    },
    bienvenue: {
        fontSize: 22,
    },
});