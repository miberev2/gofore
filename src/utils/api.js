const getStoryIds = () =>
  fetch("https://hacker-news.firebaseio.com/v0/topstories.json")
    .then((response) => response.json())
    .then((data) => {
      return data;
    });

const getStoryDetails = (id) =>
  fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
    .then((response) => response.json())
    .then((data) => {
      return data;
    });

const api = {
  getStoryIds,
  getStoryDetails,
};

export default api;
