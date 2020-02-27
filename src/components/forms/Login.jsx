import React from 'react'
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button
} from "@chakra-ui/core";

import axios from 'axios'


// import Password from './Password'

import { Formik, Field } from 'formik'



function Login(props) {
  function validateEmail(value) {
    let error;
    if (!value) {
      error = "Email is required";
    } else if (!value.includes('@')) {
      error = "must include @";
    }
    return error;
  }

  function validatePassword(value) {
    let error;
    if (!value) {
      error = "Password is required";
    } else if (value.length < 6) {
      error = "must be of 6 characters";
    }
    return error;
  }

  return (
    <Formik
      initialValues={{ email: '', password:'' }}
      onSubmit={(values, actions) => {
        // setTimeout(() => {
        //   alert(JSON.stringify(values, null, 2));
        //   actions.setSubmitting(false);
        // }, 1000);
        // console.log(values)
        let {email, password} = values
        axios.post("/api/login",
        { email, password}
          ).then(res => {
        if(res.data.success){
        console.log(res.data,'success')
        localStorage.setItem('token',res.data.token)
         actions.setSubmitting(false);
         window.location.href = '/user'
        }
        else if(res.data.success===false){
        // this.setState({error:res.data.error.message|| res.data.error.errmsg})
        console.log('faliure',res.data)
        }
        }).catch(error => console.error(error))
      }}
    >
      {props => (
        <form onSubmit={props.handleSubmit}>
          <Field name="email" validate={validateEmail}>
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.email && form.touched.email} mt='5'>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input type="email" {...field} id="email" placeholder="Enter Email"  />
                <FormErrorMessage>{form.errors.email}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name="password" validate={validatePassword} >
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.password && form.touched.password} mt='5'>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input type="password" {...field} id="password" placeholder="Enter password" autoComplete="false" />
                <FormErrorMessage>{form.errors.password}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Button
            mt={4}
            variantColor="teal"
            isLoading={props.isSubmitting}
            type="submit"
            bg="pink.500"
          >
            Submit
          </Button>
        </form>
      )}
    </Formik>
  );
}


export default Login