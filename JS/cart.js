$(function() {

let storageArray = [];
let totalCost = new Number();
loadStorage();

function loadStorage() {
    let data = localStorage.getItem("array");
    if(data !=null) {
        storageArray = JSON.parse(data);
    }

    if(storageArray.length > 0) {
        for (let i = 0; i < storageArray.length; i++) {
            $("#tbodyTable").prepend(
                `
                <tr>
                    <td>
                        <div class = "row">
                        <div class ="col-1" 
                        </div>
                    </td>
                </tr>
                    

                `
            )
        }
    }
}




});