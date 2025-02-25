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
    if (localStorage.getItem(`text${i}`) !== null) {
      commentText.innerText = `${localStorage.getItem(`text${i}`)}`;
    } else {
      commentText.innerText =
        'Самое обидное когда сценарий по сути есть - в виде книг, где нет сюжетных дыр, всё логично, стройное повествование и достаточно взять и экранизировать оригинал как это было в первых фильмах с минимальным количеством отсебятины и зритель с восторгом примет любой такой фильм и сериал, однако вместо этого "Кольца власти" просто позаимствовали имена из оригинала, куски истории, мало связанные между собой и выдали очередной среднячковый сериал на один раз в лучшем случае.';
      localStorage.setItem(`text${i}`, commentText.textContent);
    }

    if (localStorage.getItem(`like${i}`) !== null) {
      likeRandom = `${localStorage.getItem(`like${i}`)}`;
    } else {
      likeRandom = random(0, 10);
      localStorage.setItem(`like${i}`, likeRandom);
    }

    let underText = document.createElement("div");
    underText.className = "under_text";
    underText.innerHTML = `<div class="button_answer"><img src="images/otvet.svg" alt="otvet" /><p>Ответить</p></div><div class="button_favorites"><img src="images/izbran.svg" alt="izbran" /><p>В избранное</p></div><div><button class="button_minus">-</button><p class="number_likes">${likeRandom}</p><button class="button_plus">+</button></div>`;

    authorAndMessage.appendChild(avatarAuthor);
    authorAndMessage.appendChild(authorAndText);
    authorAndMessage.appendChild(commentText);
    authorAndMessage.appendChild(underText);

    let nameAuthor = document.createElement("div");
    nameAuthor.className = "name_author";

    let dateAndTime = document.createElement("div");
    var nowTime = new Date();
    dateAndTime.className = "date_and_time";
    if (localStorage.getItem(`date${i}`) !== null) {
      dateAndTime.innerText = `${localStorage.getItem(`date${i}`)}`;
    } else {
      dateAndTime.innerText = `${padTo2Digits(nowTime.getDate())}.${padTo2Digits(nowTime.getMonth() + 1)} ${padTo2Digits(nowTime.getHours())}:${padTo2Digits(nowTime.getMinutes())}`;
      localStorage.setItem(`date${i}`, dateAndTime.textContent);
    }

    authorAndText.appendChild(nameAuthor);
    authorAndText.appendChild(dateAndTime);
  }
}

function getApi() {
  let blockFetch = document.querySelectorAll(".blockFetch");

  for (let i = 0; i < blockFetch.length; i++) {
    if (localStorage.getItem(`firstName[${i}]`) !== null && localStorage.getItem(`lastName[${i}]`) !== null && localStorage.getItem(`picture[${i}]`) !== null) {
      let divFirstName = blockFetch[i].querySelector(".name_author");
      let divPhoto = blockFetch[i].querySelector(".avatar_author");
      divFirstName.innerHTML = `${localStorage.getItem(`firstName[${i}]`)} ${localStorage.getItem(`lastName[${i}]`)}`;
      divPhoto.innerHTML = `<img src="${localStorage.getItem(`picture[${i}]`)}">`;
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

  let id = commentPeople.length - 1;
  for (i = 0; i < commentPeople.length; i++) {
    commentPeople[i].setAttribute("data-index", id);
    buttonAnswer[i].setAttribute("data-index", id);
    id = id - 1;

    localStorage.setItem(`id_comment[${i}]`, i);
  }
}

function answerCount() {
  document.querySelectorAll(".comment_people").forEach(function (mess) {
    if (mess.querySelectorAll(".answer").length !== 0) {
      mess.querySelectorAll(".answer").forEach(function (answer, index) {
        answer.setAttribute("data-index", index);
      });
    }
  });
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
    sortDateComments();
  });

  sortCountLikes.addEventListener("click", function () {
    sortName.innerHTML = sortCountLikes.querySelector("p").textContent;
    localStorage.setItem("sortName", sortCountLikes.querySelector("p").textContent);
    sortComments();
  });

  sortActual.addEventListener("click", function () {
    sortName.innerHTML = sortActual.querySelector("p").textContent;
    localStorage.setItem("sortName", sortActual.querySelector("p").textContent);
  });

  sortCountAnswers.addEventListener("click", function () {
    sortName.innerHTML = sortCountAnswers.querySelector("p").textContent;
    localStorage.setItem("sortName", sortCountAnswers.querySelector("p").textContent);
  });
}

