function getApi() {
  let blockFetch = document.querySelectorAll(".blockFetch");

  for (let i = 0; i < blockFetch.length; i++) {
    fetch("https://randomuser.me/api/")
      .then((res) => res.json())
      .then((data) => {
        let firstName = data.results[0].name.first;
        let lastName = data.results[0].name.last;
        let picture = data.results[0].picture.large;

        let divFirstName = blockFetch[i].querySelector(".name_author");
        let divPhoto = blockFetch[i].querySelector(".avatar_author");
        divFirstName.innerHTML = `${firstName} ${lastName}`;
        divPhoto.innerHTML = `<img src="${picture}">`;
      });
  }
}
getApi();

function commentsCount() {
  let blockFetch = document.querySelectorAll(".blockFetch");
  let divCount = document.querySelector(".first p:last-child");
  divCount.innerHTML = `(${blockFetch.length})`;
}

commentsCount();

function sortCount() {
  let sortName = document.querySelector(".sort_name p");
  let sortDate = document.getElementById("date");
  let sortCountLikes = document.getElementById("count_likes");
  let sortActual = document.getElementById("actual");
  let sortCountAnswers = document.getElementById("count_answers");

  console.log(sortDate.querySelector("p"));

  sortDate.addEventListener("click", function () {
    sortName.innerHTML = sortDate.querySelector("p").textContent;
  });

  sortCountLikes.addEventListener("click", function () {
    sortName.innerHTML = sortCountLikes.querySelector("p").textContent;
  });

  sortActual.addEventListener("click", function () {
    sortName.innerHTML = sortActual.querySelector("p").textContent;
  });

  sortCountAnswers.addEventListener("click", function () {
    sortName.innerHTML = sortCountAnswers.querySelector("p").textContent;
  });
}

sortCount();
