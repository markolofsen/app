import * as React from "react";
import {
  View,
  Text,
  List,
  ListItem,
  Left,
  Right,
  Icon
} from "native-base";

import styles from "./styles";

class TicketsMenu extends React.Component {
  render() {

    const {data, ticketTitle, offerSlug} = this.props

    return (
      <View>
        <List>
          {data.map((item, i) => (
            <ListItem
              key={i}
              onPress={() =>
                this.props.navigation.navigate("DetailsTicket", {
                  navigation: this.props.navigation,
                  ticketTitle,
                  data: item,
                  offerSlug,
                })} >
                <Left>
                  <Text>{item.title}</Text>
                </Left>
                <Right>
                  <Icon name="chevron-right" />
                </Right>
            </ListItem>
          ))}
        </List>
      </View>
    );
  }
}

export default TicketsMenu;
