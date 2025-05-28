// Function to load the partial view via plain JavaScript (fetch API)
function loadPartialView(viewName) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.open('GET', `/dealership/GetPartialData?viewName=${viewName}`, true);

        console.log(`Requesting partial view: ${viewName}`);

        xhr.onload = function () {
            if (xhr.status === 200) {
                document.querySelector('.dealer-partial-data').innerHTML = xhr.responseText;
                resolve();
            } else {
                const errorMsg = `❌ Failed to load partial view '${viewName}'.\n` +
                                 `Status: ${xhr.status} ${xhr.statusText}\n` +
                                 `Response: ${xhr.responseText}`;
                console.error(errorMsg);
                reject(errorMsg);
            }
        };

        xhr.onerror = function () {
            const errorMsg = `❌ Network error occurred while loading '${viewName}'.`;
            console.error(errorMsg);
            reject(errorMsg);
        };

        xhr.send();
    });
}

window.onload = function() {

    const buttons = document.querySelectorAll('.dealer-idx-btn');

    buttons.forEach(function(button) {
        button.addEventListener('click', function() {
            const icon = button.querySelector('i');
            let actionType = '';

            // Reset all buttons' styles
            buttons.forEach(btn => {
                btn.style.backgroundColor = '';
                btn.style.color = '';
                btn.querySelector("i").style.color = "";
            });

            // Highlight the clicked button
            button.style.backgroundColor = '#e5e9f0';
            button.style.color = '';
            button.querySelector("i").style.color = "#4682B4"

            // Detect action type based on icon class
            if (icon.classList.contains('bi-send')) {
                actionType = 'incoming';
                loadPartialView(actionType)
                    .then(expandIncomingHistory)
                    .then(appendEventListenerToReply)
                    .then(appendEventListenerToReject)
                    .then(setEventListenerTransportstyrelsen)
                    .catch(handleLoadError);
            } else if (icon.classList.contains('bi-clock-history')) {
                actionType = 'history';
                loadPartialView(actionType)
                    .then(expandIncomingHistory)
                    .then(appendEventListenerToRestore)
                    .then(setEventListenerTransportstyrelsen)
                    .catch(handleLoadError);
            } else if (icon.classList.contains('bi-bar-chart-line')) {
                actionType = 'statistics';
                loadPartialView(actionType)
                    .then(() => {
                        triggerStatistics();
                    })
                    .catch(handleLoadError);
                return; // Prevent duplicate call at the bottom
            } else if (icon.classList.contains('bi-gear')) {
                actionType = 'settings';
                loadPartialView(actionType)
                    .then(() => {
                        appendEventListenerToSubmitSettings()
                        setTimeout(() => {
                            loadSliderSettingsOffer()
                        }, 200);
                    })
                    .catch(handleLoadError);
            } else if (icon.classList.contains('bi-x-square')) {
                actionType = 'exit';
            } else if (icon.classList.contains('bi-journal-check')) {
                actionType = 'phonebook';
                loadPartialView(actionType)
                    .then(() => {
                        setTimeout(() => {
                            loadPhonebook()

                            setTimeout(() => {
                                togglePhonebookItemsDashboard()
                            }, 200);
                        }, 1000);

                    })
                    .catch(handleLoadError);
            } else if (icon.classList.contains('bi-car-front')) {
                actionType = 'carlisting';
                loadPartialView(actionType)
                    .then(() => {
                        // What do you want to do after initial form is loaded?
                    })
                    .catch(handleLoadError);
            }
        });
    });

    function handleLoadError(error) {
        console.error(error);
        alert('Error loading partial view!');
    }

    buttons[0].click()
};

// STATISTICS STARTS

function setStatisticSelect(value) {
    var yearSelect = document.getElementById("yearSelect");
    yearSelect.value = value
}

function triggerStatistics() {

    const buttonsNav = document.querySelectorAll('.dealer-idx-btn');

    buttonsNav.forEach(function(btn) {
        btn.style.backgroundColor = '';  // Reset background to default
        btn.style.color = '';  // Reset text color
    });

    buttonsNav[2].style.backgroundColor = "#e5e9f0"
    buttonsNav[2].style.color = "#e5e9f0!important"

    var yearSelect = document.getElementById("yearSelect");

    var buttons = document.querySelectorAll(".navbar-btn");

    buttons.forEach(function (button) {
        button.addEventListener("mousedown", function () {
            var action = button.getAttribute("data-action");
            var year = yearSelect.value;

            if (action && year) {

                var url = "";

                switch (action) {
                    case "incoming-requests-per-month":
                        url = "dealership/incoming-requests-per-month/" + year;
                        button = "Incoming Requests"
                        break;
                    case "accepted-offers":
                        url = "dealership/accepted-offers/" + year;
                        button = "Accepted Offers"
                        break;
                    case "rejected-offers":
                        url = "dealership/rejected-offers/" + year;
                        button = "Rejected Offers"
                        break;
                    case "requests-by-car-model":
                        url = "dealership/requests-by-car-model/" + year;
                        button = "Car Models"
                        break;
                    case "average-offer-amount":
                        url = "dealership/average-offer-amount/" + year;
                        button = "Average Offer"
                        break;
                    default:
                        return;
                }

                fetch(url)
                    .then(response => response.text())
                    .then(data => {

                        var dealerPartialDataDiv = document.querySelector(".dealer-partial-data");

                        if (dealerPartialDataDiv) {

                            dealerPartialDataDiv.innerHTML = data;
                            let navbtns = dealerPartialDataDiv.querySelectorAll(".navbar-btn")

                            navbtns.forEach((item) => {
                                if(item.innerText === button){
                                    item.style.backgroundColor = "#e5e9f0"
                                    item.style.color = "#555"
                                }
                            })

                            triggerStatistics()
                            setStatisticSelect(yearSelect.value)
                        }
                    })
                    .catch(error => {
                        console.error('Error fetching data:', error);
                    });
            }

        });
    });

}

