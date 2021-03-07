import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  avatar: {
    borderRadius: "50%",
    maxWidth: "120px",
    maxHeight: "120px",
  },
  socialNetworkIcon: {
    paddingLeft: "5px",
  },
}));

const Creator = (props) => {
  const {
    src,
    fullName,
    contribution,
    linkedInUrl,
    githubUrl,
    profileUrl,
  } = props;

  const classes = useStyles();

  return (
    <div>
      <div style={{ float: "left" }}>
        <img src={src} alt="" className={classes.avatar} />
      </div>
      <div style={{ float: "left", paddingLeft: "10px", paddingTop: "15px" }}>
        <div>
          <strong>{fullName}</strong>
        </div>
        <div>{contribution}</div>
        <div style={{ float: "left", paddingTop: "15px" }}>
          {linkedInUrl ? (
            <a href={linkedInUrl} className={classes.socialNetworkIcon}>
              <img src="/images/linkedin.svg" alt="LinkedIn" />
            </a>
          ) : (
            ""
          )}
          {githubUrl ? (
            <a href={githubUrl} className={classes.socialNetworkIcon}>
              <img src="/images/github.svg" alt="Github" />
            </a>
          ) : (
            ""
          )}
          {profileUrl ? (
            <a href={profileUrl} className={classes.socialNetworkIcon}>
              <img src="/images/profile.svg" alt="Profile" />
            </a>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

Creator.propTypes = {
  className: PropTypes.string,
};

export default Creator;
