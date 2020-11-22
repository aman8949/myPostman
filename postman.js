let addedParamsCount = 1;
// Hide the parameters box initially
let parametersBox = document.getElementById('parametersBox');
parametersBox.style.display = "none";
// console.log(parametersBox);
let responseBox = document.getElementById('responseBox');
responseBox.style.display = "none";
// If user clicks on JSON Box hide parameters box else hide JSON box;

let paramsRadio = document.getElementById('paramsRadio');
let jsonRadio = document.getElementById('jsonRadio');
let requestJsonBox = document.getElementById('requestJsonBox');

paramsRadio.addEventListener('click', () => {
    requestJsonBox.style.display = "none";
    parametersBox.style.display = "block";
});

jsonRadio.addEventListener('click', () => {
    parametersBox.style.display = "none";
    requestJsonBox.style.display = "block";
});

// If the user clicks on + button add more rows and if - remove rows
let addParams = document.getElementById('addParams');
addParams.addEventListener('click', () => {
    let params = document.getElementById('params');
    let html = "";
    html += `<div class="my-2 form-row">
    <label class="col-sm-2 col-form-label" for="parameterKey1">Parameter ${addedParamsCount + 1}</label>
    <input type="text" class="form-control col-md-4 mx-2" id="parameterKey${addedParamsCount + 1}" placeholder="Enter Key">
    <input type="text" class="form-control col-md-4 mx-2" id="parameterValue${addedParamsCount + 1}" placeholder="Enter Value">
    <button class="btn btn-primary deleteParam">-</button>
</div>`;
    addedParamsCount++;
    params.innerHTML += html;

    let elements=document.getElementsByClassName('deleteParam');
    Array.from(elements).forEach((element)=>{
        element.addEventListener('click',(e)=>{
            e.target.parentElement.remove();
        })
    });
});

// When submit button is clicked

let submit=document.getElementById('submit');
submit.addEventListener('click',()=>{
    // Show user to wait 
    responseBox.style.display="block";
    let responseText=document.getElementById('responseText');
    responseText.value="Fetching Response, Please wait...";

    let url=document.getElementById('url').value;
    let contentType=document.querySelector('input[name="contentType"]:checked').value;
    let requestType=document.querySelector('input[name="requestType"]:checked').value;
    let data={};
    if(contentType=='params')
    {
        for(let i=0;i<addedParamsCount;i++)
        {
            if(document.getElementById(`parameterKey${i+1}`)!=undefined)
            {   
                let key=document.getElementById(`parameterKey${i+1}`).value;
                let value=document.getElementById(`parameterValue${i+1}`).value;
                data[key]=value;
            }
        }
        data=JSON.stringify(data);
    }
    else
    {
        data=document.getElementById('requestJsonText').value;
    }

    if(requestType=="post")
    {
        let params={
            method:"POST",
            headers:{
            "Content-Type":"application/json"
            },
            body:data
        }
        fetch(url,params)
        .then((response)=>{
            return response.text();
        })
        .then((text)=>{
            responseText.value=text;
        });
    }
    else
    {
        let params={
            method:'GET'
        };
        // console.log(params)
        fetch(url,params).then((response)=>{
            return response.text();
        })
        .then((text)=>{
            responseText.value=text;
        });
    }
    // console.log(data);
    // console.log(url);
    // console.log(contentType);
    // console.log(requestType);
});