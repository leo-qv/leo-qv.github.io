window.addEventListener('DOMContentLoaded', () => {
  var request = new XMLHttpRequest();

  request.onreadystatechange = function () {
    if (this.readyState === this.DONE) {
      var chpaters = JSON.parse(request.responseText);
      var parsedChapters = Object.entries(chpaters);
      buildChapterDesc(parsedChapters);
    }
  }
  request.open("GET", "../chapters.json") // replace with URL of your choosing
  request.send()

});

function generateSectionDesc(sections) {
  let descTemplate = "";
  sections.forEach(section => {
    descTemplate = descTemplate + `<li class="list-group-item">${section.Part}</li>`;
  });
  return descTemplate;
}


function buildChapterDesc(parsedChapters) {
  var unitNum = 4;

  var nav = document.querySelector(".tab-content");
  for (let index = 0; index < unitNum; index++) {
    var chapterElements = [];
    var showActiveTabClass = "";
    if (index == 0) {
      showActiveTabClass = "show active"
    }
    parsedChapters.forEach(parsedChapter => {
      if (index + 1 == parsedChapter[1].unit) {
        let parsedChapterHTML = `<p>${parsedChapter[1].Title}</p>`;
        chapterElements.push(parsedChapterHTML);
      }
    });
    nav.insertAdjacentHTML('beforeend', `<div class="tab-pane fade ${showActiveTabClass}" id="unit${index}">      
            ${chapterElements.join('')}</div>`)
  }
}



function buildChapterCards(sections, modules, unit) {
  let cardContainer = document.querySelector(".chapter-card-container");
  let filteredModulesForUnit = modules.map(module => module[1].unit == unit)
  let filteredSectionsForUnit = sections.map(module => module[1].unit == unit)
  let allModuleNames = a => [...new Set(modules.map(a => a[0]))];

  for (let index = 0; index < filteredModulesForUnit.length; index++) {

    buildChapterCard(filterSections(filteredSectionsForUnit, filteredModulesForUnit[index]), filteredModulesForUnit[index])

  }
}

function buildChapterCard(sections, module) {
  return `<div class="card" style="width: 18rem;> </div> <div class="card-body">
<h5 class="card-title">${module.Title}</h5>
<p class="card-text">${module.Description}</p>
<ul class="list-group list-group-flush">
${generateSectionDesc(sections)}
</ul>
</div>`
}

function filterSections(sections, module) {
  let filteredSections = new Map();

  sections.forEach(section => {
    let objArr = [];

    if (module[0].Section === section[0].Section) {
      objArr.push(section)

    };
    filteredSections.set(module[0].Section, objArr)
  })
  return filteredSections;
}






