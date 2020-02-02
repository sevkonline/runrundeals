import { StyleSheet, Dimensions } from 'react-native';

// screen sizing
const { width, height } = Dimensions.get('window');
// orientation must fixed
const SCREEN_WIDTH = width < height ? width : height;

const recipeNumColums = 2;
// item size
const RECIPE_ITEM_HEIGHT = 150;
const RECIPE_ITEM_MARGIN = 20;

// 2 photos per width
export const RecipeCard = StyleSheet.create({
  container: {   
    padding:15,
    marginLeft:10,
    marginRight:10,
    marginTop: 20,
    height: "auto",
    borderColor: '#cccccc',
    borderWidth: 1,
    borderRadius: 15
  },
  photo: {
    width: '100%',
    height: 200,
    borderRadius: 15,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    resizeMode:'contain'
  },
  title: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#444444',
    marginBottom:5
   
  },
  category: {
   marginBottom:5,
    color: '#444444',
  }
});
