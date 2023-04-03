import {
  FormHelperText,
  backdropClasses,
  Box,
  Button,
  FormControl,
  Input,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles } from "@material-ui/core";
import { useState } from "react";
import { Formik } from "formik";
import * as Yup from 'yup';
import { useSnackbar } from "notistack";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
  formCtrl: {
   
   margin:'10px',
  
    
  },
  formCtrl1: {
   
   display:'auto'
   
     
   },
  root: {
    background: "white",
    height: "100vh",
    margin: "0 auto",
    display: "flex",
    padding: "2%",
    // paddingTop: "10%",
    // marginTop: "5%",
    flexDirection: "column",
    // borderRadius:'10px',

    [theme.breakpoints.up("md")]: {
      width: "40%",
    },
    [theme.breakpoints.down("md")]: {
      width: "60%",
    },
    [theme.breakpoints.down("sm")]: {
      width: "95%",
    },
  },

  
}));



export function RegisterUser() {
  const className = useStyles();
  const {enqueueSnackbar} = useSnackbar();
  const navigate = useNavigate();

  const makeRegistration = async (formData) => {
    try {
      const res = await axios.post('http://localhost:5000/register', {
        ...formData,
      });
      // console.log(res);
      enqueueSnackbar('Succesfully Registered', { variant: 'success' });
      navigate('/login');
    } catch (err) {
      // console.log(res);
      const error = err.message;
       enqueueSnackbar(error, { variant: 'error' });
    }
  };

  const SignupSchema = Yup.object().shape({
    fname: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    lname: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(8 , 'Password must have atleast 8 characters'),
    nic: Yup.string().min(8 , 'Invalid NIC'),
    tp: Yup.number().min(10 , 'Invalid Phone Number')
  });


  return (
    <div style={{ background: "black" }}>
      <Box className={className.root}>
        <Formik
          initialValues={{
            fname: "",
            lname: "",
            email: "",
            password: "",
            nic: "",
            tp: "",
          }}
          
          validationSchema={SignupSchema}

          onSubmit = {makeRegistration}
        >
          {({values, handleChange, handleSubmit, errors}) => {
            return (
              <>
                <Typography variant="h3">Registration</Typography>
                <FormControl className={className.formCtrl} variant="outlined">
                  <TextField
                    
                    className={className.formCtrl1} 
                    value={values.fname}
                    onChange={handleChange}
                    name="fname"
                    label="First Name"
                    placeholder="first name"
                    error={errors.fname && errors.fname?.length ? true : false}
                  />
                </FormControl>
                <FormHelperText style={{ color: 'red' }}>
                  {errors.fname}
                </FormHelperText>
                <FormControl className={className.formCtrl}>
                  <TextField
                    error={errors.lname && errors.lname?.length ? true : false}
                    value={values.lname}
                    onChange={handleChange}
                    name="lname"
                    label="Last Name"
                    placeholder="last name"
                  />
                </FormControl>
                <FormHelperText style={{ color: 'red' }}>
                  {errors.lname}
                </FormHelperText>
                <FormControl className={className.formCtrl}>
                  <TextField
                    error={errors.email && errors.email?.length ? true : false}
                    value={values.email}
                    onChange={handleChange}
                    name="email"
                    label="Email"
                    placeholder="email"
                  />
                </FormControl>
                <FormHelperText style={{ color: 'red' }}>
                  {errors.email}
                </FormHelperText>
                <FormControl className={className.formCtrl} >
                  <TextField
                    error={errors.password && errors.password?.length ? true : false}
                    value={values.password}
                    onChange={handleChange}
                    name="password"
                    label="Password"
                    type={"password"}
                    placeholder="password"
                  />
                </FormControl>
                <FormHelperText style={{ color: 'red' }}>
                  {errors.password}
                </FormHelperText>
                <FormControl className={className.formCtrl}>
                  <TextField
                    value={values.nic}
                    error={errors.nic && errors.nic?.length ? true : false}
                    onChange={handleChange}
                    name="nic"
                    label="NIC"
                    placeholder="NIC"
                  />
                </FormControl>
                <FormHelperText style={{ color: 'red' }}>
                  {errors.nic}
                </FormHelperText>
                <FormControl className={className.formCtrl}>
                  <TextField
                    error={errors.tp && errors.tp?.length ? true : false}
                    value={values.tp}
                    onChange={handleChange}
                    name="tp"
                    label="TP"
                    placeholder="Telephone Number"
                  />
                </FormControl>
                <FormHelperText style={{ color: 'red' }}>
                  {errors.tp}
                </FormHelperText>

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
