(function(){
  var b=document.querySelector('.burger'),n=document.getElementById('nav');
  if(b&&n)b.addEventListener('click',function(){var o=n.classList.toggle('open');b.setAttribute('aria-expanded',o?'true':'false');});
  function $(i){return document.getElementById(i);}
  function hm(t){var h=Math.floor(t/60)%24,m=((t%60)+60)%60;if(h<0)h+=24;var ap=h<12?'am':'pm',hh=h%12||12;return hh+':'+('0'+m).slice(-2)+' '+ap;}
  // 1. Roast planner: [name, min per kg, extra min, temp text, rest, done-temp]
  var RM={chicken:['Roast chicken',40,20,'200°C (400°F)',15,'74°C (165°F)'],beef:['Roast beef',50,0,'180°C (350°F)',20,null],pork:['Roast pork loin',60,0,'180°C (350°F)',15,'63°C (145°F)'],lamb:['Roast leg of lamb',50,0,'180°C (350°F)',20,null],turkey:['Roast turkey',40,0,'180°C (350°F)',35,'74°C (165°F)']};
  var DN={rare:[-10,'52°C (125°F) for rare; check safety guidance, which recommends 63°C (145°F) plus a rest'],med:[0,'63°C (145°F), then rest'],well:[15,'71°C (160°F)']};
  var rm=$('rp-m'),rw=$('rp-w'),rt=$('rp-t'),rd=$('rp-d');
  function roast(){if(!rm)return;var R=RM[rm.value],w=+rw.value,adj=(rm.value==='beef'||rm.value==='lamb')?DN[rd.value][0]*w:0,cook=Math.round(R[1]*w+R[2]+adj),rest=R[4];
    $('rp-w-o').textContent=w.toFixed(1)+' kg ('+(w*2.2).toFixed(1)+' lb)';
    var p=(rt.value||'13:00').split(':'),serve=(+p[0])*60+(+p[1]),out=serve-rest,inn=out-cook;
    var tgt=R[5]||DN[rd.value][1];
    $('rp-h').textContent=R[0]+', '+w.toFixed(1)+' kg';
    $('rp-s').innerHTML='<div><b>'+Math.floor(cook/60)+'h '+(cook%60)+'m</b><small>Cooking</small></div><div><b>'+rest+' min</b><small>Resting</small></div><div><b>'+R[3].split(' ')[0]+'</b><small>Oven</small></div>';
    var ev=[[inn-30,'Take the meat out of the fridge and heat the oven to '+R[3]+'.'],[inn,'Roast goes in the oven.'],[out-60,'Potatoes and root vegetables go in around the roast.'],[out,'Check it reaches '+tgt+', then lift out to rest under foil.'],[out+5,'Make the gravy with the pan juices and cook any green vegetables.'],[serve,'Carve and sit down to eat.']];
    ev.sort(function(a,b){return a[0]-b[0];});
    $('rp-l').innerHTML=ev.map(function(e){return '<li><b>'+hm(e[0])+'</b>'+e[1]+'</li>';}).join('');
    $('rp-n').innerHTML='<b>Remember:</b> times are a guide. A meat thermometer in the thickest part is the only sure way to know it&#8217;s done.'+(rm.value==='turkey'?' Never stuff a turkey you plan to cook from partly frozen; defrost fully in the fridge first.':'');}
  if(rm){[rm,rw,rt,rd].forEach(function(x){x.addEventListener('input',roast);x.addEventListener('change',roast);});roast();}
  // 2. Pan converter: area cm2, depth note, base time key
  var PA={r8:[314,'round'],r9:[415,'round'],s8:[400,'square'],s9:[529,'square'],r1:[759,'rect'],l9:[300,'loaf'],p9:[415,'pie'],m12:[12*28,'muffin']};
  var pa=$('pc-a'),pb=$('pc-b');
  function pan(){if(!pa)return;var A=PA[pa.value],B=PA[pb.value],x=B[0]/A[0];
    $('pc-x').textContent='×'+(Math.round(x*100)/100);
    $('pc-r').innerHTML='Your pan holds about <b>'+Math.round(x*100)+'%</b> of the recipe pan, so multiply each ingredient by '+(Math.round(x*100)/100)+'.';
    var eggs=Math.max(1,Math.round(2*x*2)/2);
    $('pc-s').innerHTML='<div><b>'+A[0]+' cm²</b><small>Recipe pan</small></div><div><b>'+B[0]+' cm²</b><small>Your pan</small></div><div><b>'+eggs+'</b><small>Eggs if recipe uses 2</small></div>';
    var t;if(B[1]==='muffin'&&A[1]!=='muffin')t='Muffin-sized portions bake much faster: start checking after about a third to half of the original time.';
    else if(A[1]==='muffin'&&B[1]!=='muffin')t='A single large bake takes much longer than muffins: expect roughly two to three times the time at a slightly lower temperature.';
    else if(B[1]==='loaf'&&A[1]!=='loaf')t='Loaf tins are deeper, so bake about 10–20°C (25°F) lower and for longer; test with a skewer.';
    else if(x>1.15)t='Your pan is bigger: if you don’t scale up, the bake will be thinner and need 5–10 minutes less. If you scale up, the depth stays similar and timing changes little.';
    else if(x<0.85)t='Your pan is smaller: if you don’t scale down, the bake will be deeper and need longer at the same temperature. Fill pans no more than two-thirds full.';
    else t='These pans are close in size, so you can usually use the recipe as written with the same time. Check a few minutes early.';
    $('pc-n').innerHTML='<b>Timing:</b> '+t;}
  if(pa){[pa,pb].forEach(function(x){x.addEventListener('change',pan);});pan();}
  // 3. Ingredient swaps
  var SW={buttermilk:['Buttermilk',[['Milk + lemon juice','Stir 1 tbsp lemon juice or white vinegar into 240 ml (1 cup) milk; stand 5 minutes.'],['Plain yogurt + milk','Thin 3 parts yogurt with 1 part milk.'],['Kefir','Use the same amount.']],'Swaps keep pancakes and scones tender; the flavour is very slightly milder.'],
    srf:['Self-raising flour',[['Plain flour + baking powder','Add 2 tsp baking powder to every 150 g (1 cup) plain flour and whisk well.']],'Sift or whisk thoroughly so the raising agent is evenly spread.'],
    egg:['Eggs (in baking)',[['Ground flaxseed','1 tbsp ground flax + 3 tbsp water per egg; rest 5 minutes.'],['Mashed banana','60 g (¼ cup) per egg; adds sweetness and banana flavour.'],['Plain yogurt','60 g (¼ cup) per egg; good in muffins and cakes.']],'Works best when a recipe uses one or two eggs; bakes may be a little denser.'],
    brown:['Brown sugar',[['White sugar + molasses','1 tbsp molasses or black treacle per 200 g (1 cup) white sugar.'],['White sugar','Use the same amount; bakes will be crisper and less caramel-like.']],'Brown sugar keeps cookies chewy, so expect a slightly different texture.'],
    cream:['Heavy (double) cream',[['Milk + butter','For cooking only: 180 ml milk + 60 g melted butter per 240 ml cream.'],['Evaporated milk','Use the same amount in sauces and soups.']],'These swaps won’t whip; use them in sauces, soups and bakes.'],
    butter:['Butter (in baking)',[['Vegetable oil','Use about 80% of the amount, e.g. 180 ml oil for 225 g butter.'],['Margarine or baking spread','Use the same amount.']],'Oil makes moist cakes but won’t cream for light sponges or crisp pastry.'],
    herbs:['Fresh herbs',[['Dried herbs','Use one-third of the amount: 1 tsp dried for 1 tbsp fresh.'],['Frozen herbs','Use the same amount in cooked dishes.']],'Add dried herbs early in cooking and fresh ones near the end.'],
    cornflour:['Cornflour (cornstarch)',[['Plain flour','Use twice the amount to thicken sauces; cook a few minutes longer.'],['Arrowroot','Use the same amount; add at the end and don’t boil hard.']],'Mix any thickener with a little cold liquid before adding to hot food.'],
    breadcrumbs:['Breadcrumbs',[['Crushed crackers','Use the same amount for coatings and toppings.'],['Rolled oats','Blitz briefly; good in meatballs and meatloaf.']],'Stale bread blitzed in a food processor makes the best crumbs; freeze extras.'],
    stock:['Stock',[['Stock cube or paste + water','Follow the pack for strength.'],['Water + seasoning','Add a splash of soy sauce, a bay leaf and extra vegetables for depth.']],'Taste before adding salt; cubes and pastes are often already salty.']};
  var si=$('sf-i');
  function swap(){if(!si)return;var S=SW[si.value];$('sf-h').textContent=S[0];
    $('sf-l').innerHTML=S[1].map(function(x){return '<li><b>'+x[0]+'</b><small>'+x[1]+'</small></li>';}).join('');
    $('sf-n').innerHTML='<b>Good to know:</b> '+S[2];}
  if(si){si.addEventListener('change',swap);swap();}
  // contact & cookies
  var cf=$('cform');
  if(cf)cf.addEventListener('submit',function(ev){ev.preventDefault();if(cf.website.value)return;if(!cf.checkValidity()){cf.reportValidity();return;}
    var body='Name: '+cf.name.value+'\nEmail: '+cf.email.value+'\nTopic: '+cf.topic.value+'\n\n'+cf.message.value;
    window.location.href='mailto:'+cf.dataset.to+'?subject='+encodeURIComponent('Website enquiry: '+cf.topic.value)+'&body='+encodeURIComponent(body);
    var s=$('fm');s.hidden=false;s.textContent='Your email app should now open with your message ready to send. If it doesn’t, please email us directly at '+cf.dataset.to+'.';});
  var c=$('cookie'),v=null;try{v=localStorage.getItem('hsm_cookie');}catch(e){}
  if(c&&!v)c.classList.add('show');
  document.querySelectorAll('[data-cookie]').forEach(function(x){x.addEventListener('click',function(){try{localStorage.setItem('hsm_cookie',x.dataset.cookie);}catch(e){}c.classList.remove('show');});});
  var y=$('year');if(y)y.textContent=new Date().getFullYear();
})();
