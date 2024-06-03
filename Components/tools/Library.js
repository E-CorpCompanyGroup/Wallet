const PESAPAL=(CONNECTIONURL,LINK,AMOUNT,CURRENCY,callback)=>{

    //TOKEN

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");

    var raw = JSON.stringify({
    "consumer_key": "vvOhTSA4GBwtE6qkMuVq8hwNXMHOLxaO",
    "consumer_secret": "28GnlDzP3k/JkdAmUCgEkU8RD7k="
    });

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    fetch("https://pay.pesapal.com/v3/api/Auth/RequestToken", requestOptions)
    .then(response => response.json())
    .then(result => {

        //REGISTER IPN

        const TOKEN=result.token;

        const DATA=[
            0,1,2,3,4,5,6,7,8,9,
            1,2,3,4,5,6,7,8,9,0,
            2,3,4,5,6,7,8,9,0,1,
            3,3,4,5,6,7,8,9,0,1,
            4,5,6,7,8,9,0,1,2,3,
            5,6,7,8,9,0,1,2,3,4,
            6,7,8,9,0,1,2,3,4,5,
            7,8,9,0,1,2,3,4,5,6,
            8,9,0,1,2,3,4,5,6,7,
            9,0,1,2,3,4,5,6,7,8,
        ]

        SHUFFLE(DATA,(data)=>{

            const myHeaders = new Headers();
            myHeaders.append("Accept", "application/json");
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", "Bearer " + TOKEN );

            const raw = JSON.stringify({
                "url": CONNECTIONURL + data ,
                "ipn_notification_type": "GET",
            });
        
            const requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow',
                mode: "cors"
            };
            
            fetch('https://pay.pesapal.com/v3/api/URLSetup/RegisterIPN', requestOptions)

                .then(response => response.json())
                .then(result => {

                    const ID=result.id;

                    const NOTID=result.ipn_id;

                    DEJSON('local','UserData',(data)=>{

                        var myHeaders = new Headers();
                        myHeaders.append("Content-Type", "application/json");
                        myHeaders.append("Authorization", "Bearer " + TOKEN );
                    
                        var raw = JSON.stringify({
                        "id": ID,
                        "currency": CURRENCY,
                        "amount": AMOUNT,
                        "description": sessionStorage.getItem('Reason'),
                        "callback_url": LINK,
                        "notification_id":NOTID ,
                        "billing_address": {
                            "email_address": localStorage.getItem('Email'),
                            "phone_number": "+256"+sessionStorage.getItem('Telephone'),
                            "country_code": "",
                            "first_name": localStorage.getItem('Name'),
                            "middle_name": "",
                            "last_name": "",
                            "line_1": "",
                            "line_2": "",
                            "city": "",
                            "state": "",
                            "postal_code": null,
                            "zip_code": null
                        }
                        });
                    
                        var requestOptions = {
                        method: 'POST',
                        headers: myHeaders,
                        body: raw,
                        redirect: 'follow'
                        };
                                               
                        fetch('https://pay.pesapal.com/v3/api/Transactions/SubmitOrderRequest', requestOptions)
                        .then(response => response.json())
                        .then(result => {
                    
                            if (result.redirect_url) {

                                callback(result.redirect_url)
                  
                            }
                    
                        })

                        .catch(error => console.log('error', error));


                    })
                    
                })

            .catch(error => console.log('error', error));

        })
    
    })

    .catch(error => console.log('error', error));

}

