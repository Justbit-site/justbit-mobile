import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity
} from 'react-native';
import Ripple from 'react-native-material-ripple';
import { FontAwesome } from '@expo/vector-icons';

import CompanyBox from '../components/companies/companyBox';
import CommentList from '../components/companies/commentList';
import { firebaseDatabase } from '../config/firebase';
import { randomId } from '../helpers/randomId';

export default class companyDetails extends React.Component {
  static route = {
    navigationBar: {
      title(params) {
        return `${params.company.name}`;
      },
    },
  }

  state = {
    comments: []
  }

  handleSend = () => {
    const { text } = this.state
    const companyCommentsRef = this.getCompanyCommentsRef()
    var newCommentRef = companyCommentsRef.push()
    newCommentRef.set({ text });
    this.setState({ text: '' })
  }

  getCompanyCommentsRef = () => {
    const { id } = this.props.company
    return firebaseDatabase.ref(`comments/${id}`)
  }

  handleChangeText = (text) => this.setState({text})

  componentDidMount() {
    this.getCompanyCommentsRef().on('child_added', this.addComment)
  }

  addComment = (data) => {
    const comment = data.val()
    this.setState({
      comments: this.state.comments.concat(comment)
    })
  }

  componentWillUnmount() {
    this.getCompanyCommentsRef().off('child_added', this.addComment)
  }

  render() {
    const company = this.props.route.params.company
    const { comments } = this.state
    return (
      <View style={styles.container}>
        <View style={styles.companyBox}>
          <CompanyBox company={company}/>
        </View>
          <CommentList comments={comments} />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={this.state.text}
            placeholder="Opina sobre este artista"
            onChangeText={this.handleChangeText}
          />
          <TouchableOpacity onPress={this.handleSend}>
            <FontAwesome name="send" size={30} color="gray" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eeeeee'
  },
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
  header: {
    fontSize: 20,
    paddingHorizontal: 15,
    marginVertical: 10
  },
  inputContainer: {
    height: 50,
    backgroundColor: 'white',
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  input: {
    height: 50,
    flex: 1
  }
});
