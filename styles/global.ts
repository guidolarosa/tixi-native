import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
  mt20: {
    marginTop: 20,
  },
  button: {
    borderRadius: 5,
    height: 60,
  },
  buttonFill: {
    backgroundColor: "orange",
  },
  buttonOutline: {
    backgroundColor: "black",
    borderWidth: 1,
    borderColor: "orange",
  },
  buttonTextStyle: {
    fontSize: 16,
    fontWeight: 600,
    textTransform: "uppercase",
    width: "100%",
    letterSpacing: 1,
    opacity: 0.8
  },
});

export default styles;
