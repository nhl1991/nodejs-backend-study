const axios = require("axios");

const url = "http://raw.githubusercontent.com/wapj/jsbackend/main/movieinfo.json";

axios.get(url).then((result) => {
    if(result.status != 200){
        throw new Error("Request rejected.");
    }

    if(result.data){
        return result.data;
    }

    throw new Error("No data.");
})
.then((data) => {
    if(!data.articleList || data.articleList.size == 0) {
        throw new Error("No data.");
    }
    return data.articleList;
})
.then((articles) => {
    return articles.map((article, idx) => {
        return { title: article.title, rank: idx + 1};
    });
})
.then((results) => {
    for(let movieInfo of results){
        console.log(`[${movieInfo.rank}위] ${movieInfo.title}`);
    }
})
.catch((err) => {
    console.log("<< Error >>");
    console.log(err);
})