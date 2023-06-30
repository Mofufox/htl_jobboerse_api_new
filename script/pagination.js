const quantityOfCompaniesPerSite = 10;
let quantityOfCompanies = 0;
let pageIndex = 1;

function updateTable(pageIndex) {
  //      page: 1, 2,  3,  4,  5,  6,  7,  8,  9
  // pageIndex: 1, 11, 21, 31, 41, 51, 61, 71, 81

  const urlCompanies =
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
      // console.log("Quantity of companies: " + quantityOfCompanies);
    })
    .catch((error) => console.log(error));

  fetch(urlCompanies)
    .then((data) => {
      return data.json();
    })
    .then((objectData) => {
      // console.log(objectData);
      objectDataCompanies = objectData.resultset;
      console.log(objectDataCompanies);

      // TODO:
      for (let i = 0; i < objectDataCompanies.length; i++) {
        let company_id = objectDataCompanies[i].company_id;

        const urlCompany =
          "https://corsproxy.io/?" +
          encodeURIComponent(
            `https://jobboerse.htl-braunau.at/htl_job_api.php?cmd=getcpysingle&company_id=${company_id}`
          );

        fetch(urlCompany)
          .then((data) => {
            return data.json(); // converted to object
          })
          .then((companyData) => {
            // Process company data here
            console.log(companyData);
            companyData = companyData.result;
            console.log(companyData);
            console.log(companyData.country);

            // TODO: HIER!!!
            let tableData = "";
            objectData.resultset.map((values) => {
              // console.log(values.nr + "." + values.name);
              console.log(values.nr + "." + values.country); //Nicht jede Frima hat eine country eingetragen!!??
              console.log("Page index: " + pageIndex);
              tableData += `
                <tr class="tr-table-body">
                  <td>${values.name}</td>
                  <td>${values.zip} ${values.city} - ${values.country}</td>
                  <td>Jobs: ${values.jobs}</td>
                  <td><button class="more-info-btn" value="${values.nr}" data-moreinfobtn="${values.nr}">More info</button></td>
                </tr>
                `;
            });

            // <ul class="ul-opened-by-button"><li>Ariel</li></ul>
            const tableBody = document.getElementById("table-body"); //TODO: brauche ich das????
            tableBody.innerHTML = tableData;

            const moreInfoBtnElements =
              document.querySelectorAll(".more-info-btn");
            // console.log(moreInfoBtnElements);

            for (moreInfoBtnEl of moreInfoBtnElements) {
              moreInfoBtnEl.addEventListener("click", (event) => {
                const clickedButton = event.target;

                const additionalRows = [];
                const labels = [
                  "Address",
                  "Company ID",
                  "Companygroup ID",
                  "Email",
                  "Fax",
                  "Image",
                  "Name",
                  "Phone",
                  "Website",
                ];
                const fields = [
                  `${companyData.zip} ${companyData.city} - ${companyData.country}`,
                  `${companyData.company_id}`,
                  `${companyData.companygroup_id}`,
                  `${companyData.email}`,
                  `${companyData.fax}`,
                  `${companyData.image}`,
                  `${companyData.name}`,
                  `${companyData.phone}`,
                  `${companyData.www}`,
                  `${companyData.email}`,
                ];

                for (let i = 0; i < labels.length; i++) {
                  const additionalRow = document.createElement("tr");
                  additionalRow.classList.add("additional-row"); 
             

                  const thElement = document.createElement("th");
                  const tdElement1 = document.createElement("td");
                  const tdElement2 = document.createElement("td");
                  const tdElement3 = document.createElement("td");

                  thElement.textContent = labels[i];
                  tdElement1.textContent = fields[i];
                  tdElement2.textContent = "";
                  tdElement3.textContent = "";

                  additionalRow.appendChild(thElement);
                  additionalRow.appendChild(tdElement1);
                  additionalRow.appendChild(tdElement2);
                  additionalRow.appendChild(tdElement3);

                  additionalRows.push(additionalRow);
                  // thElement.style.background = "blue";
                }

                additionalRows.reverse().forEach((row) => {
                  clickedButton.parentElement.parentElement.insertAdjacentElement(
                    "afterend",
                    row
                  );
                });
              });
            }

            // for (moreInfoBtnEl of moreInfoBtnElements) {
            //   moreInfoBtnEl.addEventListener("click", (event) => {
            //     const clickedButton = event.target;

            //     const additionalRow1 = document.createElement("tr");
            //     additionalRow1.classList.add("additional-row");

            //     const additionalRow2 = document.createElement("tr");
            //     additionalRow2.classList.add("additional-row");

            //     const thElement1 = document.createElement("th");
            //     const tdElement1 = document.createElement("td");
            //     const tdElement2 = document.createElement("td");
            //     const tdElement3 = document.createElement("td");

            //     const thElement2 = document.createElement("th");
            //     const tdElement4 = document.createElement("td");
            //     const tdElement5 = document.createElement("td");
            //     const tdElement6 = document.createElement("td");

            //     // tdElement.setAttribute("colspan", "4");
            //     thElement1.textContent = `Adresse`;
            //     tdElement1.textContent = `${companyData.zip} ${companyData.city}`;
            //     tdElement2.textContent = `${companyData.country}`;
            //     tdElement3.textContent = "";

            //     thElement2.textContent = `Company ID`;
            //     tdElement4.textContent = `${companyData.company_id}`;
            //     tdElement5.textContent = ``;
            //     tdElement6.textContent = "";

            //     additionalRow1.appendChild(thElement1);
            //     additionalRow1.appendChild(tdElement1);
            //     additionalRow1.appendChild(tdElement2);
            //     additionalRow1.appendChild(tdElement3);

            //     additionalRow2.appendChild(thElement2);
            //     additionalRow2.appendChild(tdElement4);
            //     additionalRow2.appendChild(tdElement5);
            //     additionalRow2.appendChild(tdElement6);

            //     console.log(clickedButton);
            //     clickedButton.parentElement.parentElement.insertAdjacentElement(
            //       "afterend",
            //       additionalRow2
            //     );
            //     clickedButton.parentElement.parentElement.insertAdjacentElement(
            //       "afterend",
            //       additionalRow1
            //     );
            //   });
            // }
          })
          .catch((error) => console.log(error));
      }
      // TODO:

      // let tableData = "";
      // objectData.resultset.map((values) => {
      //   console.log(values.nr + "." + values.name);
      //   console.log("Page index: " + pageIndex);
      //   tableData += `
      //     <tr class="tr-table-body">
      //       <td>${values.name}</td>
      //       <td>${values.zip} ${values.city} - ${values.country}</td>
      //       <td>Jobs: ${values.jobs}</td>
      //       <td><button class="more-info-btn" value="${values.nr}" data-moreinfobtn="${values.nr}">More info</button></td>
      //     </tr>
      //     `;
      // });

      // // <ul class="ul-opened-by-button"><li>Ariel</li></ul>
      // const tableBody = document.getElementById("table-body");
      // tableBody.innerHTML = tableData;

      // const moreInfoBtnElements = document.querySelectorAll(".more-info-btn");
      // console.log(moreInfoBtnElements);

      // for (moreInfoBtnEl of moreInfoBtnElements) {
      //   moreInfoBtnEl.addEventListener("click", (event) => {
      //     const clickedButton = event.target;

      //     const additionalRow = document.createElement("tr");
      //     additionalRow.classList.add("additional-row");

      //     const thElement = document.createElement("th");
      //     const tdElement1 = document.createElement("td");
      //     const tdElement2 = document.createElement("td");
      //     const tdElement3 = document.createElement("td");

      //     // tdElement.setAttribute("colspan", "4");
      //     thElement.textContent = `NAME ${companyData.www}`;
      //     tdElement1.textContent = "HALOOOOOO";
      //     tdElement2.textContent = "";
      //     tdElement3.textContent = "";

      //     additionalRow.appendChild(thElement);
      //     additionalRow.appendChild(tdElement1);
      //     additionalRow.appendChild(tdElement2);
      //     additionalRow.appendChild(tdElement3);

      //     console.log(clickedButton);
      //     clickedButton.parentElement.parentElement.insertAdjacentElement(
      //       "afterend",
      //       additionalRow
      //     );
      //   });
      // }
    })
    .catch((error) => console.log(error));
}

updateTable(pageIndex);

// pagination

// let linkElements = document.getElementsByClassName("link");
const prevBtnElement = document.querySelector(".prev-btn");
const nextBtnElement = document.querySelector(".next-btn");
const middleButtonElement = document.querySelector(".middle-button");
const paginationInputElement = document.getElementById("pagination-input");

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
