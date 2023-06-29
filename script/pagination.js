const quantityOfCompaniesPerSite = 100;
let quantityOfCompanies = 0;
let pageIndex = 1;

function updateTable(pageIndex) {
  // const url =
  // "https://corsproxy.io/?" +
  // encodeURIComponent(
  //   `https://jobboerse.htl-braunau.at/htl_job_api.php?cmd=getcpylist&count=${quantityOfCompaniesPerSite}&from=1&maxage=300`
  // );

  // Erste Seite muss mit 1 anfangen
  // Zweite Seite muss mit 11 anfangen

  const url =
    "https://corsproxy.io/?" +
    encodeURIComponent(
      `https://jobboerse.htl-braunau.at/htl_job_api.php?cmd=getcpylist&count=${quantityOfCompaniesPerSite}&from=${pageIndex}&maxage=300`
    );

  const urlQuantityOfCompanies =
    "https://corsproxy.io/?" +
    encodeURIComponent(
      `https://jobboerse.htl-braunau.at/htl_job_api.php?cmd=getcpysize&maxage=300`
    );

  //fetch quantityOfCompanies
  fetch(urlQuantityOfCompanies)
    .then((data) => {
      return data.json();
    })
    .then((objectData) => {
      quantityOfCompanies = objectData.size;
      console.log("Quantity of companies: " + quantityOfCompanies);
    })
    .catch((error) => console.log(error));

  fetch(url)
    .then((data) => {
      return data.json();
    })
    .then((objectData) => {
      // console.log(objectData);
      // console.log(objectData.resultset);
      let tableData = "";
      objectData.resultset.map((values) => {
        // console.log(values);
        console.log(values.nr + "." + values.name);
        console.log("Page index: " + pageIndex);
        tableData += `
          <tr class="tr-table-body">
            <td>${values.name}</td>
            <td>${values.zip} ${values.city} - ${values.country}</td>
            <td>Jobs: ${values.jobs}</td>
            <td><button class="more-info-btn" data-moreinfobtn="${values.nr}">More info</button></td>
          </tr>

          <tr class="a" style="position:relative">
            <th>Name Ariel gggg gggg</th>
            <td>Name ddddddddddddddddddd</td>
            <td></td>
            <td></td>
          </tr>
          <tr class="a" style="position:relative">
            <th>Name Ariel gggg gggg</th>
            <td>Name ddddddddddddddddddd</td>
            <td></td>
            <td></td>
          </tr>
        </tr>
          <tr class="tr-more-info">
            <td>Name: ${values.name}</td>
            <td>Szabó</td>
          </tr>

          `;
      });


      // <ul class="ul-opened-by-button"><li>Ariel</li></ul>
      const tableBody = document.getElementById("table-body");
      tableBody.innerHTML = tableData;
    })
    .catch((error) => console.log(error));
}

const moreInfoBtnElements = document.querySelectorAll(".more-info-btn");
console.log(moreInfoBtnElements);

for (moreInfoBtnEl of moreInfoBtnElements) {
  moreInfoBtnEl.addEventListener("click", (event) => {
    const trTableBodyElement = document.querySelector(".tr-table-body");
  });
}

updateTable(pageIndex);

// pagination

// let linkElements = document.getElementsByClassName("link");
const prevBtnElement = document.querySelector(".prev-btn");
const nextBtnElement = document.querySelector(".next-btn");
const middleButtonElement = document.querySelector(".middle-button");
const paginationInputElement = document.getElementById("pagination-input");

console.log(pageIndex);

// pageIndex: 1, 11, 21, 31, 41, 51, 61, 71, 81
//      page: 1, 2,  3,  4,  5,  6,  7,  8,  9

let maxPageNumber;

function getPageNumber(pageIndex) {
  // Determine the page number based on the pageIndex
  let maxPageNumber = Math.ceil(
    quantityOfCompanies / quantityOfCompaniesPerSite
  );
  if (pageIndex === 1) {
    paginationInputElement.value = maxPageNumber;
    return;
  }
  let pageNumber = Math.ceil(pageIndex / quantityOfCompaniesPerSite);
  paginationInputElement.value = pageNumber;
}

prevBtnElement.addEventListener("click", () => {
  // if ((paginationInputElement.value = 0)) {
  //   pageIndex = Math.ceil(quantityOfCompanies / 10) * 10 - 9;
  //   console.log("Pageindex:" + pageIndex);
  //   updateTable(pageIndex);
  //   getPageNumber(pageIndex);
  // }

  if (pageIndex === 11) {
    pageIndex = pageIndex - 10;
    updateTable(pageIndex);
    paginationInputElement.value = 1;
    return;
  }

  if (pageIndex > 1) {
    pageIndex -= 10;
    updateTable(pageIndex);
    getPageNumber(pageIndex);
  } else {
    getPageNumber(1);
    pageIndex = Math.ceil(quantityOfCompanies / 10) * 10 - 9;
    console.log("Pageindex:" + pageIndex);
    updateTable(pageIndex);
  }
});

nextBtnElement.addEventListener("click", () => {
  if (pageIndex === 81) {
    pageIndex = 1;
    updateTable(pageIndex);
    paginationInputElement.value = 1;
    return;
  }

  if (pageIndex < Math.floor(quantityOfCompanies / 10) * 10 + 1) {
    pageIndex += 10;
    console.log("Page index kleiner: " + pageIndex);
    updateTable(pageIndex);
    getPageNumber(pageIndex);
  } else {
    pageIndex = 1;
    console.log("Page index gleich: " + pageIndex);
    updateTable(pageIndex);
    getPageNumber(pageIndex);
  }
});

middleButtonElement.addEventListener("click", () => {
  let paginationInputElementValue = parseInt(paginationInputElement.value);

  pageIndex = paginationInputElementValue;

  if (paginationInputElementValue > 1) {
    pageIndex = paginationInputElementValue * 10 + 1 - 10;
  }

  if (paginationInputElementValue === 0) {
    alert("Die erste Seite hat die Nummer 1!");

    console.log("Page index kleiner: " + pageIndex);

    // updateTable(1);
    // paginationInputElement.value = 1;
    location.reload();
    return;
  }

  if (
    paginationInputElementValue >
    Math.ceil(quantityOfCompanies / quantityOfCompaniesPerSite)
  ) {
    maxPageNumber = Math.ceil(quantityOfCompanies / quantityOfCompaniesPerSite);
    alert(`Es gibt nur ${maxPageNumber} Seiten!`);
    paginationInputElement.value = maxPageNumber;
    return;
  }
  updateTable(pageIndex);
});
