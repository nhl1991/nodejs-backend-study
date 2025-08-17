
function myWork(work) {
    return new Promise((resolve, reject) => {
        resolve(work.toUpperCase());
    })
}

function playGame(work) {
    return new Promise((resolve, reject) => {
        if (work === 'DONE') {
            resolve('GO PLAY GAME');
        } else {
            reject(new Error("DON'T"));
        }
    })
}

// callback보다 가독성 더 나쁨.
myWork('done')
    .then(function (result) {
        playGame(result).then(function (val) {
            console.log(val);
        })
    })

// 권장.
myWork('done')
    .then(playGame)
    .then(console.log)