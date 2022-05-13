  // check if there is a color in local storage
  let mainColors = localStorage.getItem("color_option");
  

  if(mainColors !== null){
    document.documentElement.style.setProperty('--main-color',mainColors);

     // remove active class from the children
     document.querySelectorAll(".colors-list li").forEach(element => {

        element.classList.remove("active"); 
         // add class active to color 
          if(element.dataset.color === mainColors){
              element.classList.add('active');
          }
          });
  }

  // Rondom backgroung option
  let backgroundOption = true;

  //var to controll the interval
  let backgroundInterval;

  // check if there is a backG option in Local Storage
  let backgrongLocalItem = localStorage.getItem("background_option");

  // check if backG option in Local Storage is empty
  if(backgrongLocalItem !== null){
    
    if(backgrongLocalItem === 'true'){
      backgroundOption = true;
    } else{
      backgroundOption = false;
    }

    // remove active class from all span
    document.querySelectorAll(".random-backgrounds span").forEach(element => {

    element.classList.remove("active");

    });

    if(backgrongLocalItem === 'true'){

      document.querySelector(".random-backgrounds .yes").classList.add("active");

    } else {

      document.querySelector(".random-backgrounds .no").classList.add("active");

     }
    
  }

  
  // toggle spin class on icon
  document.querySelector(".toggle-setting .fa-cog").onclick = function(){

    //toggle fa-spin class to rotation on self
    this.classList.toggle("fa-spin");

    //toggle opne class to open,close setting windo
    document.querySelector(".settings-box").classList.toggle("open");


    
  };



  // switch colors
  const colosLis = document.querySelectorAll(".colors-list li");
  
  colosLis.forEach(li =>{
      li.addEventListener("click",(e) =>{
         
          document.documentElement.style.setProperty('--main-color', e.target.dataset.color);

          // set color in local storage
          localStorage.setItem("color_option",e.target.dataset.color);

          handleActive(e);
      });
  });


   // switch backgrounds
   const randomBackEl = document.querySelectorAll(".random-backgrounds span");
  
   randomBackEl.forEach(span =>{
       span.addEventListener("click",(e) =>{
          
 
        handleActive(e);

     if(e.target.dataset.background === 'yes'){
       backgroundOption = true;
       rendomizeImgs();
       localStorage.setItem("background_option", true);

     }else{
       backgroundOption = false;
       clearInterval(backgroundInterval);
       localStorage.setItem("background_option", false);

      
     }
       });
   });
 


  
  // select landing page element
