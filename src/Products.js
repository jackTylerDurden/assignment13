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
const RESET_VALUES = {productid: '', category: '', price: '', name: '', instock:false}

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
        let endpoint="";
        if(operation === 'insert')
            endpoint = 'http://localhost:3001/product/create/'
        else
            endpoint = 'http://localhost:3001/product/update/'+product.productid

        var prodToInsert = {
            id:product.productid,
            product:product
        }
        var xhr = new XMLHttpRequest()
        xhr.open('POST',endpoint)
        xhr.setRequestHeader('Content-Type','application/json')
        xhr.send(JSON.stringify(prodToInsert));
        this.setState((prevState) => {            
            let products = prevState.products            
            products[product.productid] = prodToInsert
            prevState.currentProduct =  Object.assign({}, RESET_VALUES)
            return { products }
        })
    }

    handleSave(product) {                
        if (!product.productid){ //Insert Operation
            product.productid = new Date().getTime()
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