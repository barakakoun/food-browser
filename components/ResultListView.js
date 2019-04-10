import React from "react";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import axios from "axios";
import ResultListItem from "./ResultListItem";
import FoodSearchBar from "../components/FoodSearchBar";


const HEADERS = {
  "x-api-key": "Wqk7dguwM99NgCdOhpycv5SLnZzap0pv4aSn43TF",
  "Content-Type": "application/json",
  "X-Requested-With": "XMLHttpRequest"
};

const ITEMS_LIMIT = 10;

export default class ResultListView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      foodItems: [],
      error: null,
      chosenItem: null,
      offset: 0,
      searchText: "",
      refreshing: false,
      chosenItem : null,
    };

    this.getFoodItems = this.getFoodItems.bind(this);
    this.updateSearch = this.updateSearch.bind(this);
  }

  // Method handeling the request
  getFoodItems() {
    var searchText = this.state.searchText;

    // Mechanism to make sure we don't fetch while there's request in process
    if (!this.state.refreshing) {
      this.setState({refreshing: true}, () => 
      axios.post(
        `${"https://cors-anywhere.herokuapp.com/"}https://iw2tu1r0d6.execute-api.us-west-2.amazonaws.com/prod/v2/fooditems/_search`,
        {
          nutrinoId: "BARAK",
          text: searchText,
          size: ITEMS_LIMIT,
          offset: this.state.offset
        },
        { headers: HEADERS, crossdomain: true }
      )
      .then(res => {
        let foodItems = res.data.foodItems;

        // Making sure we are changing the state only if the user didn't type another search
        // term by the time we proccessed the previous search term
        if (searchText === this.state.searchText) 
        this.setState(state => ({
          foodItems: [...state.foodItems, ...foodItems], // Adding the new food items to the array
          offset: state.offset + ITEMS_LIMIT, // Increasing the offset for the next loading
          refreshing: false,
        }));
      })
      .catch(error => {
        this.setState({ error: "There was a problem getting data", refreshing: false });
      }));
    }
  }

  
  // Handles when a user changes the search text
  // Initiate the states and fetch 
  updateSearch = searchText => {
    this.setState({ searchText, 
                    foodItems: [], 
                    chosenItem : null,
                    refreshing: false, // So it will override current loading
                    offset: 0}, () => {
      if (this.state.searchText !== "") this.getFoodItems();
    });
  };

  // When user choose a food item, it setted as the chosen.
  // If he taps it again, it clears the chosen item..
  onChangeSelectedItem(chosenItem) {
    // If we chose a chosen item - we cancel the choice
    if (this.state.chosenItem && (chosenItem.id === this.state.chosenItem.id)) this.setState({ chosenItem : null });
    else {
      this.setState({ chosenItem });
    }
  }


  render() {
    if (this.state.error) {
      <Text>{this.state.error}</Text>;
    }

    return (
      <View style={{flex:1}} >
      
      {/* If there is a chosen item, show its image */}
      <View style={styles.selectedContainer}>
          {this.state.chosenItem? <Image source={{ uri: this.state.chosenItem.images[0] }} style={styles.itemImage} /> : null}
        </View>
      <ScrollView contentContainerStyle={styles.contentContainer}
      stickyHeaderIndices={[0]}
      onScroll={(e)=>{
        // If we are close to the end of the list, we will fetch more data from the server
        var windowHeight = Dimensions.get('window').height,
            height = e.nativeEvent.contentSize.height,
            offset = e.nativeEvent.contentOffset.y;
        if (( windowHeight + offset >= height ) && this.state.foodItems.length){
          this.getFoodItems();
        }
    }}
      scrollEventThrottle={1000}
      >
        <FoodSearchBar updateSearch={this.updateSearch} />
        { // Running over all the results and add them as a result list item
          this.state.foodItems.map(currentFoodItem => {
          return (
            <TouchableOpacity
              key={currentFoodItem.id}
              onPress={() => this.onChangeSelectedItem(currentFoodItem)}
            >
              <ResultListItem
                foodItem={currentFoodItem}
                isChosen={ // Mark as chosen conditions
                  this.state.chosenItem &&
                  currentFoodItem.id === this.state.chosenItem.id
                }
              />
            </TouchableOpacity>
          );
        })
        }

        { // If we're refreshing (waiting for a response from the server), then we show the indicator
          this.state.refreshing ? 
            <ActivityIndicator
            size="large"
            color="#0000ff"
            style={{ marginTop: 10 }}
          />
          : null
        }

        
      </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  contentContainer: {
  },
  footer: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row"
  },
  loadMoreBtn: {
    padding: 10,
    backgroundColor: "#800000",
    borderRadius: 4,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  btnText: {
    color: "white",
    fontSize: 15,
    textAlign: "center"
  },
  selectedContainer: {
    alignItems: "center",
    marginBottom: 20
  },
  itemImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
});
