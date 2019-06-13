import { StyleSheet, Dimensions } from "react-native";
const media = Dimensions.get("window");
const { height, width } = media;

export default StyleSheet.create({
  homeView: { flex: 1, justifyContent: "center", alignItems: "center" },
  cardView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
    height: height * 0.15,
    borderBottomColor: "grey",
    borderBottomWidth: 2
  },
  titleView: { justifyContent: "flex-start", alignItems: "flex-start" },
  imageView: { height: height * 0.1, width: height * 0.1 },
  titleText: {
    flexWrap: "wrap",
    width: width * 0.7,
    fontWeight: "bold",
    color: "black"
  },
  authorText: { marginTop: 5 }
});
