import { useEffect, useState, } from "react";
import { Logo,FormRow } from "../components";
import Wrapper from "../assets/wrappers/RegisterPage";
  import {  toast } from "react-toastify";
import { registerUser,loginUser } from "../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// redux toolkit and useNavigate later
const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: false,
};
// if possible prefer local state
// global state

function Register() {
  const [values, setValues] = useState(initialState);
const dispatch = useDispatch()
const {isLoading,user} = useSelector((store) => {return store.user })
const navigate = useNavigate()
  // redux toolkit and useNavigate later

  const handleChange = (e) => {
    const name  = e.target.name
    const value = e.target.value
    setValues({...values,[name]:value})
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const {email,password,name,isMember} = values
    if (!email || !password || (!name && !isMember)) {
      toast.warning("please provide all values ");
    }
    if(isMember) {
      dispatch(loginUser({email,password}))
    }
    if(!isMember) {
      dispatch(registerUser({name,email,password}))
    }
  };

  const toggleMember = () => { setValues({...initialState,isMember:!values.isMember}) }

useEffect(() => { if(user) {setTimeout(() => { navigate('/') },3000)} },[user,navigate])
  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={onSubmit}>
        <Logo />
        <h3>{values.isMember ? "Login" : "Register"}</h3>

        {/* name field */}
        <div className="form-row">
          {/* name field */}
          {!values.isMember && (
            <FormRow
              type="text"
              name="name"
              value={values.name}
              handleChange={handleChange}
            />
          )}
          {/* email field */}
          <FormRow
            type="email"
            name="email"
            value={values.email}
            handleChange={handleChange}
          />
          {/* password field */}
          <FormRow
            type="password"
            name="password"
            value={values.password}
            handleChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-block" disabled={isLoading}>
          {isLoading?'loading':'submit'}
        </button>
        <p>
          {values.isMember ? "Not a member yet?" : "Already a member?"}

          <button type="button" onClick={toggleMember} className="member-btn">
            {values.isMember ? "Register" : "Login"}
          </button>
        </p>
      </form>
    </Wrapper>
  );
}
export default Register;
