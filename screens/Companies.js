import React from 'react';

import CompanyList from '../components/companies/CompanyList';

export default class Companies extends React.Component {
  static route = {
    navigationBar: {
      title: 'Aliados estrategicos'
    },
  }

  render() {
    return (
      <CompanyList />
    );
  }
}
