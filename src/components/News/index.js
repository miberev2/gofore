import React, { useCallback, useRef, useState, useEffect } from "react";
import moment from "moment";
require("./styles.scss");

function News({ stories }) {
  const [pageSize, setPageSize] = useState(20);
  const [opened, setOpened] = useState([]);
  const intObserver = useRef();

  // Close all stories on sort change
  useEffect(() => {
    setOpened([]);
  }, [stories]);

  // Infinite scroll
  const lastNewsRef = useCallback(
    (entry) => {
      if (intObserver.current) intObserver.current.disconnect();
      intObserver.current = new IntersectionObserver((entries) => {
        if (entries[0]?.isIntersecting) {
          setPageSize(pageSize + 20);
        }
      });
      if (entry) intObserver.current.observe(entry);
    },
    [pageSize]
  );

  const content = ({ time, title, by, url, text }, i) =>
    opened?.includes(i) ? (
      <>
        <div
          className="icon close"
          onClick={() =>
            setOpened((current) => current.filter((index) => index !== i))
          }
        >
          ▶
        </div>
        <div className="open-container">
          <div className="time">
            {moment(new Date(time)).format("hh:mm DD.MM.YYYY")}
          </div>
          <div className="title">{title}</div>
          {url && (
            <div className="url">
              <a
                title={url}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {url}
              </a>
            </div>
          )}
          {text && <div className="text">{text}</div>}
          <div className="author">By: {by}</div>
        </div>
      </>
    ) : (
      <>
        <div className="icon open" onClick={() => setOpened([...opened, i])}>
          ▶
        </div>
        <div className="closed-container">
          <div className="title" title={title}>
            {title}
          </div>
          <div className="url" title={url?.split("/")?.[2]}>
            {url?.split("/")?.[2]}
          </div>
        </div>
      </>
    );

  return stories?.map(
    (story, i) =>
      i < pageSize && (
        <div
          key={i}
          className="story"
          ref={i === pageSize - 2 ? lastNewsRef : undefined}
        >
          {content(story, i)}
        </div>
      )
  );
}

export default News;
