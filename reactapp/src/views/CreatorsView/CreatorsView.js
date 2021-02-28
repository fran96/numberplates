import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { Creator } from "./components";
import { Grid, Paper, CssBaseline, Container } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    boxShadow: "none",
    backgroundColor: "transparent",
    paddingTop: "5%",
  },
  footer: {
    [theme.breakpoints.down("xs")]: {
      textAlign: "left",
      marginLeft: "5px",
    },
    position: "fixed",
    left: 50,
    bottom: 30,
    width: "100%",
  },
}));

const CreatorsView = () => {
  const classes = useStyles();

  let history = useHistory();

  return (
    <div className={classes.root}>
      <React.Fragment>
        <Container maxWidth="sm">
          <Grid
            container
            spacing={3}
            alignItems="center"
            style={{
              backgroundColor: "#FFCF4D;",
              minHeight: "35vh",
              marginBottom: "1%",
            }}
          >
            <Grid item xs={12} style={{ textAlign: "center" }}>
              <Paper className={classes.paper}>
                <img
                  alt="Zvoga"
                  src="/images/zvoga.png"
                  width="179px"
                  margin-left="89px"
                ></img>
              </Paper>
            </Grid>
            <Grid
              item
              xs={12}
              style={{ textAlign: "center", marginTop: "15px" }}
            >
              <h5>Meet the creators</h5>
            </Grid>
            <Grid item xs={2} />
            <Grid item xs={9}>
              <Creator
                src="images/grant.jpeg"
                fullName="Grant Camilleri"
                contribution="Product Design"
                linkedInUrl="https://www.linkedin.com/in/grant-camilleri-90898711b"
              ></Creator>
            </Grid>
            <Grid item xs={2} />
            <Grid item xs={9}>
              <Creator
                src="images/ben.jpeg"
                fullName="Ben Camilleri"
                contribution="Development"
                linkedInUrl="https://linkedin.com/in/camilleriben"
                githubUrl="https://github.com/bencami22"
              ></Creator>
            </Grid>
            <Grid item xs={2} />
            <Grid item xs={9}>
              <Creator
                src="images/fran.jpeg"
                fullName="Fran Micallef"
                contribution="Development"
                linkedInUrl="https://www.linkedin.com/in/francesca-micallef/"
                githubUrl="https://github.com/fran96"
              ></Creator>
            </Grid>
          </Grid>
        </Container>

        <div className={classes.footer}>
          <div>
            <a href="/" style={{ color: "black" }}>
              <b>Home &gt;</b>
            </a>
          </div>
        </div>
      </React.Fragment>
    </div>
  );
};

export default CreatorsView;
