import Login from './Login/Login'
import SignUp from './SignUp/SignUp'
const index = (props:any) => {
  return (
    <>
        {props.isLogin ? <Login /> : <SignUp />}
    </>
  )
}

export default index
