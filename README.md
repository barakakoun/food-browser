# food-browser


The program was implemented using expo and tested on iPhone X.  
For testing the app, run:  
npm install -g expo-cli  
And then:  
expo start  
(also need to download expo app to your iPhone, as described in https://facebook.github.io/react-native/docs/getting-started)  

## Main files: 
SearchScreen - Main search screen  
FoodSearchBar - The search bar. Was implemented so it fulfill section #1 of instructions file  
ResultListView - The main view of the content, contains the search bar and mapping the results to ResultListItem  
ResultListItem - Component of one list item represents one result of food item  

## Few comments:  

2- The loading image with dynamic size didn't work for me (response was "internal error").  
Once it works, should only uncomment lines 30-32 on file ResultListItem

3- Didn't use button, but on IOS can go back by swiping the page to the right

4- Had no time left for implementing the animation  
(but found the way to do it here: https://medium.com/appandflow/react-native-scrollview-animated-header-10a18cb9469e).

