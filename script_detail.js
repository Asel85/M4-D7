const activeQuery = new URLSearchParams (window.location.search);
const activeId = activeQuery.get("id");
const apiUrl = "https://striveschool-api.herokuapp.com/api/product/";
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDdmNmM3ZWI5YzBmNzAwMTQ0ODRmYzEiLCJpYXQiOjE2ODYwNzI1MzAsImV4cCI6MTY4NzI4MjEzMH0.0lNsRrwcxi8_Rgo4ao5ZAvje25JAvsYntJfoRfHoRAc"
const card = document.getElementById("cardId");
const nameInput = document.getElementById("name-field");
const brandInput = document.getElementById("brand-field");
const imgInput = document.getElementById("img-field");
const descInput = document.getElementById("desc-field");
const priceInput = document.getElementById("price-field");
const editBtn = document.getElementById("edit-btn");

window.onload = showPost()
async function showPost(){
    try{
const editResult = await fetch(apiUrl + activeId, {
    headers: {
    "Authorization": "Bearer " + token
    }});
    const json = await editResult.json();
    console.log(json);
    nameInput.value = json.name;
    brandInput.value = json.brand;
    imgInput.value = json.imageUrl;
    descInput.value = json.description;
    priceInput.value = json.price;

    

}
catch(error){

}
}

editBtn.addEventListener("click",editCard);

 async  function editCard(){
  if(nameInput.value && brandInput.value && imgInput.value && descInput.value && priceInput.value){
    const payloadEdit = {
        "name": nameInput.value,
        "brand": brandInput.value,
        "imageUrl":imgInput.value ,
        "description": descInput.value,
        "price": priceInput.value,
    
    };
    try{
    const editResult = await fetch(apiUrl + activeId, {
        method: "PUT",
        body: JSON.stringify(payloadEdit),
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        }
  })
}

 catch(arror){
    console.log("error");
 }
}else{
    alert("Valorizza i campi!")
}
 }
 showPost();