import refs from "./refs.js";
import apiService from "./apiService.js";
import picTemplate from "../templates/picCard.hbs";
import showNotice from "../js/notice.js";

let { form, input, gallery, btnLoadMore } = refs;

form.addEventListener("submit", getValue);
btnLoadMore.addEventListener("click", loadMore);

function getValue(e) {
  e.preventDefault();
  let searchValue = e.target.elements.query.value;
  apiService.queryText = searchValue;

  apiService.resetPage();

  apiService
    .getFetch()
    .then((result) => {
      console.log(result);
      if (result.length === 0) {
        showNotice("This emptiness is unbearable. Type something!");
      } else {
        renderGallery(result);
        manageBtnLoadMore();
        input.value = "";
      }
    })
    .catch((error) => {
      showNotice(error);
    });

  clearGallery();
}

function renderGallery(hits) {
  let items = picTemplate(hits);
  gallery.insertAdjacentHTML("beforeend", items);
}

function manageBtnLoadMore() {
  if (gallery.children) {
    btnLoadMore.classList.remove("is-hidden");
  } else {
    btnLoadMore.classList.add("is-hidden");
  }
}

function loadMore(e) {
  apiService.incrementPage();
  apiService.getFetch().then((res) => {
    renderGallery(res);
    window.scrollBy({
      top: innerHeight - 40,
      behavior: "smooth",
    });
  });
}

function clearGallery() {
  gallery.innerHTML = "";
}
