// i18n.js
import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';
import en from './en';
import fr from './fr';

const paramètresLocaux = Localization.getLocales();
const paramêtresCalendrier = Localization.getCalendars();
const langue_région = paramètresLocaux[0].languageTag;

const tabTraduction = {
  "en-US": en,
   "en-CA": en,
  "fr-CA": fr,
  "fr": fr,
  "fr-FR": fr,
  };

const i18n = new I18n(tabTraduction);
i18n.locale = langue_région;

export function obtenirI18n() {
  return i18n;
}