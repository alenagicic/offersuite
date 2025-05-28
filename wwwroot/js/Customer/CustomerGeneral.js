
// Toggle form below
document.addEventListener("DOMContentLoaded", function () {
  const forms = [
    document.querySelector(".form-one"),
    document.querySelector(".form-two"),
    document.querySelector(".form-three"),
    document.querySelector(".form-four"),
    document.querySelector(".form-five"),
    document.querySelector(".form-six")
  ];

  let currentFormIndex = 0;

  // Show the first form and focus its first input
  if (forms[currentFormIndex]) {
    forms[currentFormIndex].style.display = "flex";
    const firstInput = forms[currentFormIndex].querySelector("input, textarea, select");
    if (firstInput) firstInput.focus();
  }

  // Handle "Next" button
  document.querySelectorAll(".proceed-toggle").forEach(button => {
    button.addEventListener("click", function () {

      document.querySelector(".btn-infobox").click()

      if (forms[currentFormIndex]) {
        forms[currentFormIndex].style.display = "none";
      }

      currentFormIndex++;

      if (currentFormIndex < forms.length) {
        const nextForm = forms[currentFormIndex];
        nextForm.style.display = "flex";
        window.scrollTo(0, 0);

        const firstInput = nextForm.querySelector("input, textarea, select");
        if (firstInput) firstInput.focus();
      } else {
        console.log("All forms completed.");
      }

      turnUpProgressbar(currentFormIndex)

    });
  });

  document.querySelectorAll(".revert-toggle").forEach(button => {
    button.addEventListener("click", function () {
      if (forms[currentFormIndex]) {
        forms[currentFormIndex].style.display = "none";
      }

      currentFormIndex--;

      if (currentFormIndex >= 0) {
        const prevForm = forms[currentFormIndex];
        prevForm.style.display = "flex";
        window.scrollTo(0, 0);

        const firstInput = prevForm.querySelector("input, textarea, select");
        if (firstInput) firstInput.focus();
      } else {
        currentFormIndex = 0; // Prevent going before the first form
      }

      turnUpProgressbar(currentFormIndex)

    });
  });

  // Load select change for condition 
  loadFocusOnSelectionCondition()
  loadFocusOnSelectionAccident()

  // Trigger the file upload inputs
  imageUploadPopulateDom()

  // Trigger regnr to uppercase on type
  turnRegToUppercaseAndFormat()

  // Trigger navbar toggler
  initiateTogglerForNavbar()

  // Set inventoryload event listener
  loadInventory()
  
});

// Collect inputdata and final presentation before submission
const buttonsform = document.querySelectorAll(".proceed-toggle")

buttonsform[4].addEventListener("click", (e) => {
  grabAllAndPresent()
})

function grabAllAndPresent() {
  const forms = [
    document.querySelector(".form-one"),
    document.querySelector(".form-two"),
    document.querySelector(".form-three"),
    document.querySelector(".form-four"),
    document.querySelector(".form-five"),
  ];

  const heading = [
    "Let's get started",
    "General Condition",
    "History",
    "Improve & speed up evaluation",
    "Make Your Vehicle Stand Out",
  ]

  const formsubmissionpreview = document.querySelector(".form-submission-preview")

  formsubmissionpreview.innerHTML = ""

  forms.forEach((form, index) => {

      const formData = {};

      const elements = form.querySelectorAll('input, select, textarea');

      elements.forEach((el) => {
        let name = el.name || el.id;
      
        if (!name) return;
      
        if (name.toUpperCase() === "FILEINPUT") return;
      
        // Replace underscores with spaces in the key
        name = name.replace(/_/g, ' ');
      
        if (el.type === 'checkbox') {
          formData[name] = el.checked;
        } else if (el.type === 'radio') {
          if (el.checked) {
            formData[name] = el.value;
          }
        } else {
          formData[name] = el.value;
        }
      });
      

      const previewappend = document.createElement("div")
      const header = document.createElement("h4")
      header.innerText = heading[index]
      previewappend.appendChild(header)

      Object.entries(formData).forEach(([key, value]) => {

        const parawrapper = document.createElement("p")
        parawrapper.classList.add("present-para-wrapper")

        const para = document.createElement("span");
        para.classList.add("present-key")
        para.innerText = key + ": "

        const paratwo = document.createElement("span")
        paratwo.classList.add("present-value")
        paratwo.innerText = value

        parawrapper.appendChild(para)
        parawrapper.appendChild(paratwo)

        previewappend.appendChild(parawrapper);
      });

      formsubmissionpreview.appendChild(previewappend)

  })

}

