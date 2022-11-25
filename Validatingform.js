import { useState} from 'react';
import './Validatingform.css';
function ValidatingForm() {
    const initValues={username:'',email:'',password:''}
    const [formValues,setFormValues]=useState(initValues);
    const [formErrors,setFormErrors]=useState({});
    const [isSubmit,setIsSubmit]=useState(false);

    const handleChange=(event)=>{
        const{id,value}=event.target;
        setFormValues({...formValues,[id]:value});
        console.log(formValues);
    }

    const handleSubmit=(event)=>{
        event.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
    }
    const validate=(values)=>{
        const errors={};
        const reg=new RegExp("[0-9]")
        const preg=new RegExp("[A-Z][A-za-z0-9$_]+") 

        if(!values.username)
        errors.username="Username is Required";
        else if(values.username.length<5)
        errors.username="Username must have minimum 5 characters";
        else if(reg.test(values.username))
        errors.username="Username must contain only alphabets";

        if(!values.email)
        errors.email="Email is Required";
        
        if(!values.password)
        errors.password="Password is Required";
        else if(!preg.test(values.password))
        errors.password="Format of Password is not corrcet";
        return errors;
    }

    return ( 
        <>
        <div className='container'>
           {/* {
                Object.keys(formErrors).length===0 && isSubmit?
                (<h1 style={{background:"green",color:"white"}}>Signed In Successfully</h1>)
                :(<pre>{JSON.stringify(formValues,undefined,3)}</pre>)
            }*/}

        <form onSubmit={handleSubmit}>
            <h1>User Registration Form</h1>
            
            <div className='row'>
                <label>User Name</label>
                <input type="text" id='username' placeholder='Type User Name Here' value={formValues.username}
                    onChange={handleChange}/>
            </div>
            <p  style={{color:"red"}}>{formErrors.username}</p>

            <div className='row'>
                <label>E-mail</label>
                <input type="email" id='email' placeholder='Type User Email-id Here' value={formValues.email}
                    onChange={handleChange}/>
            </div>
            <p  style={{color:"red"}}>{formErrors.email}</p>

            <div className='row'>
                <label>Password</label>
                <input type="password" id='password' placeholder='Type User Password Here' value={formValues.password}
                    onChange={handleChange}/>
            </div>
            <p  style={{color:"red"}}>{formErrors.password}</p>

            <div className='row'>
                <button className='btn btn-primary'>Login</button>
            </div>
        </form>
        </div>
        </>
     );
}

export default ValidatingForm