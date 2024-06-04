import { HOMEPAGE } from "../HomePage/HomePage.js";

export const LOGINPAGE = () => {

    WIDGET(`

        <h2>Wallet</h2>

        <input class='MyCode' type='tel' maxlength='5' placeholder='Enter Code' />

        <button class='forestgreen'>Sign In</button>

    `);

    CLICKED('.forestgreen', () => {

        const code = document.querySelector('.MyCode').value;

        if (code === '') {

            MESSAGE('Please enter a Code');
            return;

        };

        if (code === '05012') {

            localStorage.setItem('User', '01');
            localStorage.setItem('Name', 'ErouAndrewRichard');
            localStorage.setItem('Email', 'erouandrewrichard01@gmail.com');
            HOMEPAGE();

        } else if (code === '20011') {

            localStorage.setItem('User', '02');
            localStorage.setItem('Name', 'NagamiEstherRuth');
            localStorage.setItem('Email', 'nagamiestherruth@gmail.com');
            HOMEPAGE();

        } else {

            MESSAGE('Wrong Code');

        };

    });

};
