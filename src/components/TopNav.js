import React from "react"
import {Layout,Button} from "antd"
import  {useAuth0}  from "./../react-auth0-wrapper";


const {Header} = Layout

const TopNav = () => {
    
    console.log(useAuth0());
    
    const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
    return (
        <Layout>
            <Header>
            {!isAuthenticated && (<Button type="primary" 
                                          onClick={() => loginWithRedirect({})}>
                                    Log in
                                  </Button>
            )}

            {isAuthenticated && <Button type="primary" 
                                        onClick={() => logout()}>
                                    Log out
                                </Button>}
            
            </Header>
        </Layout>
    )
}

export default TopNav