import { setTimeout } from "timers/promises";
async function myName() {
    return 'Andy';
}

console.log(myName()); // Promise{<'Andy'>} async를 쓰면 반환값은 Promise

async function ShowName() {
    const name = await myName();
    console.log('Inside async function : ', name);
}

console.log(ShowName()); // Promise{<pending>}.


function waitOneSecond(msg){ // Promise를 return 하기 때문에 async 필요 없음.
    return new Promise((resolve, _)=>{
        setTimeout(()=> resolve(`${msg}`), 1000)
    });
}

async function countOneToTen(){
    for (let x of [...Array(10).keys()]){
        let result = await waitOneSecond(`Wait for ${x+1}s`);
        console.log(result);
    }
    console.log('Completed.')
}

countOneToTen();