import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Ripple from 'react-native-material-ripple';

import { firebaseDatabase } from '../../config/firebase';
import { randomId } from '../../helpers/randomId';

export default class CompanyBox extends React.Component {
  constructor(props){
    super(props)
    state = {
      liked: false,
      likeCount: 0,
      uid: randomId()
    }
  }

  componentWillMount(){
    this.getCompanyRef().on('value', snapshot => {
      const company =  snapshot.val()
      if (company) {
        this.setState({
          likeCount: company.likeCount,
          liked: company.likes && company.likes[this.state.uid]
        })
      }
    })
  }

  handlePress = () => {
    this.toggleLike(this.getCompanyRef(), this.state.liked, uuid)
  }

  getCompanyRef = () => {
    const { id } = this.props.company
    return firebaseDatabase.ref(`company/${id}`)
  }

  toggleLike = (companyRef, liked, uid) => {
    companyRef.transaction(function(company) {
      if (company) {
        if (company.likes && company.likes[uid]) {
          company.likeCount--;
          company.likes[uid] = null;
        } else {
          company.likeCount++;
          if (!company.likes) {
            company.likes = {};
          }
          company.likes[uid] = true;
        }
      }
      return company || {
        likeCount: 1,
        likes: {
          [uid]: true
        }
      };
    });
  }

  render() {
    const { image, name, likes, comments } = this.props.company;
    const { likeCount } = this.state

    return (
        <View style={styles.container}>
          <Image style={styles.image} source={{ uri: image}} />
          <View style={styles.info}>
            <Text style={styles.name}>{name}</Text>
            <View style={styles.row}>
              <View style={styles.iconContainer}>
                <Ripple
                    style={styles.rippleIcons}
                    onPress={this.handlePress}>
                  <Ionicons name="md-heart" size={30} color={this.state.liked ? '#e74c3c' : '#ecf0f1'} />
                </Ripple>
                <Text style={styles.count}>{likeCount}</Text>
              </View>
              <View style={styles.iconContainer}>
                <Ripple style={styles.rippleIcons}>
                  <Ionicons name="md-chatboxes" size={30} color="#ccc" />
                </Ripple>
                <Text style={styles.count}>{comments}</Text>
              </View>
            </View>
          </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row'
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
    marginTop: 8
  },
  iconContainer: {
    flex: 1,
    alignItems: 'center'
  },
  count: {
    color: '#ccc'
  },
  rippleIcons: {
    padding: 8,
    marginBottom: 2
  }
});
