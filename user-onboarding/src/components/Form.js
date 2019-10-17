import React,{useEffect, useState} from 'react';
import axios from 'axios';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup'


const UserForm = ({values, touched, errors, status}) => {

    const [user, setUser] = useState([]);

    useEffect(() =>{
        status && setUser(user => [...user, status])
    },[status])


    return(
      <div>
          <h1>Sing Up</h1>
          <Form>
            <label>
                Name:
                <Field type='text' placeholder='Full Name' name='name'/>
            </label>
            <br/>
                {touched.name && errors.name && <p>{errors.name}</p>}
            <label>
                Email:
                <Field type='email' placeholder='Email' name='email'/>
            </label>
            <br/>
                {touched.email && errors.email && <p>{errors.email}</p>}
            <label>
                Password:
                <Field type='password' placeholder='Password' name='password'/>
            </label>
            <br/>
                {touched.password && errors.password && <p>{errors.password}</p>}   
            <label>
                Terms of Service:
                <Field type='checkbox' name='service'/>
            </label>
            <br/>
            <button type='submit'>Sign Up</button>
          </Form>

        {
            user.map(info =>(
                
                <div key={info.id}>
                        <h1>{info.name}</h1>
                        <h3>{info.email}</h3>
                </div>

            ))
        }



      </div>
    )
}


const HightorderCompon = withFormik({

    mapPropsToStatus({name, email, password, service}){
        return{
            name: name || '',
            email: email || '',
            password: password || '',
            service: service || false
        }
    },

    validationSchema: Yup.object().shape({
        name: Yup.string().required('Need your name'),
        email: Yup.string().required('Need this too'),
        password: Yup.string().required('Definitely need this'),
    }),

    handleSubmit(values, {setStatus}){
        axios
        .post("https://reqres.in/api/users/", values)
        .then(response => {
            setStatus(response.data)
        })
        .catch(err => console.log(err))
    }

})(UserForm);

export default HightorderCompon
