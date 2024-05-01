import { View, Pressable } from 'react-native';
import { useState, useEffect, useRef } from 'react';

import ItemMenu from './ItemMenu';
import Tuilerie from './Tuilerie';

import { obtenirUneCommandeJSON } from '../utils';
import stylesCommuns from '../styles';

export default function CommandeInfoScreen({ navigation, route }) {
    const [commandeInfo, setCommandeInfo] = useState(null);

    return (
        <View style={stylesCommuns.app}>
           
        </View>
    );
}