import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'
import orderBy from 'lodash/orderBy'
import AppBar from 'material-ui/AppBar'

import FontIcon from 'material-ui/FontIcon'
import ActionFlightTakeoff from 'material-ui/svg-icons/action/flight-takeoff'

import SwipeableViews from 'react-swipeable-views'
import { Tabs, Tab } from 'material-ui/Tabs'

import './App.css'
import Form from './Form'
import Table from './Table'
import FullProductTable from './FullProductTable'

import { GridList, GridTile } from 'material-ui/GridList'
import IconButton from 'material-ui/IconButton'
import Subheader from 'material-ui/Subheader'
import StarBorder from 'material-ui/svg-icons/toggle/star-border'
import AddShoppingCart from 'material-ui/svg-icons/action/add-shopping-cart'

import FlatButton from 'material-ui/FlatButton'

import Web3 from 'web3'
import CardExampleWithAvatar from './CardStruct'


injectTapEventPlugin()

const invertDirection = {
  asc: 'desc',
  desc: 'asc'
}

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400
  },
  slide: {
    padding: 10
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around'
  },
  gridList: {
    width: 500,
    height: 450,
    overflowY: 'auto'
  }
}

const tilesData = [
  {
    name: 'Sample Product 1',
    price: 1.00,
    owner: '0x1AEd9c01826A28D28260da83E3114e5B54Beb6eF'
  },
  {
    name: 'Sample Product 2',
    price: 2.43,
    owner: '0x1AEd9c01826A28D28260da83E3114e5B54Beb6eF'
  },
  {
    name: 'Sample Product 3',
    price: 1.00,
    owner: '0xcf55eF384cBC2FeD28f69cbbaE8f2703FEfC826F'
  },
  {
    name: 'Sample Product 4',
    price: 1.00,
    owner: '0xcf55eF384cBC2FeD28f69cbbaE8f2703FEfC826F'
  },
  {
    name: 'Sample Product 5',
    price: 1.00,
    owner: '0x4b2d0ABb480633C611eBaedD0Da40e3E311d52AF'
  },
  {
    name: 'Sample Product 6',
    price: 1.00,
    owner: '0xE4F8Ab85706fd8f42928737e4Ac9569a491dc85E'
  },
  {
    name: 'Sample Product 7',
    price: 1.00,
    owner: '0x4b2d0ABb480633C611eBaedD0Da40e3E311d52AF'
  },
  {
    name: 'Sample Product 8',
    price: 1.00,
    owner: '0xcf55eF384cBC2FeD28f69cbbaE8f2703FEfC826F'
  },
  {
    name: 'Sample Product 9',
    price: 1.00,
    owner: '0xE4F8Ab85706fd8f42928737e4Ac9569a491dc85E'
  },
  {
    name: 'Sample Product 10',
    price: 1.00,
    owner: '0xcf55eF384cBC2FeD28f69cbbaE8f2703FEfC826F'
  }
]

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      slideIndex: 0,
      productids: [],
      names: [],
      descriptions: [],
      prices: [],
      stocks: [],
      inputName: '',
      inputDescription:'',
      inputPrice:'',
      inputStock:''
    }

    if (typeof this.web3 !== 'undefined') {
      console.log('Using web3 detected from external source like Metamask')
      this.web3 = new Web3(this.web3.currentProvider)
    } else {
      console.log("No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask")
      this.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
    }

    var productContractABI = [
      {
        'constant': true,
        'inputs': [
          {
            'name': '',
            'type': 'uint256'
          }
        ],
        'name': 'productToOwner',
        'outputs': [
          {
            'name': '',
            'type': 'address'
          }
        ],
        'payable': false,
        'stateMutability': 'view',
        'type': 'function'
      },
      {
        'constant': true,
        'inputs': [
          {
            'name': '',
            'type': 'uint256'
          }
        ],
        'name': 'products',
        'outputs': [
          {
            'name': 'productId',
            'type': 'address'
          },
          {
            'name': 'name',
            'type': 'bytes32'
          },
          {
            'name': 'description',
            'type': 'bytes32'
          },
          {
            'name': 'price',
            'type': 'uint16'
          },
          {
            'name': 'stock',
            'type': 'uint16'
          }
        ],
        'payable': false,
        'stateMutability': 'view',
        'type': 'function'
      },
      {
        'constant': true,
        'inputs': [],
        'name': 'owner',
        'outputs': [
          {
            'name': '',
            'type': 'address'
          }
        ],
        'payable': false,
        'stateMutability': 'view',
        'type': 'function'
      },
      {
        'constant': true,
        'inputs': [],
        'name': 'getProducts',
        'outputs': [
          {
            'name': '',
            'type': 'address[]'
          },
          {
            'name': '',
            'type': 'bytes32[]'
          },
          {
            'name': '',
            'type': 'bytes32[]'
          },
          {
            'name': '',
            'type': 'uint16[]'
          },
          {
            'name': '',
            'type': 'uint16[]'
          }
        ],
        'payable': false,
        'stateMutability': 'view',
        'type': 'function'
      },
      {
        'constant': true,
        'inputs': [
          {
            'name': '_owner',
            'type': 'address'
          }
        ],
        'name': 'getProductByOwner',
        'outputs': [
          {
            'name': '',
            'type': 'uint256[]'
          }
        ],
        'payable': false,
        'stateMutability': 'view',
        'type': 'function'
      },
      {
        'constant': false,
        'inputs': [
          {
            'name': '_name',
            'type': 'bytes32'
          },
          {
            'name': '_description',
            'type': 'bytes32'
          },
          {
            'name': '_price',
            'type': 'uint16'
          },
          {
            'name': '_stock',
            'type': 'uint16'
          }
        ],
        'name': 'createProduct',
        'outputs': [],
        'payable': false,
        'stateMutability': 'nonpayable',
        'type': 'function'
      },
      {
        'constant': false,
        'inputs': [
          {
            'name': 'newOwner',
            'type': 'address'
          }
        ],
        'name': 'transferOwnership',
        'outputs': [],
        'payable': false,
        'stateMutability': 'nonpayable',
        'type': 'function'
      },
      {
        'anonymous': false,
        'inputs': [
          {
            'indexed': false,
            'name': 'productId',
            'type': 'address'
          },
          {
            'indexed': false,
            'name': 'name',
            'type': 'bytes32'
          },
          {
            'indexed': false,
            'name': 'description',
            'type': 'bytes32'
          },
          {
            'indexed': false,
            'name': 'stock',
            'type': 'uint16'
          },
          {
            'indexed': false,
            'name': 'price',
            'type': 'uint16'
          }
        ],
        'name': 'NewProduct',
        'type': 'event'
      },
      {
        'anonymous': false,
        'inputs': [
          {
            'indexed': true,
            'name': 'previousOwner',
            'type': 'address'
          },
          {
            'indexed': true,
            'name': 'newOwner',
            'type': 'address'
          }
        ],
        'name': 'OwnershipTransferred',
        'type': 'event'
      }
    ]
    this.state.productContract = this.web3.eth.contract(productContractABI).at('0x4c058f01ff1db94a0c0146906f555127f3bdedcd')

    window.a = this.state
  }

  componentWillMount () {
    var data = this.state.productContract.getProducts()

    console.log(data)
    this.setState({
      productids: (String(data[0])),
      names: String(data[1]).split(','),
      descriptions: String(data[2]).split(','),
      prices: String(data[3]).split(','),
      stocks: String(data[4]).split(','),
      inputName: '',
      inputDescription:'',
      inputPrice:'',
      inputStock:''
    })
  }

  handleChange = (value) => {
    this.setState({
      slideIndex: value
    })
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
    const tableData = [{
      productids: String(this.state.productids)
    }]

    return (
      <MuiThemeProvider >
        <div className='App'>
          <AppBar
            iconElementLeft={<img style={{ marginTop: 10, height: '75px', width: '150px' }} src={require('./bizzarlogo.png')}/>}
            style={{ color: 'cyan900' }}
            title={'Wallet: ' + this.web3.eth.accounts[0]}
          />
          {/* Tab add  */}
          <div>
            <Tabs
              onChange={this.handleChange}
              value={this.state.slideIndex}
            >
              <Tab label='About' value={0} />
              <Tab label='Buy' value={1} />
              <Tab label='Sell' value={2} />
            </Tabs>
            <SwipeableViews
              index={this.state.slideIndex}
              onChangeIndex={this.handleChange}
            >
              <div>
                <h2 style={styles.headline}>  </h2>
                <br/>
                <h2>
                My final year project looks took make it easy for manufacturers to post products and passively
                receive income. Retailers can easily post these products without the need for complicated
                ecommerce software or a development team. Consumers can quickly and easily purchase products
                using cryptocurrencies. The goal is to create a more dynamic, free and open market place.
                </h2>
                <br />
                <br />
                <br />
                <h2>
                  The buy page shows products posted by all sellers which are available for purchase.
                </h2>
                <br />
                <br />
                <br />
                <h2>
                  The sell page allows users to post products to be sold and displayed on the buy page.
                </h2>
              </div>
              <div style={styles.slide}>
                <h2>Buy products securely with privacy in mind.</h2>
                <div style={styles.root}>
                  {/* <GridList
                    cols ={3}
                    cellHeight={'auto'}
                    width={'auto'}
                    style={styles.gridList}
                    padding={50}
                  > */}
                  {/* {tilesData.map((tile) => (
                    <GridTile
                      key={tile.img}
                      title={tile.title}
                      subtitle={<span>Price: $ <b>{tile.price}</b> Sold by <b>{tile.author}</b></span>}
                      actionIcon={<IconButton><AddShoppingCart color='white' /></IconButton>}
                  >
                      <img src={tile.img} />
                    </GridTile>
                  ))} */}
                  {tilesData.map((card) => (
                    <CardExampleWithAvatar
                      name={card.name}
                      price={card.price}
                      owner={card.owner}
                    />

                  ))}
                  {/* </GridList> */}
                </div>
              </div>
              <div style={styles.slide}>
                <h2>Sell and manage your inventory in a transparent manner.</h2>
                <FullProductTable />
              </div>
            </SwipeableViews>
          </div>
          {/* Tab add */}
        </div>
      </MuiThemeProvider>
    )
  }
}

export default App
