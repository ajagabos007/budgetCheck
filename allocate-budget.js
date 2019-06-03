const contractSource ='';
const contractAddress='';
var client = null;
const totalBudget_allocations = 0;
const totalBudget_spendings = 0;

var newBudget_allocation =[];
function renderBudget_allocationsModalTemplate(){
    var Budget_allocationModalTemplate = $("#budget_allocationModalTemplate").html();
    Mustache.parse(Budget_allocationModalTemplate);
    var rendered = Mustache.render(Budget_allocationModalTemplate,{newBudget_allocation})
    $("#Budget_allocationModal").html(rendered);
}
$("form").submit( async function(e){
    e.preventDefault();
    const description = $("#description").val();
    const from = $("#from").val();
    const to = $("#to").val();
    const amount = $("#amount").val();
    const _type = "budget_allocation";
    var now = new Date();
    var date = now.getDate()+"-"+(now.getMonth()+1)+"-"+now.getFullYear();
    var time = now.getHours()+":"+now.getMinutes()+":"+now.getSeconds();
    const dateTime = date+ " "+ time;
   
    newBudget_allocation.push({
        index:1,
        description:description,
        from :from,
        to:to,
        amount:amount,
        _type:_type,
        timestamp:dateTime
    });

    renderBudget_allocationsModalTemplate();
    $("#btnModal").click();
    newBudget_allocation = [];
});
