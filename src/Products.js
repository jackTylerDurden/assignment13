import React, { Component } from 'react'
import Filters from './Filters'
import ProductTable from './ProductTable'
import ProductForm from './ProductForm'
import { throwStatement } from '@babel/types'
/*import { DH_CHECK_P_NOT_SAFE_PRIME } from 'constants'
let PRODUCTS = {
    '1': {id: 1, category: 'Music', price: '$459.99', name: 'Clarinet'},
    '2': {id: 2, category: 'Music', price: '$5,000', name: 'Cello'},
    '3': {id: 3, category: 'Music', price: '$3,500', name: 'Tuba'},
    '4': {id: 4, category: 'Furniture', price: '$799', name: 'Chaise Lounge'},
    '5': {id: 5, category: 'Furniture', price: '$1,300', name: 'Dining Table'},
    '6': {id: 6, category: 'Furniture', price: '$100', name: 'Bean Bag'}
};*/
const RESET_VALUES = {id:'',product: {productid: '', category: '', price: '', name: '', instock:false}}

class Products extends Component {
    constructor(props) {        
        super(props)        
        this.state = {
            filterText: '',
            products: [], 
            currentProduct:Object.assign({}, RESET_VALUES)
        }
        this.handleFilter = this.handleFilter.bind(this)
        this.handleDestroy = this.handleDestroy.bind(this)
        this.performDML = this.performDML.bind(this) 
        this.handleSave = this.handleSave.bind(this)  
        this.handleEdit = this.handleEdit.bind(this)             
    }
    
    componentDidMount(){           
        fetch("http://localhost:3001/product/get/")
        .then(res => res.json())
        .then(
            (result) => {
                console.log('result------->>>',result)
                this.setState({
                    filterText:'',
                    products:result,
                    currentProduct :  Object.assign({}, RESET_VALUES)
                });
            },
            (error) => {
                this.setState({
                    filterText:'',
                    currentProduct :  Object.assign({}, RESET_VALUES),
                    error
                })
            }
        )
    }


    handleFilter(filterInput) {
        this.setState(filterInput)
    }

    performDML(product,operation){   
        console.log('product ------>>>',product)
        console.log('operation ------>>>',operation)
        let endpoint="";
        if(operation === 'insert')
            endpoint = 'http://localhost:3001/product/create/'
        else
            endpoint = 'http://localhost:3001/product/update/'+product.productid
        
        var xhr = new XMLHttpRequest()
        xhr.open('POST',endpoint)
        xhr.setRequestHeader('Content-Type','application/json')
        xhr.send(JSON.stringify(product));
        this.setState((prevState) => {            
            let products = prevState.products            
            products[product.id] = product
            prevState.currentProduct =  Object.assign({}, RESET_VALUES)
            console.log('------>>>',products)
            return { products }
        })
    }

    handleSave(product) {          
        if (!product.id){ //Insert Operation
            product.id = new Date().getTime()
            this.performDML(product,'insert')            
        }else{ //Update Operation
            this.performDML(product,'update')
        }                                
    }    

    handleEdit(product){        
        this.setState((prevState) => {
            prevState.currentProduct = product;
            return {product}            
        })        
    }

    handleDestroy(productId) {        
        fetch("http://localhost:3001/product/delete/"+productId)
        .then(res => res.json())
        .then(
            (result) => {                
                this.setState({                    
                    products:result,
                    currentProduct :  Object.assign({}, RESET_VALUES)
                });
            },
            (error) => {
                this.setState({
                    filterText:'',
                    currentProduct :  Object.assign({}, RESET_VALUES),
                    error
                })
            }
        )        
    }

    render () {
        return (
            <div>
                <h1>My Inventory</h1>
                <Filters 
                    onFilter={this.handleFilter}></Filters>
                <ProductTable 
                    products={this.state.products}
                    filterText={this.state.filterText}
                    onDestroy={this.handleDestroy}
                    onEdit={this.handleEdit}></ProductTable>
                <ProductForm
                    onSave={this.handleSave} product={this.state.currentProduct} ></ProductForm>
            </div>
        )
    }
}

export default Products