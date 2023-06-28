const quantityOfCompaniesPerSite = 10;
let pageIndex = 0;

function updateTable(pageIndex) {
  const url =
    "https://corsproxy.io/?" +
    encodeURIComponent(
      `https://jobboerse.htl-braunau.at/htl_job_api.php?cmd=getcpylist&count=${quantityOfCompaniesPerSite}&from=${
        pageIndex * quantityOfCompaniesPerSite
      }&maxage=300`
    );

  fetch(url)
    .then((data) => {
      return data.json();
    })
    .then((objectData) => {
      // console.log(objectData);
      let tableData = "";
      objectData.resultset.map((values) => {
        tableData += `
          <tr class="tr-table-body">
          <td>${values.name}</td>
          <td>${values.zip} ${values.city} - ${values.country}</td>
          <td>Jobs: ${values.jobs}</td>
          <td><button class="more-info-btn">More info</button></td>
          <ul class="ul-opened-by-button"></ul>
        </tr>`;
      });
      const tableBody = document.getElementById("table-body");
      tableBody.innerHTML = tableData;
    })
    .catch((error) => console.log(error));
}

updateTable(pageIndex);

// pagination

let linkElements = document.getElementsByClassName("link");
const prevBtnElement = document.querySelector(".prev-btn");
const nextBtnElement = document.querySelector(".next-btn");

let currentValue = 1;

for (lElement of linkElements) {
  lElement.addEventListener("click", (event) => {
    for (lElement of linkElements) {
      lElement.classList.remove("active");
    }
    event.target.classList.add("active");
    currentValue = event.target.value;
  });
}

prevBtnElement.addEventListener("click", () => {
  if (pageIndex > 0) {
    for (lElement of linkElements) {
      lElement.classList.remove("active");
    }
      // TODO: Page index
      pageIndex--;
      updateTable(pageIndex);
      linkElements[currentValue - 1].classList.add("active");
      currentValue--;
    }
});

nextBtnElement.addEventListener("click", () => {
  if (pageIndex < linkElements.length) { // unendliche zahl!!
    for (lElement of linkElements) {
      lElement.classList.remove("active");
    }
    // currentValue++;
    // TODO: Page index
    pageIndex++;
    updateTable(pageIndex);
    linkElements[currentValue - 1].classList.add("active");
    currentValue++;
  }
});
