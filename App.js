import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { StripeProvider, CardField } from "@stripe/stripe-react-native";
import Navigator from "./src/Navigator";
const StripePublishableKey =
  "pk_test_51OO1DzHyW7F7HDzWsfW9PAamh5OZfKy9QaNwm39QneeGNmtCABRUE03rOAeWvtiCnLm6Er4uvdYJ1tN6PRMPOZCR00qHFFu68E";

export default function App() {
  const [card, setCard] = useState(null);

  return (
    <View style={styles.container}>
      <Text>Stripe</Text>
      <StripeProvider
        publishableKey={StripePublishableKey}
        urlScheme="stripe-vid-example"
      >
        <Navigator />
      </StripeProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
