import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { NumberPlatesSearch } from "./components";
import { Grid, Paper, Container } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    textAlign: "center",
    boxShadow: "none",
    backgroundColor: "transparent",
  },
  footer: {
    [theme.breakpoints.down("xs")]: {
      textAlign: "left",
      marginLeft: "5px",
    },
    position: "fixed",
    left: 0,
    bottom: 10,
    width: "100%",
    textAlign: "center",
  },
  text: {
    fontSize: "18px",
    lineHeight: "21px",
    letterSpacing: "0em",
    textAlign: "right",
  },
}));

const NumberPlatesSearchView = () => {
  const classes = useStyles();
  const [keyDown, setKeyDown] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  let history = useHistory();

  useEffect(() => {
    if (keyDown) {
      history.push({
        pathname: "/comments",
        state: {
          searchTerm: searchTerm,
        },
      });
    }
  }, [keyDown, searchTerm, history]);
  return (
    <div className={classes.root}>
      <React.Fragment>
        <Container maxWidth="sm">
          <Grid
            container
            spacing={3}
            alignItems="center"
            style={{
              backgroundColor: "#FFCF4D",
              minHeight: "35vh",
              marginBottom: "1%",
            }}
            justify="center"
          >
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <img
                  alt="Zvoga"
                  src="/images/zvoga.png"
                  width="179px"
                  margin-left="89px"
                ></img>
              </Paper>
            </Grid>
            <Grid item xs={6} style={{ marginTop: "15px" }}>
              <Paper className={classes.paper}>
                <div className={classes.text}>
                  The new way to comment on other people's driving!
                </div>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.paper}>
                <img
                  alt="Zvoga"
                  src="/images/car-accident.png"
                  width="83px"
                  height="58px"
                  margin-bottom="50px"
                />
              </Paper>
            </Grid>
          </Grid>
        </Container>
        <div
          style={{
            backgroundColor: "purple",
            height: "200px",
            width: "100%",
          }}
        >
          <div
            style={{
              paddingTop: "30px",
              display: "flex",
              flexFlow: "row wrap",
              justifyContent: "center",
            }}
          >
            <div
              className={classes.text}
              style={{
                color: "white",
                paddingRight: "1%",
                paddingTop: "1%",
                paddingBottom: "5%",
                float: "left",
              }}
            >
              Enter a license plate number <br /> to view and post comments:
            </div>
            <div
              style={{
                paddingTop: "0.5%",
                float: "left",
              }}
            >
              <NumberPlatesSearch
                searchTerm={setSearchTerm}
                keyDown={setKeyDown}
                style={{ width: "250px" }}
                isReadonly={false}
              />
            </div>
          </div>
        </div>

        <div className={classes.footer}>
          <div>
            <a href="/creators" style={{ color: "black" }}>
              <b>Meet the creators</b>
            </a>
          </div>
        </div>
      </React.Fragment>
    </div>
  );
};

export default NumberPlatesSearchView;
