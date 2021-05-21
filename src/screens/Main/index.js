import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ButtonNavigation from "../../components/buttonNavigation";
import ModalHoroscope from "../../components/modalHoroscope";
import ModalResult from "../../components/modalResult";
import TextInputPersonal from "../../components/textInputPersonal";
import { getData, setData } from "../../data/asyncstorage";
import { horoscope } from "../../functions/horoscope";
import { numerology } from "../../functions/numerology";
import Sheets from "../../styles/Sheets";

const KEY_STORAGE_SETTINGS = "settings";

const Main = ({ navigation }) => {
  const [name, setName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [showModalNumerology, setShowModalNumerology] = useState(false);
  const [showModalHoroscope, setShowModalHoroscope] = useState(false);
  const [resultModalNumerology, setResultModalNumerology] = useState("");
  const [resultModalHoroscope, setResultModalHoroscope] = useState("");

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

  const onPressNumerology = () => {
    let result = numerology(name, birthday);

    if (result) {
      setResultModalNumerology(result);
      setShowModalNumerology(true);
    }
  };

  const onPressHoroscope = async () => {
    let result = await horoscope(birthday);
    if (result !== false) {
      setResultModalHoroscope(result);
      setShowModalHoroscope(true);
    }
  };

  return (
    <View style={Sheets.containerFull}>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={Sheets.container}
      >
        <TextInputPersonal
          value={name}
          onChangeText={(e) => {
            setName(e.trim().toUpperCase());
            setSettings();
          }}
          placeholder="Nome Completo"
          autoCapitalize="characters"
          autoCompleteType="name"
          keyboardType="default"
        />
        <TextInputPersonal
          value={birthday}
          onChangeText={(e) => {
            setBirthday(e);
            setSettings();
          }}
          placeholder="Data de Nascimento"
          keyboardType="number-pad"
          type="datetime"
          options={{
            format: "DD/MM/YYYY",
          }}
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
          title="Pensamentos do Dia"
          Screen="Phrases"
          navigation={navigation}
        />

        <ButtonNavigation
          title="Nomes para seu bebê"
          Screen="Baby"
          navigation={navigation}
        />
      </KeyboardAvoidingView>
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
    </View>
  );
};

export default Main;