function sortDateComments() {
  let allComments = document.querySelector(".allcomments");
  let arrAllComments = Array.from(allComments.children);
  let sortArrAllComments = arrAllComments.sort((a, b) => new Date(b.querySelector(".date_and_time").textContent) - new Date(a.querySelector(".date_and_time").textContent));
  sortArrAllComments.forEach((el) => document.querySelector(".allcomments").appendChild(el));
}

function sortComments() {
  let allComments = document.querySelector(".allcomments");
  let arrAllComments = Array.from(allComments.children);
  let sortArrAllComments = arrAllComments.sort((a, b) => b.querySelector(".number_likes").textContent - a.querySelector(".number_likes").textContent);

  sortArrAllComments.forEach((el) => document.querySelector(".allcomments").appendChild(el));
}

function sendComment() {
  let allComments = document.querySelector(".allcomments");
  let buttonSend = document.querySelectorAll(".send")[0];
  let textArea = document.querySelectorAll(".message")[0];
  let maxText = document.querySelectorAll(".max_text")[0];
  let warningText = document.querySelectorAll(".warning_text")[0];
  let indexAuthorComment;

  if (localStorage.getItem("indexAuthorComment") !== null) {
    indexAuthorComment = localStorage.getItem("indexAuthorComment");
  } else {
    indexAuthorComment = 0;
  }

  textArea.addEventListener("input", function (event) {
    textArea.style.height = "5px";
    textArea.style.height = `${textArea.scrollHeight}px`;

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
      maxText.innerText = "Макс. 1000 символов";
    }
  });

  buttonSend.addEventListener("click", function () {
    //отправка комментария
    let newComment = document.createElement("div");
    newComment.className = "comment_people author_comments";
    let authorAndMessage = document.createElement("div");
    authorAndMessage.className = "author_and_message";

    var nowTime = new Date();
    let authorAvatar = document.getElementById("avatar");
    let cloneAuthorAvatar = authorAvatar.cloneNode(true);
    let authorAndText = document.createElement("div");
    authorAndText.className = "author_and_text";
    let authorName = document.getElementById("name");
    let cloneAuthorName = authorName.cloneNode(true);
    let timeComment = document.createElement("div");
    timeComment.className = "date_and_time";
    timeComment.innerText = `${padTo2Digits(nowTime.getDate())}.${padTo2Digits(nowTime.getMonth() + 1)} ${padTo2Digits(nowTime.getHours())}:${padTo2Digits(nowTime.getMinutes())}`;
    localStorage.setItem(`dateAuthorComment${indexAuthorComment}`, timeComment.textContent);
    let commentText = document.createElement("div");
    commentText.className = "comment_text";
    commentText.innerText = `${textArea.value}`;
    localStorage.setItem(`authorComment${indexAuthorComment}`, commentText.textContent);

    let underText = document.createElement("div");
    underText.className = "under_text";
    underText.innerHTML =
      '<div class="button_answer"><img src="images/otvet.svg" alt="otvet" /><p>Ответить</p></div><div class="button_favorites"><img src="images/izbran.svg" alt="izbran" /><p>В избранное</p></div><div><button class="button_minus">-</button><p class="number_likes">0</p><button class="button_plus">+</button></div>';
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
    buttonSend.setAttribute("disabled", "");
    buttonSend.style.background = "#a1a1a1";
    buttonSend.classList.remove("hover-style");
    maxText.innerText = "Макс. 1000 символов";

    indexAuthorComment++;
    localStorage.setItem("indexAuthorComment", indexAuthorComment);
    plusMinusButtons();
  });
}

