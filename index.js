$(document).ready(function () {

    let calc = $('.calculator');
    let calcDisplay = calc.find('.calculator__display');
    let calcKeys = calc.find('.calculator__key');
    let calcEqual = calc.find('.calculator__key--equal');
    let calcOperand = calc.find('.calculator__key-operand');
    let calcButton = calc.find('.calculator__button');
    let calcClear = calc.find('.calculator__clear');
    let calcPercent = calc.find('.calculator__percent');
    let calcSpace = calc.find('.calculator__backspace');

    calcKeys.each(function () {
        let current = $(this).attr('value');
        $(this).text(current);
    });

    calcButton.on('click', function () { 
        calcDisplay.val( calcDisplay.val() + $(this).attr('value') );
    });

    calcClear.on('click', function () {
        calcDisplay.val('');
    });

     calcPercent.on('click', function () {
        calcDisplay.val( calcDisplay.val() / 100 );
    });

    calcOperand.on('click', function () {
        calcDisplay.val( findResult( String( calcDisplay.val() ) ) + $(this).attr('value'));
    });

    calcEqual.on('click', function () {
        calcDisplay.val( findResult( String( calcDisplay.val() ) ) );
    });

    calcSpace.on('click', function () { 
        calcDisplay.val( calcDisplay.val().substring(0, calcDisplay.val().length-1) );
    });


    function findResult(value) {
		value = String(value);
			//console.log(value);
			//console.log(value.length);
            //console.log(value[value.length-1]);
        if((value[value.length-1] === "-") || (value[value.length-1] === "+") || (value[value.length-1] === "*") || (value[value.length-1] === "/")){ 
            value = value.substring(0, value.length-1);
        } 

        if( (value.indexOf("-") !== -1) && (value.indexOf("-") !== value.length-1) ) {
            let result = 0;
            index = value.indexOf("-");
            let numb1 = value.substr(0, index);
                //console.log(numb1);
            result = result + Number(numb1);
                //console.log(result);
            value = value.substr(index + 1);
                // console.log(value);
            result = result - Number(value);;
            //console.log(result, 'result');

            return result;
        }
        if((value.indexOf("+") !== -1) && (value.indexOf("+") !== value.length-1)) {
            
            let result =0;
            index = value.indexOf("+");
            let numb1 = value.substr(0, index);
            // console.log(numb1);
            result = result + Number(numb1);
            //console.log(result);
            value = value.substr(index + 1);
            // console.log(value);
            result = result + Number(value);
            //console.log(result, 'result');

            return result;
        }
        if((value.indexOf("*") !== -1) && (value.indexOf("*") !== value.length-1)) {
            
            let result =0;
            index = value.indexOf("*");
            let numb1 = value.substr(0, index);
            // console.log(numb1);
            result = result + Number(numb1);
            //console.log(result);
            value = value.substr(index + 1);
            // console.log(value);
            result = result * Number(value);;
            //console.log(result, 'result');

            return result;
        }
        if((value.indexOf("/") !== -1) && (value.indexOf("/") !== value.length-1)){
            
            let result =0;
            index = value.indexOf("/");
            let numb1 = value.substr(0, index);
            // console.log(numb1);
            result = result + Number(numb1);
            //console.log(result);
            value = value.substr(index + 1);
            // console.log(value);
            result = result / Number(value);
            //console.log(result, 'result');
         
            return result;
        }else{

            return value;
        }
    }

});