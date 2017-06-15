import React from 'react';

import CompanyList from '../components/companies/CompanyList';
import { getCompanies } from '../api/getCompanies'

export default class Companies extends React.Component {
  state = {
    companies: []
  }

  componentDidMount(){
    getCompanies()
      .then(data => this.setState({
        companies: data
      }))
  }

  static route = {
    navigationBar: {
      title: 'Aliados estrategicos'
    },
  }

  render() {
    const companies = this.state.companies
    return (
      <CompanyList navigator={this.props.navigator} companies={companies} />
    );
  }
}

/*
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgray',
    paddingTop: Platform.select({
      ios: 30,
      android: 10
    }),
  },
});
*/
