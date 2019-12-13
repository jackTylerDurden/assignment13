import React, { Component } from 'react'
import ProductRow from './ProductRow'

class ProductTable extends Component {
    constructor(props) {
        super(props)
        this.handleDestroy = this.handleDestroy.bind(this)
        this.handleEdit = this.handleEdit.bind(this)
    }

    handleDestroy(id) {
        this.props.onDestroy(id)
    }

    handleEdit(product){        
        this.props.onEdit(product)
    }
    
    render () {        
        let productsArray = Object.keys(this.props.products).map((pid) => this.props.products[pid])
        let rows = []

        productsArray.forEach((product) => {
            product = product.product            
            if (product.name.indexOf(this.props.filterText) === -1) {
                return
            }
            rows.push (
                <ProductRow 
                    product={product} 
                    key={product.productid} 
                    onDestroy={this.handleDestroy}
                    onEdit={this.handleEdit}></ProductRow>
            )
        })

        return (
            <div>
                <table className="table table-striped table-sm ">
                    <thead className="thead-dark">
                        <tr>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>In Stock ?</th>
                            <th>&nbsp;</th>
                            <th>&nbsp;</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default ProductTable