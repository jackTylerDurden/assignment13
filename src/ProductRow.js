import React, { Component } from 'react'

class ProductRow extends Component {
    constructor(props) {
        super(props)
        this.destroy = this.destroy.bind(this)
        this.edit = this.edit.bind(this)
    }

    destroy() {                
        this.props.onDestroy(this.props.product.productid);
    }

    edit(){
        this.props.onEdit(this.props.product)
    }

    render () {
        return (
            <tr>
                <td>{this.props.product.name}</td>
                <td>{this.props.product.category}</td>
                <td>{this.props.product.price}</td>
                <td>{this.props.product.instock ? "Yes" : "No"}</td>
                <td className="text-right"><button onClick={this.edit} className="btn btn-info">Edit</button></td>
                <td className="text-right"><button onClick={this.destroy} className="btn btn-info">Delete</button></td>
            </tr>
        )
    }
}

export default ProductRow