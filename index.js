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
//heap sort start

//heap sort end
var abort = false;
var needNewArray = false;
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
        unsortedArray.push({randomNumber,i});
        var divForGeneratedNumber = document.createElement( "div" );
        var calculatedHeight = calculateHeightForNumber(randomNumber,maxNumber);
        $(divForGeneratedNumber).css("height",calculatedHeight).css("width",singleNumberWidth+"px").attr("order",i).attr("id",randomNumber).addClass("numberDiv").addClass("number"+i);
        $(".numbers").append($(divForGeneratedNumber));
   }
   inc = parseInt(unsortedArray.length/2);
   needNewArray = false;
  
}

 async function mergeSort (unsortedArray) {
    await timer(0);
    // No need to sort the array if the array only has one element or empty
    if (unsortedArray.length <= 1) {
      return unsortedArray;
    }
    // In order to divide the array in half, we need to figure out the middle
    const middle = Math.floor(unsortedArray.length / 2);
  
    // This is where we will be dividing the array into left and right
    const left = unsortedArray.slice(0, middle);
    const right = unsortedArray.slice(middle);
  
    // Using recursion to combine the left and right
    return await merge(
      await mergeSort(left),await mergeSort(right)
    );
  }
// Merge the two arrays: left and right
async function merge (left, right) {
    let resultArray = [], leftIndex = 0, rightIndex = 0;
   
    // We will concatenate values into the resultArray in order
    while (leftIndex < left.length && rightIndex < right.length) {
      
        var rightIndexCount = left.length + rightIndex;
      if (left[leftIndex] != undefined && left[leftIndex].randomNumber < right[rightIndex].randomNumber) {
        var numberToPush = left[leftIndex].randomNumber;
        var indexToPush = left[leftIndex].i;
       
        resultArray.push({randomNumber:numberToPush,i:indexToPush});
        moveDivPosition(indexToPush,resultArray.length-1);

        await timer(0);
        leftIndex++; // move left array cursor
      } else {
        var numberToPush = right[rightIndex].randomNumber;
        var indexToPush = right[rightIndex].i;
        resultArray.push({randomNumber:numberToPush,i:indexToPush});
        moveDivPosition(indexToPush,resultArray.length-1);
        await timer(0);
        
        rightIndex++; // move right array cursor
      }
      
    }
    var checkIfEndedArray = resultArray
    .concat(left.slice(leftIndex))
    .concat(right.slice(rightIndex));
    
    if(checkIfEndedArray.length ==arraySize )
        setSortButtonVisibilities(false);
    // We need to concat here because there will be one element remaining
    // from either left OR the right
    return resultArray
            .concat(left.slice(leftIndex))
            .concat(right.slice(rightIndex));
  }
 
async function heapSort()
{
    for (i = inc-1; i >= 0; i--)
    {
        await heapify(unsortedArray.length,i);
        await timer(0);
    }
    for (var z = unsortedArray.length-1; z >= 0; z--)
    {
        j = unsortedArray[parseInt(z)];
        unsortedArray[parseInt(z)] = unsortedArray[0];
        unsortedArray[0] = j;
        await swapTwo(0,parseInt(z));
        await heapify(z, 0);
        await timer(0);        
    }
    setSortButtonVisibilities(false);
}
async function heapify(arraySize, i) {
    var largest = i;
    var left = 2*i + 1;
    var right = 2*i + 2;
    if (left < arraySize && unsortedArray[left] > unsortedArray[largest])
    largest = left;
    if (right < arraySize && unsortedArray[right] > unsortedArray[largest])
    largest = right;
    if (largest != i) {
       var swap = unsortedArray[i];
       unsortedArray[i] = unsortedArray[largest];
       unsortedArray[largest] = swap;
       console.log(i,"i");
       console.log(largest,"largest");
       swapTwo(parseInt(i),parseInt(largest));
       heapify(arraySize, largest);
       
    }
    
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
 }  
 async function moveDivPosition(indexToMove,positionToMove)
  {
    var divToMove = $("[order="+(parseInt(indexToMove))+"]");
    $(divToMove).insertBefore($(".numbers>div:eq("+positionToMove+")"));
    $(divToMove).animate({
        backgroundColor: 'red'
    }, 10, function() {
        $(divToMove).animate({
            backgroundColor:'blue'
        });
    });
  }
async function swapTwo(firstIndex,secondIndex)
{
    var nextNumberDiv = $("[order="+(parseInt(secondIndex))+"]");
    var currentNumberDiv = $("[order="+(parseInt(firstIndex))+"]");
    var currentNumber = $(currentNumberDiv).attr("id");
    var nextNumber = $(nextNumberDiv).attr("id");
    $(nextNumberDiv).attr("order",firstIndex);
   
    $(currentNumberDiv).attr("order",(parseInt(secondIndex)));
  
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