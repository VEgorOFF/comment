function getStartComments() {
  let allcomments = document.querySelector(".allcomments");

  for (let i = 0; i < 3; i++) {
    let divCommentPeople = document.createElement("div");
    divCommentPeople.className = "comment_people blockFetch";

    allcomments.appendChild(divCommentPeople);

    let authorAndMessage = document.createElement("div");
    authorAndMessage.className = "author_and_message";

    divCommentPeople.appendChild(authorAndMessage);

    let avatarAuthor = document.createElement("div");
    avatarAuthor.className = "avatar_author";

    let authorAndText = document.createElement("div");
    authorAndText.className = "author_and_text";

    let commentText = document.createElement("div");
    commentText.className = "comment_text";
    commentText.innerHTML =
      '<p>Самое обидное когда сценарий по сути есть - в виде книг, где нет сюжетных дыр, всё логично, стройное повествование и достаточно взять и экранизировать оригинал как это было в первых фильмах с минимальным количеством отсебятины и зритель с восторгом примет любой такой фильм и сериал, однако вместо этого "Кольца власти" просто позаимствовали имена из оригинала, куски истории, мало связанные между собой и выдали очередной среднячковый сериал на один раз в лучшем случае.</p>';

    let underText = document.createElement("div");
    underText.className = "under_text";
    underText.innerHTML =
      '<div class="button_answer"><img src="images/otvet.svg" alt="otvet" /><p>Ответить</p></div><div><img src="images/izbran.svg" alt="izbran" /><p>В избранное</p></div><div><button>-</button><p class="number_likes">6</p><button>+</button></div>';

    authorAndMessage.appendChild(avatarAuthor);
    authorAndMessage.appendChild(authorAndText);
    authorAndMessage.appendChild(commentText);
    authorAndMessage.appendChild(underText);

    let nameAuthor = document.createElement("div");
    nameAuthor.className = "name_author";

    function padTo2Digits(num) {
      return num.toString().padStart(2, "0"); // Преобразует 9 в 09, а 10 оставит без изменений
    }

    let dateAndTime = document.createElement("div");
    var nowTime = new Date();
    dateAndTime.className = "date_and_time";
    dateAndTime.innerHTML = `<p>${padTo2Digits(
      nowTime.getDate()
    )}.${padTo2Digits(nowTime.getMonth() + 1)} ${padTo2Digits(
      nowTime.getHours()
    )}:${padTo2Digits(nowTime.getMinutes())}</p>`;
    if (localStorage.getItem("date") !== 0) {
      dateAndTime.innerHTML = `${localStorage.getItem("date")}`;
    }
    localStorage.setItem("date", dateAndTime);

    authorAndText.appendChild(nameAuthor);
    authorAndText.appendChild(dateAndTime);
  }
}

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

function commentsCount() {
  let commentPeople = document.querySelectorAll(".comment_people");
  let buttonAnswer = document.querySelectorAll(".button_answer");
  let divCount = document.querySelector(".first p:last-child");
  divCount.innerHTML = `(${commentPeople.length})`;
  for (i = 0; i < commentPeople.length; i++) {
    commentPeople[i].setAttribute("data-index", i);
    buttonAnswer[i].setAttribute("data-index", i);
  }
}

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

function sortComments() {
  let allComments = document.querySelector(".allcomments");
  let arrAllComments = Array.from(allComments.children);
  let sortArrAllComments = arrAllComments.sort(
    (a, b) =>
      b.querySelector(".number_likes").textContent -
      a.querySelector(".number_likes").textContent
  );

  sortArrAllComments.forEach((el) =>
    document.querySelector(".allcomments").appendChild(el)
  );

  // let countLikes = document.querySelectorAll(".number_likes");
  // console.log(sortArrAllComments);
}

let allComments = document.querySelector(".allcomments");

