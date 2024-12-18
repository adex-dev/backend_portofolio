import {loadplugin} from "./loadplugins";
import {style} from "./package/settings";
import Swal from "sweetalert2";
import {data_validation} from "./package/post_processing";

const initialize = async ()=>{
    try {
        await loadplugin();
        $(document).ready(()=>{
            style()
            data_validation(Swal)
        })
    }catch (err){
        Swal.close()
    }
}

initialize().then(r => {

})