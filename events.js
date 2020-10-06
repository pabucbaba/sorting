function adjustArray(value)
{
    createRandomIntArray(1000,value)
}
$("#startSort").click(function(){
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
        default:
        {
            setSortButtonVisibilities(false);
            alert("please select sort method");
        }
      }
});
$("#stopSort").click(function(){
    abort = true;
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