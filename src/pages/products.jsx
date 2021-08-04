import React, { Component } from 'react';
import axios from "axios";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import DataTable from 'react-data-table-component';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus} from "@fortawesome/free-solid-svg-icons";
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

import styles from "./styles.css";
import "bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

const url = 'http://localhost:8181/api/products/';

const paginationOptions = {
    rowsPerPageText: 'Products Per Page',
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsText: 'All',
}

class Products extends Component {
    columns = [
        {
            name: 'ID',
            selector: '_id',
            sortable: true
        },
        {
            name: 'Name',
            selector: 'name',
            sortable: true
        },
        {
            name: 'Category',
            selector: 'category',
            sortable: true
        },
        {
            name: 'Price',
            selector: 'price',
        },
        {
            name: 'Status',
            selector: 'status',
        },
        {
          name: "Action",
          button: true,
          cell: (row) => (
            <div>
                <button className="btn btn-primary" onClick={()=>{this.selectProduct(row); this.modalInsert()}}><FontAwesomeIcon icon={faEdit}/></button>
                {"   "}
                <button className="btn btn-danger" onClick={()=>{this.selectProduct(row); this.setState({modalDelete: true})}}> <FontAwesomeIcon icon={faTrashAlt}/> </button>
            </div>
          )
        }
    ]

    state={
        data:[],
        modalInsert: false,
        modalDelete: false,
        form:{
            id: '',
            name: '',
            category: '',
            price: '',
            status: ''
        }
    }

    getRequest=()=>{
        axios.get(url+"all").then(response=>{
          this.setState({data: response.data});
        }).catch(error=>{
          console.log(error.message);
        })
    }

    postRequest=async()=>{
        delete this.state.form.id;
        await axios.post(url+"add",this.state.form).then(response=>{
          this.modalInsert();
          this.getRequest();
        }).catch(error=>{
          console.log(error.message);
        })
    }
      
    putRequest=()=>{
        axios.put(url+"update/"+this.state.form.id, this.state.form).then(response=>{
            this.modalInsert();
            this.getRequest();
        })
    }
    
    deleteRequest=()=>{
        axios.delete(url+"delete/"+this.state.form.id).then(response=>{
            this.setState({modalDelete: false});
            this.getRequest();
        })
    }

    selectProduct=(product)=>{
        this.setState({
            modalType: 'update',
            form: {
                id: product._id,
                name: product.name,
                category: product.category,
                price: product.price,
                status: product.status
            }
        })
    }
    
    modalInsert=()=>{
        this.setState({modalInsert: !this.state.modalInsert});
    }

    handleChange=async e=>{
        e.persist();
        await this.setState({
          form:{
            ...this.state.form,
            [e.target.name]: e.target.value
          }
        });
        console.log(this.state.form);
    }

    componentDidMount() {
        this.getRequest();
    }
        
    render(){
        const {form}=this.state;
        return (
            <div>
                <div className="table-responsive">
                    <h2>Products</h2>
                    <Col sm={8}>
                        <Button variant="primary" className={`${styles.marginRight} ${styles.primaryBtn}`} 
                        onClick={()=>{this.setState({form: null, modalType: 'add'}); this.modalInsert()}}>
                            <FontAwesomeIcon icon={faPlus} className={styles.plusIcon} />{" "}
                            Add
                        </Button>

                        <div className={styles.displayFlex}></div>
                    </Col>
                    <DataTable 
                        columns={this.columns} 
                        data={this.state.data} 
                        pagination
                        paginationComponentOptions={paginationOptions}
                        fixedHeader
                        fixedHeaderScrollHeight="400px"
                        selectableRows
                    />
                </div>

                <Modal isOpen={this.state.modalInsert}>
                    <ModalHeader style={{display: 'block'}}>
                    <span style={{float: 'right'}} onClick={()=>this.modalInsert()}>x</span>
                    </ModalHeader>
                    <ModalBody>
                    <div className="form-group">
                        <label htmlFor="id">ID</label>
                        <input className="form-control" type="text" name="id" id="id" readOnly onChange={this.handleChange} value={form?form.id: ''}/>
                        <br />
                        <label htmlFor="name">Name</label>
                        <input className="form-control" type="text" name="name" id="name" onChange={this.handleChange} value={form?form.name: ''}/>
                        <br />
                        <label htmlFor="category">Category</label>
                        <input className="form-control" type="text" name="category" id="category" onChange={this.handleChange} value={form?form.category:''}/>
                        <br />
                        <label htmlFor="name">Price</label>
                        <input className="form-control" type="number" name="price" id="price" min="0" value="0" step="0.01" onChange={this.handleChange} value={form?form.price: ''}/>
                        <br />                
                        <label htmlFor="status">Status</label>
                        <input className="form-control" type="text" name="status" id="status" onChange={this.handleChange} value={form?form.status:''}/>
                    </div>
                    </ModalBody>

                    <ModalFooter>
                    {this.state.modalType==='add'?
                        <button className="btn btn-success" onClick={()=>this.postRequest()}>
                        Add
                    </button>: <button className="btn btn-primary" onClick={()=>this.putRequest()}>
                        Update
                    </button>
                    }
                        <button className="btn btn-danger" onClick={()=>this.modalInsert()}>Cancel</button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={this.state.modalDelete}>
                    <ModalBody>
                        Are you sure to delete the product {form && form.name}
                    </ModalBody>
                    <ModalFooter>
                    <button className="btn btn-danger" onClick={()=>this.deleteRequest()}>Yes</button>
                    <button className="btn btn-secundary" onClick={()=>this.setState({modalDelete: false})}>No</button>
                    </ModalFooter>
                </Modal>

            </div>
        );
    }
}
export default Products;