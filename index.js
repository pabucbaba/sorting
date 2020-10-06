var arraySize;
var unsortedArray = [];
//bubble sort
var outerIndex = 0;
var innerIndex = 0;
//bubble sort end
//shell sort
var inc;
var interval;
var i, j, inc, temp;
//shell sort end
var abort = false;
$(document).ready(function()
{
    createRandomIntArray(1000,500);
});
function createRandomIntArray(maxNumber,totalNumbers){
    $(".numbers").html("");
   arraySize =  totalNumbers;
   unsortedArray = [];
   var possibleWidth = $(window).width();
   var singleNumberWidth = (possibleWidth - (2.08 * arraySize)) / arraySize;
   for(var i=0;i<arraySize;i++)
   {
        var randomNumber = Math.floor(Math.random() * maxNumber);
        unsortedArray.push(randomNumber);
        var divForGeneratedNumber = document.createElement( "div" );
        var calculatedHeight = calculateHeightForNumber(randomNumber,maxNumber);
        $(divForGeneratedNumber).css("height",calculatedHeight).css("width",singleNumberWidth+"px").attr("order",i).attr("id",randomNumber).addClass("numberDiv").addClass("number"+i);
        $(".numbers").append($(divForGeneratedNumber));
   }
   inc = parseInt(unsortedArray.length/2);
}

 async function shellSort()
 {
    while (inc >= 1 && !abort)
    {
        for (i = 0; i < arraySize; i++)
            {
                j = i;
                temp = unsortedArray[i];
                while ((j >= inc) && (unsortedArray[j - inc] > temp) && !abort)
                {
                    
                    swapTwo(j,j-inc);
                    var a = unsortedArray[j];
                    unsortedArray[j] = unsortedArray[j - inc];
                    unsortedArray[j - inc] = a;
                    
                    j = j - inc;
                }
                unsortedArray[j] = temp;
                await timer(0);
            }
            
            inc = parseInt(inc/2);
    }
    setSortButtonVisibilities(false);
    console.log(unsortedArray);
 }  
function swapTwo(firstIndex,secondIndex)
{
    var nextNumberDiv = $("[order="+(parseInt(secondIndex))+"]");
    var currentNumberDiv = $("[order="+(parseInt(firstIndex))+"]");
    var currentNumber = $(currentNumberDiv).attr("id");
    var nextNumber = $(nextNumberDiv).attr("id");
    $(nextNumberDiv).attr("order",firstIndex);
   
    $(currentNumberDiv).attr("order",(parseInt(secondIndex)));
    $(currentNumberDiv)
    var smallerNumberDivClone = nextNumberDiv.clone();
    var biggerNumberDivClone = currentNumberDiv.clone();
    nextNumberDiv.replaceWith(biggerNumberDivClone);
    $("[order="+(parseInt(secondIndex))+"]").animate({
        backgroundColor: 'red'
    }, 10, function() {
        $("[order="+(parseInt(secondIndex))+"]").animate({
            backgroundColor:'blue'
        });
    });
    currentNumberDiv.replaceWith(smallerNumberDivClone);
    $("[order="+(parseInt(firstIndex))+"]").animate({
        backgroundColor: 'red'
    }, 10, function() {
        $("[order="+(parseInt(firstIndex))+"]").animate({
            backgroundColor:'blue'
        });
    });
}
async function bubbleSort()
{
    for(outerIndex = 0;outerIndex<unsortedArray.length-1;outerIndex++)
    {
        for(innerIndex = 0;innerIndex<unsortedArray.length-outerIndex-1;innerIndex++)
        {
            if(abort)
                return;
            var nextNumberDiv = $("[order="+(parseInt(innerIndex)+1)+"]");
            var currentNumberDiv = $("[order="+(parseInt(innerIndex))+"]");
            var currentNumber = $(currentNumberDiv).attr("id");
            var nextNumber = $(nextNumberDiv).attr("id");
            if(parseInt(currentNumber)>parseInt(nextNumber) )
            {
                swapTwo(innerIndex,innerIndex+1);
            }
            await timer(0);
        }
    }
    setSortButtonVisibilities(false);
}
function timer(ms) { return new Promise(res => setTimeout(res, ms)); }
function calculateHeightForNumber(number,maximumNumber)
{
    var maxHeight = 300;
    var ratio = parseInt(number) / parseInt(maximumNumber);
    var calculatedHeight = maxHeight * ratio;
    return calculatedHeight + "px" ;
}