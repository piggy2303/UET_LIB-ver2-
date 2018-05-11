import React, { Component } from "react";
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

export default class Item extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Card>
        <CardItem header bordered>
          <Text>Tên sách: {this.props.name}</Text>
        </CardItem>
        <CardItem bordered>
          <Body>
            <Text>{this.props.description.slice(0, 40)} ...</Text>
          </Body>
        </CardItem>
        <CardItem footer bordered>
          <Text>số lượng: {this.props.quantity}</Text>
        </CardItem>
      </Card>
    );
  }
}
