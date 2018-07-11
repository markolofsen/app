import { StyleSheet } from "react-native";

import __, {css, padding, margin} from '../../theme/__'


const styles: any = StyleSheet.create({
  container: {
    // paddingLeft: 20,
    ...padding(0),
  },
  footerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 150,
    flexDirection: 'row',
  },
  footerRitle: {
    opacity: 0.7,
    marginLeft: 8,
  },
  List: {
    ...margin(0),
    // ...padding(0, 10, 0, 10),
     borderTopWidth: 0,
     borderBottomWidth: 0,
     backgroundColor: 'transparent',
  },
  FlatList: {
    // ...margin(0, 10, 0, 10),
  },
  Card: {
    ...margin(10, 10, 0, 10),
  }

});

export default styles;
