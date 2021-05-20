import React from "react";
import { FlatList, Modal, Text, TouchableOpacity, View } from "react-native";
import Sheets from "../../styles/Sheets";
import PhraseItem from "./phrase";

const ModalPhrase = ({ data, showModal, setShowModal }) => {
  console.log("ModalPhrase", data);
  return (
    <Modal visible={showModal} animationType="slide">
      <View style={Sheets.background_modal}>
        <FlatList
          data={data}
          keyExtractor={(e) => e.key.toString()}
          renderItem={({ item }) => {
            return (
              <PhraseItem
                author={item.author}
                date={item.date}
                phrase={item.phrase}
                key_item={item.key}
              />
            );
          }}
        />
        <TouchableOpacity
          style={Sheets.buttonContainer}
          onPress={() => setShowModal(false)}
        >
          <Text style={Sheets.buttonText}>Fechar</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default ModalPhrase;
