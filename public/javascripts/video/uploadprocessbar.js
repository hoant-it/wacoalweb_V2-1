const form = document.querySelector("form"),
fileInput=form.querySelector(".file-input"),
processArea= document.querySelector(".process-area");
uploadedArea=document.querySelector(".uploaded-area")


form.addEventListener("click",()=>{
    fileInput.click();

    fileInput.onchange = ({target}) =>{
        // console.log(target.files);
        //gettimg file and [0] this means if user has selected multiples files 
        // then get
        let file= target.files[0];
        if(file){//if file is selected
            let fileName=file.name;
            if( fileName.length >=12){ 
                // neu file nam qua dai thi cat bot di va the hien ...
                let splitName= fileName.split('.');
                fileName = splitName[0].substring(0,12) + "... ."+splitName[1];
            }
            uploadFile(fileName);


        }
    }
})



function uploadFile(name) {
    let xhr= new XMLHttpRequest();
    xhr.open("POST",'/uploadprocessbar');
    //let 's implement progress function
    xhr.upload.addEventListener("progress",({loaded,total})=>{
        // console.log(loaded,total);
      let fileLoaded = Math.floor( (loaded/total) * 100);
      let fileTotal = Math.floor( total / 1000);
      let fileSize;
      (fileTotal<1024)? fileSize= fileTotal +' KB':fileSize =(loaded/(1024*1024)).toFixed(2)+' MB'
      let processHTML= ` <li class="row">
                            <i class="fas fa-file-alt"></i>
                            <div class="content">
                                <div class="details">
                                    <span class="name">${name} - uploading</span>
                                    <span class="percent">${fileLoaded}%</span>
                                </div>
                                <div class="process-bar">
                                    <div class="progress" style="width: ${fileLoaded}%"></div>

                                </div>
                            </div>
                        </li>
                     `;
   
        processArea.innerHTML = processHTML
        if(loaded == total){
            processArea.innerHTML = ''
             let uploadedHTML= `    <li class="row">
                            <div class="content">
                                <i class="fas fa-file-alt"></i>
                                <div class="details">
                                    <span class="name">${name} - Uploaded</span>
                                    <span class="size">${fileSize}</span>
                                </div>
                            </div>
                            <i class="fas fa-check"></i>
                        </li>
                    `
                    uploadedArea.innerHTML =  uploadedHTML  + uploadedArea.innerHTML;      
            // uploadedArea.insertAdjacentHTML("alterbegin", uploadedHTML);
        }

       

    })

   

    let formData=new FormData(form);
    xhr.send(formData);
}