document.querySelector(".customer-infobox").style.display = "none"

// Hide infobox
document.querySelector(".btn-infobox").addEventListener("click", (e) => {
  const hideslide = document.querySelector(".customer-infobox")
  hideslide.style.animation = "slideOutToRight 0.5s ease-in-out forwards";
})

// Below focus on textbox after condition select
function loadFocusOnSelectionCondition(){
  let conditionone = document.getElementById("condition-interior")

  let conditiontwo = document.getElementById("condition-exterior")

  let conditionthree = document.getElementById("condition-mechanical")

  let conditiontextarea = document.querySelectorAll(".condition-general")

  conditionone.addEventListener("change", (e) => {
    if(e.target.value !== "Excellent"){
      conditiontextarea[0].focus()
      conditiontextarea[0].style.animation = "jiggle-x 0.5s ease"
    }
  
  })

  conditiontwo.addEventListener("change", (e) => {
    if(e.target.value !== "Excellent"){
      conditiontextarea[1].focus()
      conditiontextarea[1].style.animation = "jiggle-x 0.5s ease"
    }

  })

  conditionthree.addEventListener("change", (e) => {
    if(e.target.value !== "No"){
      conditiontextarea[2].focus()
      conditiontextarea[2].style.animation = "jiggle-x 0.5s ease"
    }
  
  })

}

// Below focus on textbox after accident history select
function loadFocusOnSelectionAccident(){
  let textareaaccident = document.getElementById("accident_additional_textarea")
  let accidentselect = document.getElementById("accident-select")

  accidentselect.addEventListener("change", (e) => {
    if(e.target.value !== "None"){
      textareaaccident.focus()
      textareaaccident.style.animation = "jiggle-x 0.5s ease"
    }
  })
}

// This array will hold all the File objects selected by the user.
// Declare it outside the function so it persists across multiple calls.
let uploadedFiles = [];

function imageUploadPopulateDom() {
    const imageUploadInput = document.getElementById('fileInput');
    const thumbnailContainer = document.querySelector('.image-upload-thumbnail');

    if (imageUploadInput && thumbnailContainer) {
        imageUploadInput.addEventListener('change', function(event) {

            if (event.target.files && event.target.files.length > 0) {

              for (const file of event.target.files) {
                    if (!file.type.startsWith('image/')) {
                        console.warn(`Skipping non-image file: ${file.name}`);
                        continue;
                    }

                    // Generate a unique ID for this file/thumbnail
                    // This is crucial for linking the DOM element to the File object in our array
                    const fileId = Date.now() + '-' + Math.random().toString(36).substr(2, 9);

                    // Add the file to our central array with its unique ID
                    uploadedFiles.push({
                        id: fileId,
                        file: file
                    });

                    // Create a NEW FileReader for each file
                    const reader = new FileReader();

                    reader.onload = function(e) {
                        const dataURL = e.target.result;

                        // Create the wrapper for the thumbnail and button
                        const thumbnailWrapper = document.createElement('div');
                        thumbnailWrapper.classList.add('thumbnail-wrapper');
                        thumbnailWrapper.dataset.fileId = fileId; // Store the unique ID on the DOM element

                        // Create the <img> element for the thumbnail
                        const img = document.createElement('img');
                        img.src = dataURL;
                        img.alt = file.name;

                        // Create the remove button
                        const removeBtn = document.createElement('button');
                        removeBtn.classList.add('thumbnail-remove-btn');
                        removeBtn.innerHTML = '<i class="fas fa-times"></i>'; // Font Awesome "times" icon

                        // Add event listener to the remove button
                        removeBtn.addEventListener('click', () => {
                            // Get the file ID from the DOM element
                            const idToRemove = thumbnailWrapper.dataset.fileId;

                            // Remove the corresponding File object from our uploadedFiles array
                            uploadedFiles = uploadedFiles.filter(item => item.id !== idToRemove);

                            // Remove the thumbnail's wrapper from the DOM
                            thumbnailWrapper.remove();

                            // Optional: If you want to clear the input's value only when ALL files are removed
                            if (uploadedFiles.length === 0) {
                                imageUploadInput.value = '';
                                console.log("All files removed, input value cleared.");
                            }
                            console.log("Current files for upload:", uploadedFiles);
                        });

                        // Assemble the elements
                        thumbnailWrapper.appendChild(img);
                        thumbnailWrapper.appendChild(removeBtn);

                        // Append the whole wrapper to the container
                        thumbnailContainer.appendChild(thumbnailWrapper);
                    };

                    reader.readAsDataURL(file); // Start reading this specific file
                } // End of for loop for newly selected files
            }

            // IMPORTANT: Clear the input's value AFTER processing the files from this 'change' event.
            // This ensures that if the user selects the *exact same file(s)* again,
            // the 'change' event will still fire, allowing them to add duplicates or re-add a file.
            event.target.value = '';
            console.log("Input value reset after processing selection.");
        });
    }
}

