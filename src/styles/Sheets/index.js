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
    flex: 1,
    margin: 10,
    padding: 15,
    backgroundColor: Colors.new_button,
    borderRadius: 10,
    minHeight: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonClose: {
    margin: 10,
    padding: 15,
    backgroundColor: Colors.new_button,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: Colors.white,
    textAlign: "center",
    fontSize: 16,
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
  loading: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  icon: {
    fontSize: 26,
    color: Colors.white,
    padding: 5,
  },
});

export default Sheets;
