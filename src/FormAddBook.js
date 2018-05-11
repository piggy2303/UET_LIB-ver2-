import React, { Component } from "react";
import { View } from "react-native";
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
  IconNB,
  Form,
  Label,
  Input,
  Item
} from "native-base";
import axios from "axios";

export default class FromAddBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "https://library-uet.herokuapp.com/books"
    };
  }
  handleChangeQuantity = input => {
    if (input >= 0) {
      this.setState({
        quantity: input
      });
    } else {
    }
  };

  AddBook = () => {
    axios
      .post(this.state.url, {
        book: {
          quantity: this.state.quantity,
          name: this.state.name,
          description: this.state.description
        }
      })
      .then(response => {
        console.log(response);
        if (response.status == 200) {
          this.props.navigation.goBack();
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Thêm sách</Title>
          </Body>
        </Header>

        <Content padder>
          <View>
            <Form>
              <Item stackedLabel>
                <Label>Tên sách</Label>
                <Input onChangeText={text => this.setState({ name: text })} />
              </Item>
              <Item stackedLabel last>
                <Label>Số lượng</Label>
                <Input onChangeText={this.handleChangeQuantity}  />
              </Item>
              <Item stackedLabel last>
                <Label>Chi tiết</Label>
                <Input
                  onChangeText={text => this.setState({ description: text })}
                />
              </Item>
            </Form>
            <Button
              block
              style={{ margin: 15, marginTop: 50 }}
              onPress={this.AddBook}
            >
              <Text>Xác nhận</Text>
            </Button>
          </View>
        </Content>
      </Container>
    );
  }
}
