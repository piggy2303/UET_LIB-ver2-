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

export default class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "https://library-uet.herokuapp.com/books",
      id: this.props.navigation.getParam("id", null),
      data: [],

      isEdit: true
    };
  }

  getData = () => {
    console.log("getdata");
    axios
      .get(this.state.url + "/" + this.state.id)
      .then(response => {
        console.log(response);
        this.setState({
          name: response.data.book.name,
          description: response.data.book.description,
          quantity: response.data.book.quantity
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  addBook = () => {
    console.log("add");
    axios
      .put(this.state.url + "/" + this.state.id, {
        book: {
          quantity: this.state.quantity + 1,
          name: this.state.name,
          description: this.state.description
        }
      })
      .then(response => {
        console.log(response);
        if (response.status == 200) {
          this.getData();
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  popBook = () => {
    console.log("pop");
    if (this.state.quantity > 1) {
      axios
        .put(this.state.url + "/" + this.state.id, {
          book: {
            quantity: this.state.quantity - 1,
            name: this.state.name,
            description: this.state.description
          }
        })
        .then(response => {
          console.log(response);
          if (response.status == 200) {
            this.getData();
          }
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      console.log("quantity must >= 1");
    }
  };

  clickEdit = () => {
    this.setState({
      isEdit: false
    });
  };

  confirmEdit = () => {
    this.setState({
      isEdit: true
    });
    axios
      .put(this.state.url + "/" + this.state.id, {
        book: {
          quantity: this.state.quantity,
          name: this.state.name,
          description: this.state.description
        }
      })
      .then(response => {
        console.log(response);
        if (response.status == 200) {
          this.getData();
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  componentDidMount() {
    console.log("did mount");
    this.getData();
  }
  handleChangeQuantity = input => {
    if (input >= 0) {
      this.setState({
        quantity: input
      });
    } else {
    }
  };

  deleteBook = () => {
    axios
      .delete(this.state.url + "/" + this.state.id)
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
    const editForm = this.state.isEdit ? (
      <Card>
        <CardItem header bordered>
          <Text>Tên sách: {this.state.name}</Text>
        </CardItem>
        <CardItem bordered>
          <Body>
            <Text>{this.state.description}</Text>
          </Body>
        </CardItem>
        <CardItem footer bordered>
          <Text>số lượng: {this.state.quantity}</Text>
        </CardItem>
        <CardItem bordered>
          <Left>
            <Button rounded success onPress={this.popBook}>
              <Text>Bớt</Text>
            </Button>
          </Left>
          <Right>
            <Button rounded success onPress={this.addBook}>
              <Text>Thêm</Text>
            </Button>
          </Right>
        </CardItem>
      </Card>
    ) : (
      <View>
        <Form>
          <Item stackedLabel>
            <Label>Tên sách</Label>
            <Input
              onChangeText={text => this.setState({ name: text })}
              value={this.state.name}
            />
          </Item>
          <Item stackedLabel last>
            <Label>Số lượng</Label>
            <Input
              onChangeText={this.handleChangeQuantity}
              value={this.state.quantity.toString()}
            />
          </Item>
          <Item stackedLabel last>
            <Label>Chi tiết</Label>
            <Input
              onChangeText={text => this.setState({ description: text })}
              value={this.state.description}
            />
          </Item>
        </Form>
        <Button
          block
          style={{ margin: 15, marginTop: 50 }}
          onPress={this.confirmEdit}
        >
          <Text>Xác nhận</Text>
        </Button>
      </View>
    );
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Thông tin sách</Title>
          </Body>
          <Right>
            <Button transparent onPress = {this.deleteBook}>
              <Icon active name="trash" />
            </Button>
          </Right>
        </Header>

        <Content padder>
          <Button transparent onPress={this.clickEdit}>
            <Text>Chỉnh sửa sách </Text>
            <Icon active name="md-create" />
          </Button>
          {editForm}
        </Content>
      </Container>
    );
  }
}