function getComments() {
  let i = 0;
  while (localStorage.getItem(`dateAuthorComment${i}`) !== null && localStorage.getItem(`authorComment${i}`) !== null) {
    let allComments = document.querySelector(".allcomments");
    let newComment = document.createElement("div");
    newComment.className = "comment_people author_comments";

    let authorAndMessage = document.createElement("div");
    authorAndMessage.className = "author_and_message";

    let avatarAuthor = document.createElement("div");
    avatarAuthor.className = "avatar_author";
    avatarAuthor.innerHTML = `<img src="${localStorage.getItem(`picture[0]`)}">`;

    let authorAndText = document.createElement("div");
    authorAndText.className = "author_and_text";

    let nameAuthor = document.createElement("div");
    nameAuthor.className = "name_author";
    nameAuthor.innerHTML = `${localStorage.getItem(`firstName[0]`)} ${localStorage.getItem(`lastName[0]`)}`;

    let timeComment = document.createElement("div");
    timeComment.className = "date_and_time";
    timeComment.innerText = `${localStorage.getItem(`dateAuthorComment${i}`)}`;

    let commentText = document.createElement("div");
    commentText.className = "comment_text";
    commentText.innerText = `${localStorage.getItem(`authorComment${i}`)}`;

    if (localStorage.getItem(`likeAuthor${i}`) !== null) {
      likeAuthorRandom = `${localStorage.getItem(`likeAuthor${i}`)}`;
    } else {
      likeAuthorRandom = random(0, 10);
      localStorage.setItem(`likeAuthor${i}`, likeAuthorRandom);
    }

    console.log(likeAuthorRandom);

    let underText = document.createElement("div");
    underText.className = "under_text";
    underText.innerHTML = `<div class="button_answer"><img src="images/otvet.svg" alt="otvet" /><p>Ответить</p></div><div class="button_favorites"><img src="images/izbran.svg" alt="izbran" /><p>В избранное</p></div><div><button class="button_minus">-</button><p class="number_likes">${likeAuthorRandom}</p><button class="button_plus">+</button></div>`;

    allComments.insertBefore(newComment, allComments.firstChild)[i];
    newComment.appendChild(authorAndMessage)[i];
    authorAndMessage.appendChild(avatarAuthor)[i];
    authorAndMessage.appendChild(authorAndText)[i];
    authorAndText.appendChild(nameAuthor)[i];
    authorAndText.appendChild(timeComment)[i];
    authorAndMessage.appendChild(commentText)[i];
    authorAndMessage.appendChild(underText)[i];

    i++;
  }
}

function getAnswers() {
  let messages = document.querySelectorAll(".comment_people");

  for (let i = 0; i <= localStorage.getItem("indexAuthorAnswer"); i++) {
    for (let k = 0; k <= localStorage.getItem("indexAuthorAnswer"); k++) {
      if (localStorage.getItem(`dateAnswer${i}.index${k}`) !== null && localStorage.getItem(`authorAnswer${i}.index${k}`) !== null && localStorage.getItem(`idAnswerParent${i}.index${k}`) !== null) {
        let answer = document.createElement("div");
        answer.className = "answer";
        let authorAndMessage = document.createElement("div");
        authorAndMessage.className = "author_and_message";
        let avatarAuthor = document.getElementById("avatar").cloneNode(true);
        avatarAuthor.className = "avatar_author";
        let authorAndText = document.createElement("div");
        authorAndText.className = "author_and_text author_and_text_answer";
        let authorName = document.getElementById("name");
        let cloneAuthorName = authorName.cloneNode(true);
        let timeComment = document.createElement("div");
        var nowTime = new Date();
        timeComment.className = "date_and_time";
        timeComment.innerText = `${localStorage.getItem(`dateAnswer${i}.index${k}`)}`;

        let commentText = document.createElement("div");
        commentText.className = "comment_text";
        commentText.innerText = `${localStorage.getItem(`authorAnswer${i}.index${k}`)}`;
        let underText = document.createElement("div");
        underText.className = "under_text under_text_answer";
        underText.innerHTML = '<div class="button_favorites"><img src="images/izbran.svg" alt="izbran" /><p>В избранное</p></div><div><button>-</button><p>3</p><button>+</button></div>';

        authorAndText.appendChild(cloneAuthorName);
        authorAndText.appendChild(timeComment);
        authorAndMessage.appendChild(underText);
        authorAndMessage.appendChild(commentText);
        authorAndMessage.appendChild(authorAndText);
        authorAndMessage.appendChild(avatarAuthor);
        answer.appendChild(authorAndMessage);

        messages[messages.length - localStorage.getItem(`idAnswerParent${i}.index${k}`) - 1].appendChild(answer);
      }
    }
  }
}

