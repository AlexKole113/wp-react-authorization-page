import styled from "styled-components";
import {useState} from "react";
import API from "../../api/api";
const FormContainer = styled.div`
    position: absolute;
    top:50%;
    left: 50%;
    padding: 10px;
    transform: translateX(-50%) translateY(-50%);
    box-shadow: 0px 1px 4px 0px #00000047;
    min-width: 250px;
`
const Label = styled.label`
    display:flex;
    flex-flow:column;
    margin-bottom: 1rem;   
`
const Submit = styled.input.attrs({ type: 'submit' })`
    display:block;
    width:100%;
`

const Message = styled.div`;
    position:absolute;
    top: 25%;
    text-align:center;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    color:tomato
`



const LogInForm = ({logIn}) => {
    const [response, setResponse] = useState(null)
    const [username, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const authorization = () => {
        API.authorization({username,password})
            .then((response) => {
                if(response.token) {
                    logIn(response)
                } else if(response.message) {
                    setResponse(response.message)
                }
            })
            .catch((v)=>{
                setResponse(v.name)
            })
    }


   return (
       <>
           {response && <Message dangerouslySetInnerHTML={{__html: response}}></Message> }
           <FormContainer>
               <form onSubmit={ (e)=> {e.preventDefault(); authorization()} } action="/">
                   <Label>
                       <span>login</span>
                       <input type="text" value={username} onChange={(e)=>{ setLogin(()=> e.target.value) }} />
                   </Label>
                   <Label>
                       <span>password</span>
                       <input type="text" value={password} onChange={(e)=>{ setPassword(()=> e.target.value) }} />
                   </Label>
                   <Submit value={'log in'} name={`password`} />
               </form>
           </FormContainer>
       </>

    )
}

export default LogInForm;
