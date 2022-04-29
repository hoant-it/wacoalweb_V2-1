function openCity(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
   
    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
          }
        
          // Show the current tab, and add an "active" class to the button that opened the tab
          document.getElementById(cityName).style.display = "block";
          evt.currentTarget.className += " active";
  }



function openTab(cityName){
  var i, tabcontent, tablinks;
  var x=document.getElementById("tabId");
  x.className="tab";
  if(x.style.display==="none"){
    x.style.display="block"
    var btn = document.createElement("BUTTON");
    btn.innerHTML=cityName;
    btn.id=cityName;
    btn.className="tablinks";
    tablinks=document.getElementsByClassName("tablinks");
    x.appendChild(btn);
    btn.onclick()=function openCity(evt, cityName) {
      var i, tabcontent, tablinks;
      tabcontent = document.getElementsByClassName("tabcontent");
      for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
      }
     
      // Get all elements with class="tablinks" and remove the class "active"
      tablinks = document.getElementsByClassName("tablinks");
          for (i = 0; i < tablinks.length; i++) {
              tablinks[i].className = tablinks[i].className.replace(" active", "");
            }
          
            // Show the current tab, and add an "active" class to the button that opened the tab
            document.getElementById(cityName).style.display = "block";
            evt.currentTarget.className += " active";
    }
    // <button class="tablinks" onclick="openCity(event, 'London')">London</button>
  } else {
    x.style.display="none";
  }
  

}




  // <li><a href=""> <%=list_cat[i].title %> <span class="fa fa-chevron-down"></span></a>

    
