import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ButtonNavigation from "../../components/buttonNavigation";
import ModalResult from "../../components/modalResult";
import TextInputPersonal from "../../components/textInputPersonal";
import { getData, setData } from "../../data/asyncstorage";
import { numerology } from "../../functions/numerology";
import Sheets from "../../styles/Sheets";

const KEY_STORAGE_SETTINGS = "settings";

const Main = ({ navigation }) => {
  const [name, setName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [resultTest, setResultTest] = useState("");

  console.log("main name:", name);
  console.log("main birthday:", birthday);

  useEffect(() => {
    const loadSettings = async () => {
      let result = await getData(KEY_STORAGE_SETTINGS);
      console.log("result get data", result);
      if (result !== null) {
        result = JSON.parse(result);
        setName(result.name.toUpperCase());
        setBirthday(result.birthday);
      }
    };

    loadSettings();
  }, []);

  const setSettings = async () => {
    console.log("set settings called");
    await setData(KEY_STORAGE_SETTINGS, { name, birthday });
  };

  const onPress = () => {
    let result = numerology(name, birthday);

    if (result) {
      setResultTest(result);
      setShowModal(true);
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
          onPress={() => onPress()}
        >
          <Text style={Sheets.buttonText}>Numerologia</Text>
        </TouchableOpacity>

        {/* <ButtonNavigation
          title="Numerologia"
          Screen="Numerology"
          navigation={navigation}
        /> */}
        <ButtonNavigation
          title="Nomes para seu bebê"
          Screen="Baby"
          navigation={navigation}
        />
        <ButtonNavigation
          title="Pensamentos do Dia"
          Screen="Phrases"
          navigation={navigation}
        />
      </KeyboardAvoidingView>
      <ModalResult
        showModal={showModal}
        setShowModal={(e) => setShowModal(e)}
        data={resultTest}
      />
    </View>
  );
};

export default Main;