//кнопки ОТВЕТИТЬ
document.addEventListener("click", (event) => {
  let messages = document.querySelectorAll(".comment_people");

  if (event.target.closest(".button_answer")) {
    messages.forEach(function (mess) {
      //проверка есть ли блоки с отправкой ответа
      if (mess.querySelector(".copy_form_answer") !== null) {
        mess.querySelector(".copy_form_answer").remove();
      }
    });

    const index = event.target.closest(".button_answer").getAttribute("data-index");
    let formSend = document.querySelector(".comment_author");
    let cloneFormSend = formSend.cloneNode(true);
    cloneFormSend.className += " copy_form_answer";
    cloneFormSend.id = "form_answer";

    messages[messages.length - index - 1].appendChild(cloneFormSend);
    sendAnswer(messages.length - index - 1);
  }
});

function sendAnswer(messageAtributeIndex) {
  document.getElementById("form_answer").style = "display: grid padding-left: 91px";
  document.getElementById("form_answer").style = "padding-left: 91px";

  let messages = document.querySelectorAll(".comment_people");

  let buttonSendAnswer = document.querySelector("#form_answer").querySelector(".send");
  let textAreaAnswer = document.querySelector("#form_answer").querySelector(".message");
  let maxTextAnswer = document.querySelector("#form_answer").querySelector(".max_text");
  let warningTextAnswer = document.querySelector("#form_answer").querySelector(".warning_text");

  if (localStorage.getItem("indexAuthorAnswer") !== null) {
    indexAuthorAnswer = localStorage.getItem("indexAuthorAnswer");
  } else {
    indexAuthorAnswer = 0;
  }

  buttonSendAnswer.style = "width: 100px";

  textAreaAnswer.addEventListener("input", function (event) {
    textAreaAnswer.style.height = "5px";
    textAreaAnswer.style.height = `${textAreaAnswer.scrollHeight}px`;

    if (event.target.value.length === 0) {
      buttonSendAnswer.setAttribute("disabled", "");
      buttonSendAnswer.style.background = "#a1a1a1";
      buttonSendAnswer.classList.remove("hover-style");
    } else {
      buttonSendAnswer.removeAttribute("disabled");
      buttonSendAnswer.style.background = "#ABD873";
      buttonSendAnswer.classList.add("hover-style");
    }
    if (event.target.value.length > 0) {
      maxTextAnswer.innerHTML = `${event.target.value.length}/1000`;
      if (event.target.value.length > 1000) {
        buttonSendAnswer.setAttribute("disabled", "");
        buttonSendAnswer.style.background = "#a1a1a1";
        buttonSendAnswer.classList.remove("hover-style");
        maxTextAnswer.setAttribute("style", "color:red; opacity: 1;");
        warningTextAnswer.style.display = "flex";
      } else {
        maxTextAnswer.setAttribute("style", "color:black; opacity: 0.4;");
        warningTextAnswer.style.display = "none";
      }
    } else {
      maxTextAnswer.innerText = "Макс. 1000 символов";
    }
  });

  buttonSendAnswer.addEventListener("click", function () {
    let answer = document.createElement("div");
    answer.className = "answer";
    let authorAndMessage = document.createElement("div");
    authorAndMessage.className = "author_and_message";
    let avatarAuthor = document.getElementById("avatar").cloneNode(true);
    avatarAuthor.className = "avatar_author";
    let authorAndText = document.createElement("div");
    authorAndText.className = "author_and_text author_and_text_answer";
    let authorName = document.getElementById("name");
    let cloneAuthorName = authorName.cloneNode(true);
    let timeComment = document.createElement("div");
    var nowTime = new Date();
    timeComment.className = "date_and_time";
    timeComment.innerText = `${padTo2Digits(nowTime.getDate())}.${padTo2Digits(nowTime.getMonth() + 1)} ${padTo2Digits(nowTime.getHours())}:${padTo2Digits(nowTime.getMinutes())}`;

    let commentText = document.createElement("div");
    commentText.className = "comment_text";
    commentText.innerText = `${textAreaAnswer.value}`;
    let underText = document.createElement("div");
    underText.className = "under_text under_text_answer";
    underText.innerHTML = '<div class="button_favorites"><img src="images/izbran.svg" alt="izbran" /><p>В избранное</p></div><div><button>-</button><p>3</p><button>+</button></div>';

    authorAndText.appendChild(cloneAuthorName);
    authorAndText.appendChild(timeComment);
    authorAndMessage.appendChild(underText);
    authorAndMessage.appendChild(commentText);
    authorAndMessage.appendChild(authorAndText);
    authorAndMessage.appendChild(avatarAuthor);
    answer.appendChild(authorAndMessage);

    messages[messageAtributeIndex].appendChild(answer);

    textAreaAnswer.value = "";
    textAreaAnswer.style.height = "43.531px";
    buttonSendAnswer.setAttribute("disabled", "");
    buttonSendAnswer.style.background = "#a1a1a1";
    buttonSendAnswer.classList.remove("hover-style");
    maxTextAnswer.innerText = "Макс. 1000 символов";

    document.getElementById("form_answer").remove();

    localStorage.setItem(`idAnswerParent${answer.closest(".comment_people").getAttribute("data-index")}.index${indexAuthorAnswer}`, answer.closest(".comment_people").getAttribute("data-index"));
    localStorage.setItem(`dateAnswer${answer.closest(".comment_people").getAttribute("data-index")}.index${indexAuthorAnswer}`, timeComment.textContent);
    localStorage.setItem(`authorAnswer${answer.closest(".comment_people").getAttribute("data-index")}.index${indexAuthorAnswer}`, commentText.textContent);

    indexAuthorAnswer++;
    localStorage.setItem("indexAuthorAnswer", indexAuthorAnswer);
    answerCount();
  });
}

