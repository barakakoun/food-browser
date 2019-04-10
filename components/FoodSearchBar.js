import React from "react";
import { SearchBar } from "react-native-elements";

// Half a second waiting between fetching the search
const WAIT_INTERVAL = 500;
const ENTER_KEY = 13;

export default class FoodSearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: ""
    };

    this.triggerChange = this.triggerChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    this.timer = null;
  }

  handleChange(searchText) {
    // If user pressed a new key- we want to start the timeout again
    clearTimeout(this.timer);

    this.setState({ searchText });

    // We call the function that change the value on the perent (hence fire the http request) only after timeout
    this.timer = setTimeout(this.triggerChange, WAIT_INTERVAL);
  }

  triggerChange() {
    const { searchText } = this.state;

    this.props.updateSearch(searchText);
  }

  render() {
    const { searchText } = this.state;

    return (
      <SearchBar
        placeholder="Type Here..."
        platform="ios"
        onChangeText={searchText => {
          this.handleChange(searchText);
        }}
        value={searchText}
      />
    );
  }
}
