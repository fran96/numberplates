import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import { SearchInput } from "../../../../components";

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
    className,
    src,
    fullName,
    contribution,
    linkedInUrl,
    githubUrl,
    profileUrl,
    ...rest
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
              <img src="/images/linkedin.svg" />
            </a>
          ) : (
            ""
          )}
          {githubUrl ? (
            <a href={githubUrl} className={classes.socialNetworkIcon}>
              <img src="/images/github.svg" />
            </a>
          ) : (
            ""
          )}
          {profileUrl ? (
            <a href={profileUrl} className={classes.socialNetworkIcon}>
              <img src="/images/profile.svg" />
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
