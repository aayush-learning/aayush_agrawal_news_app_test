import React from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import NewsCard from "./NewsCard";
import {getData} from '../action/action'
import { newsSelector, isLoadingSelector } from '../selector/selector';
import styles from "./style";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.toDetailScreen = this.toDetailScreen.bind(this);
  }
  toDetailScreen(url, title) {
    this.props.navigation.navigate("Detail", { url, title });
  }
  componentDidMount() {
    const API_URL =
      "https://newsapi.org/v2/top-headlines?country=de&category=business&apiKey=";
    const API_KEY = "9b64bcfe576047ba8e5bb7fd24c9e526";
    let endPoint = `${API_URL}${API_KEY}`;
    this.props.getData(endPoint);
  }
  render() {
    const { news, isLoading } = this.props;
    return !isLoading ? (
      <FlatList
        showsVerticalScrollIndicator={false}
        scrollsToTop={false}
        data={news}
        removeClippedSubviews
        refreshing={isLoading}
        keyExtractor={item => `${item.source.id}`}
        renderItem={({ item }) => (
          <NewsCard toDetailScreen={this.toDetailScreen} item={item} />
        )}
        onEndReachedThreshold={0.5}
      />
    ) : (
      <View style={styles.homeView}>
        <Text>News is being loaded...</Text>
      </View>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  news: newsSelector(),
  isLoading: isLoadingSelector(),
});

export default connect(mapStateToProps, { getData })(Home);
