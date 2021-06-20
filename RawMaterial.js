import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import { Button, ButtonToolbar } from 'react-bootstrap';
import AddRawModal  from './AddRawModal';
import EditRawModal  from './EditRawModal';

class RawMaterial extends Component {
    constructor(props) {
        super(props);
        this.state = { raws: [], addModalShow: false, editModalShow: false }
    }

    refreshList() {
        fetch('https://localhost:44308/api/RawMaterials')
            .then(response => response.json())
            .then(data => { this.setState({ raws: data });
            console.log(data);
            });
    }

    componentDidMount() {
        this.refreshList();
    }

    componentDidUpdate() {
        this.refreshList();
    }

    deleteEmp(rawid) {
        if (window.confirm('Are you sure?')) {
            fetch('https://localhost:44308/api/RawMaterials' + rawid, {
                method: 'DELETE',
                header: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
        }
    }

    render() {
        const { raws, rawid, rawname, rawprice, rawqoh, rawrol, uom } = this.state;
        let addModalClose = () => this.setState({ addModalShow: false });
        let editModalClose = () => this.setState({ editModalShow: false });
        return (
            <div >
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Raw-Material ID</th>
                            <th>Raw-Material Name</th>
                            <th>Price</th>
                            <th>QOH</th>
                            <th>Re-order Level</th>
                            <th>Units Of Measurment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {raws.map(raw =>
                            <tr key={raw.RawMaterialId}>
                                <td>{raw.RawMaterialName}</td>
                                <td>{raw.Price}</td>
                                <td>{raw.qoh}</td>
                                <td>{raw.rol}</td>
                                <td>{raw.UnitsOfMeasurment}</td>
                                <td>
                                    <ButtonToolbar>
                                        <Button className="mr-2" variant="info"
                                            onClick={() => this.setState({
                                                editModalShow: true,
                                                rawid: raw.RawMaterialId, rawname: raw.RawMaterialName, rawprice: raw.Price, rawqoh: raw.qoh, rawrol: raw.rol ,uom: raw.UnitsOfMeasurment
                                            })}>
                                            Edit
                                        </Button>

                                        <Button className="mr-2" variant="danger"
                                            onClick={() => this.deleteEmp(raw.RawMaterialId)}>
                                            Delete
                                        </Button>

                                        <EditRawModal show={this.state.editModalShow}
                                            onHide={editModalClose}
                                            rawid={rawid}
                                            rawname={rawname}
                                            rawprice={rawprice}
                                            rawqoh={rawqoh}
                                            rawrol={rawrol}
                                            uom={uom}
                                        />
                                    </ButtonToolbar>
                                </td>
                            </tr>
                            )}
                    </tbody>
                </Table>

                <ButtonToolbar>
                    <Button variant='primary'
                        onClick={() => this.setState({ addModalShow: true })}>
                        Add Raw-Material</Button>

                    <AddRawModal show={this.state.addModalShow}
                        onHide={addModalClose} />
                </ButtonToolbar>
            </div>
        )
    }
}

export default RawMaterial;