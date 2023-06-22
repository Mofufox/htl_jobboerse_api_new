// // https://www.youtube.com/watch?v=vvjaRIM4Bjs

const url =
  "https://corsproxy.io/?" +
  encodeURIComponent(
    "https://jobboerse.htl-braunau.at/htl_job_api.php?cmd=getcpylist&count=10&maxage=300"
    // "https://jobboerse.htl-braunau.at/htl_job_api.php?cmd=getcpysingle&company_id=1&detail=1"
  );

fetch(url)
  .then((data) => {
    //console.log(data); // json format
    return data.json(); // converted to object
  })
  .then((objectData) => {
    let tableData = "";
    console.log(objectData);
    console.log(objectData.resultset);
    console.log(objectData.resultset);
    objectData.resultset.map((values) => {
      tableData += `
    <tr class="tr-table-body">
      <td>${values.name}</td>
      <td>${values.zip} ${values.city} - ${values.country}</td>
      <td>Jobs: ${values.jobs}</td>
      <td><button>More indo</button></td>
    </tr>`;
      const tableBody = document.getElementById("table-body");
      tableBody.innerHTML = tableData;
    });
  })
  .catch((error) => console.log(error));



// const url =
//   "https://corsproxy.io/?" +
//   encodeURIComponent(
//     "https://jobboerse.htl-braunau.at/htl_job_api.php?cmd=getcpylist&count=10&maxage=300"
//   );

// fetch(url)
//   .then((data) => {
//     return data.json();
//   })
//   .then((objectData) => {
//     let tableData = "";
//     objectData.resultset.map((values) => {
//       // Fetch company details including the logo path
//       const companyDetailsUrl =
//         "https://jobboerse.htl-braunau.at/htl_job_api.php?cmd=getcpysingle&company_id=" +
//         values.company_id;

//       fetch(companyDetailsUrl)
//         .then((data) => data.json())
//         .then((companyData) => {
//           const logoPath = companyData.logo;
//           tableData += `
//             <tr>
//               <td>${values.name}</td>
//               <td>${values.zip} ${values.city} - ${values.country}</td>
//               <td>Jobs: ${values.jobs}</td>
//               <td><img src="${logoPath}" alt="Logo" /></td>
//             </tr>`;
//           const tableBody = document.getElementById("table-body");
//           tableBody.innerHTML = tableData;
//         })
//         .catch((error) => console.log(error));
//     });
//   })
//   .catch((error) => console.log(error));
