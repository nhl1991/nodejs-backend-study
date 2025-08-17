
function myWork(work) {
    return new Promise((resolve, reject) => {
        if (work === 'done') {
            resolve('Available.');
        } else {
            reject(new Error('Not Available.'));
        }
    })
}

//콜백과 다를 바가 없음.
myWork('done').then(function (value) { console.log(value) }, function (err) {
    console.log(err);
})


// 권장
myWork('doing')
    .then(function (value) { console.log(value) })
    .catch(function (err) { console.error(err) })