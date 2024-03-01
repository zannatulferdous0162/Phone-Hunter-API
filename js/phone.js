const loadPhone = async (searchText, isShowAll) => {
  try {
    const response = await fetch(
      `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    );
    const data = await response.json();
    const phones = data.data;
    displayPhones(phones, isShowAll);
  } catch (error) {
    console.error("Error!");
  }
};

const displayPhones = (phones, isShowAll) => {
  const phoneContainer = document.getElementById("phoneContainer");
  const showAllContainer = document.getElementById("showAllContainer");
  phoneContainer.textContent = "";
  if (phones.length > 12 && !isShowAll) {
    showAllContainer.classList.remove("hidden");
  } else {
    showAllContainer.classList.add("hidden");
  }
  if (!isShowAll) {
    phones = phones.slice(0, 12);
  }
  const noPhone = document.getElementById('noFoundMessage');
  if(phones.length === 0){
      noPhone.classList.remove('hidden');
  }
  else{
      noPhone.classList.add('hidden');
  }
  phones.forEach((phone) => {
    const div = document.createElement("div");
    div.classList.add(
      "p-2",
      "rounded",
      "border",
      "border-white",
      "bg-white",
      "shadow"
    );
    div.innerHTML = `
    <img src="${phone.image}" alt="Image" class="rounded mx-auto">
    <div class="text-center">
        <h2 class="text-lg text-black/80 font-bold my-2">${phone.phone_name}</h2>
        <p class="text-green-600 text-base mb-2">${phone.brand}</p>
        <button onclick="handleShowDetail('${phone.slug}')" class="p-2 bg-black text-white font-semibold rounded text-lg">
            Button
        </button>
    </div>
    `;
    phoneContainer.appendChild(div);
  });
  loadingToggle(false);
};

const handleShowDetail = async (id) => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await response.json();
  const phone = data.data;
  showPhoneDetail(phone);
};

const showPhoneDetail = (phone) => {
  const phoneDetailsContainer = document.getElementById(
    "phoneDetailsContainer"
  );
  phoneDetailsContainer.innerHTML = `
  <img src="${phone.image}" alt="Image" class="mx-auto rounded">
  <h3 class="text-center text-white font-bold my-2 text-xl">${phone?.name}</h3>
  <p class="text-center text-white font-bold my-2 text-base">${phone?.mainFeatures?.storage}</p>
  <p class="text-center text-white font-bold my-2 text-base">${phone?.mainFeatures?.displaySize}</p>
  <p class="text-center text-white font-bold my-2 text-base">${phone?.mainFeatures?.memory}</p>
  <p class="text-center text-white font-bold my-2 text-base">${phone?.mainFeatures?.sensors}</p>
  <p class="text-center text-white font-bold my-2 text-base">${phone?.releaseDate}</p>
  <p class="text-center text-white font-bold my-2 text-base">${phone?.brand}</p>
  <p class="text-center text-white font-bold my-2 text-base">${phone?.others?.GPS || 'No GPS'}</p>
  `;
  show_details_modal.showModal();
};

const handleSearch = (isShowAll) => {
  loadingToggle(true);
  const searchInput = document.getElementById("searchInput");
  const searchInputValue = searchInput.value;
  loadPhone(searchInputValue, isShowAll);
};

const loadingToggle = (isLoading) => {
  const loader = document.getElementById("loader");
  if (isLoading) {
    loader.classList.remove("hidden");
  } else {
    loader.classList.add("hidden");
  }
};

const handleShowAll = () => {
  handleSearch(true);
};
