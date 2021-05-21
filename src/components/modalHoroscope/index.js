import React from "react";
import { Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Sheets from "../../styles/Sheets";
import { capitalLetter } from "../../vendors/string";

const ModalHoroscope = ({ data, showModal, setShowModal }) => {
  const renderHoroscope = () => {
    if (typeof data === "object") {
      const { horoscope } = data;

      if (horoscope.indexOf("\n") !== -1) {
        const lines = horoscope.split("\n");
        return lines.map((e, index) => {
          return (
            <Text
              key={index.toString()}
              style={[Sheets.resultMessage, { marginVertical: 2 }]}
            >
              {" ".repeat(3)}
              {e}
            </Text>
          );
        });
      } else {
        return (
          <Text style={Sheets.resultMessage}>
            {" ".repeat(3)}
            {horoscope}
          </Text>
        );
      }
    }
  };

  const renderDetails = () => {
    if (typeof data === "object") {
      return data.details.map((e) => {
        return (
          <Text key={e.key.toString()} style={{ marginVertical: 2 }}>
            {"• "}
            <Text style={{ fontWeight: "bold", fontSize: 15 }}>
              {capitalLetter(e.key)}:{" "}
            </Text>
            <Text style={{ flex: 1 }}>{capitalLetter(e.value)}.</Text>
          </Text>
        );
      });
    }
  };

  return (
    <Modal visible={showModal} animationType="slide">
      <View style={Sheets.background_modal}>
        <ScrollView>
          <Text style={Sheets.resultTitle}>{`Horóscopo do dia - ${capitalLetter(
            data.name
          )}`}</Text>
          {/* <Text style={Sheets.resultMessage}>{data.horoscope}</Text> */}
          {renderHoroscope()}
          <Text
            style={[
              Sheets.resultMessage,
              {
                marginTop: 20,
                textDecorationStyle: "solid",
                textDecorationLine: "underline",
              },
            ]}
          >
            Detalhes:
          </Text>
          <View style={{ marginTop: 10, marginLeft: 20 }}>
            {renderDetails()}
          </View>
        </ScrollView>

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

export default ModalHoroscope;
