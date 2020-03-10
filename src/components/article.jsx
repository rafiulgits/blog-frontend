import React from "react";
import style from "./styles/article.module.css";

const ArticleItem = props => {
  return (
    <article className={style.item}>
      <h2 className={style.itemTitle}>What is Lorem Ipsum?</h2>
      <h6>
        by <span className={style.itemAuthor}>Rafiul Islam</span> on
        <span className={style.itemDateTime}> 3/10/2020, 9:57:15 AM</span>
      </h6>
      <p className={style.itemBody}>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </p>
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
