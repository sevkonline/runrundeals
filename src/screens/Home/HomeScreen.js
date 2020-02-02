import React from 'react';
import { FlatList, ScrollView, Text, View, Image, Clipboard, Linking } from 'react-native';
import styles from './styles';
import { recipes } from '../../data/dataArrays';
import MenuImage from '../../components/MenuImage/MenuImage';
import DrawerActions from 'react-navigation';
import { getCategoryName } from '../../data/MockDataAPI';
import { Button, Badge } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Feather';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Home',
    headerLeft: (
      <MenuImage
        onPress={() => {
          navigation.openDrawer();
        }}
      />
    )
  });

  constructor(props) {

    super(props);

    this.state = {
      text: '',
      clipboardContent: null,
      dataSource: []
    }
  }

  componentDidMount() {

    return fetch('https://runrundeals.herokuapp.com/urunlers?_sort=createdAt:DESC')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          dataSource: responseJson
        }, function () {
          console.log(responseJson);
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }


  writeToClipboard = async (item) => {
    //ClipBoard'a kopyala
    await Clipboard.setString(item);
    alert('Copied This Coupon Code: ' + item);
  };
  renderRecipes = ({ item }) => (
    <View style={styles.container}>
      <Image style={styles.photo} source={{ uri: item.imgurl }} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.category} >{item.category}</Text>
      <Text style={{ marginBottom: 5, textDecorationLine: 'line-through' }}>${item.old_price}</Text>
      <Text style={{ marginBottom: 5, fontWeight: 'bold', color: 'black' }}>${item.price}</Text>
      <Text style={{ marginBottom: 10, color: 'green', fontWeight: 'bold', textAlign: 'center' }} >Discount: %{item.discount}</Text>
      <Text style={{ marginBottom: 10, color: 'red', textAlign: 'center', fontWeight: 'bold' }}>Expiration Date: {item.expirationDate}</Text>
      <Button color='green' style={{ marginBottom: 10 }} onPress={() => this.writeToClipboard(item.code)}
        icon={
          <Icon
            name="scissors"
            size={20}
            color="white"
          />
        } title={"   " + item.code} />
      <TouchableOpacity style={{
        alignItems: 'center',
        backgroundColor: '#66b22c',
        marginTop: 10,
        padding: 10
      }} onPress={() => Linking.openURL(item.url)}><Text style={{ color: 'white', fontWeight: 'bold' }}>BUY NOW</Text></TouchableOpacity>
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
        />
      </View>
    );
  }
}
