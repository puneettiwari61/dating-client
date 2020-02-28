import React from 'react'
import axios from 'axios'

import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
  Image
} from "@chakra-ui/core";
import { Formik, Field } from 'formik'



function Update(props) {
  function validateName(value) {
    let error;
    if (!value) {
      error = "Name is required";
      return error
    }
  }
  const nameInput = React.createRef();

  const handleImage = (e) => {

    const files = e.target.files
    const data = new FormData()
    data.append('file', files[0])
    data.append('upload_preset', 'tiwari')
    axios.post('https://api.cloudinary.com/v1_1/puneet61/image/upload',data)
    .then(res =>{
      props.updateImage(res.data.url)
      // this.setState({src:res.data.url})
    } 
    ).catch(err => console.log(err))
  }

  const updateFinal = (e) => {
    axios.put('api/user/update',{image: props.user.image, name: nameInput.current.value}, {headers: {"authorization":localStorage.token}})
    .then(res => res.data).catch(err => console.log(err))
  } 
  return (
    <>
    <Image src={props.user && props.user.image} mt='4' />
    <Formik
      initialValues={{ name: props.user && props.user.name}}
      enableReinitialize
      onSubmit={(values, actions) => {
        // setTimeout(() => {
        //   alert(JSON.stringify(values, null, 2));
        //   actions.setSubmitting(false);
        // }, 1000);
      }}
    >
      {props => (
        <form onSubmit={props.handleSubmit}>
          <Field name="name" validate={validateName}>
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.name && form.touched.name} isRequired>
                <FormLabel htmlFor="name">Full name</FormLabel>
                <Input {...field} id="name" placeholder="name" ref={nameInput} />
                <FormErrorMessage>{form.errors.name}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name="image" >
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.image && form.touched.image} isRequired>
                <FormLabel htmlFor="image">Upload Image</FormLabel>
                <Input {...field} id="image" placeholder="image" type='file' onChange={handleImage}  />
                <FormErrorMessage>{form.errors.image}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Button
            mt={4}
            variantColor="teal"
            isLoading={props.isSubmitting}
            type="submit"
            display='none'
          >
            Submit
          </Button>
        </form>
      )}
    </Formik>
      <Button m='2' bg='pink.500' color='white' onClick={updateFinal} >Upload</Button>
    </>
  );
}


export default Update

