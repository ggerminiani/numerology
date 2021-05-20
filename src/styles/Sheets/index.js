import { StyleSheet } from "react-native";
import Colors from "../Colors";

const Sheets = StyleSheet.create({
  containerFull: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
  },
  textInput: {
    margin: 10,
    padding: 15,
    textAlign: "center",
    color: Colors.white,
    backgroundColor: Colors.background_input,
    fontStyle: "italic",
    fontSize: 16,
    borderRadius: 10,
  },
  buttonContainer: {
    margin: 10,
    padding: 15,
    backgroundColor: Colors.button,
    borderRadius: 10,
  },
  buttonText: {
    color: Colors.white,
    textAlign: "center",
    fontSize: 20,
    fontStyle: "italic",
    fontWeight: "700",
  },
  background_modal: {
    flex: 1,
    backgroundColor: Colors.background_modal,
    padding: 10,
  },
  resultTitle: {
    marginTop: 10,
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
  },
  resultSubtitle: {
    fontSize: 22,
    textAlign: "center",
  },
  resultMessage: {
    marginTop: 20,
    fontSize: 16,
    textAlign: "justify",
    fontStyle: "italic",
    letterSpacing: 1.5,
    marginHorizontal: 10,
  },
  resultAuthor: {
    marginTop: 20,
    fontSize: 14,
    textAlign: "right",
    fontStyle: "italic",
    letterSpacing: 1.5,
    marginHorizontal: 10,
  },
});

export default Sheets;
