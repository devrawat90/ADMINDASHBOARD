import React, { useEffect, useState } from 'react';
import { Table, Button, Form, FormControl } from 'react-bootstrap';
import { useReactToPrint } from 'react-to-print';
import { useRef } from 'react';

import MUIDataTable from "mui-datatables";
import EditModal from './Editmodal';
import axios from 'axios';
import Breadcrum from '../Breadcrum';
import ViewModal from '../../../components/MainModal';

import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteSharpIcon from '@mui/icons-material/EditNoteSharp';



const CreateAdmin = () => {

    const [addadmin, setaddadmin] = useState(false)
    const [search, setSearch] = useState('');
    const [data, setData] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editItem, setEditItem] = useState(null);
    const [dashboardname, setdashboardname] = useState({
        name: "Admin"
    })
    const [editform, seteditform] = useState({
        name: "",
        email: "",
        password: ""
    })

    useEffect(() => {
        fetchData();
    }, []);


    const handleSumit = async (e) => {
        setShowEditModal(false);
        e.preventDefault()

        await axios.put("http://localhost:8080/editadmin", editform)
            .then((res) => {
                console.log(res.data)
                fetchData()
            }).catch((err) => {
                console.error(err.message);
            });



    }
    const handleChange = (e) => {

        const { name, value } = e.target;
        seteditform((editform) => ({ ...editform, [name]: value }));

    }

    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:8080/getadmins");
            setData(response.data.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleEdit = (item) => {
        setEditItem(item);
        setShowEditModal(true);

        // Set the initial state of the editform with the data of the item to edit
        seteditform({
            name: item.name,
            email: item.email,
            // password: item.password,
            id: item._id// Add any other fields as needed
        });
    };
    const handleSaveEdit = (editedItem) => {
        setShowEditModal(false);
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
                    const response = await axios.delete(`http://localhost:8080/deleteadmin/${idToDelete}`);
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
                const response = await axios.delete(`http://localhost:8080/deleteadmin/${idToDelete}`);
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
                sort: true,
            }
        },
        {
            name: "email",
            label: "email",
            options: {
                filter: true,
                sort: true,
            }
        },

        {
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



    const modeldata = <>
        <Form onSubmit={handleSumit}>
            <Form.Group className="mb-3" controlId="formGridName">
                <Form.Label>Name</Form.Label>
                <Form.Control name='name' onChange={handleChange} value={editform.name} placeholder="Enter your Name" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" onChange={handleChange} name="email" value={editform.email} placeholder="Enter email" />
            </Form.Group>
            {/* <Form.Group className="mb-3" controlId="formGroupPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="text" onChange={handleChange} name="password" value={editform.password} placeholder="Password" />
            </Form.Group> */}
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    </>
    const [adddata, setadddata] = useState({
        name: "",
        email: "",
        password: ""
    })
    const handleChange2 = (e) => {
        const { name, value } = e.target;
        setadddata({ ...adddata, [name]: value });
    }


    const handleSubmit2 = (e) => {
        e.preventDefault();
        try {
            axios.post(`http://localhost:8080/addadmin`, adddata).then((resp) => {
                if (resp.status === 201 || resp.status === 200) {
                    console.log('Admin Created Successfully');
                    setaddadmin(false)
                    fetchData()
                } else {
                    throw new Error("Error Creating Admin");
                }
            });
        } catch (error) {
            // Handle the error
            console.log("error");
        }
    }


    const addmodeldata =
        <>
            <Form onSubmit={handleSubmit2}>
                <Form.Group className="mb-3" controlId="formGridName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control name='name' onChange={handleChange2} value={data.name} placeholder="Enter your Name" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGroupEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" onChange={handleChange2} name="email" value={data.email} placeholder="Enter email" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="text" onChange={handleChange2} name="password" value={data.password} placeholder="Password" />
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

            <div className="table-container table-responsive">
                <MUIDataTable style={{ overflowx: "auto" }}
                    // title={"Admins List"}
                    data={data.map((item, index) => {
                        return {
                            index: index + 1,
                            name: item.name,
                            email: item.email,
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
                        mainmodelItem={addmodeldata}
                    />
                )


            }

        </div >
    );
};



















export default CreateAdmin;
