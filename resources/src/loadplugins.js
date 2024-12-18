const load_File_JS = (FILe_URL)=>{
    return new Promise((resolve,reject)=>{
        let dynamicScript  = document.createElement("script");
        dynamicScript.src = FILe_URL;
        dynamicScript.onload = resolve
        dynamicScript.onerror = reject
        document.body.appendChild(dynamicScript)
    })
}

const Load_File_Css = (File_URL)=>{
    return new Promise((resolve,reject)=>{
        let dynamicStylesheet = document.createElement("link")
        dynamicStylesheet.href = File_URL
        dynamicStylesheet.rel = "stylesheet"
        dynamicStylesheet.onload = resolve
        dynamicStylesheet.onerror = reject
        document.head.appendChild(dynamicStylesheet)
    })
}


export  const loadplugin = async ()=>{
    let to_build = page;
    let vendors = to_build+ "/resources/vendors/"
    try {
    const resources = [
        {type:"css",path:vendors + "boxicons/css/animations.css"},
        {type:"css",path:vendors + "boxicons/css/boxicons.css"},
        {type:"css",path:vendors + "boxicons/css/transformations.css"},
        {type:"css",path:vendors + "choise/choices.css"},
        {type:"css",path:vendors + "jam/jam.min.css"},
        {type:"js",path:vendors + "popper/popper.min.js"},
        {type:"js",path:vendors + "choise/choices.js"},
        {type:"js",path:vendors + "jam/buttons.js"},
        {type:"js",path:vendors + "jam/jam.js"},
    ]
    for (const resource of resources){
        if (resource.type ==="css"){
            await Load_File_Css(resource.path)
        }else if (resource.type ==="js"){
            await load_File_JS(resource.path)
        }
    }
    } catch (err){
        throw err;
    }
}