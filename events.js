function adjustArray(value)
{
    createRandomIntArray(1000,value)
}
$("#startSort").click(function(){
    if(needNewArray)
    {
        alert("Please create new array before attempting new sort operation.");
        return;
    }
   $("#stopSort").show();
    var selectedSort = $("#cbSortingAlgorithm").val();
    switch(selectedSort) {
        case "bubble":
            setSortButtonVisibilities(true);
            bubbleSort();
          break;
        case "shell":
            setSortButtonVisibilities(true);
            shellSort();
          break;
        case "heap":
            setSortButtonVisibilities(true);
            heapSort();
          break;
          case "merge":
            setSortButtonVisibilities(true);
            mergeSort(unsortedArrayDoubleDimension);
          break;
          case "quick":
            setSortButtonVisibilities(true);
            quickSort(0,unsortedArray.length - 1);
          break;
        default:
        {
            setSortButtonVisibilities(false);
            alert("please select sort method");
        }
      }
});
$("#stopSort").click(function(){
    abort = true;
    needNewArray = true;
    setSortButtonVisibilities(false);
});
function setSortButtonVisibilities(isSorting)
{
    if(isSorting)
    {
        abort = false;
        $("#stopSort").show();
        $("#startSort").hide();
    }
    else
    {
        $("#stopSort").hide();
        $("#startSort").show();
    }
}