import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { NumberPlatesSearch } from "./components";
import { Grid, Paper, Container } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import ReactGA from "react-ga";

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
  cookies: {
    color: "black",
    backgroundColor: "transparent",
    fontWeight: "bold",
    border: "none",
    "&:hover": {
      color: "red",
    },
  },
}));

const NumberPlatesSearchView = () => {
  const classes = useStyles();
  const [keyDown, setKeyDown] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  let history = useHistory();

  useEffect(() => {
    if (keyDown) {
      ReactGA.event({
        category: "Comments",
        action: "Search",
        label: searchTerm,
      });

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
      <meta name="description" content="Search by numberplate"></meta>
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
                  title="Zvoga Malta"
                  alt="Zvoga"
                  src="/images/zvoga.png"
                  width="179px"
                  height="100%"
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
                  src="/images/car-yellow-flash.png"
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
            <a
              style={{ color: "black", cursor: "pointer", fontWeight: "bold" }}
              class="termly-cookie-preference-button"
              onClick={() => {
                window.displayPreferenceModal();
              }}
            >
              Manage Cookie Preferences
            </a>
            &nbsp; &nbsp; &nbsp; &nbsp;
            <a
              href="https://app.termly.io/document/privacy-policy/8a2e7228-4538-4253-98aa-307e401306b3"
              style={{ color: "black" }}
            >
              <b>Privacy Policy</b>
            </a>
          </div>
        </div>
      </React.Fragment>
    </div>
  );
};

export default NumberPlatesSearchView;
