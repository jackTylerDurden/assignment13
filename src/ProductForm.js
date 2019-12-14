import React, { Component } from 'react'
import { throwStatement } from '@babel/types'

const RESET_VALUES = {productid: '', category: '', price: '', name: '', instock:false}

class ProductForm extends Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
        this.handleSave = this.handleSave.bind(this)        
        this.state = {            
            errors: {}
        }
    }
        
    handleChange(e) {
        const target = e.target
        let value = target.value
        const name = target.name
        if(target.type === 'checkbox'){
            value = target.checked
        }
        this.setState((prevState) => {            
            this.props.product[name] = value
            return { product: this.props.product }
        })
        
    }    

    handleSave(e) {        
        this.props.onSave(this.props.product);        
        e.preventDefault()
    }

    render () {        
        let productToCommit = this.props.product;
        let formHeader = productToCommit.productid === '' ? "Add a new Product" : "Update Product"
        let buttonLabel = productToCommit.productid === '' ? "Save" : "Update"
        return (
            <form>
                <h4>{formHeader}</h4>
                <p>
                    <label>Name <br /> 
                    <input type="text" className="form-control" name="name" onChange={this.handleChange} value={productToCommit.name} /></label>
                </p>
                <p>
                    <label>Category <br /> 
                    <input type="text" className="form-control" name="category" onChange={this.handleChange} value={productToCommit.category} /></label>
                </p>
                <p>
                    <label>Price <br /> 
                    <input type="text" className="form-control" name="price" onChange={this.handleChange} value={productToCommit.price} /></label>
                </p>
                <p>                                   
                    <label>In Stock &nbsp; 
                    <input type="checkbox" className="" name="instock" onChange={this.handleChange} checked={productToCommit.instock} /></label>
                </p>
                <input type="submit" className="btn btn-info" value={buttonLabel} onClick={this.handleSave}></input>
            </form>
        )
    }
}

export default ProductForm