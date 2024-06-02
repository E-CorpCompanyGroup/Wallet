import { HOMEPAGE } from "../HomePage/HomePage.js"

export const PAYMENTPAGE=(link)=>{

    BACKHEADERWIDGET(()=>{HOMEPAGE()},

    `
        <h1 class='Section'>Complete Payments</h1>
    
    `,

    `
        <iframe src='${link}'/></iframe>

    `

    )

}