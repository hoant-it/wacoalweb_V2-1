const db= require('../../databases/database').sequelize;

result=[];
function data_Tree(arr,parent_id="0", level=0){
arr.forEach(element => {
  if(element["parent_id"]=== parent_id){
    element["level"]=level;
    if(element["href"]===""){
      if(level===0){
        html+=`<li class="active"><a> ${element["title"]} <span class="fa fa-chevron-down"></span></a>`;
        html+=`<ul class="nav child_menu" style="display:block">`;
      }
      else {
        html+=`<li><a> ${element["title"]} <span class="fa fa-chevron-down"></span></a>`;
        html+=`<ul class="nav child_menu">`;
      }
   
    result.push(element);
    child=data_Tree(arr,element["id"],level + 1);
      result.concat(child);
      html+=`</ul>`
    html+=`</li>`
    }
    else{
      html+=`<li><a href="${element["href"]}"> ${element["title"]}</a>`;
      // html+=`<li><a href=""> ${element["title"]}</a>`;
    result.push(element);
    child=data_Tree(arr,element["id"],level + 1);
      result.concat(child);
    html+=`</li>`
    }
  }
});
return result;
}

module.exports.HomeLoad= async (req, res ) =>{
    html="";
    html=`<ul class="nav side-menu" id="side-menu">`;
    // console.log('  IDAuthorization ' + req.signedCookies.IDAuthorization +  ' UserInGroupID ' + req.signedCookies.UserInGroupID);
    await db.query('sp_Wacoal_LoadMenuWeb_V1 @IDAuthorization=:IDAuthorization,@UserInGroupID=:UserInGroupID',{
      replacements: { IDAuthorization: req.signedCookies.IDAuthorization, UserInGroupID:req.signedCookies.UserInGroupID},
    }).then(result => {
      arr=result[0];
      // console.log(arr);
      list_cat=data_Tree(arr,"0");
      html+=`</ul>`
    });
  
   res.render('home',{
     title:'Việt Nam Wacoal',
     userId:req.signedCookies.userId,
     html:html
   })
  }