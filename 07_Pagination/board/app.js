const express = require("express");
const postService = require("./services/post-service");
const handlebars = require("express-handlebars"); // 템플릿 엔진
/**
 * express-handlebars와 express-hbs가 있는데, hbs가 좀 더 많은 기능을 제공하지만, 업데이트가 안되는듯.
 */

const app = express();
const { ObjectId } = require("mongodb");

let collection;
const mongodbConnection = require("./configs/mongodb-connection");
app.engine(
  "handlebars",
  handlebars.create({
    helpers: require("./configs/handlebars-helper"),
  }).engine
); // 템플릿 엔진 등록
//handlebars의 config으로 handlebars.engine({ layoutsDir: "views"}); 기본 레이아웃 디렉토리 지정가능.

app.set("view engine", "handlebars"); // 웹페이지 로드 시 사용할 템플릿 엔진 설정
app.set("views", __dirname + "/views"); // 뷰 디렉터리를 views로 설정. node를 실행하는 경로의 상대 경로로 지정되어 에러 날 수 있으니 절대경로로.
app.listen(3000, async () => {
  console.log("Express server is on the way.");

  const mongoClient = await mongodbConnection();

  collection = mongoClient.db("board").collection("post"); // 명시적으로 db()로 지정 가능

  console.log("MongoDB connected");
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/** 메인 */
app.get("/", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const search = req.query.search || "";
  try {
    const [posts, paginator] = await postService.list(collection, page, search);
    res.render("home", {
      title: "익스프레스 게시판",
      search,
      paginator,
      posts,
    });
  } catch (err) {
    console.log(err);
  }
});

app.post("/check-password", async (req, res) => {
  const { id, password } = req.body;

  const post = await postService.getPostByIdAndPassword(collection, {
    id,
    password,
  });

  if (!post) return res.status(404).json({ isExist: false });
  else return res.json({ isExist: true });
});
/** 글 작성 페이지 */
//
app.get("/write", async (req, res) => {
  res.render("write", { title: "익스프레스 게시판", mode: "create" });
});

/** 글 작성 */
app.post("/write", async (req, res) => {
  const post = req.body;

  const result = await postService.writePost(collection, post);

  res.redirect(`/detail/${result.insertedId}`);
});

/** 글 상세 보기 */
app.get("/detail/:id", async (req, res) => {
  // 게시글 정보 가져오기
  const result = await postService.getDetailPost(collection, req.params.id); // id 값으로 찾기

  res.render("detail", { title: "익스프레스 게시판", post: result });
});

/** 글 수정 */
app.get("/modify/:id", async (req, res) => {
  const { id } = req.params.id;

  const post = await postService.getPostById(collection, req.params.id);

  res.render("write", { title: "테스트 게시판", mode: "modify", post });
});

app.post("/modify/", async (req, res) => {
  const { id, title, writer, password, content } = req.body;
  // 게시글 수정
  const post = {
    title,
    writer,
    password,
    content,
    createdDt: new Date().toISOString(),
  };
  // 업데이트 결과
  const result = postService.updatePost(collection, id, post);
  res.redirect(`/redirect/${id}`);
});

/** 게시글 삭제 */
app.delete("/delete", async (req, res) => {
  const { id, password } = req.body;
  try {
    const result = await collection.deleteOne({
      _id: new ObjectId(id),
      password: password,
    });

    if (result.deletedCount !== 1) {
      console.log("삭제 실패");
      return res.json({ isSuccess: false });
    }
    return res.json({ isSuccess: true });
  } catch (err) {
    console.log(err);
    return res.json({ isSuccess: false });
  }
});

app.post("/write-comment", async (req, res) => {
  const { id, name, password, comment } = req.body;
  const post = await postService.getPostById(collection, id);
  console.log(post.comments ? "true" : "false");

  if (post.comments) {
    post.comments.push({
      idx: post.comments.length + 1,
      name,
      password,
      comment,
      createdDt: new Date().toISOString(),
    });
  } else {
    //게시글에 댓글 정보가 없으면 리스트에 댓글 정보 추가
    post.comments = [
      {
        idx: 1,
        name,
        password,
        comment,
        createdDt: new Date().toISOString(),
      },
    ];
  }

  postService.updatePost(collection, id, post);
  return res.redirect(`/detail/${id}`);
});

app.delete("/delete-comment", async (req, res) => {
  const { id, idx, password } = req.body;

  const post = await collection.findOne({
    _id: new ObjectId(id),
    comments: { $elemMatch: { idx: parseInt(idx), password } },
  });

  if(!post) return res.json({ isSuccess: false});

  post.comments = post.comments.filter((comment) => comment.idx != idx);
  postService.updatePost(collection, id, post);
  return res.json({ isSuccess: true });
});
