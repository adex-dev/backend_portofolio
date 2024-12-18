export const msg_alert = (textMessage,icons,Swal)=>{
    const modal = ".modal"
    if (icons === "error" || icons === "info" || icons === "warning" || icons === "success") {
        return Swal.fire({
            html: textMessage, icon: icons, customClass: {
                container: "swal2-container-custom"
            }, showCancelButton: false, allowOutsideClick: false, allowEscapeKey: false, target: $(modal).get(0)
        })
    }else if(icons ==="question"){
        return Swal.fire({
            title:"Are You Sure ?",text:"You won't be able to revert this",icon:"info",customClass:{container:"swal2-container-custom"},
            showCancelButton:true,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Yes, Get its !",target:$(modal).get(0)
        })
    }else {
        return Swal.fire({html:"Unknown Action",icon:"warning",customClass:{container:"swal2-container-custom"},showCancelButton:false,allowEscapeKey:false,allowOutsideClick:false,target:$(modal).get(0)})
    }
}
export const hidden_loading = (Swal)=>{
    Swal.close()
}
export const  show_loading = async (Swal)=>{
    return Swal.fire({
        title: "Loading..",showCancelButton:false,allowEscapeKey:false,allowOutsideClick:false,target:document.querySelector(".viewModal"),didOpen:()=> {
            Swal.showLoading()
        }
    })
}
export const hidemodal = ()=>{
    const  modals = ".viewModal"
    $(modals).addClass("hidden")
    $(modals).html('')
}