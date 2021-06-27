import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";

import {
    ButtonGroup,
    Card,
    CardContent,
    CardHeader,
    IconButton, makeStyles,
    Paper,
    Table, TableBody,
    TableCell,
    TableContainer, TableFooter,
    TableHead, TablePagination,
    TableRow, TableSortLabel, Typography
} from "@material-ui/core";
import Button from "../components/Button";
import {Delete, Edit,CheckCircle,Cancel} from "@material-ui/icons";
import {useFetch} from "./useFetch";
import ScrollableDialog from "./ScrollableDialog";


const useStyles = makeStyles({
    cardContainer: {
        border: "2px solid #e6e6e67d",
        borderRadius: "16px",
        marginBlock: "24px",
        padding:"10px 15px",
        marginRight:24

    },
    cardHead:{
        fontSize:26,
        fontWeight:600,
        fontFamily:"Poppins",
        textTransform:"uppercase",
        color:"var(--grey)"
    },
    tableHead: {

        "&:hover": {
            cursor: "pointer"
        }
    },
    darkCell: {
        backgroundColor: "var(--blue)",
        color: "white",
        padding:12,
        fontSize:16,
        textTransform:"capitalize",
        fontWeight:600,
        letterSpacing:1
    },
    sortIcon: {
        fill: "white"
    },
    action: {
        marginTop: "0px",
        marginBottom: "0px",
        marginRight: "8px",

    },
    hr: {
        border: "1px lightgrey solid",
        marginTop: "-4px",
        marginBottom: "8px"
    },
    tableData: {
        fontWeight: "bold",
        padding: 4,
        display: "-webkit-box",
        overflow: "hidden",
        "-webkit-line-clamp": 4,
        "-webkit-box-orient": "vertical",
        cursor: "pointer"
    },
    statusPending: {
        fontWeight: "bold",
        padding:8,
        color: "#E2BC7F",
        textTransform: "capitalize"
    },
    statusActive: {
        fontWeight: "bold",
        padding:8,
        color: "#4CAF50",
        textTransform: "capitalize"
    },
    statusSuspended: {
        fontWeight: "bold",
        padding:8,
        color: "#F44336",
        textTransform: "capitalize"
    },
    row: {
        '&:nth-of-type(odd)': {
            backgroundColor: "rgba(0, 0, 0, 0.04)",
        },
    },
    noBorder:{
        border:"none"
    },
    selector: {
        marginBlockStart: "-32px"

    },
    cancel:{
        color:"red"

    }
})

