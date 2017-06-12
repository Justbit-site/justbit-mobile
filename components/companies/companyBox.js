import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default class CompanyBox extends React.Component {
  render() {
    const { image, name, likes, comments } = this.props.company;
    return (
      <View style={styles.companyBox}>
        <Image style={styles.image} source={{ uri: image}} />
        <View style={styles.info}>
          <Text style={styles.name}>{name}</Text>
          <View style={styles.row}>
            <View style={styles.iconContainer}>
              <Ionicons name="md-heart" size={30} color="#ccc" />
              <Text style={styles.count}>{likes}</Text>
            </View>
            <View style={styles.iconContainer}>
              <Ionicons name="md-chatboxes" size={30} color="#ccc" />
              <Text style={styles.count}>{comments}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  companyBox: {
    margin: 5,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    // Shadow in iOs
    shadowColor: '#000000',
    shadowOpacity: .2,
    shadowOffset: {
      height: 1,
      width: -2
    },
    // Shadow in android
    elevation: 2
  },
  image: {
    height: 150,
    width: 150
  },
  info: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  name: {
    fontSize: 20
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 50,
    marginTop: 15
  },
  iconContainer: {
    flex: 1,
    alignItems: 'center'
  },
  count: {
    color: '#ccc'
  }
});