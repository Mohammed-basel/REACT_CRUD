    import React from 'react'
    
    export default function Uservalidation(user) {
        let errors = {};
        if(user.name.trim()==""){
            errors.name="user name is required";
        }else if(user.name.trim().length <3){
            errors.name="user name must be more than 3 characters";
        }

        if(user.email.trim()==""){
            errors.email="user email is required";
        }else if(user.email.trim().length <9){
            errors.email="user email must be more than 9 characters";
        }

        if(user.password.trim()==""){
            errors.password="password is required";
        }else if(user.password.trim().length <3){
            errors.password="user password must be more than 3 characters";
        }


      return errors;
    }
    