//Display All Products
const Tables = props => {

    // Data states
    const [items, setItems] = useState([]);
    const [tableData, setTableData] = useState([]);
    // Sorting states
    const [sortBy, setSortBy] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");
    const [sortedCount, setSortedCount] = useState(0);
    // Pagination states
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    // Details popup dialog states
    const [openDialog, setOpenDialog] = useState(false);
    const [dialogText, setDialogText] = useState("");

    // Handle opening details popup dialog
    const handleOpenDialog = text => {
        setOpenDialog(true);
        setDialogText(text);
    }

    // Handle opening details popup dialog
    const handleCloseDialog = () => {
        setOpenDialog(false);
        setDialogText("");
    }

    let url;
    if(props.type==="workshopReview"||props.type==="paperReview"){
        if(props.status==="approved" || props.status==="rejected"){
            url = props.url+"/"+props.status+"/"+props.reviewerId;
        }else{
            url = props.url+"/"+props.status;
        }
    }else{
        url=props.url
    }


    //Get the fetched Data
    const  {loading,data} = useFetch(url);

    const styles = useStyles();

    useEffect(() => {

        convertToTableData();

    }, [sortedCount, items]);

    useEffect(() => {
        setItems(data);
        props.sortBy && sortItems(props.sortBy, "asc");
    }, [data]);

    // Data functions
    const convertToTableData = () => {
        let newTableData = items.map(item => (
            {...item}
        ));

        setTableData(newTableData);
    }

    // Sorting functions
    const sortItems = (column, order) => {
        let newData = data;

        // Check if sort order is given and sort according to that
        if (order) {
            setSortOrder(order);
            newData.sort(dynamicSort(column, order === "desc"));
        }
        // If sort order is not given, check if the given column is the one currently sorted, and if so, toggle sort order
        else if (column === sortBy) {
            const newOrder = sortOrder === "asc" ? "desc" : "asc";
            setSortOrder(newOrder);
            newData.sort(dynamicSort(column, newOrder === "desc"));
        }
        // Else, sort the given column in ascending order
        else {
            setSortOrder("asc");
            newData.sort(dynamicSort(column, false));
        }

        setItems(newData)
        setSortBy(column);
        setSortedCount(sortedCount + 1);
    }

    const dynamicSort = (column, desc) => {
        let order = desc ? -1 : 1;

        return (a, b) => {
            let result = (a[column] < b[column]) ? -1 : (a[column] > b[column]) ? 1 : 0;
            return result * order;
        }
    }

    // Pagination functions
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(event.target.value);
        setPage(0);
    }

    // Delete Data
    const deleteData = delItem => {
        let newData = items.filter(item => (item._id !== delItem._id));


        fetch(`${props.url}/${delItem._id}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token':localStorage.getItem("adminToken")
            },
            method: "DELETE"

        })
            .then(res => res.json())
            .then(data => {
                setItems(newData);
            })
            .catch(err => console.log(err));
    }

    // Set data for editing
    const setEditDataHandler = tableItem => {
        for (let item of items) {
            if (item._id === tableItem._id) {
                props.setEditData(item);
            }
        }
    }

    //Approve Paper
    const updateStatus = (selectedItem,status) =>{
        let newData = items.filter(item => (item._id !== selectedItem));
        fetch(`${props.url}/${selectedItem}/status`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token':localStorage.getItem("token")
            },
            body:JSON.stringify({
                status:status,
                reviewerId:props.reviewerId
            }),
            method:"PATCH"

        })
            .then(res => res.json())
            .then(data => {
                setItems(newData);
            })
            .catch(err => console.log(err));
    }

    return (
        <Card variant="outlined" className={styles.cardContainer}>
            <CardHeader
                title={props.title}
                action={!props.disableAdd &&
                    <Link to= {`/${props.type}/add`}>
                        <Button
                            name={`Add ${props.type}`}
                            btnStyle="btn-next"
                        />
                    </Link>
                }
                classes={{action: styles.action,title:styles.cardHead}}
            />
            <hr className={styles.hr} />

            <CardContent>
                <TableContainer component={Paper}>
                    <Table size="small">

                        {/* Table Head */}
                        <TableHead className={styles.tableHead}>
                            <TableRow>
                                <TableCell
                                    classes={{head: styles.darkCell}}
                                    align="center"
                                >
                                    #
                                </TableCell>
                                {
                                    props.columns.map(column => {
                                        // Avoid rendering actions column if table is set to read-only
                                        if (column.id === "action" && props.readOnly) {
                                            return
                                        }

                                        return <TableCell
                                            classes={{head: styles.darkCell}}
                                            align="center"
                                            onClick={() => sortItems(column.id)}
                                        >
                                            {column.name}
                                            <TableSortLabel
                                                active={sortBy === column.id}
                                                direction={sortOrder}
                                                classes={{icon: styles.sortIcon}}
                                            />
                                        </TableCell>
                                    })
                                }


                            </TableRow>
                        </TableHead>

                        {/* Table Data */}
                        <TableBody>
                            {tableData
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((item,index) => (
                                    <TableRow key={item._id}  classes={{root:styles.row}}>

                                        <TableCell align="center" classes={{root:styles.noBorder}}>
                                            <Typography
                                                variant="body1"
                                                classes={{body1: styles.tableData}}
                                            >
                                                {index+1}
                                            </Typography>
                                        </TableCell>

                                        {
                                            props.columns.map(column => {
                                                // Determine text field style based on status type (if present)
                                                let tableDataStyle = styles.tableData;
                                                if (column.statusStyle) {
                                                    switch (item.status) {
                                                        case "pending":
                                                            tableDataStyle = styles.statusPending;
                                                            break;
                                                        case "active":
                                                        case "approved":
                                                            tableDataStyle = styles.statusActive;
                                                            break;
                                                        case "suspended":
                                                        case "rejected":
                                                            tableDataStyle = styles.statusSuspended;
                                                            break;
                                                    }
                                                }

                                                // Make text human-readable if prettify is set to true
                                                if (column.prettify) {
                                                    const result = item[column.id].replace(/([A-Z])/g, " $1");
                                                    item[column.id] = result[0].toUpperCase() + result.slice(1);
                                                }

                                                // Disable edit button according to provided values
                                                let disableEdit = false;
                                                if (column.disableEditOn) {
                                                    column.disableEditOn.forEach(rule => {
                                                        if (item[rule.column] === rule.value) {
                                                            disableEdit = true;
                                                        }
                                                    })
                                                }

                                                // Avoid rendering actions column if table is set to read-only
                                                if (column.id === "action" && props.readOnly) {
                                                    return
                                                }

                                                return (
                                                    <TableCell align="center" classes={{root: styles.noBorder}}>
                                                        {column.type === "img" &&
                                                        <img

                                                            src={`http://icaf.site/${props.type}/${item[column.id]}`}

                                                            alt={item.name}
                                                            style={{
                                                                minHeight: "160px",
                                                                maxHeight: "160px"
                                                            }}
                                                        />
                                                        }
                                                        {column.type === "text" &&
                                                        <Typography
                                                            variant="body1"
                                                            classes={{body1: tableDataStyle}}
                                                            onClick={() => {
                                                                column.id !== "status" &&
                                                                handleOpenDialog(item[column.id])
                                                            }}
                                                        >
                                                            {item[column.id]}
                                                        </Typography>
                                                        }
                                                        {column.type === "link" &&
                                                        <a href={`${props.url}/${props.type==="paperReview"?"paper":"proposal"}/${item[column.id]}`} target={"_blank"}>
                                                            <Typography
                                                                variant="body1"
                                                                classes={{body1: tableDataStyle}}
                                                            >
                                                                {item[column.id].split("-")[1]}
                                                            </Typography>
                                                        </a>
                                                        }
                                                        {column.type === "fullName" &&
                                                        <Typography
                                                            variant="body1"
                                                            classes={{body1: tableDataStyle}}
                                                            onClick={() => {
                                                                column.id !== "status" &&
                                                                handleOpenDialog(item.fname + " " + item.lname)
                                                            }}
                                                        >
                                                            {item.fname + " " + item.lname}

                                                        </Typography>
                                                        }
                                                        {column.type === "actions" &&
                                                        <ButtonGroup color="primary">
                                                            <IconButton
                                                                component={Link}
                                                                to={`/${props.type}/edit`}
                                                                onClick={() => {
                                                                    setEditDataHandler(item);
                                                                }}
                                                                disabled={disableEdit}
                                                            >
                                                                <Edit/>
                                                            </IconButton>
                                                            <IconButton
                                                                onClick={() => deleteData(item)}
                                                            >
                                                                <Delete/>
                                                            </IconButton>
                                                        </ButtonGroup>
                                                        }
D
                                                        {column.type === "approve" &&
                                                        <ButtonGroup color="primary">
                                                            <IconButton
                                                                onClick={() => {
                                                                    updateStatus(item._id,"approved");
                                                                }}
                                                                disabled={disableEdit}
                                                            >
                                                                <CheckCircle fontSize={"large"}/>
                                                            </IconButton>
                                                            <IconButton
                                                                color="secondary"
                                                                className={styles.cancel}
                                                                onClick={() => updateStatus(item._id,"rejected")}
                                                            >
                                                                <Cancel fontSize={"large"}/>
                                                            </IconButton>
                                                        </ButtonGroup>
                                                        }


                                                    </TableCell>
                                                )
                                            })
                                        }

                                    </TableRow>
                                ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    count={tableData.length}
                                    page={page}
                                    rowsPerPage={rowsPerPage}
                                    rowsPerPageOptions={[10, 25, 50]}
                                    onChangePage={handleChangePage}
                                    onChangeRowsPerPage={handleChangeRowsPerPage}
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>
                </TableContainer>
            </CardContent>

            {/* Details Dialog */}
            <ScrollableDialog
                isOpen={openDialog}
                text={dialogText}
                closeCallback={() => handleCloseDialog()}
            />
        </Card>
    )
}

export default Tables;