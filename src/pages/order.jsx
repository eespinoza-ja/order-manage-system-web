import React, { Component } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";
import { Button, Card, Form, Row, Col, Container } from "react-bootstrap/";
import DataTable from 'react-data-table-component';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEdit } from "@fortawesome/free-solid-svg-icons";

import styles from "./styles.css";
import "bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

const url = 'http://localhost:8181/api/orders/';
const urlorders = 'http://localhost:8181/api/orders/';

class Order extends Component {
    columns = [
        {
            name: 'N°',
            selector: '_id',
            sortable: true
        },
        {
            name: 'Name',
            selector: 'name',
            sortable: true
        },
        {
            name: 'Quantity',
            selector: 'quantity',
            sortable: true
        },
        {
            name: 'Unit Price',
            selector: 'price',
        },
        {
            name: 'Cost',
            selector: 'cost',
        },
        {
          name: "Action",
          button: true,
          cell: (row) => (
            <div>
                <Button className="btn btn-primary" onClick={()=>{this.selectItem(row); this.modalInsert()}}><FontAwesomeIcon icon={faEdit}/></Button>
            </div>
          )
        }
    ]
    
    state={
        data:[],
        modalInsert: false,
        form:{
            id: '',
            consumer: '',
            status: '',
            date: '',
            total: ''
        }
    }

    modalInsert=()=>{
        this.setState({modalInsert: !this.state.modalInsert});
    }

    selectItem=(item)=>{
        this.setState({
            modalType: 'update',
            form: {
                id: item._id,
                name: item.name,
                quantity: item.quantity,
                price: item.price,
            }
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
    
    render(){
        const {form}=this.state;
        return (
            <Container>
                <Row className="justify-content-md-center">
                    <Col>
                        <Link to="Orders" className="btn btn-secondary" style={{float: 'right'}}>Back</Link>
                        <div className={styles.displayFlex}></div>
                    </Col>
                    <br/><br/>
                    <Card sm={6}>
                        <Card.Body>
                            <Form>
                                <Form.Group as={Row} className="mb-3" controlId="formId">
                                    <Form.Label htmlFor="id" column sm="2">Order N°</Form.Label>
                                    <Col sm="10">
                                    <Form.Control type="text" name="id" id="id" readOnly onChange={this.handleChange} value={form?form.id: ''}/>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3" controlId="formConsumer">
                                    <Form.Label htmlFor="consumer" column sm="2">Consumer</Form.Label>
                                    <Col sm="10">
                                    <Form.Control type="text" name="consumer" id="id" onChange={this.handleChange} value={form?form.consumer: ''}/>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3" controlId="formStatus">
                                    <Form.Label htmlFor="status" column sm="2">Status</Form.Label>
                                    <Col sm="10">
                                    <Form.Control type="text" name="status" id="id" onChange={this.handleChange} value={form?form.status: ''}/>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3" controlId="formDate">
                                    <Form.Label htmlFor="date" column sm="2">Date</Form.Label>
                                    <Col sm="10">
                                    <Form.Control type="date" name="date" id="id" onChange={this.handleChange} value={form?form.date: ''}/>
                                    </Col>
                                </Form.Group>
                            </Form>
                        </Card.Body>
                    </Card>
                </Row>
                <Row className="justify-content-md-center">
                    <Card sm={6}>
                        <Col >
                            <Button className="btn btn-success" style={{float: 'right'}}> 
                                <FontAwesomeIcon icon={faPlus} className={styles.plusIcon} />{" "}
                                Add Item
                            </Button>
                        </Col>
                        <Card.Body className="table-responsive">
                            <DataTable 
                                columns={this.columns} 
                                data={this.state.data} 
                                fixedHeader
                                fixedHeaderScrollHeight="400px"
                                selectableRows
                            />
                        </Card.Body>
                    </Card>
                </Row>
                <Row className="justify-content-md-center">
                    <Card sm={6}>
                        <Card.Body>
                            <div className="form-group" style={{float: 'right'}}>
                                <label htmlFor="id"><b>Subtotal</b></label>
                                {"   "}
                                <span>${" "}</span><label htmlFor="name" id="subtotal" value={form?form.statetax: ''}></label>
                                <br />
                                <label htmlFor="name"><b>Taxes</b></label>
                                <br />
                                <label htmlFor="name"><b>Total City Tax</b></label>
                                {"   "}
                                <span>${" "}</span><label htmlFor="name" id="citytax" value={form?form.citytax: ''}></label>
                                <br />
                                <label htmlFor="name"><b>Total County Tax</b></label>
                                {"   "}
                                <span>${" "}</span><label htmlFor="name" id="countytax" value={form?form.countytax: ''}></label>
                                <br />
                                <label htmlFor="name"><b>Total State Tax</b></label>
                                {"   "}
                                <span>${" "}</span><label htmlFor="name" id="statetax" value={form?form.statetax: ''}></label>
                                <br />                
                                <label htmlFor="name"><b>Total Federal Tax</b></label>
                                {"   "}
                                <span>${" "}</span><label htmlFor="name" id="federaltax" value={form?form.federaltax: ''}></label>
                                <br />                
                                <label htmlFor="name"><b>Total</b></label>
                                {"   "}
                                <span>${" "}</span><label htmlFor="name" id="total" value={form?form.total: ''}></label>
                            </div>
                        </Card.Body>
                    </Card>
                </Row>
                <br/>
                <Row className="justify-content-md-center">
                    <Col >
                        <Button className="btn btn-success" style={{float: 'right'}}>Complete Order</Button>
                    </Col>
                    <Col xs lg="2">
                        <Link to="Orders" className="btn btn-danger" style={{float: 'right'}}>Reject order</Link>
                    </Col>
                </Row>
            </Container>
        )
    }
}
export default Order;