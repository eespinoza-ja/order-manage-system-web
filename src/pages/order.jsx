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
const urlProducts = 'http://localhost:8181/api/products/';

class Order extends Component {
    constructor(){
        super();
        this.state.data = {
            order : null
        }
    }

    setOrder=(order)=>{
        this.setState({
            data: order,
            form: { id: order._id,
                    consumer: order.consumer,
                    status: order.status,
                    date: order.date,
                    city_tax: order.city_tax,
                    county_tax: order.county_tax,
                    state_tax: order.state_tax,
                    federal_tax: order.federal_tax,
                    subtotal: order.total_amount - order.total_taxes,
                    total: order.total_amount
            }
        })
    };

    getProductsRequest=()=>{
        axios.get(urlProducts+"all").then(response=>{
          this.setState({data: response.data});
        }).catch(error=>{
          console.log(error.message);
        })
    }

    columns = [
        {
            name: 'N°',
            selector: 'id',
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
            city_tax: '',
            county_tax: '',
            state_tax: '',
            federal_tax: '',
            subtotal: '',
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
    
    componentDidMount() {
        if (this.props.location.state != undefined){
            this.setOrder(this.props.location.state.data);
        }
    }

    render(){
        const {form} = this.state;
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
                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label htmlFor="id" column sm="2">Order N°</Form.Label>
                                    <Col sm="10">
                                        <Form.Control type="text" name="id" id="id" readOnly onChange={this.handleChange} value={form?form.id: ''}/>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label htmlFor="consumer" column sm="2">Consumer</Form.Label>
                                    <Col sm="10">
                                        <Form.Control type="text" name="consumer" id="consumer" onChange={this.handleChange} value={form?form.consumer: ''}/>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label htmlFor="status" column sm="2">Status</Form.Label>
                                    <Col sm="10">
                                        <Form.Control type="text" name="status" id="status" onChange={this.handleChange} value={form?form.status: ''}/>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label htmlFor="date" column sm="2">Date</Form.Label>
                                    <Col sm="10">
                                        <Form.Control type="text" name="date" id="date" readOnly onChange={this.handleChange} value={form?form.date: ''}/>
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
                                data={this.state.data.items} 
                                fixedHeader
                                fixedHeaderScrollHeight="400px"
                            />
                        </Card.Body>
                    </Card>
                </Row>
                <Row sm={9}>
                    <Card>
                        <Card.Body>
                            <Form>
                                <Form.Group as={Row} className="">
                                    <Form.Label htmlFor="subtotal" column="lg" sm="2"><b>Subtotal</b></Form.Label>
                                    <Col sm="10">
                                        <Form.Label column="lg" htmlFor="subtotal" id="subtotal">$ {form.subtotal}</Form.Label>
                                    </Col>
                                    <Form.Label sm="2" column="lg"><b>Taxes</b></Form.Label><Col sm="10"></Col>
                                    <br />
                                    <Form.Label column sm="2"><b>Total City Tax</b></Form.Label>
                                    <Col sm="10">
                                        <Form.Label htmlFor="city_tax" id="city_tax">$ {form.city_tax}</Form.Label>
                                    </Col>
                                    <Form.Label column sm="2"><b>Total County Tax</b></Form.Label>
                                    <Col sm="10">
                                        <Form.Label htmlFor="city_tax" id="city_tax">$ {form.county_tax}</Form.Label>
                                    </Col>
                                    <Form.Label column sm="2"><b>Total State Tax</b></Form.Label>
                                    <Col sm="10">
                                        <Form.Label htmlFor="state_tax" id="state_tax">{form.state_tax}</Form.Label>
                                    </Col>            
                                    <Form.Label column sm="2"><b>Total Federal Tax</b></Form.Label>
                                    <Col sm="10">
                                        <Form.Label htmlFor="federal_tax" id="federal_tax">$ {form.federal_tax}</Form.Label>
                                    </Col>           
                                    <Form.Label column="lg" sm="2"><b>Total</b></Form.Label>
                                    <Col sm="10">
                                       <Form.Label column="lg" htmlFor="total" id="total">$ {form.total}</Form.Label>
                                    </Col>
                                </Form.Group>
                            </Form>
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