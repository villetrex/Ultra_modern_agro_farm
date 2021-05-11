import React from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import CircularProgress from "@material-ui/core/CircularProgress";
import Badge from "@material-ui/core/Badge";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import InputAdornment from "@material-ui/core/InputAdornment";
import DeleteIcon from "@material-ui/icons/Delete";

import useRequest from "../../../../utils/useRequest";
import authHeader from "../../../../utils/auth-header";
import { InlineLoader } from "../../../../components/IsLoading";
import SnackBar from "../../../../components/SnackBar";

import config from "../../../../utils/config";
import "./singleProductStyle.css";

const KEYS = config();

const useStyles = makeStyles(theme => ({
  appBar: {
    position: "relative",
    color: "#FFF",
    background: "rgba(18, 107, 22, 0.88)",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
    "&::before": {
      content: '"My Farm - "',
    },

    [theme.breakpoints.down("sm")]: {
      fontSize: 13,
      marginLeft: 5,
      "&::before": {
        content: '""',
      },
    },
  },
  body: {
    marginTop: -20,
    [theme.breakpoints.down("sm")]: {
      marginTop: -30,
    },
  },
  bodyContent: {
    padding: theme.spacing(2, 6),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2),
    },
  },
  btn: {
    height: 27,
    margin: "3px 5px",
    fontSize: 9,
    marginBottom: 10,
  },
  message: { fontSize: 30, textAlign: "center", margimBottom: 30 },
  span: { color: "gray", textAlign: "left", fontSize: 14 },
  paper: {
    width: "100%",
    height: 140,
    display: "flex",
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-end",
    fontSize: 14,
    [theme.breakpoints.down("sm")]: {
      fontSize: 9,
    },
    textAlign: "center",
  },
  prodDetails: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    color: "gray",
    fontSize: 12,
    margin: "10px 5px",
    textAlign: "center",
  },
  bodyImg: {
    // backgroundPosition: "right bottom, left top",
    zIndex: 10,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    width: "100%",
    height: 400,
    backgroundPosition: "center",
    // filter: "blur(1px)",
    boxShadow:
      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    [theme.breakpoints.down("sm")]: {
      height: 270,
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

  my_btns: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({
  farmId,
  farmName,
  farmPic,
  handleClose,
  token,
}) {
  const classes = useStyles();
  const [imgData, setImgData] = React.useState("/img/defaultSingleFarm2.jpg");

  // GET All products for this farm
  const url = KEYS.API_URL + "/api/product/" + farmId;

  const { data, error, isValidating, mutate } = useRequest({
    url,
    headers: authHeader(token),
  });

  const refresh = () => {
    mutate();
  };

  // SnackBar Props
  const [msg, setMsg] = React.useState("");
  const [msgType, setMsgType] = React.useState("success");
  const [SnackBarOpen, setSnackBarOpen] = React.useState(false);

  const [open, setOpen] = React.useState(false);
  const handleClickOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    if (farmPic) {
      //convert image file to base64-encoded string
      let base64Image = Buffer.from(farmPic.data, "binary").toString("base64");

      //combine all strings
      let imgSrcString = `data:${farmPic.contentType};base64,${base64Image}`;
      setImgData(imgSrcString);
    }
  }, [farmPic]);

  return (
    <div>
      {SnackBarOpen && (
        <SnackBar
          autoHideDuration={10000}
          message={msg}
          handleClose={() => setSnackBarOpen(false)}
          type={msgType}
        />
      )}

      <Dialog
        fullScreen
        open={true}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {farmName.toUpperCase()}
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              CLose
            </Button>
          </Toolbar>
        </AppBar>
        <div className={classes.body}>
          <div
            style={{ backgroundImage: `url("${imgData}")` }}
            className={classes.bodyImg}
          />
          <div className={classes.bodyContent}>
            <h2>
              All Products for this farm
              <Badge
                badgeContent={data ? data.response.length : "0"}
                color="secondary"
                style={{ margin: "0 15px" }}
              />
            </h2>
            <Button
              color="inherit"
              variant="outlined"
              onClick={handleClickOpenDialog}
            >
              Add A new Product
            </Button>

            <DisplayData
              data={data}
              error={error}
              isValidating={isValidating}
            />
            {open && (
              <AddNewProductDialog
                open={open}
                farmId={farmId}
                token={token}
                handleClose={handleCloseDialog}
                refresh={refresh}
                setMsg={setMsg}
                setMsgType={setMsgType}
                setSnackBarOpen={setSnackBarOpen}
              />
            )}
          </div>
        </div>
      </Dialog>
    </div>
  );
}

