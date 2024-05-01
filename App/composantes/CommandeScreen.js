import { StyleSheet } from 'react-native';
import { Text, View } from 'react-native';
import { FlatList } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import { obtenirCommandesJSON } from '../utils';

import stylesCommuns from '../styles';

export default function CommandeScreen({ navigation }) {
    const [commandesJSON, setCommandesJSON] = useState([]);

    return (
        <View style={stylesCommuns.app}>
           
        </View>
    );
}

const styles = StyleSheet.create({
    item: {
        flexDirection: "row",
        justifyContent: 'center',
        borderBottomColor: 'rebeccapurple',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 60
    },
    itemDesc: {
        fontSize: 16,
        flex: 0
    },
});