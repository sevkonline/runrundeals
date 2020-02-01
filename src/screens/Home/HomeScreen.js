import React from 'react';
import { FlatList, ScrollView, Text, View, TouchableHighlight, Image, Clipboard, Linking } from 'react-native';
import styles from './styles';
import { recipes } from '../../data/dataArrays';
import MenuImage from '../../components/MenuImage/MenuImage';
import DrawerActions from 'react-navigation';
import { getCategoryName } from '../../data/MockDataAPI';
import { Button, Badge } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Feather';

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

    return fetch('https://runrundeals.herokuapp.com/urunlers')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          dataSource: responseJson
        }, function () {
          // In this block you can do something with new state.
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }


  writeToClipboard = async (item) => {
    //To copy the text to clipboard
    await Clipboard.setString(item);
    alert('Copied This Coupon Code: ' + item);
  };
  renderRecipes = ({ item }) => (
    <View style={styles.container}>
      <Image style={styles.photo} source={{ uri: item.imgurl }} />
      <Text >{item.title}</Text>
      <Text style={styles.category}>${item.old_price}</Text>
      <Text style={styles.title}>${item.price}</Text>
      <Text style={{ color: 'red',marginBottom:10,fontWeight: 'bold'}}>Discount: {item.discount}</Text>
      <Button style={{marginBottom:15,marginLeft:10,marginRight:10}} onPress={() => this.writeToClipboard(item.code)} 
      icon={
        <Icon
          name="scissors"
          size={20}
          color="white"
        />
      } title={"   " + item.code} />
    <Button title="BUY NOW" type="clear" onPress={() => Linking.openURL(item.url)} />
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
