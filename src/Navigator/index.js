import { View, Text, Alert, Button } from "react-native";
import React, { useEffect, useState } from "react";
import { StripeProvider, presentPaymentSheet, usePaymentSheet } from "@stripe/stripe-react-native";

const Navigator = () => {
  const [ready, setReady] = useState(false);
  const { initPaymentSheet,loading,presentPaymentSheet } = usePaymentSheet();

  useEffect(() => {
    initialisePaymentSheet();
  }, []);
  const initialisePaymentSheet = async () => {
    const { setupIntent, ephemeralKey, customer } =
      await fetchPaymentSheetParams();

    const { error } = await initPaymentSheet({
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      setupIntentClientSecret: setupIntent,
      merchantDisplayName: "Example Inc",
      allowsDelayedPaymentMethods: true,
      returnURL: "stripe-ex ample://stripe-redirect",
    });
    if (error) {
      Alert.alert(`Error code ${error.code}`, error.message);
    } else {
      setReady(true);
    
    }
  };
  const fetchPaymentSheetParams = async () => {
    const response = await fetch(
      `http://localhost:8000/payments/payment-sheet`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const { setupIntent, ephemeralKey, customer } = await response.json();
    return {
      setupIntent,
      ephemeralKey,
      customer,
    };
  };
  async function buy(){
    const {error} = presentPaymentSheet();
    if (error) {
        Alert.alert(`Error code ${error.code}`, error.message);
      } else {
        Alert.alert("Success","The subscription was successfully created")
        setReady(false);
      }
  }
  return (
    <View>
      <Text>Sweet Photo</Text>
      <Button title="set up" onPress={buy} disabled={loading || !ready}/>
    </View>
  );
};

export default Navigator;
