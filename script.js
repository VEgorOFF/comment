function getApi() {
  let blockFetch = document.querySelectorAll(".blockFetch");

  for (let i = 0; i < blockFetch.length; i++) {
    if (
      localStorage.getItem(`firstName[${i}]`) !== null &&
      localStorage.getItem(`lastName[${i}]`) !== null &&
      localStorage.getItem(`picture[${i}]`) !== null
    ) {
      let divFirstName = blockFetch[i].querySelector(".name_author");
      let divPhoto = blockFetch[i].querySelector(".avatar_author");
      divFirstName.innerHTML = `${localStorage.getItem(
        `firstName[${i}]`
      )} ${localStorage.getItem(`lastName[${i}]`)}`;
      divPhoto.innerHTML = `<img src="${localStorage.getItem(
        `picture[${i}]`
      )}">`;
    } else {
      fetch("https://randomuser.me/api/")
        .then((res) => res.json())
        .then((data) => {
          let firstName = data.results[0].name.first;
          let lastName = data.results[0].name.last;
          let picture = data.results[0].picture.large;

          localStorage.setItem(`firstName[${i}]`, firstName);
          localStorage.setItem(`lastName[${i}]`, lastName);
          localStorage.setItem(`picture[${i}]`, picture);

          let divFirstName = blockFetch[i].querySelector(".name_author");
          let divPhoto = blockFetch[i].querySelector(".avatar_author");
          divFirstName.innerHTML = `${firstName} ${lastName}`;
          divPhoto.innerHTML = `<img src="${picture}">`;
        });
    }
  }
}
getApi();

function commentsCount() {
  let commentPeople = document.querySelectorAll(".comment_people");
  let divCount = document.querySelector(".first p:last-child");
  divCount.innerHTML = `(${commentPeople.length})`;
}

commentsCount();

function sortCount() {
  let sortName = document.querySelector(".sort_name p");
  let sortDate = document.getElementById("date");
  let sortCountLikes = document.getElementById("count_likes");
  let sortActual = document.getElementById("actual");
  let sortCountAnswers = document.getElementById("count_answers");

  if (localStorage.getItem("sortName") !== null) {
    sortName.innerHTML = localStorage.getItem("sortName");
  } else {
    sortName.innerHTML = sortActual.querySelector("p").textContent;
  }

  sortDate.addEventListener("click", function () {
    sortName.innerHTML = sortDate.querySelector("p").textContent;
    localStorage.setItem("sortName", sortDate.querySelector("p").textContent);
  });

  sortCountLikes.addEventListener("click", function () {
    sortName.innerHTML = sortCountLikes.querySelector("p").textContent;
    localStorage.setItem(
      "sortName",
      sortCountLikes.querySelector("p").textContent
    );
    sortComments();
  });

  sortActual.addEventListener("click", function () {
    sortName.innerHTML = sortActual.querySelector("p").textContent;
    localStorage.setItem("sortName", sortActual.querySelector("p").textContent);
  });

  sortCountAnswers.addEventListener("click", function () {
    sortName.innerHTML = sortCountAnswers.querySelector("p").textContent;
    localStorage.setItem(
      "sortName",
      sortCountAnswers.querySelector("p").textContent
    );
  });
}

sortCount();

function sortComments() {
  let allComments = document.querySelector(".allcomments");
  let arrAllComments = Array.from(allComments.children);
  let sortArrAllComments = arrAllComments.sort(
    (a, b) =>
      a.querySelector(".number_likes").textContent -
      b.querySelector(".number_likes").textContent
  );

  sortArrAllComments.forEach((el) =>
    document.querySelector(".allcomments").appendChild(el)
  );

  // let countLikes = document.querySelectorAll(".number_likes");
  console.log(sortArrAllComments);
}
