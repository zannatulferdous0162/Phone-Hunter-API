const loadPhone = async (searchText) => {
    const res = await fetch (`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data
    // console.log(phones);
    displayPhone(phones)
}

const displayPhone = phones => {
    // console.log(phones)
   const phoneContainer = document.getElementById('phone-container');
   // clear phone container cards before adding new card
   phoneContainer.textContent = '';

    phones.forEach(phone => {
        console.log(phone)
        // 2--> create a div
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card p-4 rounded-[10px] bg-gray-100 shadow-xl`;

        //3--> set inner html
        phoneCard.innerHTML = ` 
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body">
          <h2 class="card-title">${phone.phone_name}</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div class="card-actions justify-end">
            <button class="btn btn-primary rounded-[10px] bg-orange-600 text-black font-bold">Buy Now</button>
          </div>
        </div>`;
        // 4 --> append child
        phoneContainer.appendChild(phoneCard);
        
    })
}

const handelSearch = () =>{
  const searchField = document.getElementById('search-feild');
  const serchText = searchField.value;
  // console.log(serchText)
  loadPhone(serchText);
}

// loadPhone();