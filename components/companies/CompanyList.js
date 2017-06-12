import React from 'react';
import {
  StyleSheet,
  View,
  ListView
} from 'react-native';

import CompanyBox from './companyBox';

export default class CompanyList extends React.Component {

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => {
      r1 !== r2
    }})
    const company = {
      image: 'https://www.justbit.site/wp-content/uploads/2015/12/iMac-Mockup_Sumit-2.jpg',
      name: 'Justbit',
      likes: 200,
      comments: 140
    }
    const companies = Array(500).fill(company)
    this.state = {
      dataSource: ds.cloneWithRows(companies)
    }
  }

  static route = {
    navigationBar: {
      title: 'Aliados estrategicos'
    },
  };

  render() {
    return (
      <ListView
        style={styles.container}
        dataSource={this.state.dataSource}
        renderRow={(company) => <CompanyBox company={company}/> } />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eeeeee'
  }
});
