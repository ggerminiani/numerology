import { AdMobBanner } from "expo-ads-admob";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { loadAdInterstitial } from "../../ads";
import ButtonNavigation from "../../components/buttonNavigation";
import ModalHoroscope from "../../components/modalHoroscope";
import ModalResult from "../../components/modalResult";
import TextInputPersonal from "../../components/textInputPersonal";
import { getData, setData } from "../../data/asyncstorage";
import { horoscope } from "../../functions/horoscope";
import { numerology } from "../../functions/numerology";
import Colors from "../../styles/Colors";
import Sheets from "../../styles/Sheets";

const KEY_STORAGE_SETTINGS = "settings";

const BANNER_ID = Platform.select({
  ios: "ca-app-pub-2035092180433983/3978575517",
  android: "ca-app-pub-2035092180433983/3613605820",
});

const Main = ({ navigation }) => {
  const [name, setName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [showModalNumerology, setShowModalNumerology] = useState(false);
  const [showModalHoroscope, setShowModalHoroscope] = useState(false);
  const [resultModalNumerology, setResultModalNumerology] = useState("");
  const [resultModalHoroscope, setResultModalHoroscope] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadSettings = async () => {
      let result = await getData(KEY_STORAGE_SETTINGS);
      if (result !== null) {
        result = JSON.parse(result);
        setName(result.name.toUpperCase());
        setBirthday(result.birthday);
      }
    };

    loadSettings();
  }, []);

  const setSettings = async () => {
    await setData(KEY_STORAGE_SETTINGS, { name, birthday });
  };

  const onPressNumerology = async () => {
    setLoading(true);
    await loadAdInterstitial();

    let result = numerology(name, birthday);

    if (result) {
      setResultModalNumerology(result);
      setShowModalNumerology(true);
    }

    setLoading(false);
  };

  const onPressHoroscope = async () => {
    setLoading(true);

    await loadAdInterstitial();

    const min = 0;
    const max = 1;
    const random = Math.floor(Math.random() * (max - min) + min);
    console.log("random", random);
    let result = await horoscope(random, birthday);

    if (result !== false) {
      setResultModalHoroscope(result);
      setShowModalHoroscope(true);
    }

    setLoading(false);
  };

  return (
    <View style={Sheets.containerFull}>
      {loading ? (
        <View style={Sheets.loading}>
          <ActivityIndicator size={50} color={Colors.button} />
          <Text>Carregando...</Text>
        </View>
      ) : (
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
          style={Sheets.container}
        >
          <TextInputPersonal
            value={name}
            onChangeText={(e) => setName(e.toUpperCase())}
            placeholder="Nome Completo"
            autoCapitalize="characters"
            keyboardType="default"
            onSubmitEditing={() => setSettings()}
          />
          <TextInputPersonal
            value={birthday}
            onChangeText={(e) => setBirthday(e)}
            placeholder="Data de Nascimento"
            keyboardType="number-pad"
            type="datetime"
            options={{
              format: "DD/MM/YYYY",
            }}
            onSubmitEditing={() => setSettings()}
          />

          <TouchableOpacity
            style={Sheets.buttonContainer}
            onPress={() => onPressNumerology()}
          >
            <Text style={Sheets.buttonText}>Numerologia</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={Sheets.buttonContainer}
            onPress={() => onPressHoroscope()}
          >
            <Text style={Sheets.buttonText}>Horóscopo</Text>
          </TouchableOpacity>

          <ButtonNavigation
            title="Pensamentos"
            Screen="Phrases"
            navigation={navigation}
          />

          <ButtonNavigation
            title="Nomes para seu bebê"
            Screen="Baby"
            navigation={navigation}
          />
        </KeyboardAvoidingView>
      )}
      <ModalResult
        showModal={showModalNumerology}
        setShowModal={(e) => setShowModalNumerology(e)}
        data={resultModalNumerology}
      />
      <ModalHoroscope
        showModal={showModalHoroscope}
        setShowModal={(e) => setShowModalHoroscope(e)}
        data={resultModalHoroscope}
      />

      <AdMobBanner
        bannerSize="smartBannerPortrait"
        adUnitID={BANNER_ID}
        servePersonalizedAds={true}
        //setTestDeviceIDAsync={true}
        onDidFailToReceiveAdWithError={(error) => console.error(error)}
      />
    </View>
  );
};

export default Main;
