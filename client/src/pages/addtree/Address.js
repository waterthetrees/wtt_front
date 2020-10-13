import React, {useState, useEffect, useRef} from 'react';
import { useForm } from 'react-hook-form';

import {
  Alert,
} from 'reactstrap';

import { 
  Input, 
  InputLabel, 
  makeStyles,
  FormControlLabel,
  FormControl,
  FormLabel,
  TextField } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function TreeAddress({address}) {
  const componentName = 'TreeAddress';
  const classes = useStyles();
  const { register, handleSubmit, errors } = useForm({
    defaultValues: {
      // address: address.address,
      // city: address.city,
      // State: address.state,
      // zip: address.zip,
      // neighborhood: address.neighborhood,
    }
  });

  const [addressMessage, setAddressUpdate] = useState();

  console.log(componentName, 'errors', errors, 'HERE1 ERROR');
  
  return (
    <div  key={name} className='addtreemodal__location-item'>
    <FormControl variant="filled" className={classes.formControl}>
    <TextField id="Address:" label="Address:" variant="filled" 
    type="text" name="Address" ref={register({required: true, maxLength: 100})}/>
    <InputLabel for='Address1' className='addtreemodal__location-item__label'>Address:
    <Input className='addtreemodal__location-item__entry' type="text" name="Address" ref={register({required: true, maxLength: 100})} /></InputLabel>
    {errors.address && <ErrorMessageAll errors={errors} name={"Address"}/>}
    
    <InputLabel for='city' className='addtreemodal__location-item__label'>City:</InputLabel>
    <Input className='addtreemodal__location-item__entry' type="text" name="city" ref={register({required: true, minLength: 1, maxLength: 100})} />
    {errors.city && <ErrorMessageAll errors={errors} name={"city"}/>}
    
    <InputLabel for='state' className='addtreemodal__location-item__label'>State:</InputLabel>
    <select name="state" className='addtreemodal__location-item__entry' ref={register({ required: true })}>
    <option value='AK'>Alaska</option>
    <option value='AL'>Alabama</option>
    <option value='AR'>Arkansas</option>
    <option value='AZ'>Arizona</option>
    <option value='AA'>Armed Forces Americas</option>
    <option value='AE'>Armed Forces Europe</option>
    <option value='AP'>Armed Forces Pacific</option>
    <option value='CA'>California</option>
    <option value='CO'>Colorado</option>
    <option value='CT'>Connecticut</option>
    <option value='DC'>District of Columbia</option>
    <option value='DE'>Delaware</option>
    <option value='FL'>Florida</option>
    <option value='GA'>Georgia</option>
    <option value='HI'>Hawaii</option>
    <option value='IA'>Iowa</option>
    <option value='ID'>Idaho</option>
    <option value='IL'>Illinois</option>
    <option value='IN'>Indiana</option>
    <option value='KS'>Kansas</option>
    <option value='KY'>Kentucky</option>
    <option value='LA'>Louisiana</option>
    <option value='MA'>Massachusetts</option>
    <option value='MD'>Maryland</option>
    <option value='ME'>Maine</option>
    <option value='MI'>Michigan</option>
    <option value='MN'>Minnesota</option>
    <option value='MO'>Missouri</option>
    <option value='MS'>Mississippi</option>
    <option value='MT'>Montana</option>
    <option value='NC'>North Carolina</option>
    <option value='ND'>North Dakota</option>
    <option value='NE'>Nebraska</option>
    <option value='NH'>New Hampshire</option>
    <option value='NJ'>New Jersey</option>
    <option value='NM'>New Mexico</option>
    <option value='NV'>Nevada</option>
    <option value='NY'>New York</option>
    <option value='OH'>Ohio</option>
    <option value='OK'>Oklahoma</option>
    <option value='OR'>Oregon</option>
    <option value='PA'>Pennsylvania</option>
    <option value='PR'>Puerto Rico</option>
    <option value='RI'>Rhode Island</option>
    <option value='SC'>South Carolina</option>
    <option value='SD'>South Dakota</option>
    <option value='TN'>Tennessee</option>
    <option value='TX'>Texas</option>
    <option value='UT'>Utah</option>
    <option value='VA'>Virginia</option>
    <option value='VT'>Vermont</option>
    <option value='WA'>Washington</option>
    <option value='WI'>Wisconsin</option>
    <option value='WV'>West Virginia</option>
    <option value='WY'>Wyoming</option>
  </select>
  {errors.state && ErrorMessageAll(errors.state.type)}

      <TextField id="zip:" label="Zip:" variant="filled" 
    type="text" name="zip" ref={register({required: true, minLength: 5, maxLength: 10, pattern: /^\d{5}(?:[-\s]\d{4})?$/i})}/>
    <InputLabel for='zip' className='addtreemodal__location-item__label'>zip:</InputLabel>
    <Input className='addtreemodal__location-item__entry' type="text" name="Zip" 
      ref={register({required: true, minLength: 5, maxLength: 10, pattern: /^\d{5}(?:[-\s]\d{4})?$/i})} />
    {errors.zip && <ErrorMessageAll errors={errors} name={"zip"}/>}
    
    <InputLabel for='neighborhood' className='addtreemodal__location-item__label'>Neighborhood:</InputLabel>
    <Input className='addtreemodal__location-item__entry' type="text" name="neighborhood" 
      ref={register({required: false, minLength: 2, maxLength: 20 })} />
    {errors.neighborhood && <ErrorMessageAll errors={errors} name={"neighborhood"}/>}

    {addressMessage && <Alert color='success'>{addressMessage}</Alert>}
    </FormControl>
  </div>
  );
}

const ErrorMessage = (errorMessage) => {
  console.log(errorMessage, 'ERRRRRRRRRR')
  return (<Alert color='danger' className="invalid-feedback alert">{errorMessage}</Alert>);
};

const ErrorMessageAll = ({errors, name}) => {
  if (Object.keys(errors).length === 0) return;
  const functionName = 'ErrorMessageAll';
  console.log(functionName, errors, name, 'errors[name]',errors[name],'errors[name].type', errors[name].type,'toaster video');
  const required = `${name} field is required`;
  const maxLength = `${name} input exceed maximum length`;
  const minLength = `${name} input is too short`;
  const pattern = `${name} needs correct format.`;
  return (
    <>
    {/* {errors[name] && errors[name].type === "required" && <Alert color='danger' className="invalid-feedback alert">{required}</Alert>} */}

    {errors[name] && errors[name].type === "required" && <Alert color='danger' className="alert">{required}</Alert>}
    {errors[name] && errors[name].type === "maxLength" && <Alert color='danger' className="alert">{maxLength}</Alert>}
    {errors[name] && errors[name].type === "minLength" && <Alert color='danger' className="alert">{minLength}</Alert>}
    {errors[name] && errors[name].type === "pattern" && <Alert color='danger' className="alert">{pattern}</Alert>}
    </>
  )
};