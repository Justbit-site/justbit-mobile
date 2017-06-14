import React from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import Ripple from 'react-native-material-ripple';

import CompanyBox from '../components/companies/companyBox';

export default class companyDetails extends React.Component {
  static route = {
    navigationBar: {
      title(params) {
        return `${params.company.name}`;
      },
    },
  }

  render() {
    const company = this.props.route.params.company
    return (
      <View style={styles.container}>
        <View style={styles.companyBox}>
          <CompanyBox company={company}/>
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
});
