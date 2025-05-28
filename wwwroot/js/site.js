

try{
  
    const toggle = document.querySelector(".idx-prod-toggleslide");
    const box = document.getElementById("prod-indx-darkmode");
    const icon = toggle.querySelector("i");

    let visible = true;

    toggle.addEventListener("mousedown", () => {
      toggleSlide();
    });

    function toggleSlide() {
      // Reset animation
      box.style.animation = "none";
      void box.offsetWidth;

      if (visible) {
        box.style.animation = "slideOut 0.6s ease-in-out forwards";
        icon.classList.remove("fa-chevron-right");
        icon.classList.add("fa-chevron-left"); // 👈 pointing left = sliding out
      } else {
        box.style.animation = "slideIn 0.6s ease-in-out forwards";
        icon.classList.remove("fa-chevron-left");
        icon.classList.add("fa-chevron-right"); // 👉 pointing right = sliding in
      }

      visible = !visible;
    }

}catch{

}