// This will format the regnr into swedish format for better appearance
function turnRegToUppercaseAndFormat() {
  const regnrInput = document.getElementById("regnr");

  if (regnrInput) {
      regnrInput.addEventListener("input", (e) => {
          let value = e.target.value;

          // 1. Convert to uppercase immediately
          value = value.toUpperCase();

          // 2. Remove all existing spaces to re-format cleanly
          value = value.replace(/\s/g, ''); // \s matches any whitespace character, g for global

          // 3. Apply the space after the third character, IF the length is greater than 3
          if (value.length > 3) {
              value = value.substring(0, 3) + ' ' + value.substring(3);
          }

          // 4. Limit the total length to prevent excessive input
          // A typical Swedish regnr is 3 letters + space + 3 digits/letters = 7 characters
          // So, limit to 7 characters (including the space)
          if (value.length > 7) {
              value = value.substring(0, 7);
          }

          // 5. Update the input field's value
          e.target.value = value;

          // Optional: If you want to prevent non-alphanumeric input (except space for formatting)
          // This can be added as an extra layer of validation.
          // value = value.replace(/[^A-Z0-9\s]/g, ''); // Keep only A-Z, 0-9, and spaces
      });
  }
}

// This will increase percentage of progressbar
function turnUpProgressbar(number) {
  let progresser = document.querySelector(".cstm-progress-progress")

  let span = document.querySelector(".cstm-progress-wrapper")
  let statustext = span.querySelector("span")

  let progressbarwrapper = document.querySelector(".cstm-progress-bar")

  if(progresser){
    if(number === 0){
      progresser.style.width = "17%"
    }
    if(number === 1){
      progresser.style.width = "33%"
    }
    if(number === 2){
      progresser.style.width = "50%"
    }
    if(number === 3){
      progresser.style.width = "67%"
    }
    if(number === 4){
      progresser.style.width = "84%"
    }
    if(number === 5){
      progresser.style.width = "105%"
      progresser.style.backgroundColor = "#73D852"
      statustext.style.color = "whitesmoke"
      statustext.style.display = "block"
      statustext.style.animation = "zoomBounce 1s ease-out"
      progressbarwrapper.style.border = "2px solid #73D852"
    }
  }
} 

// Navbar index, for toggling the buttons
function initiateTogglerForNavbar() {
  const togglers = document.querySelectorAll(".customer-navbar-btn")
  const mainwindow = document.querySelectorAll(".customer-form-wrapper")

  const clearmains = () => {
    mainwindow.forEach((windows) => {
      windows.style.display = "none"
    })
  }

  if(mainwindow){
      togglers.forEach((btn, index) => {
      btn.addEventListener("click", (e) => {
        clearmains()
        mainwindow[index].style.display = "flex"
      })
    })
  }
}

