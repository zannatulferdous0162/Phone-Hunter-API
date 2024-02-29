const loadPhone = async (searchText, isShowALL) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
  const data = await res.json();
  const phones = data.data
  // console.log(phones);
  displayPhone(phones, isShowALL)
}

const displayPhone = (phones, isShowALL) => {
  // console.log(phones)
  const phoneContainer = document.getElementById('phone-container');
  // clear phone container cards before adding new card
  phoneContainer.textContent = '';

  //display show all button if there are more than 12 phones
  const showAllContainer = document.getElementById('show-all-button');
  if(phones.length > 12 && !isShowALL){
    showAllContainer.classList.remove('hidden');
  }
  else{
    showAllContainer.classList.add('hidden');
  }
  console.log('Is Show All',isShowALL);

  // display only first 12 phones if not show all
  if(!isShowALL){
    phones = phones.slice(0,12);
  }

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
          <div class="card-actions justify-center">
            <button class="btn btn-primary text-white font-bold">Show Details</button>
          </div>
        </div>`;
    // 4 --> append child
    phoneContainer.appendChild(phoneCard);

  })
  //hide loading spinner
  toggolLoadingSpinner(false);
}

const handelSearch = (isShowALL) => {
  toggolLoadingSpinner(true);
  const searchField = document.getElementById('search-feild');
  const serchText = searchField.value;
  // console.log(serchText)
  loadPhone(serchText,isShowALL);
}

// const handelSearch2 = () => {
//   toggolLoadingSpinner(true);
//   const searchField = document.getElementById('search-feild2');
//   const searchText = searchField.value;
//   loadPhone(searchText);
// }

// loadding or spinner
const toggolLoadingSpinner = (isLoading) => {
  const loddingSpinner = document.getElementById('loading-spinner');
  if(isLoading){
    loddingSpinner.classList.remove('hidden');
  }
  else{
    loddingSpinner.classList.add('hidden');
  }
}

const handleShowAll = () => {
  handelSearch(true);

}

// loadPhone();