const db = require("../../databases/database").sequelize;


module.exports.VideoHomeLoad= async (req, res ) =>{
    res.render('video/videohome',{
    
    })
}

module.exports.VideoChannelLoad= async (req, res ) =>{
    res.render('video/videochannel',{
    
    })
}


module.exports.wacoal_VideoHomeLoad_web_V1= async (req, res ) =>{
    const{search}=req.params;
    
        try {
            await db.query(`wacoal_VideoHomeLoad_web_V1 @search=:search`,{
                replacements:{
                    search:search
                }
            })
            .then(result => {
                res.json({
                    data: result[0]
                })
                
            })
            
        } catch (error) {
            res.json({
                data:{},
                message:'Error ' + error
            })
        }
    
    
    }

    //search theo channel
    module.exports.wacoal_VideoChannelLoad_Search_web_V1= async (req, res ) =>{
        const{usercreate,searchChannel}=req.params;
        
            try {
                await db.query(`wacoal_VideoChannelLoad_Search_web_V1 @userCreate=:userCreate, 
                 @Search=:Search`,{
                    replacements:{
                        userCreate:usercreate,
                        Search:searchChannel
                    }
                })
                .then(result => {
                    res.json({
                        data: result[0]
                    })
                    
                })
                
            } catch (error) {
                res.json({
                    data:{},
                    message:'Error ' + error
                })
            }
        
        
        }

    

    module.exports.wacoal_VideoChannelLoad_web_V1= async (req, res ) =>{
        const{usercreate}=req.params;
        
            try {
                await db.query(`wacoal_VideoChannelLoad_web_V1 @userCreate=:userCreate`,{
                    replacements:{
                        userCreate:usercreate
                    }
                })
                .then(result => {
                    res.json({
                        data: result[0]
                    })
                    
                })
                
            } catch (error) {
                res.json({
                    data:{},
                    message:'Error ' + error
                })
            }
        
        
        }




module.exports.VideoUpload= async (req, res ) =>{
    res.render('video/VideoUpload',{

    });
}


module.exports.VideoSearch= async (req, res) =>{
    res.render('video/videosearch');
}

module.exports.VideoSearchChannel= async (req, res) =>{
    res.render('video/videochannelsearch');
}