// Inventory below
function loadInventory() {
  const inventorywrapper = document.querySelector(".inventory-list")
  
  fetch(window.location.origin + "/customer/retrieve-inventory")
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    data.forEach((car) => {
      let result = createCarCardMini(car)
      let resultcomplete = createCarCard(car)

      setTimeout(() => {
        result.addEventListener("click", (e) => {
          showCarPopup(resultcomplete)
        })
      }, 1000);
   
      inventorywrapper.appendChild(result)
    });
    
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
    document.getElementById('output').innerText = 'Error: ' + error.message;
  });
}

function createCarCard(carData) {
  const carDiv = document.createElement('div');
  carDiv.classList.add('car-card'); // Main container class

  // --- TEMPORARY IMAGE URL HARDCODING ---
  const TEMP_IMAGE_URL = "/images/golfmk7silver.jpg";

  // Images (displaying the same hardcoded image for all)
  if (carData.imageUrls && carData.imageUrls.length > 0) {
      const imageContainer = document.createElement('div');
      imageContainer.classList.add('car-images'); // Container for main image and thumbnails

      // Main Image Display
      const mainImg = document.createElement('img');
      mainImg.src = TEMP_IMAGE_URL;
      mainImg.alt = `Bild på ${carData.make} ${carData.model}`;
      mainImg.classList.add('car-main-image'); // Class for the main image
      imageContainer.appendChild(mainImg);

      // Thumbnails Container
      const thumbnailsDiv = document.createElement('div');
      thumbnailsDiv.classList.add('car-thumbnails'); // Class for the thumbnails wrapper

      // but each thumb's src also uses the hardcoded URL.
      carData.imageUrls.forEach(() => { // Using a blank argument as 'url' isn't used
          const thumb = document.createElement('img');
          thumb.src = "images/golfmk7silver.jpg"; // Each thumbnail uses the hardcoded URL
          thumb.alt = `Thumbnail för ${carData.make} ${carData.model}`;
          thumb.classList.add('car-thumbnail-image'); // Class for individual thumbnails

          // Toggle logic will still work, but mainImg.src will always become TEMP_IMAGE_URL
          thumb.addEventListener('click', () => {
              mainImg.src = "images/golfmk7silver.jpg"; // Main image gets updated to the hardcoded URL
              Array.from(thumbnailsDiv.children).forEach(t => t.classList.remove('active-thumbnail'));
              thumb.classList.add('active-thumbnail');
          });

          thumbnailsDiv.appendChild(thumb);
      });

      imageContainer.appendChild(thumbnailsDiv);
      carDiv.appendChild(imageContainer);
  } else {
      // Fallback if carData.imageUrls is empty, still uses the hardcoded URL
      const imageContainer = document.createElement('div');
      imageContainer.classList.add('car-images');

      const mainImg = document.createElement('img');
      mainImg.src = TEMP_IMAGE_URL; // Use the hardcoded URL if no images are provided
      mainImg.alt = `Ingen bild tillgänglig för ${carData.make} ${carData.model}`;
      mainImg.classList.add('car-main-image');
      imageContainer.appendChild(mainImg);

      carDiv.appendChild(imageContainer);
  }
  // --- END TEMPORARY IMAGE URL HARDCODING ---


  // Make
  const makeParagraph = document.createElement('p');
  makeParagraph.classList.add('car-make'); // Specific class for Make
  makeParagraph.innerHTML = `${carData.make} ${carData.model} ${carData.year}`;
  carDiv.appendChild(makeParagraph);

  // Price
  const priceParagraph = document.createElement('p');
  priceParagraph.classList.add('car-price'); // Specific class for Price
  const priceValue = parseFloat(carData.price);
  if (!isNaN(priceValue)) {
      priceParagraph.innerHTML = `<strong>Pris:</strong> ${priceValue.toLocaleString('sv-SE', { style: 'currency', currency: 'SEK', minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  } else {
      priceParagraph.innerHTML = `<strong>Pris:</strong> Ej tillgängligt`;
  }
  carDiv.appendChild(priceParagraph);

  // --- Start General Info Wrapper ---
  const generalInfoWrapper = document.createElement('div');
  generalInfoWrapper.classList.add('popup-wrapper-general-info');

  // Mileage (Mätarställning) - Icon for Odometer/Dashboard
  const mileageParagraph = document.createElement('p');
  mileageParagraph.classList.add('car-mileage');
  const mileageValue = parseFloat(carData.mileageMil);
  if (!isNaN(mileageValue)) {
      mileageParagraph.innerHTML = `<i class="fa-solid fa-gauge-high"></i> ${mileageValue.toLocaleString('sv-SE')} mil`;
  } else {
      mileageParagraph.innerHTML = `<i class="fa-solid fa-gauge-high"></i> Ej tillgängligt`;
  }
  generalInfoWrapper.appendChild(mileageParagraph);

  // Fuel Type (Drivmedel) - Icon for Gas Pump or Leaf for Electric/Hybrid
  const fuelTypeParagraph = document.createElement('p');
  fuelTypeParagraph.classList.add('car-fuel-type');
  let fuelIconClass = "fa-solid fa-gas-pump"; // Standard bensin/diesel
  if (carData.fuelType.toLowerCase().includes('laddhybrid') || carData.fuelType.toLowerCase().includes('el')) {
      fuelIconClass = "fa-solid fa-bolt"; // Bult för el/laddhybrid
  } else if (carData.fuelType.toLowerCase().includes('hybrid')) {
      fuelIconClass = "fa-solid fa-leaf"; // Blad för hybrid
  }
  fuelTypeParagraph.innerHTML = `<i class="${fuelIconClass}"></i> ${carData.fuelType}`;
  generalInfoWrapper.appendChild(fuelTypeParagraph);

  // Transmission (Växellåda) - Icon for Manual Gear or Automatic
  const transmissionParagraph = document.createElement('p');
  transmissionParagraph.classList.add('car-transmission');
  let transmissionIconClass = "fa-solid fa-gears"; // Generic gears
  if (carData.transmission.toLowerCase().includes('automat')) {
      transmissionIconClass = "fa-solid fa-car-side"; // Representerar automatisk växellåda
  } else if (carData.transmission.toLowerCase().includes('manuell')) {
      transmissionIconClass = "fa-solid fa-shuttle-space"; // Kan symbolisera en spak, men "gears" är också ok
  }
  transmissionParagraph.innerHTML = `<i class="${transmissionIconClass}"></i> ${carData.transmission}`;
  generalInfoWrapper.appendChild(transmissionParagraph);

  // Body Type (Kaross) - Icon for Car Body
  const bodyTypeParagraph = document.createElement('p');
  bodyTypeParagraph.classList.add('car-body-type');
  // Du kan välja mer specifika ikoner om du har många karosstyper, t.ex. "fa-solid fa-car-rear" för kombi
  bodyTypeParagraph.innerHTML = `<i class="fa-solid fa-car"></i> ${carData.bodyType}`;
  generalInfoWrapper.appendChild(bodyTypeParagraph);

  // Color (Färg) - Icon for Paint Roller or Palette
  const colorParagraph = document.createElement('p');
  colorParagraph.classList.add('car-color');
  colorParagraph.innerHTML = `<i class="fa-solid fa-palette"></i> ${carData.color}`;
  generalInfoWrapper.appendChild(colorParagraph);

  carDiv.appendChild(generalInfoWrapper);
  // --- End General Info Wrapper ---

  // Description
  const descriptionParagraph = document.createElement('p');
  descriptionParagraph.classList.add('car-description'); // Specific class for Description
  descriptionParagraph.textContent = carData.description;
  carDiv.appendChild(descriptionParagraph);

  // Features
  if (carData.features && carData.features.length > 0) {
      const featuresParagraph = document.createElement('p');
      featuresParagraph.classList.add('car-features'); // Specific class for Features
      featuresParagraph.innerHTML = `<strong>Utrustning:</strong> ${carData.features.join(', ')}`;
      carDiv.appendChild(featuresParagraph);
  }

  // Date Added
  const dateAddedParagraph = document.createElement('p');
  dateAddedParagraph.classList.add('car-date-added'); // Specific class for Date Added
  const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  dateAddedParagraph.textContent = `Tillagd: ${new Date(carData.dateAdded).toLocaleDateString('sv-SE', dateOptions)}`;
  carDiv.appendChild(dateAddedParagraph);

  return carDiv;
}

function createCarCardMini(carData) {
  const carDiv = document.createElement('div');
  carDiv.classList.add('car-card'); // Add a class for styling

 // Image (display the first one if available)
  if (carData.imageUrls && carData.imageUrls.length > 0) {
      const imageContainer = document.createElement('div');
      imageContainer.classList.add('car-image-thumb');
      const img = document.createElement('img');
      img.src = "images/slidertwo.jpg";
      img.alt = `Bild på ${carData.make} ${carData.model}`;
      img.classList.add('car-main-image'); // Keep this for styling primary image
      imageContainer.appendChild(img);
      carDiv.appendChild(imageContainer);
  }

  // Make and Model
  const makeModelParagraph = document.createElement('p');
  makeModelParagraph.classList.add('car-make-model');
  makeModelParagraph.classList.add('filter-helper-make')
  makeModelParagraph.innerHTML = `<strong>${carData.make}</strong> ${carData.model}`;
  carDiv.appendChild(makeModelParagraph);

  // Mileage
  const mileageParagraph = document.createElement('p');
  mileageParagraph.classList.add('car-mileage');
  mileageParagraph.textContent = `${carData.mileageMil.toLocaleString('sv-SE')} mil`;
  carDiv.appendChild(mileageParagraph);

  // Price
  const priceParagraph = document.createElement('p');
  priceParagraph.classList.add('car-price'); // Changed class for price specifically
  priceParagraph.innerHTML = `${carData.price.toLocaleString('sv-SE', { style: 'currency', currency: 'SEK', minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  carDiv.appendChild(priceParagraph);

  // Fuel Type
  const fuelTypeParagraph = document.createElement('p');
  fuelTypeParagraph.classList.add('car-fuel-type');
  fuelTypeParagraph.textContent = `${carData.fuelType}`;
  carDiv.appendChild(fuelTypeParagraph);

  // Transmission
  const transmissionParagraph = document.createElement('p');
  transmissionParagraph.classList.add('car-transmission');
  transmissionParagraph.textContent = `${carData.transmission}`;
  carDiv.appendChild(transmissionParagraph);

  return carDiv;
}

function showCarPopup(carData) {
  // Create the overlay wrapper
  const wrapper = document.createElement("div");
  wrapper.classList.add("inventory-wrapper-overlay");

  // Create the popup content container
  const popup = document.createElement("div");
  popup.classList.add("inventory-wrapper-popup");

  const header = document.createElement("h3")
  header.innerText = "Diabus Automotive AB"
  popup.appendChild(header)

  // Create a close button
  const closeButton = document.createElement("button");
  closeButton.classList.add("popup-close-btn");
  closeButton.innerHTML = "&times;";
  closeButton.title = "Stäng";

  // Disable scroll on the body
  document.body.style.overflow = "hidden";

  // Function to close popup and re-enable scroll
  const closePopup = () => {
    document.body.style.overflow = ""; // Re-enable scroll
    if (document.body.contains(wrapper)) {
      document.body.removeChild(wrapper);
    }
  };

  // Close events
  closeButton.addEventListener("click", closePopup);
  wrapper.addEventListener("click", (event) => {
    if (event.target === wrapper) {
      closePopup();
    }
  });

  // Assemble DOM
  popup.appendChild(closeButton);
  popup.appendChild(carData);
  wrapper.appendChild(popup);
  document.body.appendChild(wrapper);
}
