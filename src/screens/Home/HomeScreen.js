import React from "react";
import {
  FlatList,
  ScrollView,
  Text,
  View,
  Image,
  Clipboard,
  Linking,
  ActivityIndicator
} from "react-native";
import styles from "./styles";
import { recipes } from "../../data/dataArrays";
import MenuImage from "../../components/MenuImage/MenuImage";
import DrawerActions from "react-navigation";
import { getCategoryName } from "../../data/MockDataAPI";
import { Button, Badge } from "react-native-elements";
import Icon from "react-native-vector-icons/Feather";
import { TouchableOpacity } from "react-native-gesture-handler";

export default class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Home",
    headerLeft: (
      <MenuImage
        onPress={() => {
          navigation.openDrawer();
        }}
      />
    )
  });

  constructor() {
    super();

    this.state = {
      text: "",
      clipboardContent: null,
      dataSource: [],
      fetching_from_server: false,
      loading: true,

    };
    this.offset = 0;
  }

  componentDidMount() {
    return fetch(
      'https://runrundeals.herokuapp.com/urunlers?_sort=createdAt:DESC&_start='+this.offset+'&_limit=10'
    )
      .then(response => response.json())
      .then(responseJson => {
        this.offset = this.offset + 10;
        this.setState(
          {
            dataSource: [...this.state.dataSource, ...responseJson],
            loading: false,
          },
          function() {
            console.log(responseJson);
          }
        );
      })
      .catch(error => {
        console.error(error);
      });
  }

  loadMoreData = () => {
    //On click of Load More button We will call the web API again
    this.setState({ fetching_from_server: true }, () => {
      fetch('https://runrundeals.herokuapp.com/urunlers?_sort=createdAt:DESC&_start='+this.offset+'&_limit=10')
        //Sending the currect offset with get request
        .then(response => response.json())
        .then(responseJson => {
          //Successful response from the API Call
          dataSource=[];
          this.offset = this.offset + 10;
          //After the response increasing the offset for the next API call.
          this.setState({
            dataSource: responseJson,
            //adding the new data with old one available
            fetching_from_server: false,
            //updating the loading state to false
          });
        })
        .catch(error => {
          console.error(error);
        });
        this.refs.listRef.scrollToOffset({x: 0, y: 0, animated: true});
    });
  };

  


  writeToClipboard = async item => {
    //ClipBoard'a kopyala
    await Clipboard.setString(item);
    alert("Copied This Coupon Code: " + item);
  };

  renderFooter() {
    return (
      //Footer View with Load More button
      <View
        style={{
          padding: 10,
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row"
        }}
      >
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={this.loadMoreData}
          //On Click of button calling loadMoreData function to load more data
          style={{
            padding: 10,
            backgroundColor: "#800000",
            borderRadius: 4,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Text style={{ color: "white", fontSize: 15, textAlign: "center" }}>
           Load More...
          </Text>
          {this.state.fetching_from_server ? (
            <ActivityIndicator color="white" style={{ marginLeft: 8 }} />
          ) : null}
        </TouchableOpacity>
      </View>
    );
  }

  renderRecipes = ({ item }) => (
    <View style={styles.container}>
      <Image style={styles.photo} source={{ uri: item.imgurl }} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.category}>{item.category}</Text>
      <Text style={{ marginBottom: 5, textDecorationLine: "line-through" }}>
        ${item.old_price}
      </Text>
      <Text style={{ marginBottom: 5, fontWeight: "bold", color: "black" }}>
        ${item.price}
      </Text>
      <Text
        style={{
          marginBottom: 10,
          color: "green",
          fontWeight: "bold",
          textAlign: "center"
        }}
      >
        Discount: %{item.discount}
      </Text>
      <Text
        style={{
          marginBottom: 10,
          color: "red",
          textAlign: "center",
          fontWeight: "bold"
        }}
      >
        Expiration Date: {item.expirationDate}
      </Text>
      <Button
        color="green"
        style={{ marginBottom: 10 }}
        onPress={() => this.writeToClipboard(item.code)}
        icon={<Icon name="scissors" size={20} color="white" />}
        title={"   " + item.code}
      />
      <TouchableOpacity
        style={{
          alignItems: "center",
          backgroundColor: "#66b22c",
          marginTop: 10,
          padding: 10
        }}
        onPress={() => Linking.openURL(item.url)}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>BUY NOW</Text>
      </TouchableOpacity>
    </View>
  );

  render() {
    return (
      <View>
        <FlatList
          vertical
          showsVerticalScrollIndicator={false}
          numColumns={1}
          data={this.state.dataSource}
          renderItem={this.renderRecipes}
          keyExtractor={item => `${item.recipeId}`}
          ItemSeparatorComponent={() => <View style={{ height: 0.5 }} />}
          ref="listRef"
          ListFooterComponent={this.renderFooter.bind(this)}
          //Adding Load More button as footer component
        />
      </View>
    );
  }
}
