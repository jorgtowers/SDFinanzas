export const types =[
    {Text:'(-- Choose --)', Value:'choose' , Factor:0 , Color:"#03b12fff", Emoji:"💰",Listable:false, Icon:'🟢',Join:'-'}, 
    {Text:'Income', Value:'income' , Factor:1 , Color:"#03b12fff", Emoji:"💰",Listable:true, Icon:'🟢',Join:'Transactions'}, 
    {Text:'Expense', Value:'expense', Factor:-1 , Color:"#ca0303ff", Emoji:"💸",Listable:false, Icon:'🔴',Join:'Transactions'},
    {Text:'Credit', Value:'credit', Factor:1 , Color:"#b06eb1ff", Emoji:"🛒",Listable:true, Icon:'🟢',Join:'Credits'},
    {Text:'Debit', Value:'debit', Factor:-1 , Color:"#469ea6ff", Emoji:"💳",Listable:true, Icon:'🔴',Join:'Debits'},
    {Text:'Paid', Value:'paid', Factor:1 , Color:"#e9bab5ff", Emoji:"🛒",Listable:false, Icon:'🟢',Join:'Debits'},
    {Text:'Collected', Value:'collected', Factor:-1 , Color:"#bccfd0ff", Emoji:"🛒",Listable:false, Icon:'🔴',Join:'Credits'},
    {Text:'Budged', Value:'budged', Factor:1 , Color:"#618688ff", Emoji:"🗒️",Listable:false, Icon:'🟢',Join:'-'},
    {Text:'Balance', Value:'balance', Factor:1 , Color:"#3f7cccff", Emoji:"🧮",Listable:true, Icon:'🟢',Join:'-'}
];
export const categories =[
     {Text:'(-- Choose --)', Value:'choose', Emoji:'👨‍⚖️', Color:"black"},
    {Text:'Salary', Value:'salary', Emoji:'👨‍⚖️', Color:"black"},
    {Text:'Food', Value:'food', Emoji:'🍔', Color:"black"},
    {Text:'Groceries', Value:'groceries', Emoji:'🍨', Color:"black"},
    {Text:'Transport', Value:'transport', Emoji:'🚗', Color:"black"},
    {Text:'School', Value:'school', Emoji:'🏫', Color:"black"},
    {Text:'Entertainment', Value:'entertainment', Emoji:'🎮', Color:"black"},
      {Text:'Tecnology', Value:'tecnology', Emoji:'💻', Color:"black"},
       {Text:'Suscriptions', Value:'suscriptions', Emoji:'🎧', Color:"black"},
              {Text:'Home', Value:'home', Emoji:'🏠', Color:"black"},
    {Text:'Other', Value:'other', Emoji:'🕳️', Color:"black"}
];  