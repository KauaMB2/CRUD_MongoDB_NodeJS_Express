var inputSearch=document.getElementById("searchInput")
var firstNameInput=document.getElementById("firstName")
var surnameInput=document.getElementById("surname")
var emailInput=document.getElementById("emailInput")
var passwordInput=document.getElementById("password")
var createButton=document.getElementById("CREATE")
var readButton=document.getElementById("READ")
var updateButton=document.getElementById("UPDATE")
var deleteButton=document.getElementById("DELETE")
var mainContainer=document.getElementsByClassName("content")[0]

const loadEvents=()=>{
    createButton.addEventListener("click",postMethod)
    readButton.addEventListener("click",getMethod)
    updateButton.addEventListener("click",updateMethod)
    deleteButton.addEventListener("click",deleteMethod)
}
const sendRequest=async (url,method,data)=>{
    try{
        const response=await fetch(url,{
            method:method,//Configura o método da requisição
            headers: {
                'Content-Type': 'application/json'//Configura a requisição para enviar e receber JSON
            },
            body: JSON.stringify(data)//Converte JSON para texto
        })
        const result=await response.json()
        return result
    }catch(error){
        swal({title: "ERRO",
            text: "Ops! Ocorreu um erro desconhecido.\n"+error,
            icon: "error",
            button: "OKEY!!!",
            dangerMode: true,
        })
    }
}

// GET request
const getMethod=async ()=>{
    var url=`http://localhost:8080/users/`
    if((inputSearch.value).length==24){
        url=url+inputSearch.value
    }else{
        swal({title: "ERRO",
            text: "Ops! Parece que você não digitou corretamente o ID.\nO Id do MongoDB tem, necessariamente, 24 caracteres.",
            icon: "error",
            button: "OKEY!!!",
            dangerMode: true,
        })
        return
    }
    const method = 'GET'
    const result = await sendRequest(url, method)
    swal({title: `Name: ${result.firstName} ${result.lastName}`,
        text: `Id: ${result._id}\nEmail: ${result.email}\nPassword: ${result.password}`,
        icon: "success",
        button: "OKEY!!!",
    })
}

// POST request
const postMethod=async ()=>{
    if((firstNameInput.value=="")||(surnameInput.value=="")||(emailInput.value=="")||(passwordInput.value=="")||((passwordInput.value).length<7)){
        swal({
          title: "WARNING",
          text: "Por favor, preencha todas as informações corretamente!\nObs: O campo de senha só aceita senhas com 7 dígitos ou mais!",
          icon: "warning",
          button: "OKEY!!!",
          dangerMode: true,
        })
        return
    }
    const url='http://localhost:8080/users/'
    const method='POST'
    const data={
        "firstName": firstNameInput.value,
        "lastName": surnameInput.value,
        "email": emailInput.value,
        "password": passwordInput.value
    }
    const result=await sendRequest(url, method, data)
    location.reload()
}

// PATCH request
const updateMethod=async ()=>{
    if((firstNameInput.value=="")||(surnameInput.value=="")||(emailInput.value=="")||(passwordInput.value=="")||((passwordInput.value).length<7)){
        swal({
          title: "WARNING",
          text: "Por favor, preencha todas as informações corretamente!\nObs: O campo de senha só aceita senhas com 7 dígitos ou mais!",
          icon: "warning",
          button: "OKEY!!!",
          dangerMode: true,
        })
        return
    }
    const radiobuttons = document.querySelectorAll('.radiobutton')
    var url = `http://localhost:8080/users/`
    const method = 'PATCH'
    const data={
        "firstName": firstNameInput.value,
        "lastName": surnameInput.value,
        "email": emailInput.value,
        "password": passwordInput.value
    }
    const radiosChecked=await checkRadioButtons(url, method)
    if(radiosChecked!=null){
        url=url+radiosChecked
        const result = await sendRequest(url, method, data)
    }else{return}
    location.reload()
}

// DELETE request
const deleteMethod=async ()=>{
    var url = "http://localhost:8080/users/"
    const method = 'DELETE'
    const radiosChecked=await checkRadioButtons(url,method)
    if (radiosChecked!=null){
        url=url+radiosChecked
        const result = await sendRequest(url, method)
    }else{return}
    location.reload()
}
const checkRadioButtons=async (url,method)=>{
    const radiobuttons = document.querySelectorAll('.radiobutton')
    var radiosChecked=null
    for(var i=0;i<radiobuttons.length;i++){// Iterando sobre todos os elementos radiobutton
      if (radiobuttons[i].checked) {// Verificando se o radiobutton está selecionado
        radiosChecked=radiobuttons[i].id
      }
    }
    if (radiosChecked==null){
        swal({title: "WARNING",
            text: "Por favor, usando os radiobuttons, selecione um dos registro.",
            icon: "warning",
            button: "OKEY!!!",
            dangerMode: true,
        })
        return
    }
    return radiosChecked
}
window.addEventListener("load",loadEvents)