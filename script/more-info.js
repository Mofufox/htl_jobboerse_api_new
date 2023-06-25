

// // Function to display the company details in a modal or separate section
// function displayCompanyDetails(company) {
//     // You can customize this part to display the details as per your requirements
//     const companyDetails = document.createElement("div");
//     companyDetails.innerHTML = `
//       <h2>${company.name}</h2>
//       <p>Address: ${company.zip} ${company.city} - ${company.country}</p>
//       <p>Jobs: ${company.jobs}</p>
//       <img src="${company.logo}" alt="Company Logo">
//     `;
//     // Append the company details to a modal or a separate section on the page
//     // You can customize this part as needed
//     document.body.appendChild(companyDetails);
//   }
  
//   // Update the openList function to fetch and display the company details
//   function openList() {
//     const companyId = this.dataset.companyId;
//     const url = 'https://corsproxy.io/?' + encodeURIComponent(`https://jobboerse.htl-braunau.at/htl_job_api.php?cmd=getcpy&cpid=${companyId}`);
    
//     fetch(url)
//       .then((data) => data.json())
//       .then((companyData) => {
//         if (companyData.resultset && companyData.resultset.length > 0) {
//           const company = companyData.resultset[0];
//           displayCompanyDetails(company);
//         } else {
//           console.log("No company data available");
//         }
//       })
//       .catch((error) => console.log(error));
//   }
  
//   // Register event listeners for "More info" buttons
//   function registerMoreInfoEventListeners() {
//     const moreInfoBtnElements = document.getElementsByClassName("more-info-btn");
  
//     if (moreInfoBtnElements.length > 0) {
//       for (let i = 0; i < moreInfoBtnElements.length; i++) {
//         moreInfoBtnElements[i].addEventListener("click", openList);
//       }
//     }
//   }
  
//   // Retrieve the table body element
//   const tableBody = document.getElementById("table-body");
  
//   // Event listener for clicks on the table body
//   tableBody.addEventListener("click", function (event) {
//     // Check if the clicked element has the "more-info-btn" class
//     if (event.target.classList.contains("more-info-btn")) {
//       openList.call(event.target); // Call the openList function with the clicked element as the context
//     }
//   });
  
//   // Call the function to register event listeners for "More info" buttons
//   registerMoreInfoEventListeners();
  





// Function to display the company details in a modal or separate section
function displayCompanyDetails(company) {
    // You can customize this part to display the details as per your requirements
    const companyDetails = document.createElement("div");
    companyDetails.innerHTML = `
      <h2>${company.name}</h2>
      <p>Address: ${company.zip} ${company.city} - ${company.country}</p>
      <p>Jobs: ${company.jobs}</p>
      <img src="${company.logo}" alt="Company Logo">
    `;
    // Append the company details to a modal or a separate section on the page
    // You can customize this part as needed
    document.body.appendChild(companyDetails);
  }
  
  // Update the openList function to fetch and display the company details
  function openList() { 
    const companyId = this.dataset.companyId;
    // const url = 'https://corsproxy.io/?' + encodeURIComponent(`https://jobboerse.htl-braunau.at/htl_job_api.php?cmd=getcpysingle&company_id=${companyId}`);
    const url = `https://corsproxy.io/?${encodeURIComponent(`https://jobboerse.htl-braunau.at/htl_job_api.php?cmd=getcpysingle&company_id=${companyId}`)}`;
    
    
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data.resultset && data.resultset.length > 0) {
          const company = data.resultset[0];
          displayCompanyDetails(company);
        } else {
          console.log("No company data available");
        }
      })
      .catch((error) => console.log(error));
  }
  
  // Register event listeners for "More info" buttons
  function registerMoreInfoEventListeners() {
    const moreInfoBtnElements = document.getElementsByClassName("more-info-btn");
  
    if (moreInfoBtnElements.length > 0) {
      for (let i = 0; i < moreInfoBtnElements.length; i++) {
        moreInfoBtnElements[i].addEventListener("click", openList);
      }
    }
  }
  
  // Retrieve the table body element
  const tableBody = document.getElementById("table-body");
  
  // Event listener for clicks on the table body
  tableBody.addEventListener("click", function (event) {
    // Check if the clicked element has the "more-info-btn" class
    if (event.target.classList.contains("more-info-btn")) {
      openList.call(event.target); // Call the openList function with the clicked element as the context
    }
  });
  
  // Call the function to register event listeners for "More info" buttons
  registerMoreInfoEventListeners();
  


