const DisplayData = ({ data, error, isValidating }) => {
  const classes = useStyles();

  const deleteFarm = id => console.log({ id });

  if (isValidating) return <InlineLoader />;
  if (error) return <div>An Error Occured!</div>;
  if (data) {
    if (data.response) {
      if (!data.response.length) {
        return (
          <div className={classes.message} style={{ margin: 30 }}>
            You have not added any Product yet under this farm!
          </div>
        );
      } else {
        return (
          <>
            <div className={classes.message}>
              <span className={classes.span}>
                Click on an item to open product
              </span>
            </div>
            <Grid container spacing={2}>
              {data.response.map(product => (
                <SingleProductBox
                  key={Math.random() + product.name}
                  product={product}
                  deleteFarm={() => deleteFarm(product._id)}
                />
              ))}
            </Grid>
          </>
        );
      }
    }
  } else {
    return <InlineLoader />;
  }

  return <InlineLoader />;
};

const AddNewProductDialog = ({
  open,
  handleClose,
  farmId,
  refresh,
  token,
  setMsg,
  setMsgType,
  setSnackBarOpen,
}) => {
  const [name, setName] = React.useState("");
  const [quantity, setQuantity] = React.useState("");
  const [sold, setSold] = React.useState("");

  const [file, setFile] = React.useState(null);

  const onChangeFile = e => {
    if (e.target.files[0]) {
      const type = e.target.files[0].type;
      if (type !== "image/png" && type !== "image/jpeg" && type !== "image/jpg")
        return alert("Invalid Image file sected!");
      setFile(e.target.files[0]);
    }
  };

  const createNewProduct = async () => {
    if (!name.trim()) {
      console.log(443344);
      setMsg("Form not Completed");
      setMsgType("error");
      setSnackBarOpen(true);

      return;
    }

    const url = KEYS.API_URL + "/api/product/add/" + farmId;

    const formData = new FormData();
    formData.append("image", file);
    formData.append(
      "data",
      JSON.stringify({
        name,
        farm: farmId,
        quantity,
        sold,
      })
    );

    try {
      await axios.post(url, formData, {
        headers: authHeader(token),
        "Content-Type": "multipart/form-data",
      });
      refresh();
      handleClose();
      setMsg("New Product Has been Created Successfully!");
      setMsgType("success");
      setName("");
      setSnackBarOpen(true);
    } catch (e) {
      if (e.response) {
        if (e.response.data) {
          console.log(e.response.data);
        }
      }

      setMsg("An Error Occured!");
      setMsgType("error");
      setSnackBarOpen(true);
      setName("");
    }
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add New Product</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter your name of the product here.
          </DialogContentText>

          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Product Name"
            type="email"
            fullWidth
            value={name}
            onChange={e => setName(e.target.value)}
          />

          <TextField
            margin="dense"
            id="name"
            label="Product Quantity"
            type="number"
            fullWidth
            value={quantity}
            onChange={e => setQuantity(e.target.value)}
          />

          <TextField
            margin="dense"
            id="name"
            label="Product Price"
            type="number"
            fullWidth
            value={sold}
            onChange={e => setSold(e.target.value)}
          />

          <TextField
            label="Product Image"
            type="file"
            fullWidth
            onChange={e => onChangeFile(e)}
            inputProps={{
              accept: "image/jpg, image/jpeg, image/png",
              endadornment: (
                <InputAdornment position="end">
                  <PhotoCamera />
                </InputAdornment>
              ),
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={() => createNewProduct()} color="primary">
            Create New
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const SingleProductBox = ({ product, deleteFarm }) => {
  const classes = useStyles();

  const { pic } = product;
  const [imgData, setImgData] = React.useState("/img/singleProductDefault.jpg");

  const url = KEYS.API_URL + "/api/product/stats/" + product._id;
  const { data, error, isValidating } = useRequest({
    url,
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
              {product.name}
            </Typography>

            <div className={classes.my_btns}>
              <Button
                className={classes.btn}
                variant="outlined"
                color="secondary"
                size="small"
              >
                open
              </Button>

              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => deleteFarm()}
              >
                <DeleteIcon style={{ color: "red" }} />
              </IconButton>
            </div>
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
      </div>
    </div>
  );
};
