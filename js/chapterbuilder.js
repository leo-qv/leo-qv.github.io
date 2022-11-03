window.addEventListener('DOMContentLoaded', () => {
    buildTable();

});

function buildTable(obj) {
    var unitNum = 4;

    var nav = document.querySelector("#chapter-tab");
    for (let index = 0; index < unitNum; index++) {
        if (index == 0) {
            nav.insertAdjacentHTML('beforeend',`<li class="nav-item"><a href="#unit${index}" class="nav-link active" data-bs-toggle="tab"> Unit ${index + 1}</a></li>`)
        } else {
            nav.insertAdjacentHTML('beforeend',`<li class="nav-item"><a href="#unit${index}" class="nav-link" data-bs-toggle="tab"> Unit ${index + 1}</a></li>`)
        }
    }
}