let landingPage = document.querySelector(".landing-page"),

    // get array of imgs
    imgArray = ["1.jpg", "2.png", "3.jpg", "4.jpg", "5.jpg"];

    
    // function to randomize Imgs
    function rendomizeImgs(){
      if(backgroundOption === true){

        backgroundInterval = setInterval(() => {
          // get random number
          let randomNumber = Math.floor(Math.random() * imgArray.length);
  
          //change background img url 
          landingPage.style.backgroundImage = 'url("media/img/' +imgArray[randomNumber] + '")';
      }, 8000);
      }
    }
    rendomizeImgs();


    //select skills selector
    let ourSkills = document.querySelector(".skills");

    window.onscroll = function(){

    // skills top offset
    let skillsOffsetTop = ourSkills.offsetTop;
    
    // oter height of skils box
    let skillsOuterHeight = ourSkills.offsetHeight;
    
    // window height
    let windowHeight = this.innerHeight;
    
    // window scroll top
    let windowScrollTop = this.pageYOffset;
    
    if(windowScrollTop > (skillsOffsetTop + skillsOuterHeight - windowHeight)){

      let allSkills = document.querySelectorAll(".skill-box .skill-progress span");

      allSkills.forEach(skill => {  

         skill.style.width = skill.dataset.progress;

      });
    }

    };

    // creat popup with the image
    let ourGallary = document.querySelectorAll(".gallary img");

    ourGallary.forEach(img => {

      img.addEventListener('click', (e) => {

        // creat overlay element
        let overlay = document.createElement("div");

        // add class to overlay
        overlay.className = 'popup-overlay';
        // append to the body
        document.body.appendChild(overlay);

        // creat popup box
        let popupBox = document.createElement("div");
        popupBox.className = 'popup-box';

        if(img.alt !== null){

           
          // creat heading
          let imgHeading = document.createElement("h3");

          // creat text for img heading
          let imgText = document.createTextNode(img.alt);

          imgHeading.appendChild(imgText);

          // append heding to popup box
          popupBox.appendChild(imgHeading);
        }

        // creat the img
        let popupImage = document.createElement("img");
        // set img src
        popupImage.src = img.src;

        popupBox.appendChild(popupImage);
        document.body.appendChild(popupBox);

        // creat close span
        let closeButton = document.createElement("span");

        let text = document.createTextNode("x"); 
         closeButton.appendChild(text);

         // add class to close button
         closeButton.className = 'close-button';

         // add close button to popup box
         popupBox.appendChild(closeButton);

      });

    });

    document.addEventListener("click", (e) => {

      if (e.target.className == 'close-button'){

        e.target.parentNode.remove();
        document.querySelector(".popup-overlay").remove();

      }

    });


    // select all bullets
    const allBullets = document.querySelectorAll(".nav-bullets .bullet ");
    
    // select all bullets
    const allLinks = document.querySelectorAll(".links a");
    
    function scrollToSomewhere(elements){

      elements.forEach(ele => {

       ele.addEventListener('click', (e) => {
  
          e.preventDefault();
  
          document.querySelector(e.target.dataset.section).scrollIntoView({
            behavior: "smooth"
          });
        });
      });
    }

    scrollToSomewhere(allLinks);
    scrollToSomewhere(allBullets);

    // Handle Active class State

    function handleActive(ev){

      // remove active class from all childrens
      ev.target.parentElement.querySelectorAll(".active").forEach(element => {

        element.classList.remove("active"); 
          });

          // add active class
    ev.target.classList.add("active");
    }

    let bullestSpan = document.querySelectorAll(".bullets-option span");

    let bulletsConyainer = document.querySelector(".nav-bullets");

    let bulletLocalItem = localStorage.getItem("bullets_option");

    if(bulletLocalItem !== null){

      bullestSpan.forEach(span => {

        span.classList.remove("active")

      });

      if(bulletLocalItem === 'block'){
        bulletsConyainer.style.display = 'block';
        document.querySelector(".bullets-option .yes").classList.add("active");
      }else{
        bulletsConyainer.style.display = 'none';
        document.querySelector(".bullets-option .no").classList.add("active");
      }
    }

    bullestSpan.forEach(span => {

      span.addEventListener("click", (e) => {
            
        if(span.dataset.display === 'show'){
          bulletsConyainer.style.display = 'block';

          localStorage.setItem("bullets_option",'block');
        } else {
         bulletsConyainer.style.display = 'none';
         localStorage.setItem("bullets_option",'none');
        }

        handleActive(e);

      });
    });


    // reste buuton
    document.querySelector(".reset-options").onclick = function(){

      // to remove all item in local storage
    // localStorage.clear();

    // to remove one item in local storage
     localStorage.removeItem("color_option");
     localStorage.removeItem("background_option");
     localStorage.removeItem("bullets_option");

     // relode the window
     window.location.reload();
    }

    // toggle menu
    let toggleBte = document.querySelector(".toggle-menu");
    let tLinks = document.querySelector(".links");

    toggleBte.onclick = function(e){

      //stop propagition
      e.stopPropagation();

      // toggle active menu class 
      this.classList.toggle("menu-active");

     // open the links in small screen
      tLinks.classList.toggle("open");
    };

    // click anywhere outside menu and toggle buttom
    document.addEventListener("click", (e) => {
        
      if(e.target !== toggleBte && e.target !== tLinks){

        if(tLinks.classList.contains("open")){

          // toggle active menu class 
          toggleBte.classList.toggle("menu-active");

     // open the links in small screen
      tLinks.classList.toggle("open");
         
        }
      }
    });

    // stop propaggtion in me
    tLinks.onclick = function(e){
      e.stopPropagation();
    }