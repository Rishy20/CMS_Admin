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
import {Delete, Edit} from "@material-ui/icons";
import {useFetch} from "./useFetch";
import Select from "./Select";


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
        padding:8
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

    //Get the fetched Data
    const  {loading,data} = useFetch(props.url);

    const styles = useStyles();

    useEffect(() => {

        convertToTableData();

    }, [sortedCount, items]);

    useEffect(() => {

        setItems(data);

    }, [data]);

    // Data functions
    const convertToTableData = () => {
        let newTableData = items.map(item => (
            {...item}
        ));

        setTableData(newTableData);
    }

    // Sorting functions
    const sortItems = column => {
        let newData = data;
        if (column !== sortBy) {
            setSortOrder("asc");
            newData.sort(dynamicSort(column, false));
        } else {
            const newOrder = sortOrder === "asc" ? "desc" : "asc";
            setSortOrder(newOrder);
            newData.sort(dynamicSort(column, newOrder === "desc"));
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
                'x-access-token':localStorage.getItem("token")
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
                console.log(item)
            }
        }
    }

    // CardHeader action component
    const Action = () => (
        <>
            {/* Only enable Add button if table is not read-only */}
            {!props.readOnly &&
                <Link to= {`/${props.type}/add`}>
                    <Button
                        name={`Add ${props.type}`}
                        btnStyle="btn-next"
                    />
                </Link>
            }

            {/* Enable select and assign values if selector prop is passed */}
            {props.selector &&
                <Select
                    values={props.selectValues}
                    value={props.selectValue}
                    onChange={props.selectCallback}
                    styles={styles.selector}
                />
            }
        </>
    )

    return (
        <Card variant="outlined" className={styles.cardContainer}>
            <CardHeader
                title={props.title}
                action={<Action />}
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
                                    props.columns.map(column=>{
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
                                            props.columns.map(column=>(

                                                <TableCell align="center" classes={{root:styles.noBorder}}>
                                                    {column.type === "img" &&
                                                    <img
                                                        src={`http://localhost:3000/${props.type}/${item[column.id]}`}
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
                                                        classes={{body1: styles.tableData}}
                                                    >
                                                        {item[column.id]}
                                                    </Typography>
                                                    }
                                                    {column.type === "actions" &&
                                                    <ButtonGroup color="primary">
                                                        <IconButton
                                                            component={Link}
                                                            to={`/${props.type}/edit`}
                                                            onClick={() => {setEditDataHandler(item);}}
                                                        >
                                                            <Edit />
                                                        </IconButton>
                                                        <IconButton
                                                            onClick={() => deleteData(item)}
                                                        >
                                                            <Delete />
                                                        </IconButton>
                                                    </ButtonGroup>
                                                    }

                                                </TableCell>
                                            ))
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
        </Card>
    )
}

export default Tables;