function isStatScrollable() {
    const statWindow = document.querySelector(".statistics-view")
    const isStatScrollable = statWindow.scrollHeight > statWindow.clientHeight;

    if(isStatScrollable){
        document.querySelector(".stat-navbar").style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.151)";
    }
}

// INCOMING & HISTORY STARTS

function setEventListenerTransportstyrelsen() {
    // SET LINK TO TRANSPORTSTYRELSEN ON ALL

    document.querySelectorAll(".transportstyrelsen-btn").forEach((item) => {
        item.addEventListener("mousedown", (e) => {
            window.open('https://fordon-fu-regnr.transportstyrelsen.se/', '_blank');
        })  
    })
}

function expandIncomingHistory() {
    setTimeout(() => {
        const items = document.querySelectorAll(".request-item");
    
        if (items) {
            items.forEach((divtoexpand) => {
                const itemExpand = divtoexpand.querySelector(".bi-arrows-expand"); // Select either icon
                if (itemExpand) {
                    itemExpand.parentNode.addEventListener("mousedown", (e) => {
                        const isExpanded = divtoexpand.style.height === "80rem";
    
                        if (isExpanded) {
                            divtoexpand.style.height = "5rem"; // Collapse
                         
                        } else {
                            divtoexpand.style.height = "80rem"; // Expand
                           
                        }
                    });
                }
            });
        }
    }, 200);
}

function appendEventListenerToReply() {
    const item = document.querySelectorAll(".bi-reply")

    item.forEach((item) => {
        item.parentNode.addEventListener("mousedown", (e) => {
            const id = item.parentNode.parentNode.parentNode.parentNode.querySelector("#id-for-incoming-item").innerText.trim()
            const emailnode = item.parentNode.parentNode.parentNode.parentNode.querySelector(".contact-info-new").querySelector("p").innerText
            
            const email = emailnode.split('Email: ')[1].trim();
        
            createPopup(id, email.trim())
        })
    })
}

