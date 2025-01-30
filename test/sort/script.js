function sortAscending() {
  let products = document.querySelector(".products__text");
  Array.from(products.children)
    .sort((a, b) => b.getAttribute("data-sort") - a.getAttribute("data-sort"))
    .forEach((el) => products.appendChild(el));

  console.log(Array.from(products.children));
}

document.getElementById("ascending").addEventListener("click", sortAscending);
