const baseUrl = `https://pixabay.com/api/`;
let myApiKey = `19872404-8517b83978ef96fd2196e3bf4`;

export default {
  query: "",
  page: 1,
  perPage: 12,

  getFetch() {
    let params = `?image_type=photo&orientation=horizontal&q=${this.query}&page=${this.page}&per_page=${this.perPage}&key=${myApiKey}`;
    let url = baseUrl + params;
    return fetch(url)
      .then((response) => response.json())
      .then((data) => data.hits);
  },

  set queryText(value) {
    this.query = value;
  },

  get queryText() {
    return this.query;
  },

  incrementPage() {
    this.page += 1;
  },

  resetPage() {
    this.page = 1;
  },
};
