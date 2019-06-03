const contractSource ='';
const contractAddress='';
var client = null;
const totalBudget_allocations = 0;
const totalBudget_spendings = 0;
var budget_allocations =[
    {"index":1,"description":"ICT Rebuilding","from":"FGN","to":"Minister of Works","amount":2321,"_type":"budget_allocation","timestamp":"12:2 pm"},
    {"index":2,"description":"Road Constructin","from":"FGN","to":"FRSC","amount":2321,"_type":"budget_allocation","timestamp":"12:2 pm"},
    {"index":3,"description":"Library","from":"Unijos","to":"Libarian","amount":100000,"_type":"budget_allocation","timestamp":"1:2 am"}
];

var budget_spendings = [
    {"index":1,"budget":"ICT Rebuilding","reason":"Buying routers","description":"Buying of Equipment","amount":67382,"timestamp":"8:00 am"}
];
function renderBudget_allocations(){
    var budget_allocationTBodyTemplate = $("#budget_allocationTBodyTemplate").html();
    Mustache.parse(budget_allocationTBodyTemplate);
    var rendered = Mustache.render(budget_allocationTBodyTemplate,{budget_allocations})
    $("#budget_allocationTableBody").html(rendered);
}
function renderBudget_spendings(){
    var budget_spendingTBodyTemplate = $("#budget_spendingTBodyTemplate").html();
    Mustache.parse(budget_spendingTBodyTemplate);
    var rendered = Mustache.render(budget_spendingTBodyTemplate,{budget_spendings})
    $("#budget_spendingTBody").html(rendered);
}
async function callStatic (func, args){
    const contract = await client.getContractInstance(contractSource,{contractAddress});
    const calledResult = await contract.call(func, args, {amount: value}).catch(e => console.error(e));
    const decodedResult = await calledResult.decode().catch(e=>console.error(e));
    return decodedResult;
}
window.addEventListener('load',async()=>{
    $("#loading").show();
    /*
    client = await Ae.Aepp();
    totalBudget_allocations = await callStatic('getTotalBudget_allocations',[]);
    for(let index = 1; index<=totalBudget_allocations; i++){
        budget_allocation = await callStatic('getBudget_allocation',[index]);
        budget_allocations.push({
            index:index,
            description:budget_allocation.description,
            from:budget_allocation.from,
            to:budget_allocation.to,
            amount:budget_allocation.amount,
            _type :budget_allocation._type,
            timestamp:budget_allocation.timestamp
        });
    }

    totalBudget_spendings = await callStatic('getTotalBuudget_spendings',[]);
    for(let index = 1; index <= totalBudget_spendings; i++){
        budget_spending = await callStatic ('getBudget_allocation',[index]);
        budget_spendings.push({
            index:index,
            budget:budget,
            reason:reason,
            description:description,
            amount:amount,
            timestamp:timestamp
        });
    }
    */
   $("#totalBudget_allocations").html(totalBudget_allocations);
   $("#totalBudget_spendings").html(totalBudget_spendings);
    renderBudget_allocations();
    renderBudget_spendings();
    
    $("#loading").hide();
});

