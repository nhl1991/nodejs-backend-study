

const waitbyMiliSec = (ms) => {
  
  return new Promise((resolve) => {
    setTimeout(()=> resolve(`${ms/1000}초 경과.`), ms)
  })
}

[1000, 5000, 3000].forEach(ms => {
  waitbyMiliSec(ms).then(console.log);
});

// const allResult = Promise.all([waitbyMiliSec(1000),waitbyMiliSec(3000),waitbyMiliSec(5000),])

// allResult.then(console.log)