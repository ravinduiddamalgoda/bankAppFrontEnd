import { makeStyles } from "@material-ui/core";
import { Box, Button, Container, FormControl, TextField, Typography} from "@mui/material";
import { Formik } from "formik";
import * as Yup from 'yup';
import { Link, Navigate } from "react-router-dom";
import { height } from "@mui/system";
import { useContext } from "react";
import { AuthContext } from "../component/AuthProvider";
import { useSnackbar } from "notistack";
import axios from "axios";


const useStyle = makeStyles((theme) => ({
  root: {
    background: "white",
    // height: "100vh",
    // margin: "0 auto",
    marginTop: '7%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: '5%',
    paddingBottom: '5%',
    height: '60vh',
    display: 'flex',
    flexDirection: 'column',
    paddingTop:'2%',
    paddingBottom: '0',
    borderColor: 'black',
    // background: "white",
    borderRadius: '6px',
    borderBlockWidth :'thick',
    border: 'solid',
    borderTopColor: '#824AAF',
    borderRightColor: '#824AAF',
    borderLeftColor: '#824AAF',
    borderBottomColor: '#824AAF',

    [theme.breakpoints.up('900')]: {
      width: '30%',
    },
    [theme.breakpoints.down('900')]: {
      width: '60%',
    },
    [theme.breakpoints.down('600')]: {
      width: '95%',
    },

  },
  formCtrl: {
    marginTop: '10px',
    padding: '3%'  
  },
  login: {
    fontFamily: '"Segoe UI"',
    paddingLeft: '28%'

  }

}));

export function LoginPage(){
  const classes = useStyle();
  let { init } =  useContext(AuthContext);
  const {enqueueSnackbar} = useSnackbar();

  const saveToken = async ( payload) => {
    await localStorage.setItem('token' , JSON.stringify(payload))
  }


  const makeLogin = async (formData) => {
    try {
      const res = await axios.post('http://localhost:5000/login', {
        ...formData,
      });
      await saveToken(res.data);
      enqueueSnackbar('Succesfully Logged In', { variant: 'success' });
      init && (await init());
      Navigate('../app');
    } catch (err) {
      const error = err.message;
      enqueueSnackbar(error, { variant: 'error' });
    }
  };

    return(
      <div style={{ width : '100%' , height:'100%' , margin: '0'}}>
      <Box className={classes.root}>
        <Formik 
          initialValues={{
            email: "",
            password: "",
          }}
          
          validationSchema={Yup.object().shape({
            email: Yup.string().email('Provide an valid email').required(),
            password: Yup.string().required(),
          })}
          onSubmit = {makeLogin}

        >
          {({values, handleChange, handleSubmit}) => {
            return (
              <>
                <Typography variant="h3" className={classes.login}>LOGIN</Typography>
              
                <FormControl className={classes.formCtrl} style={{marginTop: '20px' , marginLeft:'10px' , marginRight: '10px'}}>
                  <TextField
                    value={values.email}
                    onChange={handleChange}
                    name="email"
                    label="Email"
                    placeholder="email"
                    
                  />
                </FormControl>
                
                <FormControl className={classes.formCtrl} style={{marginTop: '20px', marginLeft:'10px' , marginRight: '10px'}}>
                  <TextField
                    value={values.password}
                    onChange={handleChange}
                    name="password"
                    label="Password"
                    type={"password"}
                    placeholder="password"
                  />
                </FormControl>

                <Button
                  onClick={() => handleSubmit()}
                  type="submit"
                  variant="contained"
                  style={{marginTop: '20px' , marginLeft:'10px' , marginRight: '10px'}}
                >
                  Submit
                </Button>
              </>
            );
          }}
        </Formik>
      </Box>
      </div>
    ); 
  }



  