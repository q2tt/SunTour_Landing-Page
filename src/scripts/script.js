const getEl  = (id) => document.getElementById(id);


getEl('watchMore').addEventListener("click", () => {
    getEl("addInfo").classList.toggle("d-block");
})