function sendComment() {
  getComments();
  let buttonSend = document.querySelector(".send");
  let textArea = document.querySelector(".message");
  let maxText = document.querySelector(".max_text");
  let warningText = document.querySelector(".warning_text");

  // indexCommentInLocalStorage = 0;

  // textArea.forEach((el) => {
  //   el.style.height = el.setAttribute("style", "height: " + el.scrollHeight + "px");
  //   el.classList.add("auto");
  //   el.addEventListener("input", (e) => {
  //     el.style.height = "auto";
  //     el.style.height = el.scrollHeight + "px";
  //   });
  // });
  textArea.addEventListener("input", function () {
    textArea.style.height = "5px";
    textArea.style.height = `${textArea.scrollHeight}px`;
    // console.log(textArea.scrollHeight);
  });

  textArea.addEventListener("input", function (event) {
    if (event.target.value.length === 0) {
      buttonSend.setAttribute("disabled", "");
      buttonSend.style.background = "#a1a1a1";
      buttonSend.classList.remove("hover-style");
    } else {
      buttonSend.removeAttribute("disabled");
      buttonSend.style.background = "#ABD873";
      buttonSend.classList.add("hover-style");
    }
    if (event.target.value.length > 0) {
      maxText.innerHTML = `${event.target.value.length}/1000`;
      if (event.target.value.length > 1000) {
        buttonSend.setAttribute("disabled", "");
        buttonSend.style.background = "#a1a1a1";
        buttonSend.classList.remove("hover-style");
        maxText.setAttribute("style", "color:red; opacity: 1;");
        warningText.style.display = "flex";
      } else {
        maxText.setAttribute("style", "color:black; opacity: 0.4;");
        warningText.style.display = "none";
      }
    } else {
      maxText.innerHTML = "Макс. 1000 символов";
    }
  });

  buttonSend.addEventListener("click", function () {
    let newComment = document.createElement("div");
    newComment.className = "comment_people";
    let authorAndMessage = document.createElement("div");
    authorAndMessage.className = "author_and_message";
    function padTo2Digits(num) {
      return num.toString().padStart(2, "0"); // Преобразует 9 в 09, а 10 оставит без изменений
    }
    var nowTime = new Date();
    let authorAvatar = document.getElementById("avatar");
    let cloneAuthorAvatar = authorAvatar.cloneNode(true);
    let authorAndText = document.createElement("div");
    authorAndText.className = "author_and_text";
    let authorName = document.getElementById("name");
    let cloneAuthorName = authorName.cloneNode(true);
    let timeComment = document.createElement("div");
    timeComment.className = "date_and_time";
    timeComment.innerHTML = `<p>${padTo2Digits(
      nowTime.getDate()
    )}.${padTo2Digits(nowTime.getMonth() + 1)} ${padTo2Digits(
      nowTime.getHours()
    )}:${padTo2Digits(nowTime.getMinutes())}</p>`;
    let commentText = document.createElement("div");
    commentText.className = "comment_text";
    commentText.innerHTML = `<p>${textArea.value}</p>`;
    let underText = document.createElement("div");
    underText.className = "under_text";
    underText.innerHTML =
      '<div class="button_answer"><img src="images/otvet.svg" alt="otvet" /><p>Ответить</p></div><div><img src="images/izbran.svg" alt="izbran" /><p>В избранное</p></div><div><button>-</button><p class="number_likes">6</p><button>+</button></div>';
    authorAndText.appendChild(cloneAuthorName);
    authorAndText.appendChild(timeComment);
    authorAndMessage.appendChild(cloneAuthorAvatar);
    authorAndMessage.appendChild(authorAndText);
    authorAndMessage.appendChild(commentText);
    authorAndMessage.appendChild(underText);
    newComment.appendChild(authorAndMessage);
    allComments.insertBefore(newComment, allComments.firstChild);
    commentsCount();
    textArea.value = "";
    textArea.style.height = "43.531px";
    localStorage.setItem("comment", allComments.innerHTML);

    // document
    //   .querySelector(".button_answer")
    //   .addEventListener("click", function () {
    //     let formSend = document.querySelector(".comment_author");
    //     let cloneFormSend = formSend.cloneNode(true);
    //     cloneFormSend.style = "padding-left: 91px";

    //     let message = document.querySelector(".comment_people");
    //     message.appendChild(cloneFormSend);
    //     // answer();
    //   });
  });
}

function getComments() {
  if (localStorage.getItem("comment") !== null) {
    allComments.innerHTML = localStorage.getItem(`comment`);
    commentsCount();
  } else {
    commentsCount();
  }
}

// function answer() {
//   let buttonAnswer = document.querySelectorAll(".button_answer");
//   let messages = document.querySelectorAll(".comment_people");

//   let formSend = document.querySelector(".comment_author");
//       let cloneFormSend = formSend.cloneNode(true);
//       cloneFormSend.style = "padding-left: 91px";
//   for (let i = 0; i < buttonAnswer.length; i++) {
//     buttonAnswer[i].addEventListener("click", function () {

//   if (messages[i].getAttribute('data-index') === buttonAnswer[i].getAttribute('data-index')) {
//     messages[i].appendChild(cloneFormSend);
//     console.log("worked");
//   }

//     });
//   }
// }

// function createBlockAnswer() {
//   // let formSend = document.querySelector(".comment_author");
//   // let cloneFormSend = formSend.cloneNode(true);
//   // cloneFormSend.style = "padding-left: 91px";

//   // if (document.querySelector('.comment_people').getAttribute('data-index') = document.querySelector('.button_answer').getAttribute('data-index')) {

//   // }
//   // let messages = document.querySelectorAll(".comment_people");

//   // message.appendChild(cloneFormSend);

//   // let answer = document.createElement("div");
//   // answer.className = "answer";
//   // let authorAndMessage = document.createElement("div");
//   // authorAndMessage.className = "author_and_message";
//   // let avatarAuthor = document.createElement("div");
//   // avatarAuthor.className = "avatar_author";
//   // let authorAndText = document.createElement("div");
//   // authorAndText.className = "author_and_text author_and_text_answer";

//   // let commentText = document.createElement("div");
//   // commentText.className = "comment_text";
//   // let underText = document.createElement("div");
//   // underText.className = "under_text under_text_answer";
//   // underText.innerHTML = '<div><img src="imagesizbran.svg" alt="izbran" /><p>В избранное</p></div><div><button>-</button><p>3</p><button>+</button></div>';

//   // authorAndMessage.appendChild(underText);
//   // authorAndMessage.appendChild(commentText);
//   // authorAndMessage.appendChild(authorAndText);
//   // authorAndMessage.appendChild(avatarAuthor);
//   // answer.appendChild(authorAndMessage);
//   // message.appendChild(answer);
// }

document.addEventListener("DOMContentLoaded", mainStart);

function mainStart() {
  getStartComments();
  getApi();
  // commentsCount();
  sortCount();
  sendComment();
  // answer();
}
