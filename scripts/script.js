const loadLession = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => {
      displayLession(json.data);
    });
};

const removeClass = (lessionBtn) => {
  const lessionAllBtn = document.querySelectorAll(".activeBtn");
  lessionAllBtn.forEach((btn) => {
    btn.classList.remove("active");
  });
};

const createElement = (arr) => {
  const htmlElement = arr.map((el) => `<span class="btn">${el}</span>`);
  return htmlElement.join(" ");
};

const loadWordDetails = async (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  const res = await fetch(url);
  const details = await res.json();
  showWordDetais(details.data);
  document.getElementById("my_modal_5").showModal();
};
const showWordDetais = (word) => {
  const detailsBox = document.getElementById("details-conatainer");
  detailsBox.innerHTML = `
  <div>
    <h1 class="text-2xl">${word.word} (<i class="fa-solid fa-microphone-lines"></i> :${word.pronunciation})</h1>
  </div>
  <div>
    <h2 class="font-bold">Meaning</h2>
    <p class="font-bangla">${word.meaning}</p>
  </div>
  <div>
    <h2 class="font-bold">Example</h2>
    <p>${word.sentence}</p>
  </div>
  <div>
    <h2 class="font-bangla font-bold">সমার্থক শব্দ গুলো</h2>
    <div>${createElement(word.synonyms)}</div>
  </div>
  `;
};

const manageSpin = (status) => {
  if (status == true) {
    document.getElementById("spiner").classList.remove("hidden");
    console.log(document.getElementById("spiner"));
    document.getElementById("word-container").classList.add("hidden");
    console.log(document.getElementById("word-container"));
  } else {
    document.getElementById("word-container").classList.remove("hidden");
    console.log(document.getElementById("word-container"));
    document.getElementById("spiner").classList.add("hidden");
    console.log(document.getElementById("spiner"));
  }
};

const loadLessionWord = (id) => {
  manageSpin(true);
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((response) => response.json())
    .then((elemenst) => {
      const lessionBtn = document.getElementById(`lession-btn-${id}`);
      removeClass(lessionBtn);
      lessionBtn.classList.add("active");

      displayLessionWord(elemenst.data);
    });
};

const displayLessionWord = (words) => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";
  if (words.length == 0) {
    wordContainer.innerHTML = `
    <div class="col-span-full space-y-5">
      <img src="./assets/alert-error.png" class="mx-auto">
      <p class="font-bangla text-xl font-semibold">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
      <h2 class="font-bangla text-4xl font-bold">নেক্সট Lesson এ যান</h2>
    </div>
    `;
    manageSpin(false);
    return;
  }

  words.forEach((word) => {
    const wordDiv = document.createElement("div");
    wordDiv.innerHTML = `
    <div class="bg-white p-5 rounded-lg w-11/12 mx-auto space-y-2">
        <h2 class="font-bangla font-bold text-2xl">${word.word ? word.word : "শব্দ পাওয়া যায়নি।"}</h2>
        <p class="font-semibold">${word.pronunciation ? word.pronunciation : "শব্দ পাওয়া যায়নি।"}</p>
        <div class="font-bangla font-semibold text-2xl">"${word.meaning ? word.meaning : "শব্দ পাওয়া যায়নি।"}"</div>
        <div class="flex justify-between items-center">
          <button onclick="loadWordDetails(${word.id})"><i class="info-btn fa-solid fa-circle-info"></i></button>
          <button><i class="volume-btn fa-solid fa-volume"></i></i></button>
          
        </div>
      </div>
    `;
    wordContainer.append(wordDiv);
  });
  manageSpin(false);
};

const displayLession = (lession) => {
  const levelContainer = document.getElementById("level-container");
  levelContainer.innerHTML = "";

  for (lession of lession) {
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
    <button id="lession-btn-${lession.level_no}" href="#" onclick="loadLessionWord(${lession.level_no})" class="activeBtn btn btn-outline btn-primary"><i class="fa-solid fa-book-open"></i>Lession
    ${lession.level_no}
    </button>
    `;
    levelContainer.append(btnDiv);
  }
};
loadLession();
