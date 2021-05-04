import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Colors from "../../../styles/Colors/";

const Search = ({ searchName, setSearchName }) => {
  return (
    <View style={{ flexDirection: "row", marginHorizontal: 10 }}>
      <Icon name="magnify" color={Colors.white} size={24} />
      <TextInput
        style={{
          flex: 1,
          textAlign: "center",
          fontSize: 18,
          color: Colors.white,
          fontStyle: "italic",
        }}
        placeholder="Pesquisar"
        value={searchName}
        onChangeText={(e) => setSearchName(e)}
      />
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({});
