var states=["Alabama","Alaska","American Samoa","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","District Of Columbia","Federated States Of Micronesia","Florida","Georgia","Guam","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Marshall Islands","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Carolina","North Dakota","Northern Mariana Islands","Ohio","Oklahoma","Oregon","Palau","Pennsylvania","Puerto Rico","Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont","Virgin Islands","Virginia","Washington","West Virginia","Wisconsin","Wyoming"],monthName=["January","February","March","April","May","June","July","August","September","October","November","December"],label="",inventoryproducts=["COBROKE","LOCALEXPERT"],billingMap=new Map([["Monthly","monthly"],["Annual","yearly"],["Bi-Annual","6 months"],["Quanterly","4 months"]]),productNameMap=new Map([["COBROKE","Connections<sup>SM</sup> Plus"],["LOCALEXPERT","Local Expert<sup>SM</sup>"],["TOPCRM","Top Producer\xAE CRM"],["ADVANTAGE","Advantage<sup>SM</sup> Pro"],["TOPMRKSNP","Market Snapshot\xAE Reports"],["TOPWEB","Top Producer\xAE Websites"],["FIVESTREET","FiveStreet"]]),productDescriptionMap=new Map([["COBROKE","A lead generation and conversion system to connect agents with serious buyers."],["LOCALEXPERT","Position yourself as the local expert with targeted branded ads."],["TOPCRM","Easily manage your sales pipeline from initial contact to closing and beyond."],["ADVANTAGE","Elevate your brand presence and get all leads delivered directly to your inbox."],["TOPMRKSNP","Real-time real estate market reports to help you stay top-of-mind."],["TOPWEB","Help your brand shine online with a beautiful, mobile-responsive real estate website."],["FIVESTREET","Simple features help you close deals."]]),productLinkMap=new Map([["COBROKE","https://marketing.realtor.com/connections-plus"],["LOCALEXPERT","https://marketing.realtor.com/local-expert"],["TOPCRM","https://marketing.realtor.com/generate-repeat-referral-business"],["ADVANTAGE","https://marketing.realtor.com/advantage-pro"],["TOPMRKSNP"," https://marketing.realtor.com/market-snapshot"],["TOPWEB"," https://marketing.realtor.com/top-producer-websites"],["FIVESTREET","https://www.fivestreet.com/"]]),lEProductType=new Map([["SOV30","30% Share of Market"],["SOV20","20% Share of Market"],["SOV50","50% Share of Market"]]),totalCountMap={},currentCountMap=new Map,invProductMarketMap=new Map,nonInvProductMap=new Map,marketPaginationLimit=5;function displayAlert(a,b,c){$(".alertdiv").html("<div class=\"alert alert-dismissable alert-fixed alert-"+a+"\" role=\"alert\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><i class=\"pi pi-ios-close-empty\"></i></button><span class=\"mar-right-md\">"+b+"</span>"+c+"</div>"),setTimeout(function(){$(".alertdiv").html("")},5e3)}function removeAlert(){$(".alertdiv").html("")}var showSpinner=function(a){(void 0===a||"string"==typeof a)&&(a={container:void 0===a?"body":a}),a.timeout=a.timeout||330,a.handler=null,a.container="string"==typeof a.container?$(a.container):a.container,a.css=a.css||"",a.size=a.size||"large",a.content=a.content||"";var b="";"small"===a.size?b="-sm":"large"===a.size&&(b="-lg"),a.container.is("body")||(a.css+=" pos-absolute");var c=["<div class=\"load-spinner-wrapper ",a.css,"\"><div class=\"pos-absolute absolute-centering\"><div class=\"load-spinner",b," mar-top-none mar-bottom-none\"></div>"+a.content+"</div></div>"].join("");return 0<a.timeout?a.handler=window.setTimeout(function(){a.container.append(c),a.container.addClass("noscroll")},a.timeout):(a.container.append(c),a.container.addClass("noscroll")),_args=a,a},hideSpinner=function(a){a=a||_args,a?(null!==a.handler&&(window.clearTimeout(a.handler),a.handler=null),a.container="string"==typeof a.container?$(a.container):a.container,a.container.find(".load-spinner-wrapper").remove(),a.container.removeClass("noscroll")):console&&console.error("Parameters not specified for closing spinner")};function formatMoney(a){try{decimalCount=2,decimal=".",thousands=",",decimalCount=Math.abs(decimalCount),decimalCount=isNaN(decimalCount)?2:decimalCount;const b=0>a?"-":"";let c=parseInt(a=Math.abs(+a||0).toFixed(decimalCount)).toString(),d=3<c.length?c.length%3:0;return b+(d?c.substr(0,d)+thousands:"")+c.substr(d).replace(/(\d{3})(?=\d)/g,"$1"+thousands)+(decimalCount?decimal+Math.abs(a-c).toFixed(decimalCount).slice(2):"")}catch(b){return console.log(b),a}}function populateDateRangeFilter(){$("#date-range-filter").empty();var a=new Date;for(a.setFullYear(a.getFullYear()-1),$("#date-range-filter").append("<option selected='selected' value='Last 12 Months'>Last 12 Months</option>");2017<=a.getFullYear();)$("#date-range-filter").append("<option value="+a.getFullYear()+">"+a.getFullYear()+"</option>"),a.setFullYear(a.getFullYear()-1)}function emptyStatementList(){$(".statement-list").empty()}function statementRow(a,b){return 768>screen.width?"<strong><li class=\"list-group-item\"><a rel=\"external\" class=\"text-gray-darker\" data-ajax=\"false\" href=\""+label+"/SelfServiceStatementsInvoicesDetails?title="+b+"&"+a.split("?")[1]+"\">"+b+"<span class=\"pi pi-angle-right pull-right text-gray-base\"></span></a></li></strong>":"<li class=\"list-group-item\"><a href=\""+a+"\" data-actualurl=\"\" class=\"btn btn-link no-padding\" target=\"_blank\" data-omtag=\"statements_view\">"+b+"</a><a href=\""+a+"\" class=\"btn pull-right-md text-gray no-padding\" target=\"_blank\" data-omtag=\"statements_download\" download=\"\"> Download as PDF </a></li>"}function getLinkToStatement(a,b){var c=$("#sfdc-account-id").data("sfdc-id");return label+"/accountstatement?endDate="+a+" 23:59:59&amp;id="+c+"&amp;startDate="+b+"-01 00:00:00"}function appendStatementRowToList(a,b,c){var d=getLinkToStatement(a,b);$(".statement-list").append(statementRow(d,c))}function getMonthlyList(a,b){var c=a+"-"+(b+1)+"-"+new Date(a,b+1,0).getDate(),d=monthName[b]+" "+a;appendStatementRowToList(c,a+"-"+(b+1),d)}function populateLast12MonthList(){var a=new Date;for(a.setMonth(a.getMonth()-1),emptyStatementList(),i=0;12>i;i++){var b=a.getFullYear()+"-"+(a.getMonth()+1)+"-"+new Date(a.getFullYear(),a.getMonth()+1,0).getDate(),c=a.getFullYear()+"-"+(a.getMonth()+1),d=monthName[a.getMonth()]+" "+a.getFullYear();appendStatementRowToList(b,c,d),a.setMonth(a.getMonth()-1)}}function populateYearlyMonthList(a){for(emptyStatementList(),populateYearlyList(a),i=0;12>i;i++)getMonthlyList(a,i)}function populate2017List(a){for(emptyStatementList(),populateYear2017List(),i=8;12>i;i++)getMonthlyList(a,i)}function populateYear2017List(){appendStatementRowToList("2017-12-31","2017-08-01","Year 2017")}function populateYearlyList(a){appendStatementRowToList(a+"-12-31",a+"-01-01","Year "+a)}function changeListView(){var a=$("#date-range-filter").val(),b=$("#date-range-filter").find("option:selected").text();"Last 12 Months"==a?populateLast12MonthList():"2017"==a?populate2017List(b):populateYearlyMonthList(b)}function initStatementsPage(a){label=a,populateLast12MonthList($("#sfdc-account-id").data("sfdc-id"))}function getCreditCardDetails(a){var b=$(".card-id").data("cardId");SelfServiceController.getCCDetailsById(b,function(b,c){if(c.status&&null!==b&&void 0!==b){var d=b.maskNumber.split("*").pop(),e=b.cardHolderName,f=b.expirationDate,g=b.cardType+" ending in "+d,h=b.CCAddress1?b.CCAddress1+"<br />":"",j=b.CCAddress2?b.CCAddress2+"<br />":"",k=b.CCCity?b.CCCity+",":"",l=b.CCState?b.CCState:"",m=b.CCZipCode?b.CCZipCode:"";if($(".panel-title").html(g),$(".zuoraPaymentMethodId").val(b.zPmId),$(".paymentMethodId").val(b.pmId),defaultPayment=100==b.splitPercent?"<h5 class=\"mar-bottom-xl default-payment display-inline-block\">Default card for payment</h5><span class=\"pi pi-check\"></span>":"",""!=h+j+k+l+m)var n="<h5 class=\"detail-fields\">Billing Address</h5><address>"+h+j+k+l+"<br />"+m+"<br />                                        </address>";else var n="";var o="<div>"+defaultPayment+"<h5 class=\"detail-fields\">Card Number</h5>                                <p class=\"mar-bottom-md display-inline-block\">**** **** **** "+d+"</p>                                <div class=\"card-img display-inline-block\">                                    <img id=\"credit-card-icon\" src="+a+">                                </div>                                <h5 class=\"detail-fields\">Name on Card</h5>                                <p class=\"mar-bottom-md\">"+e+"</p>                                <h5 class=\"detail-fields\">Expiry Date</h5>                                <p class=\"mar-bottom-md\">"+f+"</p>"+n+"</div>";$(".credit-card-details").append(o);$(".credit-card-actions").append("<button type=\"button\" class=\"btn btn-primary edit-card\" data-toggle=\"modal\" data-target=\"#enter-password-modal\">Edit</button>")}})}function isCardValid(){var a=!0;return(""==$("#input-creditCardExpirationMonth").val()||""==$("#input-creditCardExpirationYear").val())&&($("#error-creditCardExpirationMonth").html("This field is required."),a=!1),""==$("#input-creditCardHolderName").val()&&($("#error-creditCardHolderName").html("This field is required."),a=!1),""==$("#input-creditCardPostalCode").val()&&($("#error-creditCardPostalCode").html("This field is required."),a=!1),""==$("#input-creditCardCity").val()&&($("#error-creditCardCity").html("This field is required."),a=!1),""==$("#input-creditCardState").val()&&($("#error-creditCardState").html("This field is required."),a=!1),""==$("#input-creditCardAddress1").val()&&($("#error-creditCardAddress1").html("This field is required."),a=!1),a}function updateCreditCardDetails(a){var b=$(".paymentMethodId").val(),c=$(".zuoraPaymentMethodId").val(),d=$("#input-creditCardExpirationMonth").val()+"/"+$("#input-creditCardExpirationYear").val(),e=$("#input-creditCardHolderName").val(),f=$("#input-creditCardPostalCode").val(),g=$("#input-creditCardCity").val(),h=$("#input-creditCardState").val(),j=$("#input-creditCardAddress1").val(),k=$("#input-creditCardAddress2").val();SelfServiceController.updateCCDetails(a,b,c,d,e,f,g,h,"US",j,k,function(a){hideSpinner(),!0==a?displayAlert("success","Success","Your credit card has been updated"):displayAlert("danger","Error","Please try updating your credit card again.")})}function editCardDetails(){if(isCardValid()){showSpinner(),$(".updateCardDetails").attr("disabled","disabled");var a=$(".card-id").data("cardId");updateCreditCardDetails(a)}}function attachHandlersCCDetailPage(){$("#edit-credit-card-password").on("keyup",function(){""===$(this).val()||null===$(this).val()?$("#verify-password-btn").attr("disabled","disabled"):$("#verify-password-btn").removeAttr("disabled")}),$("#edit-credit-card-password").on("focusout",function(){$("#enter-password-modal .help-block").addClass("focus-visible")}),$("#edit-credit-card-password").on("focusin",function(){$("#enter-password-modal .help-block").removeClass("focus-visible")}),$("#verify-password-btn").on("click",function(){showSpinner();var a=$("#edit-credit-card-password").val();""!==a&&null!==a&&verifyPassword(a,"edit")})}function attachHandlersCCPage(){$("#add-credit-card-password").on("keyup",function(){""===$(this).val()||null===$(this).val()?$("#verify-password-btn").attr("disabled","disabled"):$("#verify-password-btn").removeAttr("disabled")}),$("#add-credit-card-password").on("focusout",function(){$("#enter-password-modal .help-block").addClass("focus-visible")}),$("#add-credit-card-password").on("focusin",function(){$("#enter-password-modal .help-block").removeClass("focus-visible")}),$("#verify-password-btn").on("click",function(){showSpinner();var a=$("#add-credit-card-password").val();""!==a&&null!==a&&verifyPassword(a,"add")})}function verifyPassword(a,b){SelfServiceController.verifyPassword($("#sfdc-account-id").data("advertiserId"),a,function(a,c){console.log(c);var d=!0;$("#"+b+"-credit-card-password").val(""),$("#verify-password-btn").attr("disabled","disabled");try{if(c.status&&null!==a&&void 0!==a){var e=JSON.parse(a);if(console.log(e),null!==e.data&&void 0!==e.data&&"true"===e.data.success)$("#enter-password-modal").modal("hide"),"edit"===b?openEditModal():"add"==b&&$("#add-card").modal("show"),d=!1,hideSpinner();else if(null!==e.RestFaultElement&&void 0!==e.RestFaultElement){var f=JSON.parse(e.RestFaultElement.detail);f.error_data.msg.includes("password you entered is incorrect")&&(d=!1,hideSpinner(),displayAlert("danger","Error","Sorry, please check your password. Try again, and if the problem persists, give us a call at (877) 309-3151."))}}}catch(a){console.log(a)}d&&(hideSpinner(),displayAlert("danger","Error","Sorry, something went wrong. Try again, and if the problem persists, give us a call at (877) 309-3151."))},{escape:!1})}function openEditModal(){$("#enter-password-modal").modal("hide"),$("#edit-card").modal("show");var a=$(".card-id").data("cardId");SelfServiceController.getCCDetailsById(a,function(a,b){if(b.status&&null!==a&&a!==void 0){$(".credit-card-number").text("**** **** **** "+a.maskNumber.split("*").pop()),$("#input-creditCardHolderName").val(a.cardHolderName),$("#input-creditCardAddress1").val(a.CCAddress1),$("#input-creditCardAddress2").val(a.CCAddress2),$("#input-creditCardCity").val(a.CCCity),$("#input-creditCardPostalCode").val(a.CCZipCode);for(var c=1;12>=c;c++)$("#input-creditCardExpirationMonth").append("<option value="+c+">"+c+"</option>");$("#input-creditCardExpirationMonth").val(a.expirationDate.split("/")[0]);for(var d=new Date().getFullYear(),c=d;c<=d+30;c++)$("#input-creditCardExpirationYear").append("<option value="+c+">"+c+"</option>");for($("#input-creditCardExpirationYear").val(a.expirationDate.split("/")[1]),c=0;c<states.length;c++)$("#input-creditCardState").append("<option value="+states[c]+">"+states[c]+"</option>");$("#input-creditCardState").val(a.CCState)}})}function customProcessCallback(a){var b=$jq.parseJSON(a);processCallback(a),console.log(b),b.success?callbackSuccess():callbackFailure(),processCallback&&processCallback(a)}function getAllProducts(a){SelfServiceController.getAllProducts(a,function(a,b){b.status&&null!==a&&typeof a!==void 0?generateProductSummary(JSON.parse(a)):console.log(b)},{escape:!1,timeout:12e4})}function generateProductSummary(a){var b=$("#summary-template").html();Mustache.parse(b);var c=a["products-size"]+" products";1===a["products-size"]&&(c="1 product"),console.log(a);var d={products:[],"product-size":c,totalCost:"0",accountId:a["sfdc-account-id"]},e=a["product-summary"];console.log(e);var f=new Set,g=0;for(var h in e){f.add(h);var j=d.products,k=formatMoney(e[h]);g+=e[h],a["co-marketing-contribution"]!=null&&0!=a["co-marketing-contribution"]&&"COBROKE"==h?j.push({name:productNameMap.get(h),productCode:h,price:k,comarDisplay:"",comarPrice:formatMoney(a["co-marketing-contribution"])}):j.push({name:productNameMap.get(h),price:k,comarDisplay:"none",productCode:h}),d.products=j}d.totalCost=formatMoney(g);var l=Mustache.render(b,d);$("#product-summary-div").html(l),totalCountMap=a["product-count"],generateProductDetails(a["all-products"],f,a["zip-city"])}function generateProductDetails(a,b,c){for(var d={allProducts:[]},e=0;e<a.length;e++){var f=a[e].Product_Code__c,g="";null!==c&&c!==void 0&&(g=c[a[e].Market__c]),getAssetDetails(a[e],g)}b.forEach(function(a){var b=d.allProducts,c={productName:productNameMap.get(a),productCode:a,description:productDescriptionMap.get(a),productLink:productLinkMap.get(a)};if(invProductMarketMap.has(a))c.hasInventory="",c.isNonInventory="none";else{c.hasInventory="none",c.isNonInventory="";var e=nonInvProductMap.get(a);c.nonInvProdDetails=e.marketDetail,c.nonInvBilling=e.billing+" | "+e.expiryData}b.push(c),d.allProducts=b});var h=$("#product-detail-template").html();Mustache.parse(h);var j=Mustache.render(h,d);$("#product-details-div").html(j);for(const[d,e]of invProductMarketMap.entries()){var k="enabled";currentCountMap.get(d).endCount===totalCountMap[d]&&(k="disabled");var l={markets:e,totalCount:totalCountMap[d],startCount:currentCountMap.get(d).startCount,endCount:currentCountMap.get(d).endCount,productCode:d,prevActiveStatus:"disabled",nextActiveStatus:k},m=$("#market-detail-template").html();Mustache.parse(m);var j=Mustache.render(m,l);$("#"+d+"-product-details").html(j)}finalActions()}function finalActions(){attachHadlersMyProducts();var a=$("#separately-billed-template").html();$("#product-details-div").append(a)}function getAssetDetails(a,b){var c=a.Product_Code__c;if(!currentCountMap.has(c))currentCountMap.set(c,{startCount:1,endCount:1});else{var d=currentCountMap.get(c);d.endCount+=1,currentCountMap.set(c,d)}var e="",f="";if("COBROKE"===c?(e=a.Quantity__c+" "+a.Lead_Type__c,"half"==a.Product_Type__c&&(e=e.concat(" half")),e=1==a.Quantity__c?e.concat(" slot"):e.concat(" slots"),""!==b&&null!==b&&void 0!==b&&(e=e.concat(" - "+b))):"LOCALEXPERT"===c?(e=e.concat(lEProductType.get(a.Product_Type__c)),""!==b&&null!==b&&void 0!==b&&(e=e.concat(" - "+b))):(e=a.Quantity__c.toString(),e=1==a.Quantity__c?e.concat(" license"):e.concat(" licenses")),null!==a.End_Date__c&&void 0!==a.End_Date__c){var g=new Date(a.End_Date__c),h=g.getMonth()+"/"+g.getDate()+"/"+g.getFullYear().toString().substr(-2);f=f.concat("Expires "+h)}var j=formatMoney(a.Extended_Net_Price__c),k="$ "+j+" ("+billingMap.get(a.Billing_Period__c)+")";if(!inventoryproducts.includes(c))nonInvProductMap.set(c,{marketDetail:e,billing:k,expiryData:f});else if(invProductMarketMap.has(c)){var l=invProductMarketMap.get(c);l.push({zipcode:a.Market__c,marketDetail:e,expiryData:f,billing:k}),invProductMarketMap.set(c,l)}else{var l=[{zipcode:a.Market__c,marketDetail:e,expiryData:f,billing:k}];invProductMarketMap.set(c,l)}console.log(invProductMarketMap)}function attachHadlersMyProducts(){$(".pagination .enabled .market-pagination-link").on("vclick",function(){var a=$(this).data("start-count"),b=$(this).data("end-count"),c=$(this).data("product-code"),d=parseInt(b);console.log("offset"+d),"previous-link"==$(this).data("pagination")&&(d=parseInt(a)-marketPaginationLimit-1),console.log(d+c),SelfServiceController.getInvGeoData($("#sfdc-account-id").data("sfdc-id"),d,marketPaginationLimit,c,function(a,b){if(b.status&&null!==a&&a!==void 0){console.log(b);var e=JSON.parse(a);invProductMarketMap.delete(c);for(var f,g=e["all-products"],h=0;h<g.length;h++)f="",null!==e["zip-city"]&&void 0!==e["zip-city"]&&(f=e["zip-city"][g[h].Market__c]),getAssetDetails(g[h],f);var j=d+1,k=d+g.length,l="enabled",m="enabled";1===j&&(m="disabled"),k===totalCountMap[c]&&(l="disabled");var n={markets:invProductMarketMap.get(c),totalCount:totalCountMap[c],startCount:j,endCount:k,productCode:c,prevActiveStatus:m,nextActiveStatus:l};console.log(invProductMarketMap);var o=$("#market-detail-template").html();Mustache.parse(o);var p=Mustache.render(o,n);$("#"+c+"-product-details").html(p),attachHadlersMyProducts()}},{escape:!1})}),$("#COBROKE-product-details").addClass("border-bottom-grey"),$("#COBROKE-product-details").parent().append("<div class=\"slots-help-text text-muted\"> <span class=\"pad-right-sm\">What are slots</span> <span id=\"tooltip-0\"><i class=\"pi pi-info-circle text-muted font-size-base\" data-toggle=\"tooltip\" data-container=\"body\" data-placement=\"bottom\" title=\"\" data-html = true ></i></span></div>"),$("[data-toggle=\"tooltip\"]").tooltip({title:"<div class='text-left'><strong style='font-size: 16px' >Slots</strong><br/><div style='font-weight: 300; '>A slot allows up to 40 buyer connections per year. <br/><div class='mar-top-sm'> Flex - Lead is sent to 1 agent per inquiry.</div> <div class='mar-top-sm'>Fast - Lead is sent to up to 2 agents per inquiry simultaneously.</div></div></div>"})}