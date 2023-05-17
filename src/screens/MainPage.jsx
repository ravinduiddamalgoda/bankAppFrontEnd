import { makeStyles } from "@material-ui/core";
import { Box, Button, Container, FormControl, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../component/AuthProvider";
import img from "../assets/userIcon.png"
import { Navigate} from "react-router-dom";
import { useSnackbar } from 'notistack';
import { Formik } from "formik";


const useStyles = makeStyles((theme) => ({

    boxStyle: {

        [theme.breakpoints.up('900')]: {
            width: '65%',
        },
        [theme.breakpoints.down('900')]: {
            width: '65%',
        },
        [theme.breakpoints.down('600')]: {
            width: '80%',
        }, 
        background: '#4EB5FF',
        marginLeft: '15%',
        marginRight: '15%',
        borderRadius: '30px',
        marginTop:'3%'
    },
    
    mainCol: {
        display: 'flex' , 
        flexDirection: 'row',
        // backgroundColor:'white'
    },
    iconImg: {
      
      width:'75px',
      height:'75px',
      paddingLeft: '5%',
      paddingTop: '2%' ,
      paddingBottom: '3%',
      paddingRight: '30px'
    },

    typoMain:{
      marginLeft: '1%', 
      marginTop: '4%', 
      fontFamily: '"Segoe UI"',
      color:'white',
      flex:'1',
      // textDecoration: 'line-through',
      fontSize: '25px',
      fontWeight: '900',
    },
    typoMainText:{
      marginLeft: '4%', 
      marginTop: '4%',
      // marginTop: '4%', 
      fontFamily: '"Segoe UI"',
      color:'white',
      // flex:'1',
      // textDecoration: 'line-through',
      fontSize: '25px',
      fontWeight: '900',
    },
    typoMainTextSub:{
      marginTop: '4%',
      marginLeft: '3%', 
      // marginTop: '4%', 
      fontFamily: '"Segoe UI"',
      color:'white',
      flex:'1',
      // textDecoration: 'line-through',
      fontSize: '25px',
      fontWeight: '900',
    },

    btnLogout:{
      color: 'white',
      marginRight: '5%'
    },
    typoEnd:{
      marginTop: '4%',
      marginLeft: '7%',
      paddingBottom: '4%', 
      // marginTop: '4%', 
      fontFamily: '"Segoe UI"',
      color:'white',
      flex:'1',
      // textDecoration: 'line-through',
      fontSize: '25px',
      fontWeight: '400',
    },

    intraTrans:{
      background:'white' ,
      width:'60%' , 
      marginLeft: '20%',
      borderRadius: '16px'
       
    },

    cancelBtntrans:{
      marginLeft:'2%',
      marginTop: '3%',
      // background: '#4EB5FF', 
      color: 'white',
      marginBottom:'2%'
      // display: 'flex'
    } ,
    
    transferText:{
      marginLeft: '4%', 
      marginTop: '2%', 
      fontFamily: '"Segoe UI"',
      // textDecoration: 'line-through',
      fontSize: '20px',
      fontWeight: '700',
    } ,
    textFieldAmount: {
      marginLeft: '5%' ,

    }, 
    amountBtn:{
      marginLeft:'7%',
      marginTop: '3%',
      boxShadow: 'none',
      width: '200px',
      textTransform: 'none',
      fontSize: 20,
      padding: '6px 12px',
      border: '1px solid',
      borderRadius: '30px',
      fontFamily: 'Roboto',
      // lineHeight: 1.5,
      backgroundColor: 'white',
      borderColor: 'white',
      '&:hover': {
        backgroundColor: '#1f5a84',
        borderColor: '#0062cc',
        boxShadow: 'none',
        color: 'white'
      },
      '&:active': {
        boxShadow: 'none',
        backgroundColor: '#0062cc',
        borderColor: '#005cbf',
        color:'#4EB5FF'
      },
      '&:focus': {
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
      },
    },

    imgStyle:{
      width:'100px',
      height:'100px'
    }

}));




function AddAmountCard(email){
  const [addAmountBtn , setAddAmountBtn] = useState(false);
  const {client} = useContext(AuthContext);
  const classes = useStyles();
  // const setAmount = useContext(setAmount);

  const [val , setVal] = useState('')
  if(addAmountBtn){
    return(<>
      <Box className={classes.intraTrans}>
      <Typography className={classes.transferText}>Add Amount</Typography>
          <TextField
          className={classes.textFieldAmount}
          
            variant="standard" 
            value={val}
            name="Amount"
            label="Amount"
            onChange={e => setVal(e.target.value)}
          />

        <Box>
          <Button onClick={() => {
            setAddAmountBtn(!addAmountBtn)
            // setAmount(val)
            // var emailVal = JSON.stringify(email);
            console.log(email.email);

              async function addAmountAcc(){
                const pathVal = 'acc/' + email.email;
                try{
                  const res = await client?.put(pathVal , {amount:val});
                  
      
                }catch(err){
                  enqueueSnackbar('Something went wrong', { variant: 'error' });
                }
              }
              addAmountAcc();
          
            location.reload();
            }} variant="contained" className={classes.cancelBtntrans} >Set Amount</Button>
          <Button onClick ={()=> setAddAmountBtn(!addAmountBtn)} variant="contained" className={classes.cancelBtntrans}>Cancel</Button>
        </Box>
        

      </Box>
        
    </>);
  } 
  else{
    return(<>
      <Box>
        <Button onClick={() => setAddAmountBtn(!addAmountBtn)} className={classes.amountBtn}> Add Amount</Button>
      </Box>
      
     
    
    </>);
  }
  

  
 

}


function InterBankTrans(acc){
  const {client} = useContext(AuthContext);
  const [bankBtn , setBankBtn] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const makeTransfer = async (formData) => {
    try {
      const res = await axios.post('http://localhost:5000/log/createLog', {
        ...formData
      });  
      console.log(formData.amount);
      console.log(acc);
      // "amount":formData.amount,
      //   "recieverAC":formData.recieverAC ,
      //   "senderAC":acc.acc
      // await saveToken(res.data);
      enqueueSnackbar('Succesfully Transfered', { variant: 'success' });

    } catch (err) {
      const error = err.message;
      enqueueSnackbar(error, { variant: 'error' });
    }
  };



  if(bankBtn){
    return(<>
    <Box className={classes.intraTrans}>
    <Typography className={classes.transferText}>Transfer Amount</Typography>
      <Formik
        initialValues={{
          senderAC: acc.acc,
          recieverAC: "",
          amount: "",
        }}

        onSubmit = {makeTransfer}
      >
        {({values, handleChange, handleSubmit}) => {
            return (
              <>
               <FormControl style={{marginTop: '20px' , marginLeft:'10px' , marginRight: '10px'}}>
                  <TextField
                    disabled
                    value={values.senderAC}
                    onChange={handleChange}
                    name="senderAC"
                    label="senderAC"
                    placeholder="Enter Your Acc"
                    
                  />
                </FormControl>
              
                <FormControl style={{marginTop: '20px' , marginLeft:'10px' , marginRight: '10px'}}>
                  <TextField
                    value={values.recieverAC}
                    onChange={handleChange}
                    name="recieverAC"
                    label="reciever ACC"
                    placeholder="recieverAC"
                    
                  />
                </FormControl>
                
                <FormControl style={{marginTop: '20px', marginLeft:'10px' , marginRight: '10px'}}>
                  <TextField
                    value={values.amount}
                    onChange={handleChange}
                    name="amount"
                    label="amount"
                    placeholder="amount"
                  />
                </FormControl>

                <Button
                  onClick={() => handleSubmit()}
                  type="submit"
                  variant="contained"
                  style={{marginTop: '20px' , marginLeft:'10px' , marginRight: '10px'}}
                >
                  Transfer Amount
                </Button>
              </>
            );
          }}

      </Formik>
      <Button onClick={() => setBankBtn(!bankBtn)} className={classes.cancelBtntrans} variant="contained" color="info">Cancel</Button>

    </Box>
      
    </>);


  }

    return(<>
      <Box>
        <Button onClick={() => setBankBtn(!bankBtn)} className={classes.amountBtn}>InterBank Transfer</Button>
      </Box>
        
    </>);

}

export function MainPage(){
    var fname;
    var lname;
    var emailData;
    const classes = useStyles();
    const { client } = useContext(AuthContext);
    const token = useContext(AuthContext);
    const [name , setName] = useState('');
    const [lastname , setlastname] = useState('');
    const [amount , setAmount] = useState(0);
    const [accNo, setAccNo] = useState();
    const [email , setEmail] = useState();
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        const currentUser = async () => {
          const res = await axios
            .get('http://localhost:5000/currunt-user', {
              headers: {
                Authorization: 'Bearer ' + token.token,
              },
            })
            .then(res => {

              fname  = res.data.fname;
              lname = res.data.lname;
              emailData = res.data.email;
              setName(fname)
              setlastname(lname);
              setEmail(emailData);
              // console.log(typeof(email));

            });
        };
    
        if (token) currentUser();
      }, [token]);

      const logout = () => {
        localStorage.clear();
        Navigate('/login');
        location.reload();
      };

      useEffect(() => {

        async function fetchAcc(){
          try{
            const res = await client?.get('/acc/accDetail');
            if(res?.data){
              setAccNo(res.data.accountNo);
              setAmount(res.data.amount);
            }

          }catch(err){

          }
        }
        fetchAcc();
      }, []);


    

    return(
        <>
        
        <Container className = {classes.boxStyle}>
          <Box className = {classes.mainCol}> 
              <img src = {img} className = {classes.iconImg}/>
              <Typography className = {classes.typoMain} > {name} {lastname}</Typography>
              <Button className = {classes.btnLogout} onClick={() => {
                localStorage.clear();
                // Navigate('/login');
                location.reload();
              }}> LOGOUT </Button>

              
          </Box>

          <Box className = {classes.mainCol}>
            <Typography className = {classes.typoMainText}>Account Number </Typography>
            <Typography className = {classes.typoMainTextSub} > {accNo}</Typography>
          </Box>
          <Box className = {classes.mainCol}>
            <Typography className = {classes.typoMainText}>Available Balance </Typography>
            <Typography className = {classes.typoMainTextSub} > {amount}</Typography>
          </Box>
          <AddAmountCard  email = {email}/>
          <InterBankTrans acc = {accNo} />
          <Typography className = {classes.typoEnd} >YourBank.com</Typography>
        </Container>
        
        </>
    );
}