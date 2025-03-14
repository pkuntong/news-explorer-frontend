export function getSavedArticles() {
  return new Promise(resolve => {
    resolve([
    ]);
  });
}

export function addSavedArticle(article, keyword) {
  return new Promise(resolve => {
    resolve({
      _id: article.title,
      keyword: keyword,
      link: article.url,
      title: article.title,
      source: article.source,
      text: article.description,
      urlToImage: article.urlToImage,
      publishedAt: article.publishedAt,
    });
  });
}

export const removeSavedArticle = () => {
  return new Promise(resolve => {
    const response = {
      ok: true,
      status: 200,
      statusText: 'OK',
    };
    resolve(response);
  });
};