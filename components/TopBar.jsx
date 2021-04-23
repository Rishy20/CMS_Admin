import React from 'react'
import './TopBar.css'
import {Grid, IconButton, InputBase, makeStyles, Paper} from "@material-ui/core";
import {KeyboardArrowLeft, Menu, Search} from "@material-ui/icons";

const useStyles = makeStyles({
    menuButton: {
        padding: "8px"
    },
    searchButton: {
        padding: "4px",
        marginInline: "8px"
    },
    searchForm: {
        boxShadow: "none",
        borderRadius: "16px",
        backgroundColor: "#F8F8FB",
        marginInlineStart: "8px"
    }
})

//Admin TopBar
function TopBar(props) {
    const styles = useStyles();

    return (
        <div
            className={
                `topBar
                ${props.collapsed && "topBarExtended"}`
            }
        >
            {/* TopBar content */}
            <Grid container alignItems="center" className="topBarGrid">

                {/* NavBar collapse/extend button */}
                <Grid item>
                    <IconButton
                        className={styles.menuButton}
                        onClick={props.setCollapsed}
                    >
                        {props.collapsed ? <Menu/> : <KeyboardArrowLeft />}
                    </IconButton>
                </Grid>

                {/* Search bar */}
                <Grid item>
                    <Paper component="form" className={styles.searchForm}>
                        <IconButton
                            type="submit"
                            className={styles.searchButton}
                        >
                            <Search />
                        </IconButton>
                        <InputBase
                            name="searchInput"
                            placeholder="Search..."
                            value={props.search}
                            onChange={props.setSearch}
                        >
                        </InputBase>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}
export default TopBar;