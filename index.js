const init = async () => {
  const inputForm = document.querySelector("form");
  //fetchedData wait for response
  const fetchedData = await fetch(`https://api.openbrewerydb.org/breweries`)
    .then((response) => response.json())
    .then((data) => data);

  //Handle Submit Button
  inputForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const input = document.querySelector("input#new_brewery");

    //Filter Brewery Array by Value
    const tempData = fetchedData.filter(
      (elm) =>
        elm.name.toLowerCase() === input.value.toLowerCase() &&
        !(elm.brewery_type === "closed")
    );

    let section = document.querySelector("#brewery_location");
    //Clear Previous Data
    section.replaceChildren();

    if (tempData.length === 0) {
      //No Breweries Found if data not on API
      section.innerHTML = `<h1> No Breweries Found </h1>`;
    } else {
      //Add Data to Page
      tempData.forEach((tData) => {
        let brewery = document.createElement("div");
        brewery.className = "card";
        let tempHTML = `
                <h4>${tData.name}</h4>
                <p>${tData.street}</p>
                <p>${tData.city}, ${tData.state}</p>
            `;
        //Add website if exists
        if (!(tData.website_url == null)) {
          tempHTML =
            tempHTML +
            `<a href="${tData.website_url}">${tData.website_url}</a>`;
        }
        brewery.innerHTML = tempHTML;
        section.appendChild(brewery);
      });
    }
  });
  //Handle Clear Button
  inputForm.addEventListener("reset", (event) => {
    event.preventDefault();
    let section = document.querySelector("#brewery_location");
    //Clear Previous Data
    section.replaceChildren();
  });
};

document.addEventListener("DOMContentLoaded", init);
