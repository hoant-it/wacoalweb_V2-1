class Static{
    constructor(){

    }

     GetURLParameter(sParam){
        var sPageUrl= window.location.search.substring(1);
        var sUrlVariables= sPageUrl.split('&');
        for(var i =0; i< sUrlVariables.length; i++){
            var sParemetterName= sUrlVariables[i].split('=');
            if(sParemetterName[0] === sParam){
                return sParemetterName[1];
            }
        }
    }

    
}