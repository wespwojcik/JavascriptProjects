function getr()
{
    console.log("hello");
    //this initializes our string so it can get passed from 
    //function to function, growing line by line into a full receipt
    var text1 = "<h3> you ordered:</h3>";
    var runningtotal = 0;
    var sizetotal = 0;
    var sizearray = document.getElementsByClassName("size");
    for (var i = 0; i < sizearray.length; i++)
    {
        if(sizearray[i].checked)
        {
            var selectedsize = sizearray[i].value;
            text1 = text1+selectedsize+"<br>";
        }
    }
    if (selectedsize === "Personal Pizza") {
       sizetotal = 6;
    } else if (selectedsize === "Small Pizza") {
        sizetotal = 8;
    } else if (selectedsize === "Medium Pizza") {
        sizetotal = 10;
    } else if(selectedsize === "Large Pizza") {
        sizetotal = 14;
    } else if(selectedsize === "Extra Large Pizza") {
        sizetotal = 16;
    }
    runningtotal = sizetotal;
    console.log(selectedsize + " = $" + sizetotal + ".00");
    console.log("size text1:" +text1);
    console.log("subtotal: $"+runningtotal+" .00");
    //these variables will get passed on to each function
    gettopping(runningtotal , text1);
};

function gettopping(runningtotal,text1) {
    var toppingtotal = 0;
    var selectedtopping = [];
    var toppingarray = document.getElementById("toppings");
    for (var j = 0; j < toppingarray; j++)
    {
        if (toppingarray[j].checked)
        {
            selectedtopping.push(toppingarray[i].value);
            console.log("selected topping item: ("+toppingarray[j].value+")");
        }
    }
    var toppingcount = selectedtopping.length;
    if (toppingcount > 1) {
        toppingtotal = (toppingcount - 1);
    } else {
        toppingtotal = 0;
    }
    runningtotal = (runningtotal + toppingtotal);
    console.log("total selecting topping items: " + toppingcount);
    console.log(toppingcount + " topping - 1 free topping = "+"$"+toppingtotal+".00");
    console.log("topping text1:" + text1);
    console.log("purchase total: "+"$"+runningtotal+".00");
    document.getElementById("showtext").innerHTML=text1;
    document.getElementById("totalprice").innerHTML = "</h3>Total: <strong>$" +
        runningtotal+".00"+"</strong></h3>"
};
