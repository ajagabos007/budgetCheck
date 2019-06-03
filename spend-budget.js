var budget_allocations =[
    {"description":"ICT Rebuilding","from":"FGN","to":"Minister of Works","amount":2321,"_type":"budget_allocation","timestamp":"12:2 pm"},
    {"description":"Road Constructin","from":"FGN","to":"FRSC","amount":2321,"_type":"budget_allocation","timestamp":"12:2 pm"},
    {"description":"Library","from":"Unijos","to":"Libarian","amount":100000,"_type":"budget_allocation","timestamp":"1:2 am"}
];
var budget_spendings = [];
var newBudget_spending=[];

function renderBudget_allocationsOption(){
    var budget_allocationOptionTemplate = $("#budget_allocationOptionTemplate").html();
    Mustache.parse(budget_allocationOptionTemplate);
    var rendered = Mustache.render(budget_allocationOptionTemplate,{budget_allocations})
    $("#budget_allocationSelect").html(rendered);
}

function renderBudget_spendingModal(){
    var Budget_spendingModalTemplate = $("#budget_spendingModalTemplate").html();
    Mustache.parse(Budget_spendingModalTemplate);
    var rendered = Mustache.render(Budget_spendingModalTemplate,{newBudget_spending})
    $("#newBudget_spendingModal").html(rendered);
}
var now = new Date();
var date = now.getDate()+"-"+(now.getMonth()+1)+"-"+now.getFullYear();
window.addEventListener('load',async()=>{
    renderBudget_allocationsOption();
});

$("form").submit( async function(e){
    e.preventDefault();
    const reason = $("#reason").val();
    const amount = $("#amount").val();
    const description = $("#description").val();
    const budget = $("#budget_allocationSelect").val();
    const _type = "budget_spending";
    const parentId = 1;
    const parentType = "budget_allocation";
    var time = now.getHours()+":"+now.getMinutes()+":"+now.getSeconds();
    const dateTime = date+ " "+ time;
    newBudget_spending.push({
        budget:budget,
        reason:reason,
        description:description,
        amount:amount,
        _type:_type,
        parentId :parentId,
        parentType : parentType,
        timestamp:dateTime
    });

    renderBudget_spendingModal();
    $("#btnModal").click();
    newBudget_spending = [];
});