//кнопки избранное
document.addEventListener("click", (event) => {
  let buttonFavorites = event.target.closest(".button_favorites");

  if (buttonFavorites) {
    let id = event.target.closest(".comment_people").getAttribute("data-index");

    if (event.target.closest(".answer") !== null) {
      if (buttonFavorites.hasAttribute(`active-favorites${id}.${buttonFavorites.closest(".answer").getAttribute("data-index")}`)) {
        localStorage.removeItem(`active-favorites${id}.${buttonFavorites.closest(".answer").getAttribute("data-index")}`);
        buttonFavorites.removeAttribute(`active-favorites${id}.${buttonFavorites.closest(".answer").getAttribute("data-index")}`);
        buttonFavorites.style = "color: black";
        buttonFavorites.innerHTML = '<img src="images/izbran.svg" alt="izbran" /><p>В избранное</p>';
      } else {
        buttonFavorites.style = "color: red";
        buttonFavorites.innerHTML = "<p>В избранном</p>";
        buttonFavorites.setAttribute(`active-favorites${id}.${buttonFavorites.closest(".answer").getAttribute("data-index")}`, true);
        localStorage.setItem(`active-favorites${id}.${buttonFavorites.closest(".answer").getAttribute("data-index")}`, buttonFavorites.getAttribute(`active-favorites${id}.${buttonFavorites.closest(".answer").getAttribute("data-index")}`));
      }
    } else {
      if (buttonFavorites.hasAttribute(`active-favorites${id}`) && localStorage.getItem(`active-favorites${id}`) !== null) {
        buttonFavorites.removeAttribute(`active-favorites${id}`);
        localStorage.removeItem(`active-favorites${id}`);
        buttonFavorites.style = "color: black";
        buttonFavorites.innerHTML = '<img src="images/izbran.svg" alt="izbran" /><p>В избранное</p>';
      } else {
        buttonFavorites.style = "color: red";
        buttonFavorites.innerHTML = "<p>В избранном</p>";

        buttonFavorites.setAttribute(`active-favorites${id}`, true);
        localStorage.setItem(`active-favorites${id}`, buttonFavorites.getAttribute(`active-favorites${id}`));
      }
    }
  }
});

