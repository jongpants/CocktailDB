import React, { useState } from "react";
import {
  StyleSheet,
  Pressable,
  FlatList,
  Text,
  TextInput,
  View,
  Image,
  Switch,
  ToastAndroid,
  Dimensions,
} from "react-native";
import Swipeout from "react-native-swipeout";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

export default function List() {
  const [data, setData] = useState([]);
  const [text, setText] = useState("");
  const [close, setClose] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const [iFlag, setiFlag] = useState(false);
  const [swipeFlag, setSwipeFlag] = useState(false);
  let [favouriteDrinks, setFavouriteDrinks] = useState([]);
  const navigation = useNavigation();
  let url = "https://www.thecocktaildb.com/api/json/v1/1/";

  /*
  -- Back button handler that works to a degree --
  useEffect(() => {
    const backAction = () => {
      Alert.alert("Hold on!", "Are you sure you want to exit the application", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        { text: "YES", onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);
*/

  // -- Toggle API fetch by name of drink or by ingredient --
  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
    if (isEnabled) {
      ToastAndroid.show("Search by drink name", ToastAndroid.SHORT);
    } else {
      ToastAndroid.show("Search by full ingredient name", ToastAndroid.SHORT);
    }
  };

  //-- Button to fetch api --
  const searchButton = () => {
    let completeUrl = url;
    if (isEnabled) {
      completeUrl = completeUrl + "filter.php?i=" + text;
    } else {
      completeUrl = completeUrl + "search.php?s=" + text;
    }
    let mounted = true;
    const search = async () => {
      try {
        console.log("awaiting fetch");
        let response = await fetch(completeUrl);
        console.log("fetch complete");
        let search = await response.json();
        if (mounted) setData(search);
        if (isEnabled) {
          setSwipeFlag(false);
        } else {
          setSwipeFlag(true);
        }
        setiFlag(false);
      } catch (error) {
        console.log("FETCH ERROR", error);
        setiFlag(true);
      }
    };
    search();
    return () => {
      mounted = false;
    };
  };

  // -- Button that navigates to another website with full details of a drink --
  const detailButton = (index) => {
    let shortenedProp = data.drinks[index];
    let ingredients = [];

    for (let i = 1; i <= 15; i++) {
      let ingr = "strIngredient" + i;
      let meas = "strMeasure" + i;

      if (shortenedProp[ingr]) {
        ingredients.push({
          ingredient: shortenedProp[ingr],
          measure: shortenedProp[meas],
        });
      }
    }
    let drinkProps = {
      //page: "List",
      picture: shortenedProp.strDrinkThumb,
      name: shortenedProp.strDrink,
      alcoholic: shortenedProp.strAlcoholic,
      category: shortenedProp.strCategory,
      glass: shortenedProp.strGlass,
      instruction: shortenedProp.strInstructions,
      ingredients: ingredients,
    };

    navigation.navigate("DrinkDetail", { propsSend: drinkProps });
  };

  // -- Save a drink with its full info in favouriteDrinks
  //    but serves no purpose with Favourites tab not working --
  const favouriteButton = (index) => {
    let shortenedProp = data.drinks[index];
    let ingredients = [];

    for (let i = 1; i <= 15; i++) {
      let ingr = "strIngredient" + i;
      let meas = "strMeasure" + i;

      if (shortenedProp[ingr]) {
        ingredients.push({
          ingredient: shortenedProp[ingr],
          measure: shortenedProp[meas],
        });
      }
    }
    let drinkProps = {
      id: shortenedProp.idDrink,
      picture: shortenedProp.strDrinkThumb,
      name: shortenedProp.strDrink,
      alcoholic: shortenedProp.strAlcoholic,
      category: shortenedProp.strCategory,
      glass: shortenedProp.strGlass,
      instruction: shortenedProp.strInstructions,
      ingredients: ingredients,
    };
    if (favouriteDrinks.length > 0) {
      let drinkFound = false;
      for (let i = 0; i < favouriteDrinks.length; i++) {
        if (favouriteDrinks[i].id.includes(drinkProps.id)) {
          favouriteDrinks.splice(i, 1);
          console.log("removed a drink");
          drinkFound = true;
        }
      }
      if (drinkFound == false) {
        setFavouriteDrinks([...favouriteDrinks, drinkProps]);
        console.log("added new drink");
      }
    } else {
      setFavouriteDrinks([...favouriteDrinks, drinkProps]);
      console.log("added first drink");
    }
  };

  // -- Generate each row of drink with info and buttons --
  const renderItem = ({ item, index }) => {
    let check = false;
    if (favouriteDrinks.length > 0) {
      for (let i = 0; i < favouriteDrinks.length; i++) {
        if (favouriteDrinks[i].id.includes(item.idDrink)) {
          check = true;
        }
      }
    }

    let swipeButtons = [];
    if (check) {
      swipeButtons = [
        /*
        {
          text: <Ionicons name="md-star" size={40} color={"yellow"} />,
          backgroundColor: "#fbfbfb",
          underlayColor: "white",
          onPress: () => {
            favouriteButton(index);
          },
        },
        */
        {
          text: (
            <Ionicons name={"newspaper-outline"} size={40} color={"black"} />
          ),
          backgroundColor: "#fbfbfb",
          underlayColor: "white",
          onPress: () => {
            detailButton(index);
          },
        },
      ];
    } else if (check == false) {
      swipeButtons = [
        /*
        {
          text: <Ionicons name="md-star-outline" size={40} color={"yellow"} />,
          backgroundColor: "#fbfbfb",
          underlayColor: "white",
          onPress: () => {
            favouriteButton(index);
          },
        },
        */
        {
          text: (
            <Ionicons name={"newspaper-outline"} size={40} color={"black"} />
          ),
          backgroundColor: "#fbfbfb",
          underlayColor: "white",
          onPress: () => {
            detailButton(index);
          },
        },
      ];
    }

    if (swipeFlag) {
      return (
        <Swipeout
          right={swipeButtons}
          close={close}
          backgroundColor="#fbfbfb"
          sensitivity={100}
        >
          <View style={styles.container}>
            <Image
              style={styles.pic}
              source={{
                uri: item.strDrinkThumb,
              }}
            />
            <View style={styles.content1}>
              <Text style={styles.title}>{item.strDrink}</Text>
              <Text style={{ alignItems: "flex-end" }}>{item.strCategory}</Text>
              <Text style={{ alignItems: "flex-end" }}>
                {item.strAlcoholic}
              </Text>
            </View>
            <View style={styles.content2}>
              <Text style={{ alignItems: "flex-end" }}>
                {item.strIngredient1}
              </Text>
              <Text style={{ alignItems: "flex-end" }}>
                {item.strIngredient2}
              </Text>
              <Text style={{ alignItems: "flex-end" }}>
                {item.strIngredient3}
              </Text>
              {item.strIngredient4 != null ? (
                <Text style={{ alignItems: "flex-end" }}>...</Text>
              ) : (
                <></>
              )}
            </View>
          </View>
        </Swipeout>
      );
    } else {
      return (
        <View style={styles.container}>
          <Image
            style={styles.pic}
            source={{
              uri: item.strDrinkThumb,
            }}
          />
          <View style={styles.content1}>
            <Text style={styles.title}>{item.strDrink}</Text>
            <Text style={{ alignItems: "flex-end" }}>{item.strCategory}</Text>
            <Text style={{ alignItems: "flex-end" }}>{item.strAlcoholic}</Text>
          </View>
          <View style={styles.content2}>
            <Text style={{ alignItems: "flex-end" }}>
              {item.strIngredient1}
            </Text>
            <Text style={{ alignItems: "flex-end" }}>
              {item.strIngredient2}
            </Text>
            <Text style={{ alignItems: "flex-end" }}>
              {item.strIngredient3}
            </Text>
            {item.strIngredient4 != null ? (
              <Text style={{ alignItems: "flex-end" }}>...</Text>
            ) : (
              <></>
            )}
          </View>
        </View>
      );
    }
  };

  // -- The actual return --
  return (
    <View style={styles.header}>
      <View style={styles.searchBarBorder}>
        <TextInput
          style={styles.searchBar}
          label="text"
          placeholder={isEnabled ? "Search by Ingredient" : "Search by Drink"}
          value={text}
          onChangeText={(text) => setText(text)}
          onSubmitEditing={searchButton}
        />
        <Switch
          style={styles.switch}
          trackColor={{ false: "#767577", true: "#3944BC" }}
          thumbColor={isEnabled ? "#ededed" : "#ededed"}
          ios_backgroundColor="white"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
        <Pressable onPress={searchButton}>
          <Ionicons
            style={styles.searchButton}
            name="md-search"
            size={30}
            color="red"
          />
        </Pressable>
      </View>
      <View style={styles.contentBG}>
        {data.length == 0 && isEnabled == false ? (
          <View style={styles.firstText}>
            <Text> Search for drinks to start</Text>
          </View>
        ) : data.drinks == null && isEnabled == false ? (
          <View style={styles.firstText}>
            <Text>Try another search</Text>
          </View>
        ) : iFlag && isEnabled == true ? (
          <View style={styles.firstText}>
            <Text>
              Make sure the ingredients name is fully typed and correct
            </Text>
          </View>
        ) : data.drinks == null && isEnabled == true ? (
          <View style={styles.firstText}>
            <Text>
              Make sure the ingredients name is fully typed and correct
            </Text>
          </View>
        ) : (
          <FlatList
            data={data.drinks}
            renderItem={renderItem}
            keyExtractor={(item) => item.idDrink}
          />
        )}
      </View>
    </View>
  );
}
// -- Commented out backgroundColors
//    are for flexbox size checking --
const styles = StyleSheet.create({
  searchBarBorder: {
    flexDirection: "row",
    marginTop: "10%",
    marginBottom: 2,
    marginLeft: 18,
    height: 40,
    borderWidth: 2,
    padding: 5,
    borderRadius: 30,
    width: "90%",
    borderColor: "grey",
    backgroundColor: "white",
  },
  header: {
    flex: 1,
    backgroundColor: "white",
    //backgroundColor: "#fbfbfb",
  },
  contentBG: {
    flex: 1,
    backgroundColor: "#fbfbfb",
  },
  firstText: {
    marginTop: "75%",
    alignItems: "center",
    justifyContent: "center",
  },
  searchBar: {
    marginLeft: 8,
    marginTop: -5,
    height: 36,
    fontSize: 19,
    color: "black",
    width: "73%",
    //backgroundColor: "blue",
  },
  switch: {
    marginLeft: 1,
    //backgroundColor: "pink",
  },
  searchButton: {
    width: 30,
    height: 30,
    marginTop: -4,
    marginLeft: 1,
    color: "#3944BC",
    //backgroundColor: "pink",
  },
  flatlist: {
    flex: 4,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    width: Dimensions.get("screen").width,
    marginTop: 1,
    marginBottom: 1,
    flex: 1,
    flexDirection: "row",
    backgroundColor: "white",
  },
  pic: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginLeft: 15,
    borderRadius: 5,
  },
  content1: {
    flex: 1,
    flexDirection: "column",
    height: 80,
    width: "70%",
    marginHorizontal: 10,
    marginVertical: 8,
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontWeight: "200",
    marginBottom: 2,
    color: "black",
  },
  content2: {
    flex: 1,
    height: 80,
    width: "70%",
    marginHorizontal: 20,
    marginVertical: 10,
    flexDirection: "column",
  },
});
