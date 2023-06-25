// // // https://www.youtube.com/watch?v=vvjaRIM4Bjs

let objectDataCompanies;

const urlCompanies =
  "https://corsproxy.io/?" +
  encodeURIComponent(
    "https://jobboerse.htl-braunau.at/htl_job_api.php?cmd=getcpylist&count=10&maxage=300"
    // "https://jobboerse.htl-braunau.at/htl_job_api.php?cmd=getcpysingle&company_id=1"
  );

fetch(urlCompanies)
  .then((data) => {
    return data.json(); // converted to object
  })
  .then((objectData) => {
    objectDataCompanies = objectData.resultset;
    console.log(objectDataCompanies);
    console.log(objectDataCompanies.length);

    // Second fetch
    for (let i = 0; i < objectDataCompanies.length; i++) {
      let company_id = objectDataCompanies[i].company_id;

      const urlCompany =
        "https://corsproxy.io/?" +
        encodeURIComponent(
          // "https://jobboerse.htl-braunau.at/htl_job_api.php?cmd=getcpylist&count=10&maxage=300"
          `https://jobboerse.htl-braunau.at/htl_job_api.php?cmd=getcpysingle&company_id=${company_id}`
        );

      fetch(urlCompany)
        .then((data) => {
          return data.json(); // converted to object
        })
        .then((objectData) => {
          // console.log(objectData);
          console.log(objectData.result);
          const namesElement = document.querySelector(".names");
          const liElement = document.createElement("li");
          console.log(objectData.result.name);

          function compareNumbers(a, b) {
            return a - b;
          }
          
          const sortedNr = objectDataCompanies[i].nr.sort(compareNumbers);
          console.log();
          for (let i = 0; i < objectDataCompanies.length; i++) {
            console.log(objectDataCompanies[i].nr);
            console.log(sortedNr);
            if (i === objectDataCompanies[i].nr) {
              // namesElement.innerHTML = objectData.result.name;
              namesElement.appendChild(liElement);
              liElement.innerHTML = objectData.result.name;
            }
            // const img = document.createElement("img");
            // img.src = "objectDataCompany.result.image";
            // pictureElement.appendChild(img);
          }
        })
        .catch((error) => console.log(error));
    }
  })
  .catch((error) => console.log(error));
