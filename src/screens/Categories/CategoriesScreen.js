import React from 'react';
import {
  FlatList,
  Text,
  View,
  Image,
  TouchableHighlight
} from 'react-native';
import styles from './styles';
import { categories } from '../../data/dataArrays';
import { getNumberOfRecipes } from '../../data/MockDataAPI';

export default class CategoriesScreen extends React.Component {
  static navigationOptions = {
    title: 'About'
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.categoriesItemContainer}>
        <Text style={{color:'black',fontSize:30,marginLeft:10,marginRight:10,textAlign:'center',marginTop:10}} h2>About Run Run Deals</Text>
        <Text style={{color:'black',fontSize:15,marginLeft:10,marginRight:10,textAlign:'center',marginTop:10}}>
        Advertisers may compensate us for posting their products or promotions on this site. The posting said items does not mean we endorse them. You are still responsible for doing the research on sellers/items before purchasing! We are only posting what we feel is a great deal for your consideration.

Run Run Deals is a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to 
Amazon.com
          
        </Text>
      </View>
    );
  }
}
