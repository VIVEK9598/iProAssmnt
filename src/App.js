import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";

function App() {
  const [data, setData] = useState([]);
  const [isComparing, setCcomparing] = useState([]);
  const [compareData, setCompareData] = useState([]);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/photos/?_limit=16")
      .then((res) => {
        setData(res.data);
      });
  }, []);
  const handleCompare = (item) => {
    let currentItem = isComparing;
    currentItem.push(item.id);
    setCcomparing(currentItem);
    setCompareData((prev) => [...prev, ...[item]]);
  };
  const handleRemove = (delId) => {
    const currItem = isComparing.filter((item) => item !== delId);
    setCcomparing(currItem);
    const filterData = compareData?.filter((dt) => dt.id !== delId);
    setCompareData(filterData);
  };
  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);

  const StyledTableRow = withStyles((theme) => ({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);
  const useStyles = makeStyles({
    root: {
      maxWidth: 345,
      height: 345,
    },
    media: {
      height: 140,
    },
    noData: { display: "flex", justifyContent: "center", marginLeft: 310 },
    title: {
      height: "3.6em",
      maxHeight: "3.6em",
      lineHeight: "1.8em",
      display: "block",
      textOverflow: "ellipsis",
      wordWrap: "break-word",
      overflow: "hidden",
    },
  });
  const classes = useStyles();

  return (
    <div className="App">
      <Grid container spacing={3}>
        {data.map((item) => {
          const { title, thumbnailUrl, url, id } = item;
          return (
            <Grid item xs={12} md={4} sm={6} lg={3} key={id}>
              <Card className={classes.root}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image={thumbnailUrl}
                    title="Contemplative Reptile"
                  />
                  <CardContent>
                    <Typography
                      className={classes.title}
                      gutterBottom
                      variant="h5"
                      component="h2"
                    >
                      {title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {url}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {id}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button
                    onClick={() =>
                      isComparing.includes(item.id)
                        ? handleRemove(item.id)
                        : handleCompare(item)
                    }
                    size="small"
                    variant="contained"
                    color={
                      !isComparing.includes(item.id) ? "primary" : "secondary"
                    }
                  >
                    {!isComparing.includes(item.id) ? "Compare" : "Remove"}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      <br />

      <Typography variant="h4" color="textSecondary">
        Comparing Item
      </Typography>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Image</StyledTableCell>
              <StyledTableCell align="right">Id</StyledTableCell>
              <StyledTableCell align="right">Title</StyledTableCell>
              <StyledTableCell align="right">Url</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {compareData.length !== 0 ? (
              compareData.map((row) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell component="th" scope="row">
                    <CardMedia
                      className={classes.media}
                      image={row.thumbnailUrl}
                      title="Contemplative Reptile"
                    />
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.id}</StyledTableCell>
                  <StyledTableCell align="right">{row.title}</StyledTableCell>
                  <StyledTableCell align="right">{row.url}</StyledTableCell>
                </StyledTableRow>
              ))
            ) : (
              <Typography
                variant="h4"
                color="textSecondary"
                className={classes.noData}
              >
                No data
              </Typography>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default App;
