import React from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';


export default class ResultListItem extends React.Component {
  constructor(props) {
    super(props);
  }

  changeImageUrl = url => url?url.replace(/\/[^\/]*$/, "/50/50/resizescale/" + url.substr(url.lastIndexOf('/') + 1)):"";


  toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt){
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

  render() {
    const foodItem = this.props.foodItem;
    var url = foodItem.images[0];

    // TODO: Uncomment once bug solved
    // if (url) {
    //   url = url.replace(/\/[^\/]*$/, "/50/50/resizescale/" + url.substr(url.lastIndexOf('/') + 1));
    // }

    return (
      <View style={styles.itemsContainer}>
        <Image source={{ uri: url }} style={styles.itemImage} />
        <Text style={styles.itemText}>
          {this.toTitleCase(foodItem.displayName)}
        </Text>
        <View style={{ marginLeft: "auto" }}>
          <Icon.Button
            name="check"
            backgroundColor="white"
            color={this.props.isChosen?"#0a850a":"transparent"}
            size={30}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  itemsContainer: {
    // flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10, fontSize: 20, height: 80, borderBottomWidth: 1, borderBottomColor: "grey", alignSelf: 'stretch'
  },
  itemImage: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    marginTop: 3,
    marginRight: 10,
  },
  itemText: {
    fontSize: 20,
  }
});
