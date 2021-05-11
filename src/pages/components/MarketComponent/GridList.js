import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import useRequest from "../../../utils/useRequest";

import config from "../../../utils/config";
import "./singleProductStyle.css";

const KEYS = config();

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: "100%",
    height: 600,
  },
  tile: {
    width: 10,
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
    marginRight: 5,
    borderColor: "rgba(255, 255, 255, 0.54)",
  },
  paper: {
    width: "100%",
    height: 140,
    display: "flex",
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-end",
    fontSize: 14,
    textAlign: "center",

    [theme.breakpoints.down("sm")]: {
      fontSize: 9,
    },
  },
  btn: {
    height: 27,
    margin: "3px 5px",
    fontSize: 9,
    marginBottom: 10,
  },

  prodDetails: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    color: "black",
    fontSize: 12,
    margin: "10px 5px",
    textAlign: "center",
  },

  grid: {
    marginTop: 20,
    [theme.breakpoints.down("sm")]: {
      marginTop: 10,
    },
  },

  items_style: {
    fontSize: 12,
    fontFamily: "monospace",
    color: "green",

    "&>b": {
      color: "#b31d1d",
      fontFamily: "inherit",
    },
  },

  items_style_farm: {
    fontSize: 12,
    fontFamily: "monospace",
    whiteSpace: "nowrap",
    width: "100%",
    overflow: "hidden",
    textOverflow: "ellipsis",
    color: "gray",
    padding: "0px 5px",
    paddingLeft: 15,
    paddingBottom: 15,
    marginTop: -10,
    textAlign: "left",
  },
}));

export default function TitlebarGridList(props) {
  const classes = useStyles();
  const { data } = props;

  console.log(data);
  return (
    <div className={classes.root}>
      {!data.length ? (
        <div>No Product Has Been Added To The Database</div>
      ) : (
        <Grid container spacing={3} style={{ padding: 20 }}>
          {data.map(item => (
            <SingleProductBox item={item} key={Math.random()} />
          ))}
        </Grid>
      )}
    </div>
  );
}

const SingleProductBox = ({ item }) => {
  const classes = useStyles();

  const { pic } = item;
  const [imgData, setImgData] = React.useState("/img/singleProductDefault.jpg");

  const url = KEYS.API_URL + "/api/product/stats/" + item._id;
  const url2 = KEYS.API_URL + "/api/farm/get/" + item.farm;

  const { data, error, isValidating } = useRequest({
    url,
  });
  const { data: farm } = useRequest({
    url: url2,
  });

  React.useEffect(() => {
    if (pic) {
      //convert image file to base64-encoded string
      let base64Image = Buffer.from(pic.data, "binary").toString("base64");

      //combine all strings
      let imgSrcString = `data:${pic.contentType};base64,${base64Image}`;
      setImgData(imgSrcString);
    }
  }, [pic]);

  return (
    <div className="responsive">
      <div className="gallery">
        <img src={imgData} alt="Cinque Terre" width="600" height="400" />
        <div className="desc">
          <div>
            <Typography
              style={{
                textTransform: "capitalize",
                whiteSpace: "nowrap",
                width: "100%",
                overflow: "hidden",
                fontSize: 12,
                textOverflow: "ellipsis",
              }}
            >
              {item.name}
            </Typography>

            <Button
              className={classes.btn}
              variant="outlined"
              color="secondary"
              size="small"
            >
              open product
            </Button>
          </div>

          <div className={classes.prodDetails}>
            {error ? (
              <>GET error!</>
            ) : (
              <>
                {isValidating ? (
                  <CircularProgress size={20} />
                ) : (
                  <>
                    {data ? (
                      <>
                        <Typography className={classes.items_style}>
                          <b>Quantity</b>: {data.response.quantity}
                        </Typography>
                        <Typography className={classes.items_style}>
                          <b>Price</b>: {data.response.sold}
                        </Typography>
                      </>
                    ) : null}
                  </>
                )}
              </>
            )}
          </div>
        </div>
        {farm && farm.response && farm.response.name && (
          <Typography className={classes.items_style_farm}>
            Available @ {farm.response.name}dddddddddddddddddddddddddddddd
          </Typography>
        )}
      </div>
    </div>
  );
};
