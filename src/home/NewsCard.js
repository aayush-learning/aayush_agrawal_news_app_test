import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Dimensions,
  ToastAndroid,
  Keyboard,
  Image
} from "react-native";
import styles from "./style";

export default class NewsCard extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      author,
      content,
      description,
      publishedAt,
      source,
      title,
      url,
      urlToImage
    } = this.props.item;
    const { id, name } = source;
    return (
      <TouchableOpacity onPress={() => this.props.toDetailScreen(url,title)} style={styles.cardView}>
        <View style={styles.titleView}>
            <Text ellipsizeMode={"tail"} numberOfLines={2} style={styles.titleText}>{title}</Text>
            <Text style={styles.authorText}>{author}</Text>
        </View>
        <View>
          <Image source={{uri: urlToImage}} style={styles.imageView} resizeMode='cover' />
        </View>
      </TouchableOpacity>
    );
  }
}
