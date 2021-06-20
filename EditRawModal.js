import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';

class EditRawModal extends Component {
    constructor(props) {
        super(props);
        this.state = { raws: [] };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFileSelected = this.handleFileSelected.bind(this);
    }

    componentDidMount() {
        fetch("https://localhost:44308/api/RawMaterials")
            .then(response => response.json())
            .then(data => {
                this.setState({ raws: data });
            });
    }

    handleSubmit(event) {
        event.preventDefault();
        fetch(process.env.REACT_APP_API + 'employee', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                RawMaterialID: null,
                RawMaterialName: event.target.RawMaterialName.value,
                Price: event.target.Price.value,
                QOH: event.target.QOH.value,
                ROL: event.target.ROL.value,
                UnitOfMeasurement: event.target.UnitOfMeasurement.value
            })
        })
            .then(res => res.json())
            .then((result) => {
                alert(result);
            },
                (error) => {
                    alert('Failed');
                })
    }


    handleFileSelected(event) {
        event.preventDefault();
        this.photofilename = event.target.files[0].name;
        const formData = new FormData();
        formData.append(
            "myFile",
            event.target.files[0],
            event.target.files[0].name
        );

        fetch('https://localhost:44308/api/RawMaterials', {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then((result) => {
                console.log(result);
            },
                (error) => {
                    alert('Failed');
                })

    }

    render() {
        return (
            <div className="container">

                <Modal
                    {...this.props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header clooseButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Edit Employee
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                    <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="RawMaterialID">
                                        <Form.Label>Raw-Material's ID</Form.Label>
                                        <Form.Control type="text" name="RawMaterialID" required
                                            placeholder="Raw-Material's ID" />
                                    </Form.Group>

                                    <Form.Group controlId="RawMaterialName">
                                        <Form.Label>Raw-Material's Name</Form.Label>
                                        <Form.Control type="text" name="RawMaterialName" required
                                            placeholder="Raw-Material's Name" />
                                    </Form.Group>

                                    <Form.Group controlId="Price">
                                        <Form.Label>Price</Form.Label>
                                        <Form.Control type="text" name="Price" required
                                            placeholder="Price" />
                                    </Form.Group>

                                    <Form.Group>
                                        <Button variant="primary" type="submit">
                                            Add
                                        </Button>
                                    </Form.Group>
                                </Form>
                            </Col>

                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="QOH">
                                        <Form.Label>QOH</Form.Label>
                                        <Form.Control
                                            type="number"
                                            name="QOH"
                                            required
                                            placeholder="QOH"
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="ROL">
                                        <Form.Label>ROL</Form.Label>
                                        <Form.Control
                                            type="number"
                                            name="ROL"
                                            required
                                            placeholder="ROL"
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="UnitsOfMeasurment">
                                        <Form.Label>Units Of Measurment</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="UnitsOfMeasurment"
                                            required
                                            placeholder="Unit Of Measurment"
                                        />
                                    </Form.Group>

                                </Form>
                            </Col>
                        </Row>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="danger" onClick={this.props.onHide}>Close</Button>
                    </Modal.Footer>

                </Modal>
            </div>
        )
    }

}

export default EditRawModal;