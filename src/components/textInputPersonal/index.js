import React from "react";
import { TextInput, View } from "react-native";
import { TextInputMask } from "react-native-masked-text";
import Colors from "../../styles/Colors";
import Sheets from "../../styles/Sheets";

const TextInputPersonal = ({
  value,
  onChangeText,
  type = null,
  placeholder,
  options,
  keyboardType = "default",
  autoCapitalize = "none",
  autoCompleteType = "off",
  onSubmitEditing,
}) => {
  return (
    <View>
      {type === null ? (
        <TextInput
          style={Sheets.textInput}
          value={value}
          onChangeText={(e) => onChangeText(e)}
          placeholder={placeholder}
          placeholderTextColor={Colors.placeholder}
          autoCapitalize={autoCapitalize}
          autoCompleteType={autoCompleteType}
          keyboardType={keyboardType}
          onSubmitEditing={(e) => onSubmitEditing(e)}
        />
      ) : (
        <TextInputMask
          style={Sheets.textInput}
          type={type}
          options={options}
          value={value}
          onChangeText={(e) => onChangeText(e)}
          placeholder={placeholder}
          placeholderTextColor={Colors.placeholder}
          autoCapitalize={autoCapitalize}
          autoCompleteType={autoCompleteType}
          keyboardType={keyboardType}
          onSubmitEditing={(e) => onSubmitEditing(e)}
        />
      )}
    </View>
  );
};

export default TextInputPersonal;
