import React, { useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { phrases_data, phrase_daily } from "../../algorithm";
import ButtonNavigation from "../../components/buttonNavigation";
import ModalPhrase from "../../components/modalPhrase";
import { PHRASES } from "../../data";
import { removeData } from "../../data/asyncstorage";
import Sheets from "../../styles/Sheets";
const KEY_STORAGE_PHRASES = "phrases";

const Phrases = ({ navigation }) => {
  const [showModal, setShowModal] = useState(false);
  const [resultPhrase, setResultPhrase] = useState([]);

  const getPhrase = async () => {
    let result = await phrase_daily(PHRASES);
    const phrases_result = [result];
    setResultPhrase(phrases_result);
    setShowModal(true);
  };

  const getPhrases = async () => {
    let phrases_result = await phrases_data(PHRASES);
    if (phrases_result === null) {
      Alert.alert(
        "=/",
        "Você ainda não tirou nenhuma frase... Para começar, tire um 'Pensamento do Dia'."
      );
    } else {
      setResultPhrase(phrases_result);
      setShowModal(true);
    }
  };

  return (
    <View style={Sheets.containerFull}>
      <View style={Sheets.container}>
        <TouchableOpacity
          style={Sheets.buttonContainer}
          onPress={() => getPhrase()}
        >
          <Text style={Sheets.buttonText}>Pensamento do Dia</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={Sheets.buttonContainer}
          onPress={() => getPhrases()}
        >
          <Text style={Sheets.buttonText}>Meus Pensamentos</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={Sheets.buttonContainer}
          onPress={() => {
            removeData(KEY_STORAGE_PHRASES);
          }}
        >
          <Text style={Sheets.buttonText}>Zerar Pensamentos</Text>
        </TouchableOpacity>
      </View>

      <ButtonNavigation Screen="back" title="Voltar" navigation={navigation} />
      <ModalPhrase
        showModal={showModal}
        setShowModal={(e) => setShowModal(e)}
        data={resultPhrase}
      />
    </View>
  );
};

export default Phrases;
