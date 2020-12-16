import "react-native-gesture-handler";
import "@react-native-firebase/app";
import { View, Text } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import CollectionViewComponent from "../components/collectionViewComponent.js";

export default collectionView = (props) => {
  const route = useRoute();
  return (
    <View>
      <Text>CollectionView</Text>
      <CollectionViewComponent collectionId={route.params.collectionId} />
    </View>
  );
};
