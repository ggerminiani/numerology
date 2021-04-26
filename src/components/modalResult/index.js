import React from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import Sheets from "../../styles/Sheets";
import Result from "./result";

const ModalResult = ({ showModal, setShowModal, data = null }) => {
  const renderElements = () => {
    if (data !== null && data !== undefined && data !== "") {
      return data.map((item, index) => {
        return (
          <Result
            key={index}
            title={item.title}
            subtitle={item.subtitle}
            message={item.message}
          />
        );
      });
    }
  };
  return (
    <Modal visible={showModal} animationType="slide">
      <View style={Sheets.background_modal}>
        {renderElements()}
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

export default ModalResult;
