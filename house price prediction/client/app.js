function getBathValue(){
    var bathrooms =document.getElementsByName("bathrooms");
    for(var i in bathrooms){
        if(bathrooms[i].checked){
            return parseInt(i)+1;
        }
    }
    return -1;
}
function getBHKValue(){
    var bhk =document.getElementsByName("bhk");
    for(var i in bhk){
        if(bhk[i].checked){
            return parseInt(i)+1;
        }
    }
    return -1;
}
function getBalconyValue(){
    var balcony =document.getElementsByName("balcony");
    for(var i in balcony){
        if(balcony[i].checked){
            return parseInt(i)+1;
        }
    }
    return -1;
}
function onClickedEstimatedPrice(){
    console.log("estimated price button is clicked");
    var sqft = document.getElementById("sqft");
    // var location = document.getElementById("Loc");
    // var sqft=parseFloat($('input#sqft.area').val());
    console.log(sqft);
    var bhk=getBHKValue();
    var bathrooms=getBathValue();
     console.log(bhk);
    var balcony=getBalconyValue();
    var location=$('select#loc.location').val();;
    console.log(location);
    var estprice=document.getElementById('EstimatedPrice');
    var url="http://127.0.0.1:5000/predict_home_price";
    // var url="/api/predict_home_price";
    try{
    $.ajax({
        type:    "POST",
        ContentType:"",
        url:     "http://127.0.0.1:5000/predict_home_price",
        dataType:'json',
        data:    {
        total_sqft: parseFloat(sqft.value),
        bhk: bhk,
        bath: bathrooms,
        location: location,
        balcony:balcony
        },
       success: function(data,status){
            console.log(data.estimated_price);
            estprice.innerHTML="<h2>"+data.estimated_price.toString()+"Lakhs</h2>";
            console.log(status);
        } 
        });
            
    }
            catch(e){
                console.log("error")
            }
    // });
//     $.post(url,{
//         loaction:location.value,
//         // loaction:'1st Phase JP Nagar',
//         total_sqft:parseFloat(sqft.value),
//         // total_sqft:12123,
//         bhk:bhk,
//         bath:bathrooms,
//         balcony:balcony
// },

}

function onPageLoad(){
    console.log("document loaded");
    var url='http://127.0.0.1:5000/get_location_names';
    // var url="/api/get_location_names";
    $.get(url,function(data,status){
        console.log("get_location_names respone received");
        if(data){
            var locations=data.locations;
            var loc=document.getElementById('loc');
            $('#loc').empty();
            for(var i in locations){
                var opt=new Option(locations[i]);
                $('#loc').append(opt);
            }
        }
    });
}
window.onload=onPageLoad;