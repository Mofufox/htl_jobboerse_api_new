let objectDataCompanies;

const urlCompanies =
  "https://corsproxy.io/?" +
  encodeURIComponent(
    "https://jobboerse.htl-braunau.at/htl_job_api.php?cmd=getcpylist&count=10&maxage=300"
  );

fetch(urlCompanies)
  .then((data) => {
    return data.json(); // converted to object
  })
  .then((objectData) => {
    objectDataCompanies = objectData.resultset;

    // Second fetch
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
        .then((objectData) => {
        //   moreInfoBtn.addEventListener("click", () => {
            const values = objectData.result;
            for (let i = 0; i < objectDataCompanies.length; i++) {
              ulOpenedByButton.appendChild(liElement).innerHTML = `
              <table>
              <tbody>             
               <tr class="tr-table-body">
               <td> ${values.address}</td>
               <td> ${values.zip} ${values.city} - ${values.country}</td>
               <td> ${values.company_id}</td>
               <td> ${values.companygroup_id}</td>
               <td> ${values.email} ${values.fax}</td>
               <td> ${values.image}</td>
               <td> ${values.name}</td>
               <td> ${values.phone}</td>
               <td> ${values.www}</td>
              </tr>
              </tbody>
              </table>
              `;
            }
        //   });
        })
        .catch((error) => console.log(error));
    }
  })
  .catch((error) => console.log(error));
