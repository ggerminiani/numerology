import React, { useEffect, useState } from "react";
import { FlatList, Modal, Text, TouchableOpacity, View } from "react-native";
import Colors from "../../styles/Colors";
import Sheets from "../../styles/Sheets";
import Result from "./result";
import Search from "./search";

const male = "#87CEEB";
const female = "#FFC0CB";

const ModalResult = ({
  showModal,
  setShowModal,
  data = null,
  list = false,
}) => {
  const [femaleSelected, setFemaleSelected] = useState(false);
  const [maleSelected, setMaleSelected] = useState(false);
  const [allSelected, setAllSelected] = useState(true);
  const [searchName, setSearchName] = useState("");
  const [newData, setNewData] = useState([]);

  useEffect(() => {
    if (newData.length === 0 && searchName.trim() === "") {
      setNewData(data);
    }
  }, [data, newData]);

  const onPressAll = () => {
    setAllSelected(true);
    setMaleSelected(false);
    setFemaleSelected(false);
  };

  const onPressFemale = () => {
    setAllSelected(false);
    setMaleSelected(false);
    setFemaleSelected(true);
  };

  const onPressMale = () => {
    setAllSelected(false);
    setMaleSelected(true);
    setFemaleSelected(false);
  };

  const genderButton = () => {
    return (
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          style={[
            Sheets.buttonContainer,
            { flex: 1, backgroundColor: Colors.button },
            allSelected ? "" : { backgroundColor: Colors.disabled },
          ]}
          onPress={() => onPressAll()}
        >
          <Text
            style={[
              Sheets.buttonText,
              { fontWeight: "300", fontSize: 14 },
              allSelected ? "" : { color: Colors.black },
            ]}
          >
            Todos
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            Sheets.buttonContainer,
            { flex: 1, backgroundColor: female },
            femaleSelected ? "" : { backgroundColor: Colors.disabled },
          ]}
          onPress={() => onPressFemale()}
        >
          <Text
            style={[
              Sheets.buttonText,
              { fontWeight: "300", fontSize: 14, color: Colors.black },
            ]}
          >
            Femininos
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            Sheets.buttonContainer,
            { flex: 1, backgroundColor: male },
            maleSelected ? "" : { backgroundColor: Colors.disabled },
          ]}
          onPress={() => onPressMale()}
        >
          <Text
            style={[
              Sheets.buttonText,
              { fontWeight: "300", fontSize: 14, color: Colors.black },
            ]}
          >
            Masculinos
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const onChangeText = (e) => {
    setSearchName(e);

    if (e.trim() === "") {
      setNewData(data);
    } else {
      let newArray = [];
      newData.map((item) => {
        console.log(item.name);
        console.log(
          item.name
            .trim()
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .includes(
              e
                .trim()
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
            )
        );

        if (
          item.name
            .trim()
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .includes(
              e
                .trim()
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
            )
        ) {
          newArray.push(item);
        }
      });

      setNewData(newArray);
    }
  };

  const renderElements = () => {
    if (data !== null && data !== undefined && data !== "") {
      if (!list) {
        return newData.map((item, index) => {
          return (
            <Result
              key={index}
              title={item.title}
              subtitle={item.subtitle}
              message={item.message}
              color={item.color}
            />
          );
        });
      } else {
        let length = 0;
        if (femaleSelected) {
          newData.map((e) => {
            if (e.gender === "f") {
              length += 1;
            }
          });
        }
        if (maleSelected) {
          newData.map((e) => {
            if (e.gender === "m") {
              length += 1;
            }
          });
        }
        if (allSelected) {
          length = newData.length;
        }

        return (
          <View style={{ flex: 1 }}>
            <View style={Sheets.buttonContainer}>
              <Text style={Sheets.buttonText}>
                Quantidade de nomes: {length}
              </Text>
            </View>
            <View style={Sheets.buttonContainer}>
              <Search
                searchName={searchName}
                setSearchName={(e) => onChangeText(e)}
              />
            </View>

            {genderButton()}
            <FlatList
              data={newData}
              keyExtractor={(e) => e.key.toString()}
              renderItem={({ item }) => {
                if (femaleSelected && item.gender !== "f") {
                  return;
                }
                if (maleSelected && item.gender !== "m") {
                  return;
                }
                return (
                  <View
                    style={[
                      item.gender === "f"
                        ? { backgroundColor: female }
                        : { backgroundColor: male },
                      {
                        flex: 1,
                        paddingHorizontal: 10,
                        paddingVertical: 20,
                        margin: 10,
                        borderRadius: 10,
                      },
                    ]}
                    key={item.key.toString()}
                  >
                    <Text style={{ textAlign: "center" }}>
                      {item.full_name}
                    </Text>
                  </View>
                );
              }}
            />
          </View>
        );
      }
    }
  };

  return (
    <Modal visible={showModal} animationType="slide">
      <View style={Sheets.background_modal}>
        {renderElements()}
        <TouchableOpacity
          style={Sheets.buttonContainer}
          onPress={() => {
            setFemaleSelected(false);
            setMaleSelected(false);
            setAllSelected(true);
            setSearchName("");
            setNewData([]);
            setShowModal(false);
          }}
        >
          <Text style={Sheets.buttonText}>Fechar</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default ModalResult;
