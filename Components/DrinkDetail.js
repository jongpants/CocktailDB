import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function DrinkDetail(propsTemp) {
  const navigation = useNavigation();
  let { route } = propsTemp;
  let { propsSend } = route.params;
  let props = propsSend;

  let ingredientOutput = "";
  let measureOutput = "";
  let dashOutput = "";
  for (let i = 0; i < props.ingredients.length; i++) {
    ingredientOutput =
      ingredientOutput + props.ingredients[i].ingredient + "\n";
    if (props.ingredients[i].measure) {
      dashOutput = dashOutput + " - " + "\n";
      measureOutput = measureOutput + props.ingredients[i].measure + "\n";
    }
  }

  console.log(props);

  return (
    <View style={styles.container1}>
      <View style={styles.container2}></View>
      <View style={styles.border}>
        <View style={styles.container3}>
          <View style={styles.container4}>
            <Image
              style={styles.pic}
              source={{
                uri: props.picture,
              }}
            />
          </View>
          <View style={styles.container5}>
            <Text style={styles.title}>{props.name}</Text>
            <Text style={styles.textInfo}>
              {props.category}
              {"\n"}
              {props.alcoholic}
              {"\n"}
              {props.glass}
            </Text>
          </View>
        </View>
        <View style={styles.container6}>
          <Text style={styles.title}>Recipe</Text>
        </View>
        <View style={styles.container8}>
          <View style={styles.container8_1}>
            <Text style={styles.text1}>{ingredientOutput}</Text>
          </View>
          <View style={styles.container8_2}>
            <Text style={styles.dash}>{dashOutput}</Text>
          </View>
          <View style={styles.container8_3}>
            <Text style={styles.text2}>{measureOutput}</Text>
          </View>
        </View>
        <View style={styles.container7}>
          <Text style={styles.title}>Instructions</Text>
          <Text style={styles.textInstruction}>{props.instruction}</Text>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container1: {
    flex: 5,
    backgroundColor: "white",
  },
  container2: {
    marginTop: "10%",
    //backgroundColor: "pink",
  },
  border: {
    flex: 5,
    backgroundColor: "white",
  },
  container3: {
    flex: 5,
    flexDirection: "row",
    backgroundColor: "#fbfbfb",
  },
  container4: {
    margin: 5,
    flex: 5,
    //backgroundColor: "yellow",
  },
  container5: {
    margin: 5,
    flex: 5,
  },
  container6: {
    flex: 1,
    //backgroundColor: "pink",
  },
  container8: {
    flex: 4,
    flexDirection: "row",
    //backgroundColor: "blue",
  },
  container8_1: {
    flex: 5,
    //backgroundColor: "blue",
  },
  container8_2: {
    flex: 1,
    //backgroundColor: "blue",
  },
  container8_3: {
    flex: 5,
    //backgroundColor: "blue",
  },
  container7: {
    flex: 5,
    backgroundColor: "#fbfbfb",
  },
  pic: {
    width: "100%",
    height: "100%",
    alignSelf: "center",
    borderRadius: 5,
  },
  title: {
    flex: 5,
    marginTop: 10,
    fontSize: 22,
    position: "absolute",
    fontWeight: "200",
    alignSelf: "center",
    color: "black",
  },
  textInfo: {
    textAlign: "center",
    fontSize: 16,
    margin: "5%",
    marginTop: "50%",
    //alignContent: "center",
  },
  textInstruction: {
    textAlign: "center",
    fontSize: 16,
    margin: "5%",
    marginTop: "15%",
  },
  text1: {
    textAlign: "right",
    flex: 1,
    fontSize: 16,
    margin: "5%",
    //alignContent: "center",
  },
  text2: {
    textAlign: "left",
    flex: 1,
    fontSize: 16,
    margin: "5%",
    //alignContent: "center",
  },
  dash: {
    textAlign: "center",
    flex: 1,
    fontSize: 16,
    marginTop: "25%",
    //alignContent: "center",
  },
});
