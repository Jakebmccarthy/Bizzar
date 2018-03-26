pragma solidity ^0.4.18;

import "./ownable.sol";
import "./safemath.sol";

/**
 * @title ProductFactory
 * @author Jake McCarthy
 * @dev TODO write getter to return all products
 *          write getter to return all products by owner 
 */
 

contract ProductFactory is Ownable {
    
    using SafeMath for uint;
    using SafeMath16 for uint16;
    
    event NewProduct(address productId, bytes32 name, bytes32 description, uint16 stock, uint16 price);
    
    struct Product {
        address productId;
        bytes32 name;
        bytes32 description;
        uint16 price;
        uint16 stock;
    }
    
    Product[] public products;
    
    mapping (uint => address) public productToOwner;
    mapping (address => uint) ownerProductCount;
    
    function createProduct(bytes32 _name, bytes32 _description, uint16 _price, uint16 _stock) public {
        address productId = msg.sender;
        uint id = products.push(Product(productId, _name, _description, _price, _stock));
        productToOwner[id] = msg.sender;
        ownerProductCount[msg.sender] = ownerProductCount[msg.sender].add(1);
        NewProduct(productId, _name, _description, _stock, _price);
    }
    
    function getProducts() external view returns (address[], bytes32[], bytes32[], uint16[], uint16[]) {

		uint length = products.length;

        address[]  memory ids = new address[](length);
		bytes32[] memory names = new bytes32[](length);
		bytes32[] memory descriptions = new bytes32[](length);
		uint16[] memory prices = new uint16[](length);
        uint16[] memory stocks = new uint16[](length);

		for (uint i = 0; i < products.length; i++) {
			Product memory currentProduct;
			currentProduct = products[i];

            ids[i] = currentProduct.productId;
			names[i] = currentProduct.name;
			descriptions[i] = currentProduct.description;
			prices[i] = currentProduct.price;
			stocks[i] = currentProduct.stock;

		}

	return (ids, names, descriptions, prices, stocks);
    }

    function getProductByOwner(address _owner) external view returns(uint[]) {
        uint[] memory result = new uint[](ownerProductCount[_owner]);
        uint counter = 0;
        for(uint i = 0; i < products.length; i++) {
            if(productToOwner[i] == _owner) {
                result[counter] = i;
                counter++;
            }
        }
        return result;
    }

    
      
}