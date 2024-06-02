import { HOMEPAGE } from "../HomePage/HomePage.js";

export const LOGINPAGE=()=>{

    WIDGET(`

        <h2>Wallet</h2>

        <input class='CCode' type='tel' maxlength='5' placeholder='Enter Code' />

        <button class='forestgreen'>Sign In</button>
    
    `);

    CLICKED('.forestgreen',()=>{

        const Code=document.querySelector('.CCode');

        if(!Code.value){

            MESSAGE('Enter Code');

            return
        }

        if(Code.value ==='05012'||'20011'){

            if (Code ==='05012') {

                localStorage.setItem('User','01');

                localStorage.setItem('Name','ErouAndrewRichard');

                localStorage.setItem('Email','erouandrewrichard01@gmail.com');
                
            } else {

                localStorage.setItem('User','02');

                localStorage.setItem('Name','NagamiEstherRuth');

                localStorage.setItem('Email','nagamiestherruth@gmail.com');
                
            }

            HOMEPAGE();

        }else{

            MESSAGE('Wrong COde');

            return

        }


    })

}