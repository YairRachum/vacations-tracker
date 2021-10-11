
export async function validateInputs(userName:any, password:any) {
    let isValid = true;
    resetFieldsUI();
        
    if(isEmptyField(userName)) {
        showInputError("userName");
        isValid = false;
    }

    if(await isEmptyField(password)) {
        showInputError("password");
        isValid = false;
    }

    return isValid;
}

function showInputError(id:any) {
    let node = document.getElementById(id);
    node.style.border = "3px solid red";
    node.style.borderRadius = "10px";

}
// function showEditInputError(className:any) {
//     let node = document.getElementsByClassName(className);
//     node.style.border = "3px solid red";
//     node.style.borderRadius = "10px";

// }

function isEmptyField(field:any) {
    if (field === null || field === "") {
        return true;
    }
    return false;
}

function resetFieldsUI(){
    cleanErrorFromTitle("userName");
    cleanErrorFromTitle("password");
}

function resetFieldsUIFromRegister(){
    cleanErrorFromTitle("userNameRegister");
    cleanErrorFromTitle("passwordRegister");
    cleanErrorFromTitle("firstName");
    cleanErrorFromTitle("lastName");
}

function resetAddVacationFieldsUI(){
    cleanErrorFromTitle("destination");
    cleanErrorFromTitle("description");
    cleanErrorFromTitle("price");
}

function cleanErrorFromTitle(id:any) {
    let errorNode = document.getElementById(id);
    errorNode.style.border = "";
    errorNode.style.color = "black";
    errorNode.style.borderRadius = "";
}


export function validateRegisterInputs(firstName:any, userName:any, password:any, lastName:any) {
    let isValid = true;
    resetFieldsUIFromRegister();
        
    if(isEmptyField(userName)) {
        showInputError("userNameRegister");
        isValid = false;
    }

    if(isEmptyField(password)) {
        showInputError("passwordRegister");
        isValid = false;
    }

    if(isEmptyField(firstName)) {
        showInputError("firstName");
        isValid = false;
    }
    if(isEmptyField(lastName)) {
        showInputError("lastName");
        isValid = false;
    }
    
    return isValid;
    
}

export function validateAddVacationInputs(destination:any, description:any, price:any, image:any) {
    let isValid = true;
    resetAddVacationFieldsUI();
        
    if(isEmptyField(destination)) {
        showInputError("destination");
        isValid = false;
    }

    if(isEmptyField(description)) {
        showInputError("description");
        isValid = false;
    }

    if(isEmptyField(price)) {
        showInputError("price");
        isValid = false;
    }

    if(!isValid) {
        throw new Error()
    }
}

export function validateEditVacationInputs(destination:any, description:any, price:any) {
    let isValid = true;
    // resetEditVacationFieldsUI();

    if(isEmptyField(destination)) {
        showInputError("editDestination");
        isValid = false;
    }

    if(isEmptyField(description)) {
        showInputError("editDescription");
        isValid = false;
    }

    if(isEmptyField(price)) {
        showInputError("editPrice");
        isValid = false;
    }

    if(!isValid) {
        throw new Error()
    }
}