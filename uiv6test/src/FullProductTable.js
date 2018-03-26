import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'
import orderBy from 'lodash/orderBy'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import TextField from 'material-ui/TextField'

import Web3 from 'web3'
import _ from 'lodash'

import './App.css'
import Form from './Form'
import Table from './Table'



const invertDirection = {
  asc: 'desc',
  desc: 'asc'
}

export default class FullProductTable extends React.Component {
  
  state = {
    data: [
      {
        productId:'0',
        name: 'Sample Product 1',
        description: 'Description 1',
        price: '123',
        owner: '0x1AEd9c01826A28D28260da83E3114e5B54Beb6eF'
      },
      {
        productId:'1',
        name: 'Sample Product 2',
        description: 'Description 2',
        price: '423',
        owner: '0x1AEd9c01826A28D28260da83E3114e5B54Beb6eF'
      },
      {
        productId:'2',
        name: 'Sample Product 3',
        description: 'Description 3',
        price: '543',
        owner: '0xcf55eF384cBC2FeD28f69cbbaE8f2703FEfC826F'
      },
      {
        productId:'3',
        name: 'Sample Product 4',
        description: 'Description 4',
        price: '54',
        owner: '0x4b2d0ABb480633C611eBaedD0Da40e3E311d52AF'
      },
      {
        productId:'4',
        name: 'Sample Product 5',
        description: 'Description 5',
        price: '54',
        owner: '0xE4F8Ab85706fd8f42928737e4Ac9569a491dc85E'
      },
      {
        productId:'5',
        name: 'Sample Product 6',
        description: 'Description 6',
        price: '54',
        owner: '0x4b2d0ABb480633C611eBaedD0Da40e3E311d52AF'
      },
      {
        productId:'6',
        name: 'Sample Product 7',
        description: 'Description 7',
        price: '2',
        owner: '0xcf55eF384cBC2FeD28f69cbbaE8f2703FEfC826F'
      },
      {
        productId:'7',
        name: 'Sample Product 8',
        description: 'Description 8',
        price: '54',
        owner: '0xE4F8Ab85706fd8f42928737e4Ac9569a491dc85E'
      },
      {
        productId:'8',
        name: 'Sample Product 9',
        description: 'Description 9',
        price: '45',
        owner: '0xcf55eF384cBC2FeD28f69cbbaE8f2703FEfC826F'
      },
      {
        productId:'9',
        name: 'Sample Product 10',
        description: 'Description 10',
        price: '43',
        owner: '0xcf55eF384cBC2FeD28f69cbbaE8f2703FEfC826F'
      }
    ],
    editIdx: -1,
    columnToSort: '',
    sortDirection: 'desc',
    query: '',
    columnToQuery: 'name'
  };

  handleRemove = i => {
    this.setState(state => ({
      data: state.data.filter((row, j) => j !== i)
    }))
  };

  startEditing = i => {
    this.setState({ editIdx: i })
  };

  stopEditing = () => {
    this.setState({ editIdx: -1 })
  };

  handleSave = (i, x) => {
    this.setState(state => ({
      data: state.data.map((row, j) => (j === i ? x : row))
    }))
    this.stopEditing()
  };

  handleSort = columnName => {
    this.setState(state => ({
      columnToSort: columnName,
      sortDirection:
        state.columnToSort === columnName
          ? invertDirection[state.sortDirection]
          : 'asc'
    }))
  };

  render () {
    const lowerCaseQuery = this.state.query.toLowerCase()
    return (
      <MuiThemeProvider>
        <div className='App'>
          <Form
            onSubmit={submission =>
              this.setState({
                data: [...this.state.data, submission]
              })
            }
          />
          <div style={{ display: 'flex' }}>
            <div style={{ display: 'flex', margin: 'auto' }}>
              <TextField
                hintText='Query'
                floatingLabelText='Query'
                value={this.state.query}
                onChange={e => this.setState({ query: e.target.value })}
                floatingLabelFixed
              />
              <SelectField
                style={{ marginLeft: '1em' }}
                floatingLabelText='Select a column'
                value={this.state.columnToQuery}
                onChange={(event, index, value) =>
                  this.setState({ columnToQuery: value })
                }
              >
                <MenuItem value='productId' primaryText='productId' />
                <MenuItem value='name' primaryText='Name' />
                <MenuItem value='description' primaryText='Description' />
                <MenuItem value='price' primaryText='Price' />
                <MenuItem value='owner' primaryText='owner' />
              </SelectField>
            </div>
          </div>
          <div style={{ width: '50%' }, { display: 'inline-block' }}>
            <Table
              handleSort={this.handleSort}
              handleRemove={this.handleRemove}
              startEditing={this.startEditing}
              editIdx={this.state.editIdx}
              stopEditing={this.stopEditing}
              handleSave={this.handleSave}
              columnToSort={this.state.columnToSort}
              sortDirection={this.state.sortDirection}
              data={orderBy(
                this.state.query
                  ? this.state.data.filter(x =>
                    x[this.state.columnToQuery]
                      .toLowerCase()
                      .includes(lowerCaseQuery)
                  )
                  : this.state.data,
                this.state.columnToSort,
                this.state.sortDirection
              )}
              header={[
                {
                  name: 'product ID',
                  prop: 'productId'
                },
                {
                  name: 'Name',
                  prop: 'name'
                },
                {
                  name: 'Description',
                  prop: 'description'
                },
                {
                  name: 'Price',
                  prop: 'price'
                },
                {
                  name:'owner',
                  prop:'owner'
                }
              ]}
            />
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}
