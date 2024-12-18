import {show_loading, hidden_loading, msg_alert} from "./alert";

export const post_data = (form, url, actions, Swal) => {
    let txtMessage = "", action = "", Commanders = null
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "POST", url: url, data: form, cache: false, async: true, dataType: "json",
            success: async (response, txtdata, jqXHR) => {
                if (response) {
                    if (response.message || response.messages) {
                        txtMessage = response.message || response.messages;
                    } else {
                        txtMessage = response.error || "No Warning message Provided"
                    }
                } else {
                    txtMessage = `No Response Data received. ${txtdata}`
                }
                switch (jqXHR.status) {
                    case 404:
                        action = "errors"
                        Commanders = () => resolve();
                        await PopupInfor(txtMessage, action, Swal, Commanders)
                        break;
                    case 204:
                        action = "warning"
                        Commanders = () => resolve();
                        await PopupInfor(txtMessage, action, Swal, Commanders)
                        break;
                    case 304:
                        action = "info"
                        Commanders = () => resolve();
                        await PopupInfor(txtMessage, action, Swal, Commanders)
                        break;
                    case 500:
                        action = "errors"
                        Commanders = () => resolve();
                        await PopupInfor(txtMessage, action, Swal, Commanders)
                        break;
                    case 503:
                        action = "errors"
                        Commanders = () => resolve();
                        await PopupInfor(txtMessage, action, Swal, Commanders)
                        break;
                    case 200:
                        if (response) {
                            switch (response.status) {
                                case 200:
                                case "200":
                                    switch (action) {
                                        case "reload":
                                            location.reload()
                                            break;
                                        case "next_switch":
                                            location.href = response.links
                                            break;
                                        case "next_page":
                                            actions = "success"
                                            Commanders = () => resolve(response);
                                            await PopupInfor(txtMessage, actions, Swal, Commanders)
                                            break;
                                        default:
                                            hidden_loading(Swal)
                                            resolve();
                                            break;
                                    }
                                    break;
                                case 404:
                                    actions = "errors";
                                    Commanders = () => resolve(response);
                                    await PopupInfor(txtMessage, actions, Swal, Commanders)
                                    break;
                                case 204:
                                    actions = "warning";
                                    Commanders = () => resolve(response);
                                    await PopupInfor(txtMessage, actions, Swal, Commanders)
                                    break;
                                case 304:
                                    actions = "info";
                                    Commanders = () => resolve(response);
                                    await PopupInfor(txtMessage, actions, Swal, Commanders)
                                    break;
                                case 500:
                                    actions = "errors";
                                    Commanders = () => page + "/" + response.links;
                                    await PopupInfor(txtMessage, actions, Swal, Commanders)
                                    break;
                                case 503:
                                    actions = "errors";
                                    Commanders = () => location.reload();
                                    await PopupInfor(txtMessage, actions, Swal, Commanders)
                                    break;
                                default:
                                    hidden_loading(Swal)
                                    resolve();
                                    break;
                            }

                        }
                        break;
                    default:
                        hidden_loading(Swal)
                        resolve();
                        break;

                }
            },
            error:async (jqXHR,txtdata,errorThrown)=>{
                let txtMessage = `Error occurred: ${txtdata}`,action ="errors",Commanders = ()=>resolve();
                await PopupInfor(txtMessage,action,Swal,Commanders)
            }
        })
    })
}

const PopupInfor = async (txtMessage, action, Swal, Commanders) => {
    return new Promise((resolve) => {
        msg_alert(txtMessage, action, Swal).then(() => {
            hidden_loading(Swal)
            if (typeof Commanders === "function") {
                Commanders()
            }
        })
        resolve()
    })
}