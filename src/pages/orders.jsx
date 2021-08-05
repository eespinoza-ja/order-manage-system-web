import React, { Component } from 'react';
import axios from "axios";
import { Col, Row, Container } from "react-bootstrap/";
import { Link } from "react-router-dom";
import DataTable from 'react-data-table-component';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEdit } from "@fortawesome/free-solid-svg-icons";

import styles from "./styles.css";
import "bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

const url = 'http://localhost:8181/api/orders/';

const paginationOptions = {
    rowsPerPageText: 'Orders Per Page',
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsText: 'All',
}

class Orders extends Component {
    columns = [
        {
            name: 'N°',
            selector: '_id',
            sortable: true
        },
        {
            name: 'Consumer',
            selector: 'consumer',
            sortable: true
        },
        {
            name: 'Status',
            selector: 'status',
            sortable: true
        },
        {
            name: 'Date',
            selector: 'date',
        },
        {
            name: 'Total',
            selector: 'total',
        },
        {
          name: "Action",
          button: true,
          cell: (row) => (
            <div>
                <Link to={{ pathname: 'Order', state: {data:row}}} className="btn btn-primary"> 
                    <FontAwesomeIcon className={styles.plusIcon} icon={faEdit}/>
                </Link>
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

    getRequest=()=>{
        axios.get(url+"all").then(response=>{
          this.setState({data: response.data});
        }).catch(error=>{
          console.log(error.message);
        })
    }

    selectOrder=(order)=>{
        this.setState({
            modalType: 'update',
            form: {
                id: order._id,
                consumer: order.consumer,
                status: order.status,
                date: order.date,
            }
        })
    }
    
    modalInsert=()=>{
        this.setState({modalInsert: !this.state.modalInsert});
    }

    componentDidMount() {
        this.getRequest();
    }

    render(){
        return (
            <Container>
                <Row className="justify-content-md-center">
                    <div className="table-responsive">
                        <h2>Orders</h2>
                        <Col sm={12}>
                            <Link to="Order" className="btn btn-primary" style={{float: 'right'}}> 
                                <FontAwesomeIcon icon={faPlus} className={styles.plusIcon} />{" "} Create Order
                            </Link>
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
                </Row>
            </Container>
        )
    }
}

export default Orders;
