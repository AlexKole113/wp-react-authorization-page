import {useEffect, useReducer} from 'react';
import userAction from "./actions/user";
import userReducer from "./reducer/user";
import LogInForm from "./components/LogInForm";
import AccountPage from "./components/AccountPage";
import API from "./api/api";

const App = () => {

  const initialState = { state: null, data: {} };
  const [state, dispatch] = useReducer(userReducer, initialState);
  const logIn = (data) => dispatch({type: userAction.authorized.type, payload: data });
  const logout = () =>  dispatch({type: userAction.failure.type, payload: null });

  useEffect(()=>{
    const token = localStorage.getItem('token');
      if(token) {
        API.token = token;
        dispatch({ type: userAction.authorized.type })
      }
  },[])

  return (
    <section className={`app`}>
        { state.state !== userAction.authorized.type ? <LogInForm logIn={logIn} /> : <AccountPage user={state.data} logout={logout} /> }
    </section>
  );
}

export default App;
