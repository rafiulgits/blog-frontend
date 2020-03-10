import React from "react";
import style from "./styles/article.module.css";

const ArticleItem = props => {
  let blogUrl = `/blog/${props.data.author.blogName}`;
  let authorName = `${props.data.author.firstName} ${props.data.author.lastName}`;
  let timeStamp = new Date(props.data.createdOn).toLocaleString();

  return (
    <article className={style.item}>
      <h2 className={style.itemTitle}>{props.data.title}</h2>
      <h6>
        {"by "}
        <a className={style.itemAuthor} href={blogUrl}>
          {authorName}
        </a>
        {" on "}
        <span className={style.itemDateTime}> {timeStamp}</span>
      </h6>
      <p className={style.itemBody}>{props.data.body}</p>
    </article>
  );
};

const ArticlePreview = props => {
  const body = props.article.body;
  var previewBody = null;
  const previewSize = 250;
  if (body.length >= previewSize) {
    previewBody = body.substr(0, previewSize);
  } else {
    previewBody = body;
  }

  return (
    <article className={style.item}>
      <h2 className={style.itemTitle}>{props.article.title}</h2>
      <h6>
        {"by "}
        <a
          className={style.itemAuthor}
          href={`/blog/${props.article.author.blogName}`}
        >
          {props.article.author.firstName}
        </a>
        {" on"}
        <span className={style.itemDateTime}>
          {" "}
          {new Date(props.article.createdOn).toLocaleString()}
        </span>
      </h6>
      <p className={style.itemBody}>
        {previewBody}{" "}
        <a href={`/article/${props.article.id}`}>...read full story</a>
      </p>
    </article>
  );
};

export { ArticleItem, ArticlePreview };