function getFavorites() {
  let buttonFavorites = document.querySelectorAll(".button_favorites");

  buttonFavorites.forEach(function (btn, index) {
    let id = btn.closest(".comment_people").getAttribute("data-index");

    if (localStorage.getItem(`active-favorites${id}`) !== null && btn.closest(".answer") === null) {
      btn.setAttribute(`active-favorites${id}`, localStorage.getItem(`active-favorites${id}`));
      btn.style = "color: red";
      btn.innerHTML = "<p>В избранном</p>";
    }

    if (btn.closest(".answer") !== null && localStorage.getItem(`active-favorites${id}.${btn.closest(".answer").getAttribute("data-index")}`) !== null) {
      btn.setAttribute(`active-favorites${id}.${btn.closest(".answer").getAttribute("data-index")}`, localStorage.getItem(`active-favorites${id}.${btn.closest(".answer").getAttribute("data-index")}`));
      btn.style = "color: red";
      btn.innerHTML = "<p>В избранном</p>";
    }
  });
}

function sortFavorites() {
  let favoritesButton = document.querySelector(".favorites");
  let messages = document.querySelectorAll(".comment_people ");
  let isAgain = false;

  favoritesButton.addEventListener("click", function () {
    if (!isAgain) {
      messages.forEach(function (mess, index) {
        let id = mess.getAttribute("data-index");
        if (mess.querySelector(`[active-favorites${id}="true"]`) === null) {
          mess.style = "display: none";
          favoritesButton.style = "color: red";
          isAgain = true;
        }
      });
    } else {
      messages.forEach(function (mess, index) {
        mess.style = "display: flex";
        favoritesButton.style = "color: black";
        isAgain = false;
      });
    }
  });
}

function plusMinusButtons() {
  let messages = document.querySelectorAll(".comment_people ");
  messages.forEach(function (mess, index) {
    let btnMinus = mess.querySelector(".button_minus");
    let btnPlus = mess.querySelector(".button_plus");
    let numberLikes = +mess.querySelector(".number_likes").textContent;
    let newNumberLikes = numberLikes;

    btnMinus.addEventListener("click", function () {
      newNumberLikes--;
      getNumber(newNumberLikes);
    });

    btnPlus.addEventListener("click", function () {
      newNumberLikes++;
      getNumber(newNumberLikes);
    });

    function getNumber(num) {
      console.log(num);
      localStorage.setItem(`likeAuthor${index}`, num);
      mess.querySelector(".number_likes").innerText = +num;
      if (num <= numberLikes - 1) {
        btnMinus.setAttribute("disabled", "");
        btnMinus.style = "color: black; opacity: 0.4;";
      } else {
        btnMinus.removeAttribute("disabled");
        btnMinus.removeAttribute("style");
      }
      if (num >= numberLikes + 1) {
        btnPlus.setAttribute("disabled", "");
        btnPlus.style = "color: black; opacity: 0.4;";
      } else {
        btnPlus.removeAttribute("disabled");
        btnPlus.removeAttribute("style");
      }
      if (num < 0) {
        mess.querySelector(".number_likes").style = "color: red";
      } else {
        mess.querySelector(".number_likes").removeAttribute("style");
      }
    }
  });
}

function padTo2Digits(num) {
  return num.toString().padStart(2, "0"); // Преобразует 9 в 09, а 10 оставит без изменений
}

function random(min, max) {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

document.addEventListener("DOMContentLoaded", mainStart);

function mainStart() {
  getStartComments();
  getComments();
  getApi();
  commentsCount();
  sortCount();
  getAnswers();
  answerCount();
  getFavorites();
  sendComment();
  // answerButton();
  // favorites();
  sortFavorites();
  plusMinusButtons();
}
