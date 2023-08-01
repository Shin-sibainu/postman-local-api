const express = require("express");
const app = express();

app.use(express.json());

let blogPosts = [
  {
    id: 1,
    title: "ダミータイトル1",
    content: "これはダミーブログの内容1です。",
  },
  {
    id: 2,
    title: "ダミータイトル2",
    content: "これはダミーブログの内容2です。",
  },
  {
    id: 3,
    title: "ダミータイトル3",
    content: "これはダミーブログの内容3です。",
  },
];
let currentId = 4;

// 全記事取得
app.get("/posts", (req, res) => {
  res.json(blogPosts);
});

// 詳細ページ取得
app.get("/posts/:id", (req, res) => {
  const post = blogPosts.find((p) => p.id === parseInt(req.params.id));
  if (post) {
    res.json(post);
  } else {
    res.status(404).send({ error: "Post not found" });
  }
});

// 新規作成
app.post("/posts", (req, res) => {
  const { title, content } = req.body;
  const newPost = { id: currentId++, title, content };
  blogPosts.push(newPost);
  res.json(newPost);
});

// 編集
app.put("/posts/:id", (req, res) => {
  const post = blogPosts.find((p) => p.id === parseInt(req.params.id));
  if (post) {
    const { title, content } = req.body;
    post.title = title || post.title;
    post.content = content || post.content;
    res.json(post);
  } else {
    res.status(404).send({ error: "Post not found" });
  }
});

// 削除
app.delete("/posts/:id", (req, res) => {
  const postIndex = blogPosts.findIndex(
    (p) => p.id === parseInt(req.params.id)
  );
  if (postIndex > -1) {
    blogPosts.splice(postIndex, 1);
    res.status(204).send();
  } else {
    res.status(404).send({ error: "Post not found" });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
