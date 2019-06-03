const contractSource ='
contract BudgetCheck =
    record budget_allocation = {
        description:string,
        from:string,
        to:string,
        amount:int,
        _type:string,
        address:address,
        timestamp:string
        }
    record budget_spending = {
        reason:string,
        amount:int,
        description:string,
        _type: string,
        address:address,
        parentId:int,
        parentType:string,
        timestamp: string
        }   
    record state ={
        budget_allocations:map(int, budget_allocation),
        budget_spendings:map(int, budget_spending),
        totalbudget_allocations : int,
        totalbudget_spendings : int
        
        }
    function init()={
    budget_allocations = {},
    budget_spendings = {},
    totalbudget_allocations = 0,
    totalbudget_spendings = 0
    }
    
    public stateful function addBudget_allocation(description':string,from':string,to':string, _type':string, timestamp:string) =
        let budget_allocation = {
        description = description',
        from = from',
        to = to',
        _type = _type',
        amount =Call.value,
        address =Call.caller,
        timestamp = timestamp
        }
        let index = getTotalBudget_allocations() + 1
        put (state { budget_allocations [index] = budget_allocation, totalbudget_allocations = index})

    public stateful function addBudget_spending(reason':string, description':string, parentId':int, parentType':string, _type':string, timestamp':string) =
        let budget_spending = {
        reason = reason',
        description = description',
        parentId = parentId',
        parentType = parentType',
        _type =parentType',
        amount = 0,
        address =Call.caller,
        timestamp = timestamp'
        }
        
        let index = getTotalBudget_spendings() + 1
        put (state {budget_spendings [index] = budget_spending, totalbudget_spendings = index})

    public function allocateFunds(senderId:int, senderType:string, recieverId:int, recieverType:string) =
        let amount' = Call.value
        if(senderType=="budget_allocation" && amount' < getBudget_allocation(senderId).amount)
        let budget_allocation = getBudget_allocation(senderId)
        let budget_spending = getBudget_spending(recieverId)
        
        Chain.spend(budget_spending.address, amount')
        
        let updatedbudget_allocation_amount = budget_allocation.amount - amount'
        let updatedbudget_spending_amount = budget_spending.amount + amount'
        let updatedbudget_allocation = state.budget_allocations{ [senderId].amount = updatedbudget_allocation_amount}  
        let updatedbudget_spending = state.budget_spendings{ [recieverId].amount = updatedbudget_spending_amount}  
        
        put (state { budget_allocations = updatedbudget_allocation, budget_spendings = updatedbudget_spending})
        
        /* 
        elif(senderType=="buget_spending" && amount' < getbudget_spending(senderId).amount)
        let senderbudget_spending = getBudget_spending(senderId)
        let recieverbudget_spending = getBudget_spending(recieverId)
        
        Chain.spend(recieverbudget_spending.address, amount')
        
        let updatedSenderbudget_spending_amount = senderbudget_spending.amount - amount'
        let updatedRecieverbudget_spending_amount = recieverbudget_spending.amount + amount'
        let updatedSenderbudget_spending = state.budget_spendings{ [senderId].amount = updatedSenderbudget_spending_amount}  
        let updatedRecieverbudget_spending = state.budget_spendings{ [recieverId].amount = updatedRecieverbudget_spending_amount}  
        
        put (state { budget_spendings = updatedSenderbudget_spending, budget_spendings = updatedRecieverbudget_spending})
        else
        abort("Funds allocation failed")

        */
    public function getBudget_allocation(index:int):budget_allocation =
    switch(Map.lookup(index,state.budget_allocations))
        None => abort("There is no budget allocation registered with the index")
        Some(x) => state.budget_allocations[index]
        
    public function getBudget_spending(index:int):budget_spending =
    switch(Map.lookup(index,state.budget_spendings))
        None => abort("There is no sub-budget spending registered with the index")
        Some(x) => state.budget_spendings[index]
        
    public function getTotalBudget_allocations():int = state.totalbudget_allocations
    public function getTotalBudget_spendings():int = state.totalbudget_spendings

';

const contractAddress='ct_5odc1aYhofMAQ3LvS9qFCsoEqpSUoLqHZdQjgTuEbtzGw4wUK';
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
    
   $("#totalBudget_allocations").html(totalBudget_allocations);
   $("#totalBudget_spendings").html(totalBudget_spendings);
    renderBudget_allocations();
    renderBudget_spendings();
    
    $("#loading").hide();
});

