const apiUrl = "https://striveschool-api.herokuapp.com/api/product";
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDdmNmM3ZWI5YzBmNzAwMTQ0ODRmYzEiLCJpYXQiOjE2ODYwNzI1MzAsImV4cCI6MTY4NzI4MjEzMH0.0lNsRrwcxi8_Rgo4ao5ZAvje25JAvsYntJfoRfHoRAc"
const card = document.getElementById("cardId");
const nameInput = document.getElementById("name-field");
const brandInput = document.getElementById("brand-field");
const imgInput = document.getElementById("img-field");
const descInput = document.getElementById("desc-field");
const priceInput = document.getElementById("price-field");
const creatBtn = document.getElementById("create-btn");

window.onload = onlineStore();

async function onlineStore(){
    try{
    const result = await fetch(apiUrl, {
        headers: {
        "Authorization": "Bearer " + token
        }
        })
    const json =  await  result.json();
    console.log(json);
       card.innerHTML = json.map(item => {
        
          return `
          <div class="card col-lg-3 col-md-4 col-xs-6 my-4 mx-4 border-0 bg_card">
          <img src="${item.imageUrl}" class="card-img-top" alt="${item.name}">
          <div class="card-body text-center">
            <h6 class="card-title">${item.name}</h6>
          </div>
          <ul class="list-group list-group-flush text-center">
            <li class="list-group-item bg_card">${item.brand}</li>
            <li class="list-group-item bg_card ">${item.description}</li>
            <li class="list-group-item bg_card">${item.price}</li>
          </ul>
          <div class="d-flex align-items-center justify-content-around">
          <a href="detail.html?id=${item._id}" class="btn btn-primary" target="_blank">Edit</a>
          <button class="btn btn-danger">Delete</button>
          </div>
        </div>
        `
      })
      .join("");
  }
    
    

    catch(error){
        console.log("error");
    }
}


 creatBtn.addEventListener("click",addNewCard);

 async  function addNewCard(){
  if(nameInput.value && brandInput.value && imgInput.value && descInput.value && priceInput.value){
    const payload = {
        "name": nameInput.value,
        "brand": brandInput.value,
        "imageUrl":imgInput.value ,
        "description": descInput.value,
        "price": priceInput.value,
    
    };
    const createResult = await fetch(apiUrl, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        }
  });
  onlineStore();
  nameInput.value = "";
  brandInput.value = "";
  imgInput.value = "";
  descInput.value = "";
  priceInput.value = "";
}
 }
 



