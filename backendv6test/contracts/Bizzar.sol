pragma solidity ^0.4.18;


 contract Ownable {
  address public owner;


  event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);


  /**
   * @dev The Ownable constructor sets the original `owner` of the contract to the sender
   * account.
   */
  function Ownable() public {
    owner = msg.sender;
  }

  /**
   * @dev Throws if called by any account other than the owner.
   */
  modifier onlyOwner() {
    require(msg.sender == owner);
    _;
  }

  /**
   * @dev Allows the current owner to transfer control of the contract to a newOwner.
   * @param newOwner The address to transfer ownership to.
   */
  function transferOwnership(address newOwner) public onlyOwner {
    require(newOwner != address(0));
    OwnershipTransferred(owner, newOwner);
    owner = newOwner;
  }
 }
 
 /**
 * @title Bizzar
 * @author Jake McCarthy
 * @notice simple dsitributed marketplace concept
 */

contract Bizzar is Ownable {
    
    struct  Product {
        address owner;
        bytes32 name;
        bytes32 description;
        uint price;
    }
    
    event NewProduct(uint productId, address owner,bytes32 name, bytes32 description, uint price);
    
    Product[] public products;

    //@dev add a Product
    function addProduct(bytes32 _name, bytes32 _description, uint _price) public returns(uint) {
        products.length++;
        products[products.length-1].owner = msg.sender;
        products[products.length-1].name = _name;
        products[products.length-1].description = _description;
        products[products.length-1].price = _price;
        return products.length;
        NewProduct(products.length, owner,_name, _description, _price);
    }

    //@dev get total number of products
    function getProductCount() public constant returns(uint) {
        return products.length;
    }
    
    //@dev get a specific owners info via thier id
    function getOwner(uint _productId) external view returns(address, bytes32, bytes32, uint) {
        return (products[_productId].owner, products[_productId].name, products[_productId].description, products[_productId].price);
    }
    
    //@dev get all products details
    function getProducts() external view returns (uint[], address[], bytes32[], bytes32[], uint[]) {
		uint length = products.length;
        uint[] memory productIds = new uint[](length);
        address[]  memory owners = new address[](length);
		bytes32[] memory names = new bytes32[](length);
		bytes32[] memory descriptions = new bytes32[](length);
		uint[] memory prices = new uint[](length);

		for (uint _productId = 0; _productId < products.length; _productId++) {
			Product memory currentUser;
			currentUser = products[_productId];
            productIds[_productId] = _productId;
            owners[_productId] = currentUser.owner;
			names[_productId] = currentUser.name;
			descriptions[_productId] = currentUser.description;
			prices[_productId] = currentUser.price;
		}
	return (productIds, owners, names, descriptions, prices);
    }
    
    //@dev check via id if msg.sender is owner 
    function isOwnerOfAsset(uint _productId) public constant returns(bool) {
        return products[_productId].owner == msg.sender? true:false;
    }
    
    //@dev allow msg.sender to change name if theyre owner 
    function changeName(uint _productId, bytes32 _newName) external {
        require(products[_productId].owner == msg.sender);
        products[_productId].name = _newName;
    }
    
     //@dev allow msg.sender to change description if theyre owner 
    function changeDescription(uint _productId, bytes32 _newDescription) external {
        require(products[_productId].owner == msg.sender);
        products[_productId].description = _newDescription;
    }
    
     //@dev allow msg.sender to change description if theyre owner 
    function changePrice(uint _productId, uint _newPrice) external {
        require(products[_productId].owner == msg.sender);
        products[_productId].price = _newPrice;
    }
    
    //@dev transfer ownership if the user meets set buy price and pays txfee
    function buyProduct(uint _productId) public payable {
        require(msg.value >= products[_productId].price );
        products[_productId].owner.transfer(msg.value-txFee);
        products[_productId].price = (msg.value);
        products[_productId].owner = msg.sender; 
    }
    
    //@dev current txFee
    uint txFee = 1 wei;
    
    //@dev get a specific owners info via thier id
    function getTxFee() external view returns(uint) {
        return (txFee);
    }
    
    //@dev show txFee
    function setTxFee(uint _fee) external onlyOwner {
    txFee = _fee;
  }
    
    //@dev allow contractowner to empty contract off txfees
    function withdraw() external onlyOwner {
    owner.transfer(this.balance);
  }
}