import React from "react";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  RefreshControl,
} from "react-native";
import axios from "axios";
import ResultListItem from "./ResultListItem";
import FoodSearchBar from "../components/FoodSearchBar";


const HEADERS = {
  "x-api-key": "Wqk7dguwM99NgCdOhpycv5SLnZzap0pv4aSn43TF",
  "Content-Type": "application/json",
  "X-Requested-With": "XMLHttpRequest"
};

const ITEMS_LIMIT = 5;

export default class ResultListView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      foodItems: [],
      error: null,
      chosenItem: null,
      offset: 0,
      loading: true,
      fetching_from_server: false,
      searchText: "",
      // refreshing: false,
    };

    this.getFoodItems = this.getFoodItems.bind(this);
    // this.loadMoreData = this.loadMoreData.bind(this);
    this.updateSearch = this.updateSearch.bind(this);
    
  }


  changeImageUrl = url =>
    url.replace(
      /\/[^\/]*$/,
      "/50/50/resizescale/" + url.substr(url.lastIndexOf("/") + 1)
    );


  // Function called when "load more" is needed
  // loadMoreData() {
  //   this.setState({fetching_from_server: true}, ()=>{
  //     this.getFoodItems();
  //   });
  // }

  getFoodItems() {
    axios
      .post(
        `${"https://cors-anywhere.herokuapp.com/"}https://iw2tu1r0d6.execute-api.us-west-2.amazonaws.com/prod/v2/fooditems/_search`,
        {
          nutrinoId: "BARAK",
          text: this.state.searchText,
          size: ITEMS_LIMIT,
          offset: this.state.offset
        },
        { headers: HEADERS, crossdomain: true }
      )
      .then(res => {
        let foodItems = res.data.foodItems;
        // var newList = foodItems.map(o => ({...o, newImage: changeImageUrl(o.images[0])}));

        // On first fetching, we change the loading indicator to false after we done
        if (this.state.offset === 0) {
          this.setState({ loading: false });
        } else {
          this.setState({ fetching_from_server: false });
        }

        // Increasing the offset for the next loading
        this.setState(state => ({
          foodItems: [...state.foodItems, ...foodItems],
          offset: state.offset + ITEMS_LIMIT,
          // refreshing: false
        }));
      })
      .catch(error => {
        this.setState({ error: "There was a problem getting data", loading: false,  fetching_from_server: false });
      });
  }

  
  updateSearch = searchText => {
    this.setState({ searchText, foodItems: [], offset: 0 }, () => {
      if (this.state.searchText !== "") this.getFoodItems();
    });
  };

  componentDidMount() {
    this.getFoodItems();
  }

  onChangeSelectedItem(chosenItem) {
    this.setState({ chosenItem });
    this.props.updateSelectedItem(chosenItem);
  }

  render() {
    if (this.state.error) {
      <Text>{this.state.error}</Text>;
    }

    // if (this.state.loading && this.state.searchText) {
    //   return (
    //     <ActivityIndicator
    //       size="large"
    //       color="#0000ff"
    //       style={{ marginTop: 50 }}
    //     />
    //   );
    // }

    return (
      <View style={{flex:1}} >
      <ScrollView contentContainerStyle={styles.contentContainer}
      stickyHeaderIndices={[1]}
      // overScrollMode={"never"}
                  // refreshControl={
                  //   <RefreshControl
                  //     refreshing={this.state.refreshing}
                  //     onRefresh={this.getFoodItems}
                  //   />
                  // }
      >
      <View style={styles.selectedContainer}>
          {this.state.chosenItem? <Image source={{ uri: this.state.chosenItem.images[0] }} style={styles.itemImage} /> : null}
        </View>
      {/* {this.state.chosenItem? <Image source={{ uri: this.state.chosenItem.images[0] }} style={styles.itemImage} /> : null} */}
        <FoodSearchBar updateSearch={this.updateSearch} />
        {(this.state.loading && this.state.searchText)?
         (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            style={{ marginTop: 50 }}
          />
        ) 
        :
        
        this.state.foodItems.map(currentFoodItem => {
          return (
            <TouchableOpacity
              key={currentFoodItem.id}
              onPress={() => this.onChangeSelectedItem(currentFoodItem)}
            >
              <ResultListItem
                foodItem={currentFoodItem}
                isChosen={
                  this.state.chosenItem &&
                  currentFoodItem.id === this.state.chosenItem.id
                }
              />
            </TouchableOpacity>
          );
        })}

        
        { // Can only load more if first load occured
          !this.state.loading ? (
          <View style={styles.footer}>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={this.getFoodItems}
              //On Click of button calling loadMoreData function to load more data
              style={styles.loadMoreBtn}
            >
              <Text style={styles.btnText}>Load More</Text>
              {this.state.fetching_from_server ? (
              <ActivityIndicator color="black" style={{ marginLeft: 8 }} />
            ) : null}
            </TouchableOpacity>
          </View>
        ) : null}
      </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    // maxHeight: 640,
    // flex: 1,
    // flexGrow: 1,
    // justifyContent: 'space-between',
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
    marginTop: 10,
    marginBottom: 20
  },
  itemImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginTop: 3,
    marginRight: 10,
  },
});
