export const style = ()=>{
    customize()
}

const customize = ()=>{
    const readonly = ".readonly"
    $(readonly).on("cut",(e)=>{
        e.preventDefault()
    })
    $(readonly).on('paste',(e)=>{
        e.preventDefault()
    })
    $(readonly).onkeydown((e)=>{
        e.preventDefault()
    })
    $("input").attr("autocomplete","off")
    $("img").attr("lazy","loading")
    $(document).onkeyup("input[type=email]",()=>{
        let value_email = $(this).val().replace(/[^a-zA-Z0-9_.@]+/,"")
        $(this).val(value_email)
    })
    $(this).onkeyup(".name",()=>{
        let value_name = $(this).val().replace(/[^a-zA-Z ]/g,"")
        $(this).val(value_name)
    })
    $(this).onkeyup("input[type=tel]",()=>{
        let value_tel = $(this).val().replace(/[^0-9]+/,"")
        $(this).val(value_tel)
    })
    $(this).onkeyup(".nik",()=>{
        let value_nik = $(this).val().replace(/[^0-9]+/,"")
        $(this).val(value_nik)
    })
    $(document).onkeyup(".currency",()=>{
        let value_number = $(this).val().replace(/[^0-9]/g,"")
        const  res = format_currency(value_number)
        $(this).val(res)
    })
}

export const format_currency=(data)=>{
    const number = parseInt(data,10) || 0;
    return new Intl.NumberFormat("id", {
        style: "decimal", maximumFractionDigits: 0
    }).format(number)
}
