import React from 'react';
import {
  StyleSheet,
  View,
  ListView,
} from 'react-native';
import {
  createRouter
} from '@expo/ex-navigation';
import Ripple from 'react-native-material-ripple';

import Router from '../../navigation/Router';
import CompanyBox from './companyBox';
import CompanyDetails from '../../screens/CompanyDetails';

export default class CompanyList extends React.Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => { r1 !== r2     }})
    this.state = {
      dataSource: ds
    }
  }

  componentDidMount(){
    this.updateDataSource(this.props.companies)
  }

  componentWillReceiveProps(newProps){
    if(newProps.companies !== this.props.companies){
      this.updateDataSource(newProps.companies)
    }
  }

  updateDataSource = data => {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(data)
    })
  }

  static route = {
    navigationBar: {
      title: 'Aliados estrategicos'
    },
  };

  handlePress(company){
    this.props.navigator.push(Router.getRoute('companyDetails', {company}));
  }

  render() {
    return (
      <ListView
        enableEmptySections={true}
        style={styles.container}
        dataSource={this.state.dataSource}
        renderRow={(company) => {
          return(
            <Ripple style={styles.companyBox}
            onPress={() => this.handlePress(company)}>
              <CompanyBox company={company}/>
            </Ripple>
          )
        }} />
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
});
