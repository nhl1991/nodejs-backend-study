
function goodPromise(val) {

    return new Promise((resolve, reject) => {
        resolve(val);
    })
}

goodPromise("世の中には")
.then((val)=>{
    return val + "こんな"
})
.then((val)=>{
    return val + "コードは"
})
.then((val)=>{
    return val + "ありません。"
})
.then((val)=>{
    console.log(val);
})
.catch((err) => console.log(err));
