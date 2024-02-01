import React, { useEffect, useState } from 'react';
import { Table, Button, Form, FormControl } from 'react-bootstrap';
import MUIDataTable from "mui-datatables";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import EditModal from './Editmodal';
import axios from 'axios';
import Breadcrum from '../Breadcrum';
import ViewModal from '../../../components/MainModal';
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteSharpIcon from '@mui/icons-material/EditNoteSharp';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { read, utils } from 'xlsx';
import MessageIcon from '@mui/icons-material/Message';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
const Pending = () => {
    const [excelData, setExcelData] = useState([]);
    const [addadmin, setaddadmin] = useState(false)
    const [search, setSearch] = useState('');
    const [data, setData] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editItem, setEditItem] = useState(null);
    const [dashboardname, setdashboardname] = useState({ name: "Leads" })
    const [status, setstatus] = useState("");
    const [showMessageModal, setShowMessageModal] = useState(false);
    const matchadmin = localStorage.getItem("info");
    const [editform, seteditform] = useState("")
    const [detailview, setdetailview] = useState(false);
    console.log("admn id", matchadmin);
    useEffect(() => { fetchData() }, []);  //fetch data
    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:8080/getdirectlead");
            // setData(response.data.data);
            const updateddata = response.data.data.filter((user) => {
                return user.admin_id === matchadmin && user.status === "Pending"
            })
            console.log(updateddata);
            setData(updateddata)
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };


    //  file upload
    const handleFileUpload = async (acceptedFiles) => {
        const file = acceptedFiles[0];
        const reader = new FileReader();
        reader.onload = async () => {
            const data = new Uint8Array(reader.result);
            const workbook = read(data, { type: 'array' });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const excelDataArray = utils.sheet_to_json(worksheet, { header: 1 });
            // Convert array of arrays to array of objects
            const keys = excelDataArray[0]; // Get the keys from the first row
            const excelData = excelDataArray.slice(1).map((row) => {
                const obj = {};
                keys.forEach((key, index) => {
                    obj[key] = row[index];
                });
                return obj;
            });
            setExcelData(excelData);
            // Log the transformed excelData in the console
            console.log('Transformed Excel Data:', excelData);
            // After parsing the Excel data, post it to the backend
            try {
                const response = await axios.post('http://localhost:8080/directleadupload-excel-data', { excelData });
                console.log(response);
                if (response.status === 200) {
                    console.log('Excel data uploaded successfully!');
                    fetchData(); // Fetch updated data after uploading
                } else {
                    throw new Error('Failed to upload Excel data');
                }
            } catch (error) {
                console.error('Error uploading Excel data:', error);
            }
        };
        reader.readAsArrayBuffer(file);
    };


    //  delete data 
    const handleDelete = async (itemsToDelete) => {
        // Delete  multiple item
        if (itemsToDelete && itemsToDelete.data && itemsToDelete.data.length > 0) {
            // Iterate over the selected rows
            console.log(itemsToDelete);
            itemsToDelete.data.map(async (row) => {
                const idToDelete = data[row.dataIndex]._id; // Assuming you have an _id field
                try {
                    const response = await axios.delete(`http://localhost:8080/deletedirectlead/${idToDelete}`);
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
            // console.log(itemsToDelete);
            const idToDelete = itemsToDelete._id; // Assuming you have an _id field
            console.log(idToDelete);
            try {
                const response = await axios.delete(`http://localhost:8080/deletedirectlead/${idToDelete}`);
                console.log(response);
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

    // table columns
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
            label: "Name",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "email",
            label: "Email",
            options: {
                filter: true,
                sort: true,
            }
        }, {
            name: "phone",
            label: "Phone",
            options: {
                filter: true,
                sort: true,
            }
        }, {
            name: "address",
            label: "Address",
            options: {
                filter: true,
                sort: false,
            }
        }, {
            name: 'status',
            label: 'Status',
            options: {
                filter: true,
                sort: false,
                customBodyRender: (value, tableMeta, updateValue) => {
                    const item = data[tableMeta.rowIndex];
                    const handleStatusChange = async (event, item) => {
                        const newStatus = event.target.value;
                        try {
                            setShowMessageModal(true);
                            setstatus({
                                id: item._id,
                                status: newStatus,
                                email: item.email
                            });
                            // Set any additional fields needed for the message
                            seteditform({
                                ...editform,
                                id: item._id,
                                message: '', // Add your message here
                            });
                        } catch (error) {
                            console.error(error.message);
                        }
                    };

                    return (
                        <Select value={item.status} onChange={(e) => handleStatusChange(e, item)}>
                            <MenuItem value="Pending">Pending</MenuItem>
                            <MenuItem value="Approved">Approved</MenuItem>
                            <MenuItem value="Cancel">Cancel</MenuItem>
                        </Select>
                    );
                },
            },
        }, {
            name: "View",
            label: "View",
            options: {
                filter: false, // Disable filtering for this column
                sort: false,   // Disable sorting for this column
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <div className='d-flex justify-content-center'>
                            <RemoveRedEyeIcon className='text-primary' onClick={() => handledetailview(data[tableMeta.rowIndex])} />
                        </div>
                    );
                }
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
        filter: true,
    };



    //  add handler
    const handleAdd = () => {
        setaddadmin(true)
    };



    // handle  add form
    const [leadsdata, setleadsdata] = useState({
        name: "",
        // role: "Direct",
        email: "",
        address: "",
        // dob: "",
        phone: "",
        // gender: "",
        status: "",
        password: "",
        admin_id: matchadmin,
    })
    const handleChange = (e) => {
        const { name, value } = e.target;
        setleadsdata({ ...leadsdata, [name]: value });
    }
    const handleSumit = (e) => {
        e.preventDefault();
        try {
            axios.post(`http://localhost:8080/adddirectlead`, leadsdata).then((resp) => {
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

    //  add data form content
    const leadsform = <>
        <Form onSubmit={handleSumit}>
            <Form.Group className="mb-3" controlId="formGridName">
                <Form.Label>Name</Form.Label>
                <Form.Control name='name' onChange={handleChange} value={leadsdata.name} placeholder="Enter your Name" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" onChange={handleChange} name="email" value={leadsdata.email} placeholder="Enter email" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupaddress">
                <Form.Label>Address</Form.Label>
                <Form.Control type="text" onChange={handleChange} name="address" value={leadsdata.address} placeholder="Enter Address" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPhone">
                <Form.Label>Phone No.</Form.Label>
                <Form.Control type="Number" onChange={handleChange} name="phone" value={leadsdata.phone} placeholder="Enter Phone Number" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGridStatus">
                <Form.Label>Status</Form.Label>
                <Form.Control as="select" name="status" onChange={handleChange} value={leadsdata.status}>
                    <option value="Pending">Pending</option>
                    {/* <option value="Approved">Approved</option> */}
                    {/* <option value="Cancel">Cancel</option> */}
                </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="text" onChange={handleChange} name="password" value={leadsdata.password} placeholder="Password" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGridId">
                <Form.Label>Adminid</Form.Label>
                <Form.Control as="select" name="admin_id" onChange={handleChange} value={leadsdata.admin_id}>
                    <option value={matchadmin}>{matchadmin}</option>
                </Form.Control>
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
            id: item._id,// Add any other fields as needed
            name: item.name,
            email: item.email,
            phone: item.phone,
            address: item.address,
            status: item.status,
            message: item.message
            // password: item.password,
        });
    };


    const handleChange1 = (e) => {
        const { name, value } = e.target;
        seteditform((editform) => ({ ...editform, [name]: value }));
    }
    const handleSubmit2 = async (e) => {
        setShowEditModal(false);
        e.preventDefault();
        await axios.put("http://localhost:8080/editdirectlead", editform)
            .then((res) => {
                console.log(res.data)
                fetchData()
            }).catch((err) => {
                console.error(err.message);
            });
    }
    const handleSaveEdit = (editedItem) => {
        setShowEditModal(false);
    };
    const handlemessage = () => {
        setShowMessageModal(true)
    }

    const [viewdata, setviewdata] = useState("")
    const handledetailview = (item) => {
        console.log(item);
        setviewdata(item)
        setdetailview(true)
    }

    // submit data on status change
    // state submit handeler
    const handlestatusmsg = async (e) => {
        e.preventDefault();
        try {
            // Update the status along with the message for the selected item
            const response = await axios.put("http://localhost:8080/editdirectlead", {
                id: editform.id, // Assuming you have an ID field for the item being edited
                status: status.status, // New status (Approved, Declined, Pending)
                message: editform.message, // Message to be sent
                email: status.email
            });
            console.log(response.data);
            fetchData(); // Fetch updated data after the status change
            setShowMessageModal(false); // Close the message modal
        } catch (error) {
            console.error(error.message);
        }
    };
    //  update state modal content
    const modeldata1 = <>
        <Form onSubmit={handlestatusmsg}>
            <Form.Group className="mb-3" controlId="formGroupaddress">
                <Form.Label>message</Form.Label>
                <Form.Control as="textarea" rows={3} onChange={handleChange1} name="message" value={editform.message} placeholder="Enter Address" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupaddress">
                <Form.Control type="hidden" onChange={handleChange1} name="status" value={status.status} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupaddress">
                <Form.Control type="hidden" onChange={handleChange1} name="email" value={status.email} />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    </>





    //  edit modal content
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
            <Form.Group className="mb-3" controlId="formGroupaddress">
                <Form.Label>Address</Form.Label>
                <Form.Control type="text" onChange={handleChange1} name="address" value={editform.address} placeholder="Enter Address" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPhone">
                <Form.Label>Phone No.</Form.Label>
                <Form.Control type="Number" onChange={handleChange1} name="phone" value={editform.phone} placeholder="Enter Phone Number" />
            </Form.Group>
            {/* <Form.Group className="mb-3" controlId="formGridStatus">
                <Form.Label>Status</Form.Label>
                <Form.Control as="select" name="status" onChange={handleChange1} value={editform.status}>
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Cancel">Cancel</option>
                </Form.Control>
            </Form.Group> */}
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    </>
    const detailedviewcontent = <>
        <h4>{viewdata?.name}</h4>
        <p><b>Email:</b> {viewdata?.email}</p>
        <p><b>Address:</b> {viewdata?.address}</p>
        <p><b>Phone Number:</b> {viewdata?.phone}</p>
        <p><b>Status:</b> {viewdata?.status}</p>
        <p><b>message:</b> {viewdata?.message}</p>
    </>

    return (
        <div>
            <Breadcrum dashboard={dashboardname.name} />


            <div className='w-100 d-flex justify-content-end'> <Button className='m-3' onClick={() => handleAdd()}>Add</Button>

                {/*  excel upload  */}
                <input
                    id='file-upload'
                    type='file'
                    accept='.xlsx, .xls'
                    style={{ display: 'none' }}
                    onChange={(e) => handleFileUpload(e.target.files)}
                />
                <Button onClick={() => document.getElementById('file-upload').click()}>
                    <CloudUploadIcon />
                    Upload Excel
                </Button>
            </div>

            {/*  miu table */}
            <MUIDataTable
                data={data.map((item, index) => ({
                    index: index + 1,
                    name: item.name,
                    email: item.email,
                    phone: item.phone,
                    address: item.address,
                    status: item.status,
                }))}
                columns={columns}
                options={options}
            />

            {/* edit user details modal */}

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
            {/* message modal */}
            {
                showMessageModal && (
                    <EditModal
                        modelbody={modeldata1}
                        item={editItem}
                        onHide={() => setShowMessageModal(false)}
                        onSave={handleSaveEdit}
                    >
                    </EditModal>
                )
            }

            {/* detailed view model */}


            {
                detailview && (
                    <EditModal
                        modelbody={detailedviewcontent}
                        item={editItem}
                        onHide={() => setdetailview(false)}
                    // onSave={handleSaveEdit}
                    >
                    </EditModal>
                )
            }
            {/*  add admin modal */}
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
export default Pending;