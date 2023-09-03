export const loginVal ={
    userName:'',
    password:'',
    userNameError:false,
    passwordError:false
}
export const loginsetValue =(val:any,stateChange:any)=>{
    const { name, value } = val.target
    stateChange((prevState: any) => ({ ...prevState, [name]: value }))
}