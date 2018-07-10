import { StyleSheet } from "react-native";

import __ from '../../theme/__'


const styles: any = StyleSheet.create({
  buttonRating: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  icon: {
    fontSize: __.sizeIconTiny,
  },
  text: {
    fontSize: __.fontSizeTiny,
  },
});

export default styles;
