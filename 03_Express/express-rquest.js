

async function requestExpress(){
    const axios = require("axios");
    const response = await axios.get("http://localhost:3000/ranking").then((res)=> res.data);

    console.log(response);

}

requestExpress();