import { HOMEPAGE } from "../HomePage/HomePage.js";

export const LOGINPAGE=()=>{

    WIDGET(`

        <h2>Wallet</h2>

        <input class='MyCode' type='tel' maxlength='5' placeholder='Enter Code' />

        <button class='forestgreen'>Sign In</button>
    
    `);

    CLICKED('.forestgreen',()=>{

        const Code=document.querySelector('.MyCode');

        if(!Code.value){

            MESSAGE('Enter Code');

            return
        }


        if (Code.value !== '05012' || Code.value !==  '20011' ) {

            MESSAGE('Wrong COde');

            return;
            
        }

        if (Code ==='05012') {

            localStorage.setItem('User','01');

            localStorage.setItem('Name','ErouAndrewRichard');

            localStorage.setItem('Email','erouandrewrichard01@gmail.com');

            HOMEPAGE();

            return;
            
        }

        if (Code.value ==='20011') {

            localStorage.setItem('User','02');

            localStorage.setItem('Name','NagamiEstherRuth');

            localStorage.setItem('Email','nagamiestherruth@gmail.com');

            HOMEPAGE();

            return;
            
        }


    })

}