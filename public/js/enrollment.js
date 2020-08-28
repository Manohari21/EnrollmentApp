function onNextClicked(){
    document.querySelector("#dependentInfo").classList.remove("d-none");
    document.querySelector("#subscriberInfo").classList.add("d-none");
}
function onPreviousClick(){
    document.querySelector("#dependentInfo").classList.add("d-none");
    document.querySelector("#subscriberInfo").classList.remove("d-none");
}