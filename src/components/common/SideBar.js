import React from 'react';
import {
  Content,
  Text,
  List,
  ListItem,
  Container,
  Left,
} from "native-base";

class SideBar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Container>
        <Content
          bounces={false}
          style={{ flex: 1, backgroundColor: "#fff", top: -1 }}
        >
          <List
            dataArray={this.props.items || this.props.navigation.state.routes}
            renderRow={data =>
              <ListItem
                button
                noBorder
                onPress={() => this.props.navigation.navigate(data.routeName)}
              >
                <Left>
                  <Text>
                    {data.key}
                  </Text>
                </Left>
              </ListItem>}
          />
        </Content>
      </Container>
    );
  }
}

export default SideBar;