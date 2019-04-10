import React from "react";
import { Platform, StyleSheet, View } from "react-native";
import ResultListView from "../components/ResultListView";

export default class SearchScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: "no error"
    };
  }

  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.getStartedContainer}>
          <ResultListView />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 20
  },
  getStartedContainer: {
    flex: 1
  },
});
