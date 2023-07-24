

// Bringing data from ejs to js file
const dataFromServer = document.getElementById("dataFromServer");
const dataParse = JSON.parse(dataFromServer.value);
console.log(dataParse.issues);



// Function to display issues after filtering
const bugSection = document.getElementById("bugSection");
function filteredFunction(arr) {
    bugSection.innerHTML = "";

    // If there is no array just display notification else print the issues
    if (arr.length > 0) {
        for (i = 0; i < arr.length; i++) {
            let newDiv = document.createElement("div");
            newDiv.className = "bug";
            let filteredItem = `
            <p class="title">Title: <span class="name">${arr[i].title}</span></p>
            <p class="description">Description: ${arr[i].description}</p>
            <p class="label">Label: ${arr[i].label} </p>
            <p class="author">Author: ${arr[i].issueAuthor}</p>
            
            `;
            newDiv.innerHTML = filteredItem;
            bugSection.append(newDiv);
        }
    } else {
        let newDiv = document.createElement("div");
        newDiv.className = "noIssueFound";
        newDiv.innerHTML = "<h1>No Bug Found</h1>";
        bugSection.append(newDiv);
    }
}


// Filter Issue via Label
const filterBtn = document.getElementById("filterButton");
filterBtn.addEventListener("click", function () {
  const filteredArr = [];

  const checkBoxes = document.querySelectorAll("input[type='checkbox']");

  for (let i = 0; i < checkBoxes.length; i++) {
    if (checkBoxes[i].checked) {
      console.log(checkBoxes[i].checked);
      for (let j = 0; j < dataParse.issues.length; j++) {
        if (dataParse.issues[j].label === checkBoxes[i].value) {
          filteredArr.push(dataParse.issues[j]);
        }
      }
    }
  }
  filteredFunction(filteredArr);
});



// Find Issue via Author Filter
const filterBtnByAuthor = document.getElementById("filterButtonByAuthor");
filterBtnByAuthor.addEventListener("click", function () {
  const optionValue = document.getElementById("label");
  const author = dataParse.issues.filter(
    (issue) => issue.issueAuthor === optionValue.value
  );
  filteredFunction(author);
});


// Find issue via searching by title or description

const searchBtn = document.getElementById("searchButton")
searchBtn.addEventListener("click",function(){
    const searchValue = document.getElementById("searchBar").value.toLowerCase().trim()
    const filtered = dataParse.issues.filter((issue)=>issue.title.toLowerCase().includes(searchValue) || issue.description.toLowerCase().includes(searchValue))
    filteredFunction(filtered)
})