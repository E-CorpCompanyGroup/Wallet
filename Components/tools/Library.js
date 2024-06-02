const FILES=(ELEMENT,callback)=>{
    document.querySelector(ELEMENT).addEventListener('change', function(event) {
    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const reader = new FileReader();
    reader.onload = function(e) {
    const base64Data = e.target.result.split(',')[1];
    const fileType = file.type;
    const fileName = file.name;
    const fileSize = file.size;
    const DATA={
    "Base64":base64Data,
    "Name":fileName,
    "Size":fileSize,
    "Type":fileType
    };
    callback(DATA);
    };
    reader.readAsDataURL(file);
    }
    });
}


let intervalID; 

const colorChange = (ELEMENT) => {
    let index = 0;
    intervalID = setInterval(() => {
        index = (index + 1) % COLOR.length;
        STYLED(ELEMENT, 'border', `1px solid ${COLOR[index].name}`);
        STYLED(ELEMENT, 'background', 'transparent');
    }, 2000);
};

const stopColorChange = (ELEMENT,COLOR) => {
    clearInterval(intervalID);
    STYLED(ELEMENT, 'border', '1px solid forestgreen'); 
    STYLED(ELEMENT, 'background', COLOR);
};

const PESAPAL=(LINK,AMOUNT,CURRENCY,callback)=>{

    const CONNECTIONURL=localStorage.getItem('CONNECTIONURL');

    sessionStorage.removeItem('Link');

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
