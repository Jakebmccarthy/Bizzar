import React from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import Web3 from 'web3'
import _ from 'lodash'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table'

export default class Form extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      productids: [],
      names: [],
      descriptions: [],
      prices: [],
      owners: [],
      productId: '',
      name: '',
      nameError: '',
      description: '',
      descriptionError: '',
      price: '',
      priceError: '',
      owner: '',
      ownerError: ''
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
            'name': '_productId',
            'type': 'uint256'
          }
        ],
        'name': 'isOwnerOfAsset',
        'outputs': [
          {
            'name': '',
            'type': 'bool'
          }
        ],
        'payable': false,
        'stateMutability': 'view',
        'type': 'function'
      },
      {
        'constant': false,
        'inputs': [],
        'name': 'withdraw',
        'outputs': [],
        'payable': false,
        'stateMutability': 'nonpayable',
        'type': 'function'
      },
      {
        'constant': true,
        'inputs': [],
        'name': 'getProductCount',
        'outputs': [
          {
            'name': '',
            'type': 'uint256'
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
            'name': 'owner',
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
            'type': 'uint256'
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
            'type': 'uint256'
          }
        ],
        'name': 'addProduct',
        'outputs': [
          {
            'name': '',
            'type': 'uint256'
          }
        ],
        'payable': false,
        'stateMutability': 'nonpayable',
        'type': 'function'
      },
      {
        'constant': false,
        'inputs': [
          {
            'name': '_productId',
            'type': 'uint256'
          }
        ],
        'name': 'buyProduct',
        'outputs': [],
        'payable': true,
        'stateMutability': 'payable',
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
        'name': 'getTxFee',
        'outputs': [
          {
            'name': '',
            'type': 'uint256'
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
            'name': '_productId',
            'type': 'uint256'
          },
          {
            'name': '_newPrice',
            'type': 'uint256'
          }
        ],
        'name': 'changePrice',
        'outputs': [],
        'payable': false,
        'stateMutability': 'nonpayable',
        'type': 'function'
      },
      {
        'constant': true,
        'inputs': [],
        'name': 'getProducts',
        'outputs': [
          {
            'name': '',
            'type': 'uint256[]'
          },
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
            'type': 'uint256[]'
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
            'name': '_productId',
            'type': 'uint256'
          }
        ],
        'name': 'getOwner',
        'outputs': [
          {
            'name': '',
            'type': 'address'
          },
          {
            'name': '',
            'type': 'bytes32'
          },
          {
            'name': '',
            'type': 'bytes32'
          },
          {
            'name': '',
            'type': 'uint256'
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
            'name': '_productId',
            'type': 'uint256'
          },
          {
            'name': '_newName',
            'type': 'bytes32'
          }
        ],
        'name': 'changeName',
        'outputs': [],
        'payable': false,
        'stateMutability': 'nonpayable',
        'type': 'function'
      },
      {
        'constant': false,
        'inputs': [
          {
            'name': '_productId',
            'type': 'uint256'
          },
          {
            'name': '_newDescription',
            'type': 'bytes32'
          }
        ],
        'name': 'changeDescription',
        'outputs': [],
        'payable': false,
        'stateMutability': 'nonpayable',
        'type': 'function'
      },
      {
        'constant': false,
        'inputs': [
          {
            'name': '_fee',
            'type': 'uint256'
          }
        ],
        'name': 'setTxFee',
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
            'type': 'uint256'
          },
          {
            'indexed': false,
            'name': 'owner',
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
            'name': 'price',
            'type': 'uint256'
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

    this.state.productContract = this.web3.eth.contract(productContractABI).at('0x077accabf5ffb545f3c86662f5cb6fea480b8f4d')

    window.a = this.state
  }

  componentWillMount () {
    var data = this.state.productContract.getProducts()

    console.log(data)
    this.setState({
      productids: String(data[0]).split(','),
      owners: String(data[1]).split(','),
      names: String(data[2]).split(','),
      descriptions: String(data[3]).split(','),
      prices: String(data[4]).split(','),
      productId: '',
      name: '',
      nameError: '',
      description: '',
      descriptionError: '',
      price: '',
      priceError: '',
      owner: '',
      ownerError: ''
    })
  }

  change = e => {
    // this.props.onChange({ [e.target.name]: e.target.value });
    this.setState({
      [e.target.name]: e.target.value
    })
  };

  validate = () => {
    let isError = false
    const errors = {
      nameError: '',
      descriptionError: '',
      priceError: '',
      ownerError: ''
    }

    if (this.state.name.length < 2) {
      isError = true
      errors.nameError = 'Length of at least 2 characters'
    }

    if (this.state.description.length < 5) {
      isError = true
      errors.descriptionError = 'Length of at least 5 characters'
    }

    if (isNaN(Number(String(this.state.price))) || this.state.price.length < 1) {
      isError = true
      errors.priceError = 'Price needs to be number'
    }

    this.setState({
      ...this.state,
      ...errors
    })

    return isError
  };

  onSubmit = e => {
    e.preventDefault()
    const err = this.validate()
    if (!err) {
      this.state.productContract.addProduct.sendTransaction(this.state.name, this.state.description, this.state.price, { from: this.web3.eth.accounts[0], gas:2000000 })
      this.props.onSubmit(this.state)
      // clear form
      this.setState({
        name: '',
        nameError: '',
        description: '',
        descriptionError: '',
        price: '',
        priceError: '',
        owner: '',
        ownerError: ''
      })
    }
  };

  render () {
    const TableRows = _.map(this.state.productids, (value, index) => {
      return <TableRow>
        <TableRowColumn>{this.web3.toDecimal(this.state.productids[index])}</TableRowColumn>
        <TableRowColumn>{this.web3.toUtf8(this.state.names[index])}</TableRowColumn>
        <TableRowColumn>{this.web3.toUtf8(this.state.descriptions[index])}</TableRowColumn>
        <TableRowColumn>{(this.web3.toDecimal(this.state.prices[index])) }</TableRowColumn>
        <TableRowColumn>{this.state.owners[index]}</TableRowColumn>
        <TableRowColumn>
          <RaisedButton label='Buy' onClick={() => this.state.productContract.buyProduct.sendTransaction(this.state.productids[index], { from: this.web3.eth.accounts[1], value:this.state.prices[index], gas:2000000 })} primary />
        </TableRowColumn>
      </TableRow>
    })
    return (
      <div>
        <form>
          <TextField
            name='name'
            hintText='Product name'
            floatingLabelText='Product name'
            value={this.state.name}
            onChange={e => this.change(e)}
            errorText={this.state.nameError}
            floatingLabelFixed
          />
          <br />
          <TextField
            name='description'
            hintText='Description'
            floatingLabelText='Description'
            value={this.state.description}
            onChange={e => this.change(e)}
            errorText={this.state.descriptionError}
            floatingLabelFixed
          />
          <br />
          <TextField
            name='price'
            hintText='Price'
            floatingLabelText='Price'
            value={this.state.price}
            onChange={e => this.change(e)}
            errorText={this.state.priceError}
            floatingLabelFixed
          />
          <br />
          <RaisedButton label='Submit' onClick={e => this.onSubmit(e)} primary />
        </form>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>Product Id </TableHeaderColumn>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn>Description</TableHeaderColumn>
              <TableHeaderColumn>Price</TableHeaderColumn>
              <TableHeaderColumn>Owner</TableHeaderColumn>
              <TableHeaderColumn></TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            {TableRows}
          </TableBody>
        </Table>
      </div>
    )
  }
}
