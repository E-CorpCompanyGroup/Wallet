import { HOMEPAGE } from "../HomePage/HomePage.js"
import { LOGINPAGE } from "../LoginPage/LoginPage.js"

export const AUTOLOGINPAGE=()=>{

    if (localStorage.getItem('User')) {

        HOMEPAGE();
        
    }else{

        LOGINPAGE();

    }

}