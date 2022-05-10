const extractFormData = (form, fields) => {
    const formData = {};
    let inputValue;

    for (let field of fields){
        inputValue = form[field].value;
        formData[field] = inputValue;
    }

    const stats = ["intelligence",
    "strength", "speed", "durability", "power", "combat"]

    formData["total"] = 0;
    for (let parameter of stats){
        formData["total"] += parseInt(formData[parameter]);
    }

    return formData;
}

async function postData(url, data){
    const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',

        headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
        },

        body: JSON.stringify(data),
    });

    return response.json();
}

export {extractFormData, postData};