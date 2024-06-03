import { CONNECTION } from "../../Connection/Connection.js";
import { PAYMENTPAGE } from "../PaymentPage/PaymentPage.js";

export const HOMEPAGE=()=>{

    STORE('local','UserData',JSON.stringify({"Name":"Name"}))

    STORE('local','CONNECTIONURL','https://e-corpcompanygroup.github.io/Wallet/App/index.html');

    WIDGET(
    `

       <h1>Wallet</h1>

       <input type='tel' class='Amount' placeholder='Enter Amount In Ugandan Shillings' />

       <textarea class='Reason' placeholder='Enter Reason'></textarea>

       <button class='Code'>+256</button>

       <input class='Telephone' type='tel' maxlength='9' placeholder='Enter PhoneNumber' />

       <button class='forestgreen'>Deposit</button>

       <button class='blue'>Switch Account</button>
    
    `);

    CLICKED('.blue',()=>{
        localStorage.clear();
        CONNECTION();
    })

    const Amount=document.querySelector('.Amount');

    EVENT(Amount,'input',()=>{

        STORE('','Amount',Amount.value);

    })

    const Reason=document.querySelector('.Reason');

    EVENT(Reason,'input',()=>{

        STORE('','Reason',Reason.value);

    })

    const Telephone=document.querySelector('.Telephone');

    EVENT(Telephone,'input',()=>{

        STORE('','Telephone',Telephone.value);

    })

    const forestgreen=document.querySelector('.forestgreen');

    CLICKED('.forestgreen',()=>{

        if (Amount.value<500) {

            MESSAGE('Amount is less than 500 Ug shillings');

            return;
            
        };

        if (!Reason.value) {

            MESSAGE('Enter Reason');

            return;
            
        };

        if (!Telephone.value) {

            MESSAGE('Enter Phone Number');

            return;
            
        };

        LOADER(forestgreen);

        PESAPAL('https://e-corpcompanygroup.github.io/Wallet/App/index.html',sessionStorage.getItem('Amount'),'UGX',(link)=>{

            sessionStorage.clear();

            PAYMENTPAGE(link);

        })

    });
   

};