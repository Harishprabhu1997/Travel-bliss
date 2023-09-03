import dayjs from 'dayjs';
import axios from 'axios';

export const registerValue = {
    firstName: '',
    lastName: '',
    userName: '',
    confirmPassword: '',
    password: '',
    gender: '',
    dateOfBirth: dayjs(new Date()),
    firstNameError: false,
    lastNameError: false,
    userNameError: false,
    passwordError: false,
    confirmPasswordError: false,
    genderError: false,
    responseError:false,
    responseMessage:''
}

export const registerSubmit = (register: any, setRegiser: any,navi:any) => {
    
    const { firstName, lastName, userName, password, dateOfBirth,confirmPassword, firstNameError, lastNameError, gender,userNameError, passwordError, confirmPasswordError, genderError } = register;
    if (!firstName.length) {
        setRegiser({ ...register, firstNameError: true })
    }
    else if (!lastName.length) {
        setRegiser({ ...register, lastNameError: true })
    }
    else if (!userName.length) {
        setRegiser({ ...register, userNameError: true })
    }
    else if (!password.length || password.length < 4 || password.length > 9) {
        setRegiser({ ...register, passwordError: true })
    }
    else if (!confirmPassword.length || !(password === confirmPassword)) {
        setRegiser({ ...register, confirmPasswordError: true })
    }
    else if (!firstNameError && !lastNameError && !userNameError && !passwordError && !confirmPasswordError && !genderError) {
        axios.post('http://localhost:8080/api/auth/register',
        {
            firstname:firstName,
            lastname:lastName,
            gender:gender,
            dob:dateOfBirth,
            username:userName,
            password:password
        })
        .then(function (response) {
            navi('/',{state:{
message:'New account successfully created!!!'
            }})
        })
        .catch(function (error) {
            setRegiser({ ...register, responseError: true,responseMessage:error.response.data.message })
        });

    }

}
export const setValue = (e: any, update: any, stateVal: any) => {

    const { name, value, id } = e.target
    update((prevState: any) => ({ ...prevState, [name]: value }))
    if (!value.length ||
        (name === 'password' && value.length < 4 || value.length > 9)
        || (id === 'confirmPasswordError' && !(stateVal.password === value))) {
        update((prevState: any) => ({ ...prevState, [id]: true }))

    }

    else {
        update((prevState: any) => ({ ...prevState, [id]: false }))

    }

}