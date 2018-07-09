import { StyleSheet, Dimensions } from 'react-native'

import { Constants } from 'expo';


const { width, height } = Dimensions.get('window')

export default {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  listItem: {
    flex: 1,
    flexDirection: 'column',
    borderBottomWidth: 1,
    borderBottomColor: '#d6d7da',
    padding: 6,
  },
  imageWrapper: {
    padding: 5,
  },
  title: {
    fontSize: 20,
    textAlign: 'left',
    margin: 6,
  },
  subtitle: {
    fontSize: 10,
    textAlign: 'left',
    margin: 6,
  },
  image: {
    backgroundColor: '#ccc',
    flex: 1,
    resizeMode: 'cover',
    // position: 'absolute',
    width: '100%',
    height: 200,
    justifyContent: 'center',
    borderRadius: 2,
  }
}
