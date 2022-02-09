import PostCreator from "../PostCreator";
import './index.css'
import LogOut from "../LogOut";

const AccountPage = ({user,logout}) => {
    return(
        <div className={`account-page-container`}>
            <PostCreator user={user} />
            <LogOut logout={logout} />
        </div>
    )
 }

 export default AccountPage;
