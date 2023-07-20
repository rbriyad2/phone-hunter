//api url fetch & search text input parameter

const loadPhones = async(searchText, datalimit) =>{
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url)
    const phone = await res.json()
    displayPhones(phone.data, datalimit)
}



// phone show from api use show phone
const displayPhones = (allphones, datalimit) =>{
    const phoneCointainer = document.getElementById('phoneContainer')
    phoneCointainer.innerText ='';


    
    //show all button work
const showAllbtn = document.getElementById('showAll')
if(datalimit && allphones.length > 12){
    allphones = allphones.slice(0, 12)
    showAllbtn.classList.remove('d-none')
    }
    else{
        showAllbtn.classList.add('d-none')
    }
    
    
//No phone massage show
const noPhone = document.getElementById('no-phone-found')
if(allphones.length == 0){
noPhone.classList.remove('d-none')
}
else{
    noPhone.classList.add('d-none')
}

    allphones.forEach(allphone => {
        
    const NewDiv = document.createElement('div')
    NewDiv.classList.add('col')
    NewDiv.innerHTML =`
    <div class="card">
      <img src="${allphone.image}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${allphone.phone_name}</h5>
        <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
        <button onclick="loadshowDetails('${allphone.slug}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modal">
  Details
</button>

      </div>
    </div>

    

    `
phoneCointainer.appendChild(NewDiv)
});

// Modal Details
loadshowDetails =async id =>{
    const url= `https://openapi.programming-hero.com/api/phone/${id}`
    const res = await fetch(url)
    const dataitem = await res.json()
    displayModal(dataitem.data)
    
}
//modal container
const displayModal= modalitem=>{

    document.getElementById('staticBackdropLabel').innerText =modalitem.name;
    const modalImage = document.getElementById('modalimg')
    modalImage.innerHTML =`<img src="${modalitem.image}" alt="">
    `
    document.getElementById('storage').innerText = modalitem.mainFeatures.storage;
    document.getElementById('displaysize').innerText = modalitem.mainFeatures.displaySize;
    document.getElementById('memory').innerText = modalitem.mainFeatures.memory;
}





// stop loader spinner
loaderSpinner(false);

}

//when we use 2 times so create this function
const precessSearch =(datalimit)=>{
    loaderSpinner(true)
    const searchText = document.getElementById('searchinputField').value;
    loadPhones(searchText, datalimit)
}


// search button & input click handler 
document.getElementById('searchBtn').addEventListener('click', function(){
    // start loader spinner
    precessSearch(12);

})

//enter search event handler 
document.getElementById('searchinputField').addEventListener('keypress', function(e){
    if(e.key ==='Enter'){
        precessSearch(12);
    }
});

//loader spinner function
const loaderSpinner =(isLoading)=>{
    const loader = document.getElementById('loader')
    if(isLoading){
        loader.classList.remove('d-none')
    }
    else{
        loader.classList.add('d-none')
    }
}


//not the best way of load show all
document.getElementById('btnshowall').addEventListener('click', function(){
    precessSearch();
})


loadPhones('iphone');