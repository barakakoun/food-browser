import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput
} from "react-native";
import { WebBrowser } from "expo";
import { SearchBar } from "react-native-elements";
import ResultListView from "../components/ResultListView";
import FoodSearchBar from "../components/FoodSearchBar";

export default class SearchScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: null,
      // searchText: "",
      error: "no error"
    };
    
    this.updateSelectedItem = this.updateSelectedItem.bind(this);
  }
  //url = url.replace(/\/[^\/]*$/, "/150/150/resizescale/" + url.substr(url.lastIndexOf('/') + 1))

  static navigationOptions = {
    header: null
  };

  updateSelectedItem = selectedItem => {
    this.setState({ selectedItem });
  }

  render() {

    return (
      <View style={styles.container}>
        {/* <View style={styles.selectedContainer}>
          {this.state.selectedItem? <Image source={{ uri: this.state.selectedItem.images[0] }} style={styles.itemImage} /> : null}
        </View> */}

        <View style={styles.getStartedContainer}>

          {/* <Text>
          {this.state.selectedItem? this.state.selectedItem:null}
          </Text> */}

          <ResultListView searchTerm={this.state.searchText} updateSelectedItem={this.updateSelectedItem} />
        </View>
      </View>
    );
  }
}
// TODO: smaller objects!!!
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 30
  },
  getStartedContainer: {
    // alignItems: 'center',
    // marginHorizontal: 50,
    flex: 1,
  },
  developmentModeText: {
    marginBottom: 20,
    color: "rgba(0,0,0,0.4)",
    fontSize: 14,
    lineHeight: 19,
    textAlign: "center"
  },
  selectedContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: "contain",
    marginTop: 3,
    marginLeft: -10
  },
  homeScreenFilename: {
    marginVertical: 7
  },
  codeHighlightText: {
    color: "rgba(96,100,109, 0.8)"
  },
  codeHighlightContainer: {
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 3,
    paddingHorizontal: 4
  },
  getStartedText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    lineHeight: 24,
    textAlign: "center"
  },
  tabBarInfoContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3
      },
      android: {
        elevation: 20
      }
    }),
    alignItems: "center",
    backgroundColor: "#fbfbfb",
    paddingVertical: 20
  },
  tabBarInfoText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    textAlign: "center"
  },
  navigationFilename: {
    marginTop: 5
  },
  helpContainer: {
    marginTop: 15,
    alignItems: "center"
  },
  helpLink: {
    paddingVertical: 15
  },
  helpLinkText: {
    fontSize: 14,
    color: "#2e78b7"
  },
  itemImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginTop: 3,
    marginRight: 10,
  }
});
