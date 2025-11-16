const paginator = require("../utils/paginator");
const { ObjectId } = require("mongodb");
async function list(collection, page, search) {
  const perPage = 10;

  const query = { title: new RegExp(search, "i") }; // title === search ?

  // limit은 10개, skip은 설정된 개수만큼 건너 뜀. 'createdDt: -1'로 생성일 역순으로 정렬
  const cursor = collection
    .find(query, { limit: perPage, skip: (page - 1) * perPage })
    .sort({
      createdDt: -1,
    });
  // 검색어에 걸리는 게시물의 총합
  const totalCount = await collection.count(query);
  const posts = await cursor.toArray();

  // 페이지네이터 생성
  const paginatorObj = paginator({ totalCount, page, perPage: perPage });
  return [posts, paginatorObj];
}

// 글 작성
async function writePost(collection, post) {
  post.hits = 0;
  post.createdDt = new Date().toISOString();
  return await collection.insertOne(post);
}

//
const projectionOption = {
  projection: {
    // 프로젝션(투영) 결괏값에서 일부만 가져올때 사용. 프로젝션은 데이터베이스에서 필요한 필드들만 선택해서 가져오는 것.
    password: 0, // 0 : 결과값에서 제외 1:이 값만 결과값에 포함.
    "comments.password": 0,
  },
};

// 글 가져오기

async function getDetailPost(collection, id) {
  // 글 읽을때 마다 조회수 증가 시키기 위해, findOneAndUpdate 사용
  return await collection.findOneAndUpdate(
    // ObjectId(id:number)가 deprecated
    { _id: new ObjectId(id) }, // mongoDB6x
    {
      $inc: {
        hits: 1,
      },
    },
    projectionOption
  );
}

async function getPostByIdAndPassword(collection, { id, password }) {
  return await collection.findOne({ _id: new ObjectId(id), password: password }, projectionOption);
}

async function getPostById(collection, id){
  return await collection.findOne({ _id: new ObjectId(id)}, projectionOption)
}

async function updatePost(collection, id, post){
  const toUpdatePost = {
    $set: {
      ...post,
    },
  };
  return await collection.updateOne({ _id: new ObjectId(id)}, toUpdatePost)
}

module.exports = {
  list,
  writePost,
  getDetailPost,
  getPostByIdAndPassword,
  getPostById,
  updatePost
};
