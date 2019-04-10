import React from "react";
import { Platform, StyleSheet, View } from "react-native";
import ResultListView from "../components/ResultListView";

export default class SearchScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: null,
      error: "no error"
    };

    this.updateSelectedItem = this.updateSelectedItem.bind(this);
  }

  static navigationOptions = {
    header: null
  };

  updateSelectedItem = selectedItem => {
    this.setState({ selectedItem });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.getStartedContainer}>
          <ResultListView
            searchTerm={this.state.searchText}
            updateSelectedItem={this.updateSelectedItem}
          />
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
