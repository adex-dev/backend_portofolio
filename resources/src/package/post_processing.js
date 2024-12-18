import {show_loading,hidden_loading,msg_alert} from "./alert";
import {format_currency} from "./settings";
import {post_data} from "./ajax_processing";
export const data_validation = async (Swal)=>{
    let $form = "",url="",actions="reload",form="",results ="",data="";

    $(document).onsubmit(".submit",async (e)=>{
        e.preventDefault()
        $form = $(this)
        data = $form.data("actions")
        form = $form.serialize()
        switch (data) {
            case "login":
                await show_loading(Swal)
                url= page + "login"
                actions = "next_page"
                results = await post_data(form,url,actions,Swal)
                if (results.status){
                    location.href = page + results.links
                    await hidden_loading(Swal)
                }else {
                    await hidden_loading(Swal)
                }
                break;
        }
    })
}