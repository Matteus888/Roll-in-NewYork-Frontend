import { View, SafeAreaView, StyleSheet, Image, Text } from "react-native";
import Header from "../components/Header";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View>
        <Header />
      </View>
      <View>
        <Text>HomeScreen</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    justifyContent: "space-between",
  },
});
