'use strict';

const express = require('express');
const cors = require('cors');
const uuid = require('uuid');
const url = require('url');

const { validateComment } = require('./validation');
const { renderMarkdown } = require('./markdown');
const { storeComment, readComments } = require('./storage');
const config = require('./config');

const app = express();
const port = config.port;

app.use(cors());
app.use(express.json());

async function getComments(req) {
  const pageId = req.query.pageId;
  const comments = await readComments(pageId);
  return {
    comments: comments.map(mapComment),
  };
}

function getUserData(req) {
  const data = req.headers.authorization.split('===')[1];
  return JSON.parse(Buffer.from(data, 'base64').toString('utf8'));
}

async function createComment(req) {
  const comment = req.body;

  const { userId, username, userPic, userUrl, userEmail } = getUserData(req);

  const valid = validateComment(comment);

  if (!valid) {
    throw new Error(
      `Request validation failed: ${JSON.stringify(comment)} ${JSON.stringify(
        validateComment.errors,
      )}`,
    );
  }

  comment.userId = userId;
  comment.username = username;
  comment.userPic = userPic;
  comment.userUrl = userUrl;
  comment.userEmail = userEmail;
  comment.commentId = comment.commentId || uuid.v4();
  comment.createdAt = new Date().toISOString();
  comment.commentUrl = getCommentUrl(comment);

  await storeComment(comment);

  return mapComment(comment);
}

function getCommentUrl(comment) {
  const commentItemId = comment.originalItemId;
  const parsedCommentUrl = url.parse(
    comment.itemProtocol + '//' + commentItemId + '#jc' + comment.commentId,
  );
  parsedCommentUrl.port = comment.itemPort;
  delete parsedCommentUrl.href;
  delete parsedCommentUrl.host;
  return url.format(parsedCommentUrl);
}

function mapComment(data) {
  return {
    itemId: data.itemId,
    commentUrl: data.commentUrl,
    commentId: data.commentId,
    replyTo: data.replyTo,
    parentId: data.parentId,
    userId: data.userId,
    username: data.username,
    userPic: data.userPic,
    userUrl: data.userUrl,
    message: data.message,
    htmlMessage: renderMarkdown(data.message),
    htmlContent: renderMarkdown(data.message),
    createdAt: data.createdAt,
    hidden: false,
  };
}

app.get('/v2/comments', (req, res, next) =>
  getComments(req)
    .then((response) => res.json(response))
    .catch((err) => next(err)),
);

app.post('/comments/create', (req, res, next) =>
  createComment(req).then((response) => res.json(response)),
);

app.listen(port, () => console.log(`JustComments listening on port ${port}!`));