async function appendEventListenerToReject() {

    try {
      const rejectButtons = document.querySelectorAll(".bi-x");
  
      rejectButtons.forEach(async (rejectButton) => {

        rejectButton.parentNode.addEventListener("mousedown", async (event) => {

          try {
            const requestItemElement = rejectButton.closest(".request-item");

            if (!requestItemElement) {
              console.warn("Request item element not found.");
              return;
            }
  
            const idElement = requestItemElement.querySelector("#id-for-incoming-item");
            const id = idElement.innerText.trim();
  
            const offerModel = {
              id: id,
              status: "dismissed",
              responseOffer: "0",
            };
  
            const confirmed = await showAreYouSurePopup("rejectoffer");
  
            if (confirmed) {
              const response = await fetch(`${window.location.origin}/dealership/put-offer`, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(offerModel),
              });
  
              if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Request failed: ${response.status} - ${errorText}`);
              }
  
              requestItemElement.remove();
              showConfirmationPopup();
            }
  
          } catch (error) {
            console.error("Error processing reject action:", error);
          }
        });
      });
    } catch (error) {
      console.error("Error in appendEventListenerToReject:", error);
    }
}
    
async function appendEventListenerToRestore() {
    let element = document.querySelectorAll(".bi-arrow-counterclockwise")

    element.forEach((item) => {
        item.parentNode.addEventListener("mousedown", async (e) => {

            let result = await showAreYouSurePopup("restoreoffer")

            if(result){
                const id = item.parentNode.parentNode.parentNode.parentNode.querySelector("#id-for-incoming-item").innerText.trim()
            
                console.log(id)
                const offerModel = {
                    id: id,
                    status: "pending",
                    responseOffer: "0"
                };
            
                fetch(window.location.origin + '/dealership/put-offer', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(offerModel)
                })
                .then(res => {
                    if (!res.ok) throw new Error('Request failed');
                        showConfirmationPopup();

                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);
                })
                .catch(err => {
                    console.error('Error:', err);
                    overlay.remove();
                });
            }

        })
    })
}

function appendEventListenerToSubmitSettings() {
    const btn = document.querySelector(".form-buttons")
    const btnSpec = btn.querySelectorAll("button")
    
    document.getElementById("email").focus()

    btnSpec[0].addEventListener("mousedown", (e) => {
        submitAccountSettings()
        showConfirmationPopup()
    })
}

function createPopup(id, email) {

    const existing = document.getElementById('popupOverlay');
    if (existing) existing.remove();
  
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    overlay.id = 'popupOverlay';
  
    const popup = document.createElement('div');
    popup.className = 'popup';
  
    const heading = document.createElement('h2');
    heading.textContent = 'Respond';
  
    const label = document.createElement('label');
    label.textContent = "Your offer (SEK)";
  
    const input = document.createElement('input');
    input.type = 'text'; 
    input.placeholder = 'SEK';
  
    // Format input as currency (e.g. 20,000)
    input.addEventListener('input', (e) => {
      let raw = e.target.value.replace(/[^\d]/g, '');
      if (raw) {
        e.target.value = Number(raw).toLocaleString('en-SE');
      }
    });
  
    const submitBtn = document.createElement('button');
    submitBtn.textContent = 'Respond';
  
    const declineBtn = document.createElement('button');
    declineBtn.textContent = 'Decline';
    declineBtn.classList.add('decline-button-man-offer');
  
    const copyEmailBtn = document.createElement("button");
    copyEmailBtn.textContent = "Email";
  
    popup.appendChild(label);
    popup.appendChild(input);
    popup.appendChild(submitBtn);
    popup.appendChild(declineBtn);
    overlay.appendChild(popup);
    document.body.appendChild(overlay);
  
    setTimeout(() => overlay.classList.add('active'), 10);
  
    copyEmailBtn.addEventListener("click", () => {
        navigator.clipboard.writeText(email)
        .then(() => {
          copyEmailBtn.textContent = "Copied!";
        })
        .catch(err => {
          console.error('Error copying text: ', err);
        });
    });
  
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) overlay.remove();
    });
  
    submitBtn.addEventListener('click', () => {
      // Remove commas and trim whitespace
      const rawValue = input.value.replace(/[^\d]/g, '');
      if (!rawValue) {
        alert("Please enter a valid number.");
        return;
      }
  
      const offerModel = {
        id: id,
        status: "pursued",
        responseOffer: rawValue
      };
  
      fetch(window.location.origin + '/dealership/put-offer', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(offerModel)
        })
        .then(res => {
          if (!res.ok) throw new Error('Request failed');
          overlay.remove();
          showConfirmationPopup();
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        })
        .catch(err => {
          console.error('Error:', err);
          overlay.remove();
        });
    });
  
    declineBtn.addEventListener('click', async () => {

        overlay.remove()

        // Show the confirmation popup
        let result = await showAreYouSurePopup("rejectoffer");
        
        // Only proceed if user confirmed
        if(result){
            const offerModel = {
                id: id,
                status: "dismissed"
            };
    
            // Proceed with the fetch request after confirmation
            fetch(window.location.origin + '/dealership/put-offer', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(offerModel)
            })
            .then(res => {
                if (!res.ok) throw new Error('Decline failed');
                showConfirmationPopup()
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            })
            .catch(err => {
                console.error('Error:', err);
            });
        }

    });
     

    setTimeout(() => {
        input.focus();
    }, 100);

}

// ACCOUNT SETTINGS STARTS
function submitAccountSettings() {
    // Get the form data
    let formData = new FormData(document.getElementById('accountSettingsForm'));

    // Convert the FormData object into a plain JavaScript object
    let data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    // Send the PUT request using Fetch API
    fetch('/Dealership/put-account-settings', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'RequestVerificationToken': document.querySelector('input[name="__RequestVerificationToken"]').value // Anti-forgery token
        },
        body: JSON.stringify(data) // Send data as JSON
    })
    .then(response => {
        if (response.ok) {
            console.log('Account settings updated successfully!');
        } else {
            alert('Failed to update account settings.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('There was an error processing your request.');
    });
}

function loadSliderSettingsOffer() {
    const slider = document.querySelector('.percentage-slider');
    const valueDisplay = document.querySelector('.value-display');

    slider.addEventListener('input', function() {
        valueDisplay.textContent = this.value + '%';
        
        valueDisplay.classList.add('scale-animation');
        
        setTimeout(() => {
            valueDisplay.classList.remove('scale-animation');
        }, 300);
    });

    slider.addEventListener("mouseover", () => {
        valueDisplay.style.animation = 'none';              // Reset animation
        void valueDisplay.offsetWidth;                      // Trigger reflow
        valueDisplay.style.animation = 'popNoticeIn 0.6s forwards';
      });
      
     
    slider.addEventListener("mouseout", () => {
        valueDisplay.style.animation = "none";
        void valueDisplay.offsetWidth;
        valueDisplay.style.animation = "popNoticeOut 0.4s forwards";
    });
}

// PHONEBOOK STARTS
function loadPhonebook() {
    const wrapper = document.querySelector(".dealer-partial-data");
    const customerBtn = document.querySelectorAll(".customer-btn");

    if (!wrapper || !customerBtn) return;

    function fetchAndRender(url, callback) {
        fetch(url)
            .then(response => response.text())
            .then(data => {
                wrapper.innerHTML = data;
                loadPhonebook(); // Rebind after partial load
                if (typeof callback === 'function') callback();
            })
            .catch(err => {
                console.error("Failed to load data:", err);
            });
    }

    // customerBtn[0].addEventListener("click", () => {
    //     fetchAndRender("/dealership/GetPartialData?viewName=phonebookb", searchBarPhonebook);
    //     setTimeout(() => {
    //         toggleSelectPhonebook()
    //     }, 200);
    // });

    customerBtn[0].addEventListener("click", () => {
        fetchAndRender("/dealership/GetPartialData?viewName=phonebookuser", toggleSelectPhonebook);
        setTimeout(() => {
            searchBarPhonebook()
        }, 200);
    });

    customerBtn[1].addEventListener("click", () => {
        fetchAndRender("/dealership/GetPartialData?viewName=phonebookadd", toggleSelectPhonebook);
        setTimeout(() => {
            submitUserPhonebook()
            loadDatetimeForSettings()
        }, 200);
    });

    customerBtn[2].addEventListener("click", () => {
        fetchAndRender("/dealership/GetPartialData?viewName=phonebookcampaign", toggleSelectPhonebook);
        setTimeout(() => {
            loadEditorCampaign()
        }, 200);
    });

    // customerBtn[2].addEventListener("click", () => {
    //     fetchAndRender("/dealership/GetPartialData?viewName=phonebookactive", toggleSelectPhonebook);
    //     setTimeout(() => {
    //         fetchActiveUsers()
    //     }, 200);
    // });

}

function togglePhonebookItemsDashboard() {
    const toggler = document.querySelectorAll(".toggle-dash-info");

    toggler.forEach((item) => {
        item.addEventListener("mousedown", (e) => {
          
            const parent = item.closest(".wrapper-dash-items");
            if (parent) {
                const customerDataDash = parent.querySelector(".wrapper-customer-data-dash");
                const wrapperDashItemsNotext = parent.querySelector(".wrapper-dash-items-notext");

                if (customerDataDash && wrapperDashItemsNotext) {
                    if (customerDataDash.style.display === "flex") {
                      
                        customerDataDash.style.display = "none";
                        customerDataDash.style.flexDirection = "row"

                        parent.style.minHeight = "2.2rem";
                        parent.style.flexDirection = "row"

                        item.textContent = "Expand";
                        
                    } else {
                        customerDataDash.style.display = "flex";

                        parent.style.flexDirection = "column"
                        parent.style.minHeight = "15rem";

                        item.textContent = "Collapse";
                    }
                }
            }
        });
    });
}

// - PHONEBOOK FILTRATIONS START
function toggleSelectPhonebook() {
    const select = document.querySelector(".customer-search-input-sel");
    const container = document.querySelector(".wrapper-customer-data");

    if (!select || !container) return;

    select.addEventListener("change", (e) => {
        const value = e.target.value;

        fetch(`dealership/phonebookb/grabmore/${value}`)
            .then(response => {
                if (!response.ok) throw new Error("Failed to fetch phonebook data.");
                return response.json();
            })
            .then(data => {
                const list = data.listModels;
                if (!list || !Array.isArray(list)) return;

                // Clear current entries
                container.innerHTML = "";

                list.forEach(item => {
                    const entry = document.createElement("div");
                    entry.className = "customer-entry";
             
                    const now = new Date();
                    
                    entry.innerHTML = `
                    <div class="customer-entry-shrtr customer-entry-even-shrtr">
                        <p class="customer-entry-data"><i class="bi bi-person"></i> ${item.name || "N/A"}</p>
                    </div>
                    <div class="customer-entry-shrtr customer-entry-even-shrtr">
                        <p class="customer-entry-data"><i class="bi bi-phone"></i> ${item.phonenumber || "N/A"}</p>
                    </div>
                    <div class="customer-entry-shrtr">
                        <p class="customer-entry-data"><i class="bi bi-envelope"></i> ${item.email || "N/A"}</p>
                    </div>
                    <div class="customer-entry-shrtr">
                        <p class="customer-entry-data"><i class="bi bi-calendar"></i> ${now.toLocaleDateString()}</p>
                    </div>
                    <div id="customer-entry-info" style="display: none;">
                        <textarea style="width:100%; height:100%; border:none; font-family: inherit; background-color:#f5f5f5; resize: none;"></textarea>
                    </div>
                    <div class="customer-entry-chevron">
                        <p><i class="fa-solid fa-chevron-down"></i></p> 
                        <p class="customer-entry-datetime" style="display:none;"><i class="fa-solid fa-clock"></i></p> 
                        <p><i class="fa-solid fa-trash"></i></p> 
                        <p class="customer-entry-fire"><i class="bi bi-star-fill"></i></p> 
                        <p class="fa-pen-wrapper"><i class="bi bi-person-check-fill"></i></p> 
                        <p class="fa-floppy-save"><i class="fa-solid fa-floppy-disk"></i></p> 
                    </div>
                    `; 

                    container.appendChild(entry);
                });

                chevronPhonebookToggler()

            })
            .catch(err => {
                console.error("Error loading entries:", err);
                container.innerHTML = `<p style="color: red;">Failed to load data</p>`;
            });
    });
}

function searchBarPhonebook() {
    const search = document.querySelector(".customer-search-input");
    const container = document.querySelector(".wrapper-customer-data");

    console.log(container)
    if (!search || !container) return;

    let debounceTimer; // Store the debounce timer to cancel it if the user types again quickly

    search.addEventListener("keyup", (e) => {
        const query = e.target.value;

        // Clear the previous debounce timer if user is typing quickly
        clearTimeout(debounceTimer);

        // If the query is empty, clear the results
        if (!query.trim()) {
            container.innerHTML = "";
            return;
        }

        // Set a new debounce timer to wait for the user to stop typing
        debounceTimer = setTimeout(() => {
            fetch(`/dealership/phonebook/grabmore/${query}`)
                .then(response => {
                    if (!response.ok) throw new Error("Failed to fetch phonebook data.");
                    return response.json();
                })
                .then(data => {
                    const list = data.listModels;

                    if (!list || !Array.isArray(list) || list.length === 0) {
                        setTimeout(() => {
                            container.innerHTML = `<p style="color: steelblue; padding-left: 0.5rem">No items found</p>`;
                        }, 500);
                        return;
                    }

                    container.innerHTML = ""; // Clear previous results

                    list.forEach(item => {
                        const entry = document.createElement("div");
                        entry.className = "customer-entry";

                        const now = new Date();
                            
                        entry.innerHTML = `
                        <div class="customer-entry-shrtr customer-entry-even-shrtr">
                            <p class="customer-entry-data"><i class="bi bi-person"></i> ${item.name || "N/A"}</p>
                        </div>
                        <div class="customer-entry-shrtr customer-entry-even-shrtr">
                            <p class="customer-entry-data"><i class="bi bi-phone"></i> ${item.phonenumber || "N/A"}</p>
                        </div>
                        <div class="customer-entry-shrtr">
                            <p class="customer-entry-data"><i class="bi bi-envelope"></i> ${item.email || "N/A"}</p>
                        </div>
                        <div class="customer-entry-shrtr">
                            <p class="customer-entry-data"><i class="bi bi-calendar"></i> ${now.toLocaleDateString()}</p>
                        </div>
                        <div id="customer-entry-info" style="display: none;">
                            <textarea style="width:100%; height:100%; border:none; font-family: inherit; background-color:#f5f5f5; resize: none;"></textarea>
                        </div>
                        <div class="customer-entry-chevron">
                            <p><i class="fa-solid fa-chevron-down"></i></p> 
                            <p class="customer-entry-datetime" style="display:none;"><i class="fa-solid fa-clock"></i></p> 
                            <p><i class="fa-solid fa-trash"></i></p> 
                            <p class="customer-entry-fire"><i class="bi bi-star-fill"></i></p> 
                            <p class="fa-pen-wrapper"><i class="bi bi-person-check-fill"></i></p> 
                            <p class="fa-floppy-save"><i class="fa-solid fa-floppy-disk"></i></p> 
                        </div>
                        `;  

                        container.appendChild(entry);
                    });

                    chevronPhonebookToggler()

                })
                .catch(err => {
                    console.error("Error loading entries:", err);
                    container.innerHTML = `<p style="color: red;">Failed to load data</p>`;
                });
        }, 300); // Delay of 300ms after the user stops typing
    });
}

function fetchActiveUsers() {
    const container = document.querySelector(".wrapper-customer-data");
    
    fetch(`dealership/phonebookb/grabmore/p`)
    .then(response => {
        if (!response.ok) throw new Error("Failed to fetch phonebook data.");
        return response.json();
    })
    .then(data => {
        const list = data.listModels;
        if (!list || !Array.isArray(list)) return;

        // Clear current entries
        container.innerHTML = "";

        list.forEach(item => {
            const entry = document.createElement("div");
            entry.className = "customer-entry";

            const now = new Date();

            entry.innerHTML = `
            <div class="customer-entry-shrtr customer-entry-even-shrtr">
                <p class="customer-entry-data"><i class="bi bi-person"></i> ${item.name || "N/A"}</p>
            </div>
            <div class="customer-entry-shrtr customer-entry-even-shrtr">
                <p class="customer-entry-data"><i class="bi bi-phone"></i> ${item.phonenumber || "N/A"}</p>
            </div>
            <div class="customer-entry-shrtr">
                <p class="customer-entry-data"><i class="bi bi-envelope"></i> ${item.email || "N/A"}</p>
            </div>
            <div class="customer-entry-shrtr">
                <p class="customer-entry-data"><i class="bi bi-calendar"></i> ${now.toLocaleDateString()}</p>
            </div>
            <div id="customer-entry-info" style="display: none;">
                <textarea style="width:100%; height:100%; border:none; font-family: inherit; background-color:#f5f5f5; resize: none;"></textarea>
            </div>
            <div class="customer-entry-chevron">
                <p><i class="fa-solid fa-chevron-down"></i></p> 
                <p class="customer-entry-datetime" style="display:none;"><i class="fa-solid fa-clock"></i></p> 
                <p><i class="fa-solid fa-trash"></i></p> 
                <p class="customer-entry-fire"><i class="bi bi-star-fill"></i></p> 
                <p class="fa-pen-wrapper"><i class="bi bi-person-check-fill"></i></p> 
                <p class="fa-floppy-save"><i class="fa-solid fa-floppy-disk"></i></p> 
            </div>
            `;  

            container.appendChild(entry);
        });

        chevronPhonebookToggler()


    })
    .catch(err => {
        console.error("Error loading entries:", err);
        container.innerHTML = `<p style="color: red;">Failed to load data</p>`;
    });
}

// - PHONEBOOK FILTRATIONS END
function loadEditorCampaign() {
    const buttons = document.querySelectorAll(".customer-navbar-btn");
    let quillSMSInstance = null;
    let quillEmailInstance = null;
    let isHandlingSMSChange = false; // Flag to prevent recursion

    // SMS
    buttons[0].addEventListener("mousedown", (e) => {
        const smsEditorElement = document.querySelector(".customer-sms-editor");
        const emailEditorElement = document.querySelector(".customer-email-editor");

        smsEditorElement.style.display = "flex";
        smsEditorElement.style.flexDirection = "column"
        emailEditorElement.style.display = "none";

        const wrapperTextEditor = smsEditorElement.querySelector(".wrapper-text-editor");

        if (wrapperTextEditor) {
            if (!quillSMSInstance) {
                quillSMSInstance = new Quill(wrapperTextEditor, {
                    theme: "snow",
                    modules: {
                        toolbar: [
                            ["bold", "italic", "underline", "strike"],
                            ["clean"],
                        ],
                    },
                });

                quillSMSInstance.on('text-change', function (delta, oldDelta, source) {
                    if (isHandlingSMSChange) return; // Prevent recursion
                    isHandlingSMSChange = true;

                    let text = quillSMSInstance.getText();
                    const length = text.length;

                    if (length > 160) {
                        const truncatedText = text.substring(0, 160);
                        quillSMSInstance.setText(truncatedText, 'api'); // Use 'api' source
                    }

                    isHandlingSMSChange = false;
                });
                quillSMSInstance.focus(); // Add focus here

            }
            else{
            quillSMSInstance.focus();
            }

            const sendSmsButton = document.querySelector(".customer-sms-editor .btn-editor-submit");
            if (sendSmsButton) {
                sendSmsButton.addEventListener("click", function () {
                    let textContent = quillSMSInstance.getText();
                    textContent = textContent.substring(0, 160);
                    const plainText = textContent.replace(/<[^>]*>?/gm, '');
                    console.log("SMS Content:", plainText);

                    // Trigger next step
                    showConfirmationNeedApproval(plainText)
                });
            }
        } else {
            console.log("The .wrapper-text-editor element was not found within .customer-sms-editor.");
        }
        e.preventDefault();
    });

    // EMAIL
    buttons[1].addEventListener("mousedown", (e) => {

        const emailEditorElement = document.querySelector(".customer-email-editor");
        const smsEditorElement = document.querySelector(".customer-sms-editor");

        emailEditorElement.style.display = "flex";
        emailEditorElement.style.flexDirection = "column"
        smsEditorElement.style.display = "none";

        const wrapperTextEditor = emailEditorElement.querySelector(".wrapper-text-editor");

        if (wrapperTextEditor) {
            if (!quillEmailInstance) {
                quillEmailInstance = new Quill(wrapperTextEditor, {
                    theme: "snow",
                    modules: {
                        toolbar: [
                            ["bold", "italic", "underline", "strike"],
                            ["blockquote", "code-block"],
                            [{ header: 1 }, { header: 2 }],
                            [{ list: "ordered" }, { list: "bullet" }],
                            [{ script: "sub" }, { script: "super" }],
                            [{ indent: "-1" }, { indent: "+1" }],
                            [{ direction: "rtl" }],
                            [{ size: ["small", false, "large", "huge"] }],
                            [{ header: [1, 2, 3, 4, 5, 6, false] }],
                            [{ color: [] }, { background: [] }],
                            [{ font: [] }],
                            [{ align: [] }],
                            ["clean"],
                            ["image"],
                        ],
                    },
                    // Add other Quill configuration options here if needed
                });
                document.querySelector(".customer-email-subject").querySelector("input").focus()

            }
            else{
                 quillEmailInstance.focus();
            }


            const sendEmailButton = document.querySelector(".customer-email-editor .btn-editor-submit");
        if (sendEmailButton) {
            sendEmailButton.addEventListener("click", function () {
                const htmlContent = quillEmailInstance.root.innerHTML;
                console.log("Email Content:", htmlContent);

                // Trigger next step
                showConfirmationNeedApproval(htmlContent)
            });
        }
        } else {
            console.log("The .wrapper-text-editor element was not found within .customer-email-editor.");
        }
        e.preventDefault();
    });
}

function chevronPhonebookToggler() {

    let iconcont = document.querySelectorAll(".customer-entry-chevron")

    iconcont.forEach((item) => {
        item.querySelectorAll(".fa-chevron-down").forEach((chevron) => {
            chevron.parentNode.addEventListener("mousedown", (e) => {
                const container = item.parentNode;
                const expandable = container.querySelector("#customer-entry-info");
                const icon = item.parentNode.querySelector("i");
                const iconDatetime = container.querySelector(".customer-entry-datetime")
                const iconFire = container.querySelector(".customer-entry-fire")
                const iconSave = container.querySelector(".fa-floppy-save")
        
                const isExpanded = expandable.style.display === "block";
        
                if (isExpanded) {
                    // General styling for collapsed starts here
                    expandable.style.display = "none";
        
                    if (icon) {
                        icon.classList.remove("bi-chevron-up");
                        icon.classList.add("bi-chevron-down");
                    }
        
                    item.style.margin = "";
                    item.style.marginRight = "";
        
                    container.style.alignItems = "";
                    container.style.flexDirection = "";
                    container.style.paddingTop = "";
                    container.style.paddingBottom = "";
                    container.style.paddingRight = "";
                    container.style.justifyContent = "";
                    container.style.minHeight = "";
                    // General styling for collapsed ends here
        
        
                    // Remove icon edit (checkmark)
                    iconDatetime.style.display = "none"
                    iconSave.style.display = "none"
        
                    // Scroll the collapsed div into view
                    container.scrollIntoView({ behavior: "smooth", block: "start" });
        
        
                    // Retract the width to accomodate the removed icon above
                    // item.style.maxWidth = "22%"
                    // item.style.minWidth = "22%"
        
        
                } else {
                    // Styling for expand starts here
                    expandable.style.display = "block";
                    expandable.style.border = "1px solid #ddd";
                    expandable.style.height = "8rem";
                    expandable.style.minWidth = "100%";
                    expandable.style.marginRight = "2rem";
                    expandable.style.borderRadius = "0.2rem";
                    expandable.style.overflow = "hidden";
                    expandable.style.overflowX = "hidden";
                    expandable.style.marginTop = "1rem";
                    expandable.style.padding = "0.2rem";
                    expandable.style.width = "10rem"
        
                    const para = expandable.querySelector("p");
        
                    if (para) {
                        para.style.padding = "0.2rem";
                        para.style.margin = "0rem";
                    }
        
                    container.style.alignItems = "flex-start";
                    container.style.flexDirection = "column";
                    container.style.paddingTop = "2rem";
                    container.style.paddingBottom = "1rem";
                    container.style.justifyContent = "flex-start";
                    container.style.minHeight = "32rem";
        
                    item.style.marginRight = "0rem";
                    item.style.marginTop = "1rem";
                    // Styling for expand ends here
        
        
                    // Scroll the expanded div into view
                    container.scrollIntoView({ behavior: "smooth", block: "start" });
        
        
                    // Display icon edit (checkmark)
                    iconDatetime.style.display = "flex"
                    iconFire.style.display = "flex"
                    iconSave.style.display = "flex"
        
        
                    // Change toggle direction chevron
                    if (icon) {
                        icon.classList.remove("bi-chevron-down");
                        icon.classList.add("bi-chevron-up");
                    }
        
        
                    // Expand togglemenu to accomodate slider
                    // item.style.maxWidth = "35%"
                    // item.style.minWidth = "35%"
        
        
                    // Focus on the textarea
                    setTimeout(() => {
                        expandable.querySelector("textarea").focus()
                    }, 200);
        
        
                }
            })
        })
        
        item.querySelectorAll(".fa-trash").forEach((xmark) => {
            xmark.parentNode.addEventListener("mousedown", async (e) => {
                let result = await showAreYouSurePopup();
        
                if (result) {
                    item.parentNode.remove();
                    showConfirmationPopup()
                }
            })
        })
        
        item.querySelectorAll(".bi-person-check-fill").forEach((activestate) => {
        
            activestate.parentNode.addEventListener("mousedown", (e) => {
                const isActive = getComputedStyle(activestate.parentNode).backgroundColor === 'rgba(30, 168, 38, 0.77)';
        
                if (!isActive) {
                    activestate.parentNode.style.backgroundColor = 'rgba(30, 168, 38, 0.77)';
                    activestate.parentNode.style.color = 'white';
                    activestate.parentNode.style.border = "1px solid rgba(30, 168, 38, 0.77)";
                } else {
                    activestate.parentNode.style.backgroundColor = '';
                    activestate.parentNode.style.color = '';
                    activestate.parentNode.style.border = '';
                }
        
                activestate.style.animation = 'none';
                void activestate.offsetWidth;
                activestate.style.animation = 'zoomBounce 0.4s ease-in-out';
            })
        })
        
        item.querySelectorAll(".fa-clock").forEach((datetime) => {
        
            datetime.parentNode.addEventListener("mousedown", (e) => {
                let maincontainer = item.parentNode
                let oldvalue = maincontainer.querySelector("#customer-entry-info").querySelector("textarea").value
                let datetimevalue = returnDatetime()
                maincontainer.querySelector("#customer-entry-info").querySelector("textarea").value = oldvalue + "(" + datetimevalue + ")" + " : "
        
                setTimeout(() => {
                    maincontainer.querySelector("#customer-entry-info").querySelector("textarea").focus()
                }, 200);
        
            })
        })
        
        item.querySelectorAll(".bi-star-fill").forEach((priority) => {
            priority.parentNode.addEventListener('mousedown', () => {
        
                const isActive = getComputedStyle(priority.parentNode).backgroundColor === 'rgba(240, 79, 20, 0.77)'; // rgb(255, 69, 0) is the color for #FF4500
        
                if (!isActive) {
                    priority.parentNode.style.backgroundColor = 'rgba(240, 79, 20, 0.77)';
                    priority.parentNode.style.color = 'white';
                    priority.parentNode.style.border = "1px solid rgba(240, 79, 20, 0.77)";
                } else {
                    priority.parentNode.style.backgroundColor = '';
                    priority.parentNode.style.color = '';
                    priority.parentNode.style.border = '';
                }
        
                priority.style.animation = 'none';
                void priority.offsetWidth;
                priority.style.animation = 'zoomBounce 0.4s ease-in-out';
            });
        });
        
        item.querySelectorAll(".fa-floppy-disk").forEach((save) => {
        
            save.parentNode.addEventListener("mousedown", (e) => {
                showConfirmationPopup()
            })
        })
        
          
    })

}

function showConfirmationNeedApproval () {
    // Remove any existing popup
    const existing = document.querySelector('.popup-overlay');
    if (existing) existing.remove();

    // Create overlay (background)
    const overlay = document.createElement('div');
    overlay.className = 'popup-overlay';

    // Create popup success container (centered content)
    const successContainer = document.createElement('div');
    successContainer.className = 'popup-confirmation-campaign';

    successContainer.style.animation = "popNoticeIn 0.6s ease forwards";

    successContainer.innerHTML =
    `
        <h2>Campaign is almost there!</h2>

        <form>
            <h4>Who do you want to target?</h4>
            <div>
                <label for="customer">Customers</label>
                <input type="radio" id="customer" name="audience" value="customer" checked>
            </div>
            <div>
                <label for="partners">Partners</label>
                <input type="radio" id="partners" name="audience" value="partners">
            </div>
            <div>
                <label for="both">Both</label>
                <input type="radio" id="both" name="audience" value="both">
            </div>
        </form>

        <p class="campaign-cost">The estimated cost for this campaign is <b>200 SEK</b></p>
        <p>If you proceed, this cost will be added to your monthly invoice.</p>

        <button>Confirm and Proceed</button>
    `;

    // Append icon to success container, then to overlay
    overlay.appendChild(successContainer);
    document.body.appendChild(overlay);

    overlay.addEventListener("mousedown", (e) => {
        if (e.target === overlay) {
            overlay.remove();
        }
    });

    const confirmButton = successContainer.querySelector("button");
    confirmButton.addEventListener("mousedown", (e) => {
        showConfirmationPopup(); // Assuming this function exists elsewhere
    });

    const radioInputs = successContainer.querySelectorAll('input[type="radio"]');
    const costParagraph = successContainer.querySelector('.campaign-cost');
    let currentCost = 500; // Initial cost

    radioInputs.forEach(input => {
        input.addEventListener('change', () => {
            // You can define different cost logic based on the selected option
            if (input.value === 'customer') {
                currentCost = 200;
            } else if (input.value === 'partners') {
                currentCost = 350;
            } else if (input.value === 'both') {
                currentCost = 550;
            }
            costParagraph.innerHTML = `The estimated cost for this campaign is <b>${currentCost} SEK</b>`;
        });
    });
}

function loadDatetimeForSettings() {
    let datetimetoggler = document.querySelector(".customer-form-settings-wrapper")

    datetimetoggler.querySelector(".customer-entry-datetime").addEventListener("mousedown", (e) => {
        let originalitem = datetimetoggler.parentNode.querySelector("#description")

        let originalvalue = originalitem.value
        let datetime = returnDatetime()

        originalitem.value = originalvalue + "(" + datetime + ")" + " : "

        setTimeout(() => {
            originalitem.focus()
        }, 200);
    })
}

function submitUserPhonebook() {
    const button = document.querySelector('.btn.steelblue');

    // Change heigh of window
    const window = document.querySelector(".wrapper-customer-data")
    window.style.height = "79.3dvh"

    // FOCUS ON FIRST INPUT
    document.getElementById("name").focus()

    button.addEventListener("mousedown", (e) => {
        const form = document.querySelector('.customer-form');

        if (!form) return;
    
        form.addEventListener('submit', function (e) {
            e.preventDefault();
    
            const formData = {
                name: form.name.value.trim(),
                phonenumber: form.phonenumber.value.trim(),
                email: form.email.value.trim(),
                customertype: form.customertype.value,
                description: form.description.value.trim()
            };
    
            fetch('/dealership/post-user/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            .then(response => {
                if (!response.ok) throw new Error("Failed to submit form");
                return response;
            })
            .then(data => {
                showConfirmationPopup()
                form.reset();
            })
            .catch(error => {
                console.error("Submission error:", error);
                alert("Submission failed.");
            });
        });
    })
}

// HELPERS
function getOnEndpoint(endpoint) {
    fetch(endpoint)
    .then(response => {
        if (!response.ok) {
        throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        return data
    })
    .catch(error => {
        console.error('Fetch error:', error);
    });

}

function returnDatetime() {
    const now = new Date();
  
    const formatDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year} - ${month} - ${day}`;
    };
  
    const formatTime = (date) => {
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');
      return `${hours}:${minutes}:${seconds}`;
    };
  
    const currentDateString = formatDate(now);
    const currentTimeString = formatTime(now);
  
    return `${currentDateString} ${currentTimeString}`;
}

function showConfirmationPopup() {
    // Remove any existing popup
    const existing = document.querySelector('.popup-overlay');
    if (existing) existing.remove();
  
    // Create overlay (background)
    const overlay = document.createElement('div');
    overlay.className = 'popup-overlay';
  
    // Create popup success container (centered content)
    const successContainer = document.createElement('div');
    successContainer.className = 'popup-success';
    
    successContainer.style.height = "5rem"
    successContainer.style.width = "5rem"
    successContainer.style.borderRadius = "50%"
    successContainer.style.padding = "4rem"
    successContainer.style.opacity = "0";
    successContainer.style.animation = "fadeRotateIn 0.6s ease forwards";
  
    // Create check icon inside popup
    const checkIcon = document.createElement('i');
    checkIcon.className = 'fa-solid fa-check popup-success-icon';

    checkIcon.className = 'fa-solid fa-check';
    checkIcon.style.fontSize = '8rem';
    checkIcon.style.color = 'steelblue';
  
    // Append icon to success container, then to overlay
    successContainer.appendChild(checkIcon);
    overlay.appendChild(successContainer);
    document.body.appendChild(overlay);
  
    // Remove the popup after a delay
    setTimeout(() => {
      overlay.remove();
    }, 1200);
}

function showAreYouSurePopup(type) {
    // Return a promise to handle asynchronous user input
    return new Promise((resolve) => {
        // Remove any existing popup
        const existing = document.querySelector('.popup-overlay');
        if (existing) existing.remove();

        // Create overlay (background)
        const overlay = document.createElement('div');
        overlay.className = 'popup-overlay';

        // Create popup success container (centered content)
        const successContainer = document.createElement('div');
        successContainer.className = 'popup-confirm-areyousure';

        const checkIcon = document.createElement('i');
        checkIcon.className = 'popup-confirm-sure';

        // Create check icon inside popup
        if(type === "rejectoffer")
        {
            checkIcon.innerHTML = `Decline request ?`

        } else if (type === "restoreoffer")
        {
            checkIcon.innerHTML = `Restore offer ?`

        }else 
        {
            checkIcon.innerHTML = `Delete user ?`

        }

        // Create confirmation button
        const confirmationBtn = document.createElement("button");
        confirmationBtn.innerText = "Confirm";

        const cancelBtn = document.createElement("button")
        cancelBtn.classList.add("cancel-btn-usure")
        cancelBtn.innerText = "Cancel";

        // Add event listener to confirmation button
        confirmationBtn.addEventListener("mousedown", (e) => {
            resolve(true);
            overlay.remove();
        });

        cancelBtn.addEventListener("mousedown", (e) => {
            resolve(false);
            overlay.remove();
        })

        // Append icon to success container, then to overlay
        successContainer.appendChild(checkIcon);
        successContainer.appendChild(confirmationBtn);
        successContainer.appendChild(cancelBtn);
        overlay.appendChild(successContainer);
        document.body.appendChild(overlay);
    });
}