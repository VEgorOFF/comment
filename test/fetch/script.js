function getApi() {
  const divBlock = document.querySelectorAll(".divBlock");

  for (let i = 0; i < divBlock.length; i++) {
    fetch("https://randomuser.me/api/")
      .then((res) => res.json())
      .then((data) => {
        let firstName = data.results[0].name.first;
        let lastName = data.results[0].name.last;
        let picture = data.results[0].picture.large;

        let divFirstName = divBlock[i].querySelector(".firstName");
        let divPhoto = divBlock[i].querySelector(".photo");
        divFirstName.innerHTML = `${firstName} ${lastName}`;
        divPhoto.innerHTML = `<img src="${picture}">`;
      });
  }
}
getApi();
