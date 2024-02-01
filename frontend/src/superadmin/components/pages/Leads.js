import React, { useEffect, useState } from 'react';
import { Button, Form, } from 'react-bootstrap';
import MUIDataTable from "mui-datatables";

import EditModal from './Editmodal';
import axios from 'axios';
import Breadcrum from '../Breadcrum';
import ViewModal from '../../../components/MainModal';
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteSharpIcon from '@mui/icons-material/EditNoteSharp';


const SuperadminLeads = () => {
    const [addadmin, setaddadmin] = useState(false)
    // const [search, setSearch] = useState('');
    const [data, setData] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editItem, setEditItem] = useState(null);
    const [dashboardname, setdashboardname] = useState({
        name: "lead Admin "
    })

    useEffect(() => {
        fetchData();
    }, []);


    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:8080/getleadadmins");
            setData(response.data.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };


    const handleAdd = () => {
        setaddadmin(true)
    };




    const handleDelete = async (itemsToDelete) => {
        // Delete  multiple item
        if (itemsToDelete && itemsToDelete.data && itemsToDelete.data.length > 0) {
            // Iterate over the selected rows
            itemsToDelete.data.map(async (row) => {
                const idToDelete = data[row.dataIndex]._id; // Assuming you have an _id field
                try {
                    const response = await axios.delete(`http://localhost:8080/deleteleadadmin/${idToDelete}`);
                    if (response.status === 200) {
                        console.log("Multiple Deleted Successfully");
                        fetchData(); // Refresh the data after deletion
                    } else {
                        throw new Error("Failed to delete admin");
                    }
                } catch (error) {
                    console.error("Error deleting data:", error);
                }
            });
        } else if (itemsToDelete) {
            // Delete a single item
            const idToDelete = itemsToDelete._id; // Assuming you have an _id field
            try {
                const response = await axios.delete(`http://localhost:8080/deleteleadadmin/${idToDelete}`);
                if (response.status === 200) {
                    console.log('single del done');
                    fetchData(); // Refresh the data after deletion
                } else {
                    throw new Error("Failed to delete admin");
                }
            } catch (error) {
                console.error("Error deleting data:", error);
            }
        } else {
            // Handle the case when no items are selected for deletion
            console.error("No items selected for deletion.");
        }
    };


    const columns = [
        {
            name: "index",
            label: "S.No",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "name",
            label: "name",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "email",
            label: "email",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "role",
            label: "Role",
            options: {
                filter: true,
                sort: false,
            }
        }, {
            name: "Actions", // Custom column name
            label: "Actions", // Custom column header
            options: {
                filter: false, // Disable filtering for this column
                sort: false,   // Disable sorting for this column
                customBodyRender: (value, tableMeta, updateValue) => {
                    // Define your custom actions here
                    const itemToDelete = data[tableMeta.rowIndex];
                    return (
                        <div className='d-flex justify-content-center'>
                            <EditNoteSharpIcon className='text-primary' onClick={() => handleEdit(data[tableMeta.rowIndex])} />
                            <DeleteIcon className='text-danger' onClick={() => handleDelete(itemToDelete)} />
                        </div>
                    );
                }
            }
        }
    ];

    const options = {
        filterType: 'checkbox',
        responsive: "standard",
        rowHover: true,
        filter: true
    };


    // handle  add form

    const [leadsdata, setleadsdata] = useState({
        name: "",
        role: "Direct",
        email: "",
        password: ""
    })
    const handleChange = (e) => {
        const { name, value } = e.target;
        setleadsdata({ ...leadsdata, [name]: value });
    }
    const handleSumit = (e) => {
        e.preventDefault();
        try {
            axios.post(`http://localhost:8080/addleadadmin`, leadsdata).then((resp) => {
                if (resp.status === 201 || resp.status === 200) {

                    console.log('Admin Created Successfully');
                    fetchData()
                    setaddadmin(false)
                    setleadsdata({})

                } else {
                    throw new Error("Error Creating Admin");
                }
            });
        } catch (error) {
            // Handle the error
        }
    }

    const leadsform = <>
        <Form onSubmit={handleSumit}>
            <Form.Group className="mb-3" controlId="formGridName">
                <Form.Label>Name</Form.Label>
                <Form.Control name='name' onChange={handleChange} value={leadsdata.name} placeholder="Enter your Name" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGridName1">
                <Form.Label>Select Role</Form.Label>
                <Form.Control as="select" name="role" onChange={handleChange} value={leadsdata.role}>
                    <option value="">Select a role</option>
                    <option value="Direct">Direct</option>
                    <option value="Consultant">Consultant</option>

                    {/* Add more options as needed */}
                </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" onChange={handleChange} name="email" value={leadsdata.email} placeholder="Enter email" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="text" onChange={handleChange} name="password" value={leadsdata.password} placeholder="Password" />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>

    </>



    //  handle edit form
    const handleEdit = (item) => {
        setEditItem(item);
        setShowEditModal(true);

        // Set the initial state of the editform with the data of the item to edit
        seteditform({
            name: item.name,
            email: item.email,
            role: item.role,
            // password: item.password,
            id: item._id// Add any other fields as needed
        });
    };
    const handleSaveEdit = (editedItem) => {
        setShowEditModal(false);
    };

    const [editform, seteditform] = useState("")
    const handleChange1 = (e) => {
        const { name, value } = e.target;
        seteditform((editform) => ({ ...editform, [name]: value }));
    }

    const handleSubmit2 = async (e) => {
        setShowEditModal(false);
        e.preventDefault();
        await axios.put("http://localhost:8080/editleadadmins", editform)
            .then((res) => {
                console.log(res.data)
                fetchData()
            }).catch((err) => {
                console.error(err.message);
            });
    }



    const modeldata = <>
        <Form onSubmit={handleSubmit2}>
            <Form.Group className="mb-3" controlId="formGridName">
                <Form.Label>Name</Form.Label>
                <Form.Control name='name' onChange={handleChange1} value={editform.name} placeholder="Enter your Name" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" onChange={handleChange1} name="email" value={editform.email} placeholder="Enter email" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGridName1">
                <Form.Label>Select Role</Form.Label>
                <Form.Control as="select" name="role" onChange={handleChange1} value={editform.role}>
                    <option value="">Select a role</option>
                    <option value="Direct">Direct</option>
                    <option value="Consultant">Consultant</option>

                    {/* Add more options as needed */}
                </Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    </>

    return (
        <div>
            <Breadcrum dashboard={dashboardname.name} />
            <div className='w-100 d-flex justify-content-end'> <Button className='m-3' onClick={() => handleAdd()}>Add</Button></div>
            <div className="">
                <MUIDataTable
                    // title={"Direct lead Admin List"}
                    data={data.map((item, index) => {
                        return {
                            index: index + 1,
                            name: item.name,
                            email: item.email,
                            role: item.role,
                        };
                    })}
                    columns={columns}
                    options={{ ...options, onRowsDelete: handleDelete }}

                />
            </div>
            {
                showEditModal && (
                    <EditModal
                        modelbody={modeldata}
                        item={editItem}
                        onHide={() => setShowEditModal(false)}
                        onSave={handleSaveEdit}

                    >
                    </EditModal>
                )
            }
            {
                addadmin && (
                    <ViewModal
                        item={editItem}
                        onHide={() => { setaddadmin(false) }}
                        mainmodelItem={leadsform}
                    />
                )
            }
        </div >
    );
};
export default SuperadminLeads;
