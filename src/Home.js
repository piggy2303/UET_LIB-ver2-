import React, { Component } from "react";
import { FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  Card,
  CardItem,
  Text,
  Body,
  Left,
  Right,
  IconNB
} from "native-base";

import Item from "./Item";

import axios from "axios";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "https://library-uet.herokuapp.com/books",
      data: []
    };
    this.getData = this.getData.bind(this);
  }

  sortById = (a, b) => {
    if (a.id < b.id) return -1;
    if (a.id > b.id) return 1;
    return 0;
  };

  getData = () => {
    axios
      .get(this.state.url)
      .then(response => {
        this.setState({
          data: response.data.books.sort(this.sortById)
        });
        console.log(this.state.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  componentDidMount() {
    console.log("did mount");
    this.getData();
  }

  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() =>
                  this.props.navigation.navigate("FormAddBook")
                }>
              <Icon name="md-add" />
            </Button>
          </Left>
          <Body>
            <Title>Uet Library</Title>
          </Body>
          <Right>
            <Button transparent onPress={this.getData}>
              <Icon name="refresh" />
            </Button>
          </Right>
        </Header>
        <Content padder>
          <FlatList
            refreshing={this.state.isReloading}
            onRefresh={this.handleRefesh}
            data={this.state.data}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate("Detail", { id: item.id })
                }
              >
                <Item
                  name={item.name}
                  description={item.description}
                  quantity={item.quantity}
                />
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </Content>
      </Container>
    );
  }
}
