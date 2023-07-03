const quantityOfCompaniesPerSite = 10;
let quantityOfCompanies = 0;
let pageIndex = 1;

function updateTable(pageIndex) {
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

  Promise.all([fetch(urlQuantityOfCompanies), fetch(urlCompanies)]) //pending, fulfilled or rejected
    .then((responses) => Promise.all(responses.map((res) => res.json())))
    .then(([quantityData, companiesData]) => {
      quantityOfCompanies = quantityData.size;
      const objectDataCompanies = companiesData.resultset;

      const fetchCompanyData = (company_id) => {
        const urlCompany =
          "https://corsproxy.io/?" +
          encodeURIComponent(
            `https://jobboerse.htl-braunau.at/htl_job_api.php?cmd=getcpysingle&company_id=${company_id}`
          );

        return fetch(urlCompany)
          .then((data) => data.json())
          .then((companyData) => {
            companyData = companyData.result;
            return companyData;
          });
      };

      const fetchCompanyDataPromises = objectDataCompanies.map((company) =>
        fetchCompanyData(company.company_id)
      );

      Promise.all(fetchCompanyDataPromises)
        .then((companyDataArray) => {

          let tableData = "";
          objectDataCompanies.forEach((values, index) => {
            tableData += `
              <tr class="tr-table-body">
                <td>${values.name}</td>
                <td>${values.zip} ${values.city} - ${values.country}</td>
                <td>Jobs: ${values.jobs}</td>
                <td><button class="more-info-btn">More info</button></td>
              </tr>
              `;
          });

          const tableBody = document.getElementById("table-body");
          tableBody.innerHTML = tableData;

          const moreInfoBtnElements =
            document.querySelectorAll(".more-info-btn");

          const fetchJobsDataPerCompany = (company_id) => {
            const urlCompany =
              "https://corsproxy.io/?" +
              encodeURIComponent(
                `https://jobboerse.htl-braunau.at/htl_job_api.php?cmd=getlist&maxage=300&company_id=${company_id}`
              );

            return fetch(urlCompany)
              .then((data) => data.json())
              .then((jobsDataPerCompany) => {
                jobsDataPerCompany = jobsDataPerCompany.resultset;
                return jobsDataPerCompany;
              });
          };

          const fetchJobsDataPerCompanyPromises = objectDataCompanies.map(
            (company) =>
              fetchJobsDataPerCompany(company.company_id).catch(() => [])
          );

          Promise.all(fetchJobsDataPerCompanyPromises).then(
            (jobsDataPerCompanyArray) => {

              moreInfoBtnElements.forEach((moreInfoBtnEl, index) => {
                let isDataVisible = false; // Flag to track data visibility

                moreInfoBtnEl.addEventListener("click", displayMoreInfo);
                function displayMoreInfo(event) {
                  //Hier habe ich dewegen eine non-arrow function, weil diese auch vor creation aufrufbar ist
                  const clickedButton = event.target;
                  const buttonValue = clickedButton.value;

                  const companyData = companyDataArray[index];
                  const jobsDataPerCompany = jobsDataPerCompanyArray[index];

                  // Process the companyData and jobsDataPerCompany here

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
                    `${companyData.address}`,
                    `${companyData.company_id}`,
                    `${companyData.companygroup_id}`,
                    `${companyData.email}`,
                    `${companyData.fax}`,
                    `${companyData.image}`,
                    `${companyData.name}`,
                    `${companyData.phone}`,
                    `${companyData.www}`,
                  ];

                  for (let i = 0; i < labels.length; i++) {
                    const field = fields[i];
                    if (field) {
                      const additionalRow = document.createElement("tr");
                      additionalRow.classList.add("additional-row");

                      const thElement = document.createElement("th");
                      const tdElement1 = document.createElement("td");
                      const tdElement2 = document.createElement("td");
                      const tdElement3 = document.createElement("td");

                      thElement.textContent = labels[i];
                      tdElement1.textContent = fields[i];
                      tdElement2.textContent = "";
                      tdElement3.innerHTML = "";

                      additionalRow.appendChild(thElement);
                      additionalRow.appendChild(tdElement1);
                      additionalRow.appendChild(tdElement2);
                      additionalRow.appendChild(tdElement3);

                      additionalRows.push(additionalRow);
                    }
                  }

                  jobsDataPerCompany.forEach((job, jobIndex) => {
                    if (isDataVisible) {
                      return;
                    }

                    const additionalRow = document.createElement("tr");
                    additionalRow.classList.add("additional-row-jobs");

                    const thElement = document.createElement("th");
                    const tdElement1 = document.createElement("td");
                    const tdElement2 = document.createElement("td");
                    const tdElement3 = document.createElement("td");

                    thElement.textContent = `Job-Nr. ${jobIndex + 1}`;
                    tdElement1.textContent = job.title;
                    tdElement2.textContent = "";
                    tdElement3.textContent = "";

                    additionalRow.appendChild(thElement);
                    additionalRow.appendChild(tdElement1);
                    additionalRow.appendChild(tdElement2);
                    additionalRow.appendChild(tdElement3);

                    additionalRows.push(additionalRow);
                  });

                  additionalRows.reverse().forEach((row) => {
                    if (isDataVisible) {
                      return;
                    }
                    clickedButton.parentElement.parentElement.insertAdjacentElement(
                      "afterend",
                      row
                    );
                  });
                  isDataVisible = true;
                }
              });
            }
          );
        })
        .catch((error) => console.log(error));
    })
    .catch((error) => console.log(error));
}

updateTable(pageIndex);

// pagination
const prevBtnElement = document.querySelector(".prev-btn");
const nextBtnElement = document.querySelector(".next-btn");
const middleButtonElement = document.querySelector(".middle-btn");
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
    updateTable(pageIndex);
  }
});

nextBtnElement.addEventListener("click", () => {
  if (pageIndex === 71) {
    pageIndex = 1;
    updateTable(pageIndex);
    paginationInputElement.value = 1;
    return;
  }

  if (pageIndex < Math.floor(quantityOfCompanies / 10) * 10 + 1) {
    pageIndex += 10;
    updateTable(pageIndex);
    getPageNumber(pageIndex);
  } else {
    pageIndex = 1;
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
    location.reload();
    return;
  }

  if (
    paginationInputElementValue >
      Math.ceil(quantityOfCompanies / quantityOfCompaniesPerSite) ||
    paginationInputElementValue < 0
  ) {
    maxPageNumber = Math.ceil(quantityOfCompanies / quantityOfCompaniesPerSite);
    alert(`Es gibt nur ${maxPageNumber} Seiten!`);
    location.reload();
    return;
  }
  updateTable(pageIndex);
});
