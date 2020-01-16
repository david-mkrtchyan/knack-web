var modal=function(){function o(e){return e.charAt(0).toUpperCase()+e.slice(1)}function c(e){var t=0<arguments.length&&void 0!==e?e:"Title";$("#modal-cm").remove();var n=document.createElement("div");n.setAttribute("id","modal-cm"),n.classList.add("modal-cm");var d=document.createElement("div");d.classList.add("modal-container-cm");var a=document.createElement("div");a.classList.add("modal-header-cm"),a.innerText=t||"Title";var o=document.createElement("div");o.classList.add("modal-content-cm");var c=document.createElement("span");c.classList.add("close-cm"),d.appendChild(c),d.appendChild(a),d.appendChild(o),n.appendChild(d),document.body.classList.add("overflow-hidden"),document.body.appendChild(n),closeModal=function(){n.parentElement.removeChild(n),document.body.classList.remove("overflow-hidden")},c.onclick=function(){return closeModal()},window.onclick=function(e){e.target===n&&(document.body.classList.remove("overflow-hidden"),n.parentElement.removeChild(n))}}return{jsUcfirst:o,initModal:c,formModal:function(e,t,n,o){c(n),e.forEach(function(t,e){var n=document.createElement("label");n.classList.add("radio-label");var d=document.createElement("input");d.setAttribute("type","radio"),d.setAttribute("name","radio"),e||d.setAttribute("checked","checked");var a=document.createElement("span");a.classList.add("checkmark"),n.innerText=t,n.appendChild(d),n.appendChild(a),n.onclick=function(e){setTimeout(function(){$(o).val(t),document.body.classList.remove("overflow-hidden"),$("#modal-cm").remove()},300)},$("#modal-cm .modal-content-cm").append(n)})},infoModal:function(e,t,n){if(c(t),n&&!e.length){var d=document.createElement("div");d.classList.add("info-row");var a=document.createElement("span");return a.innerText=n,d.appendChild(a),void $("#modal-cm .modal-content-cm").append(d)}e.forEach(function(e){var t=document.createElement("div");t.classList.add("info-row");var n=document.createElement("span"),d=document.createElement("span");n.innerText=o(e.displayName)+": ",d.innerText=e.value,t.appendChild(n),t.appendChild(d),$("#modal-cm .modal-content-cm").append(t)})}}}();
var utils=function(){function o(t){return console.log(t+" tbody tr"),console.log($(t+" tbody tr")),$(t+" tbody tr").hasClass("kn-tr-nodata")}return{getNum:function(t){return+$(t).val().replace(/[&\/\\#,+()$~%'":*?<>{}]/g,"")},onBlur:function(t,e){$(t).blur(function(){e($(this).val())})},formatDate:function(t){var e=new Date(t);return"".concat(e.getMonth()+1,"-").concat(e.getDate(),"-").concat(e.getFullYear())},specifyView:function(t,e){$(document).on("".concat("knack-view-render.",".").concat(t),e)},checkVersion:function(){$.ajax({url:"https://api.knack.com/v1/objects/object_31/records",type:"GET",headers:knackApiHeaders,success:function(t){Knack.getUserAttributes().values.field_362!==t.total_records?function(t,e){var n={field_362:e};$.ajax({url:"https://api.knack.com/v1/objects/object_4/records/"+t,type:"PUT",headers:window.knackApiHeaders,data:JSON.stringify(n),success:function(t){location.reload(!0)},error:function(t,e){console.log(e)}})}(Knack.getUserAttributes().id,t.total_records):console.log("is flase")},error:function(t,e){console.error(e)}})},hideTableIfEmpty:function(t){o(t)&&$(t).hide()},removeCharAndSpaces:function(t){return t.replace(/[`~!@#$%^&*()/ /_|+\-=?;:'",.<>\{\}\[\]\\\/]/g,"")},capitalizeFirstLetter:function(t){return t.charAt(0).toUpperCase()+t.slice(1)},disableInputDefaultAutoSuggest:function(){(0<arguments.length&&void 0!==arguments[0]?arguments[0]:[]).forEach(function(t){document.getElementById(t).setAttribute("autocomplete","off")})},showAlertOnClickIfTableIsEmpty:function(t,e,n){$(t).on("click",function(){if(o(e))return alert(n),!1})},showAlertOnClickIfTableIsNotEmpty:function(t,e,n){$(t).on("click",function(){if(!o(e))return alert(n),!1})}}}();
var map=function(){function s(e,t,n){$.getJSON("https://maps.googleapis.com/maps/api/geocode/json?latlng="+e+","+t+"&key=AIzaSyBn2wL7bwWCTcKR6Z-WVy3PRlWZIqKJLfg").success(function(e){n(e)})}return{getLatAndLngAddressInfo:s,getCityStateAddressInfo:function(e,t,n,o){$.getJSON("https://maps.googleapis.com/maps/api/geocode/json?address="+e+","+t+","+n+"&key=AIzaSyBn2wL7bwWCTcKR6Z-WVy3PRlWZIqKJLfg").success(function(e){(function(e){var o="",t=e.results[0].address_components;return $.each(t,function(e,n){var t=n.types;$.each(t,function(e,t){"postal_code"===t&&(o=n.short_name)})}),!!o})(e)?o(e):s(e.results[0].geometry.location.lat,e.results[0].geometry.location.lng,o)})},getZipCodeAddressInfo:function(e,t,n,o){$.getJSON("https://maps.googleapis.com/maps/api/geocode/json?address="+e+"&key=AIzaSyBn2wL7bwWCTcKR6Z-WVy3PRlWZIqKJLfg").success(function(e){"OK"===e.status&&t(e)}).error(function(e){alert("Can't search city and state right now, enter it manually if known.")})},getRegionByZipCode:function(e,t){$.ajax({url:"https://ajt-sandbox.herokuapp.com/inContact/zips?zip=".concat(e),type:"GET",dataType:"text",success:t,error:function(e){return console.log(e,"error on getting regions by ZIP code")},beforeSend:function(e){return e.setRequestHeader("Content-Type","application/json")}})}}}();
var cookies={createCookies:function(){$.cookie("sourceDatePreset",$("#sourceDatePreset").val()),$.cookie("sourceCodePreset",$("#sourceCodePreset").val().toUpperCase()),$.cookie("promoCodePreset",$("#promoCodePreset").val().toUpperCase()),$.cookie("marketerNamePreset",$("#marketerNamePreset").val())}};
var mask={formatEmail:function(t,e,n){var a=$(e).val();if($(t).val().length<5&&5<a.length){var r="+1"+n.removeCharAndSpaces(a)+"@hubspot.com";$(t).val(r)}},addSourceCodeMask:function(t){var e=t.value;e&&2<=e.length&&(e=e.split("-").join(""),t.value=e.substring(0,2)+"-"+e.substring(2,e.length))},setPhoneNumberMask:function(){function i(t){var e=t.keyCode;return!0===t.shiftKey||35===e||36===e||8===e||9===e||13===e||46===e||36<e&&e<41||(!0===t.ctrlKey||!0===t.metaKey)&&(65===e||67===e||86===e||88===e||90===e)}function n(t){(function(t){var e=t.keyCode;return 48<=e&&e<=57||96<=e&&e<=105})(t)||i(t)||t.preventDefault()}function a(t){if(!i(t)){var e=t.target.selectionStart,n=t.target,a=n.value.replace(/\D/g,"").substring(0,10),r=a.substring(0,3),u=a.substring(3,6),o=a.substring(6,10);if([2,3,4].includes(e))return!1;6<a.length?n.value="(".concat(r,") ").concat(u,"-").concat(o):3<a.length?n.value="(".concat(r,") ").concat(u):0<a.length&&(n.value="(".concat(r))}}(0<arguments.length&&void 0!==arguments[0]?arguments[0]:[]).forEach(function(t){var e=document.getElementById(t);e.addEventListener("keydown",n),e.addEventListener("keyup",a)})},initPhoneNumberConfigs:function(){(0<arguments.length&&void 0!==arguments[0]?arguments[0]:[]).forEach(function(t){var e=document.getElementById(t);e.setAttribute("maxlength",14),e.setAttribute("type","tel"),e.setAttribute("pattern","^d{3}-d{3}-d{4}$")})}};
var referral={init:function(e,n,i,r){!function(){var e="https://api.knack.com/v1/objects/object_25/records",n=[{field:"field_296",operator:"is",value:Knack.user.attributes.values.email.email}];e+="?filters="+encodeURIComponent(JSON.stringify(n)),setTimeout(function(){return Knack.showSpinner()}),$.ajax({url:e,dataType:"json",type:"GET",headers:window.knackApiHeaders,success:function(e){e.records[0].field_307_raw.length&&$("#kn-input-field_343").hide(),Knack.hideSpinner()},error:function(e,n){Knack.hideSpinner()}})}()}};
var leadsHelper=function(){function i(t,e,o){var n="",a="",c="",l=t.results[0].address_components;if(t.results[0].postcode_localities&&1<t.results[0].postcode_localities.length){o.formModal(t.results[0].postcode_localities,"radio","Please pick the correct city",e)}return $.each(l,function(e,l){var o=l.types;$.each(o,function(e,o){t.results[0].hasOwnProperty("postcode_localities")?n=t.results[0].postcode_localities:"locality"!==o&&"neighborhood"!==o||(n=[l.long_name]),"administrative_area_level_1"===o&&(a=l.short_name),"postal_code"===o&&(c=l.short_name)})}),[c,n,a]}return{onZipCodeBlur:function(e,t,n,a,c,l,o){o.onBlur(e,function(o){l.getRegionByZipCode(o,function(e){if("R"===e[0]&&e.length<=3)$("#field_507").val(e);else if($("#field_507").val(""),o){c.infoModal([],"Area Not Serviced","Sorry we do not service this Zip code")}}),console.log("+++++++++++++++++++++++++++++",o),console.log(5===o.replace(/ /g,"").length),console.log($(t).val().length<3),console.log("zipFieldId",e),console.log("cityFieldId",t),console.log("stateFieldId",n),console.log("availableCitiesId",a),console.log("availableCitiesId",a),console.log("++++++++++++++++++++++++++++++++++++++"),5===o.replace(/ /g,"").length&&$(t).val().length<3&&l.getZipCodeAddressInfo(o,function(e){var o=function(e,o,l){var t=i(e,o,l),n=t[1],a=t[2];return[n,a]}(e,t,c),l=o[0];console.log("000000000000000000000000",o),$(n).val(o[1]),$(t).val(l[0]),console.log("$(stateFieldId)",$(n)),console.log("$(cityFieldId)",$(t)),function(e,o,t){$(t).children("option").remove(),$.each(e,function(e,o){var l=$(document.createElement("option"));l.html(o),l.attr("value",o),0===e&&l.attr("selected","selected"),$(t).append(l)})}(l,0,a)})})},getAddressInfo:i,onPhoneNumberBlur:function(){(0<arguments.length&&void 0!==arguments[0]?arguments[0]:[]).forEach(function(e){document.getElementById(e).onblur=function(e){e.target.value&&function(l){var e=l.replace(/\s/g,"");$.ajax({url:"https://knack-node-v1.herokuapp.com/api/v1/twilio/check-phone-number/".concat(e),type:"GET",headers:{},success:function(e){console.log("valid phone number - ",l)},error:function(e,o){0===e.readyState&&401!==e.status&&modal.infoModal([],"Invalid Phone Number","Phone Number That You Entered -  ".concat(l," is Invalid"))}})}(e.target.value)}})}}}();
var leads=function(){var o,l,r,c,d,u,s,f,m,p,_;function v(e,i){var n=0,t=document.getElementById(e);t&&(t.oninput=function(t){clearTimeout(n),n=setTimeout(function(){var e="https://api.knack.com/v1/objects/object_9/records",n={rules:[{field:"field_82",operator:"is",value:t.target.value}]};e+="?filters="+encodeURIComponent(JSON.stringify(n)),$.ajax({url:"".concat(e),type:"GET",headers:knackApiHeaders,success:function(e){i.infoModal([],"Invalid Source Code","Source Code doesn't exist"),console.log(e,"the founded source code with provided code ")},error:function(e,n){console.log("Error getting source code by code",n)}})},300)})}function h(l,r){setTimeout(function(){var e=document.createElement("p");e.innerHTML="Name: "+l.field_1_raw.first+" "+l.field_1_raw.last;var n=document.createElement("p");n.innerHTML="Phone Number: "+l.field_25_raw.formatted;var t=document.createElement("p");t.innerHTML="Email: "+l.field_26_raw.email;var i=document.createElement("p");i.innerHTML="Adress: "+l.field_73_raw;var a=document.createElement("p");a.innerHTML="City: "+l.field_75_raw;var o=document.createElement("p");o.innerHTML="State: "+l.field_76_raw,$("#"+r+" .kn-form-confirmation .success").append(e,n,t,i,a,o)})}function y(e,n){var t=document.getElementById("field_25");t&&(t.onpaste=function(){var e=this;setTimeout(function(){i.call(e,n)},0)}),$(e).on("keyup",function(e){(48<=e.which&&e.which<=57||96<=e.which&&e.which<=105)&&i.call(this,n)})}function i(a){if(this.value&&10===this.value.replace(/[^0-9]/g,"").length){var e=this.value.replace(/[- )(]/g,"");$.ajax({url:"https://ajt-sandbox.herokuapp.com/inContact/queryhubspot?phone=".concat(e),type:"GET",headers:{"Content-Type":"application/json"},success:function(e){if(initUserInfoModal=function(t,e){var i=[{key:"email",displayName:"Email",value:""},{key:"firstname",displayName:"First Name",value:""},{key:"lastname",displayName:"Last Name",value:""},{key:"addy",displayName:"City",value:""},{key:"staress",displayName:"Address",value:""},{key:"citte",displayName:"State",value:""},{key:"hs_opportunity_status",displayName:"Opportunity Status",value:""},{key:"appointment_date",displayName:"Appointment Date",value:"",isDate:!0}];i.forEach(function(e,n){t[e.key]?e.value=e.isDate?new Date(+t[e.key].value).toDateString():t[e.key].value:i.splice(n,1)}),a.infoModal(i,e)},e.length){var n=e[0].properties;n.appointment_date?initUserInfoModal(n,t(n,!0)):initUserInfoModal(n,t(n,!1))}},error:function(e,n){console.log("Error on checking phone number create",n)}})}}function t(e,n){return n?"This prospect already has a scheduled appointment for\n\t".concat(new Date(+e.appointment_date.value).toDateString()," at ").concat(e.appointment_time.value,".\n\tPlease let ").concat(e.firstname.value," know that we look forward to seeing them! \n\tPlease do not call this in as a Quickset!"):"This prospect already exists in our system, if they would like to set a Quickset, please call it in now using the phone number they provided."}function k(e){var n=$(e).val(),t=n.slice(n.indexOf("@")),i=-1!==t.indexOf("."),a=i?t.slice(t.indexOf(".")+1).toLowerCase():"";if(!("com"===a||"net"===a||"edu"===a||"org"===a)&&-1!==n.indexOf("@")){var o=t.includes(".")?"":".";"n"===a[0]&&(o+="net"),"e"===a[0]&&(o+="edu"),"o"===a[0]&&(o+="org"),"o"===a[0]&&"e"===a[0]&&"n"===a[0]||(o+="com");var l=i?n.substr(0,n.indexOf(".",n.indexOf("@"))+1)+o:n+o;$(e).val(l)}}function h(l,r){setTimeout(function(){var e=document.createElement("p");e.innerHTML="Name: "+l.field_1_raw.first+" "+l.field_1_raw.last;var n=document.createElement("p");n.innerHTML="Phone Number: "+l.field_25_raw.formatted;var t=document.createElement("p");t.innerHTML="Email: "+l.field_26_raw.email;var i=document.createElement("p");i.innerHTML="Adress: "+l.field_73_raw;var a=document.createElement("p");a.innerHTML="City: "+l.field_75_raw;var o=document.createElement("p");o.innerHTML="State: "+l.field_76_raw,$("#"+r+" .kn-form-confirmation .success").append(e,n,t,i,a,o)})}return{lead:(o="#field_26",l={},r={},c={},d={},{init:function(e,n,t,i,a){l=e,r=n,d=t,c=i,a.onZipCodeBlur("#field_79","#field_75","#view_152-field_76","#view_152-field_194",r,d,l),a.onPhoneNumberBlur(["field_25","field_77"],r),c.initPhoneNumberConfigs(["field_25","field_77"]),c.setPhoneNumberMask(["field_25","field_77"]),l.disableInputDefaultAutoSuggest(["first","last"]),l.checkVersion(),y("#field_25",r),v("field_588",r),$("#kn-input-field_507 label span").remove(),$("#field_507").hide(),$(o).on("blur",function(){4<$(o).val().length&&-1!==$(o).val().indexOf("@")&&k(o)})}}),quickSet:(u="#field_25",s="#field_26",f={},m={},p={},_={},{init:function(e,n,t,i,a){f=e,m=n,p=t,_=i,a.onZipCodeBlur("#field_79","#field_75","#view_103-field_76","#view_103-field_194",m,p,f),a.onPhoneNumberBlur(["field_25","field_77"],m),_.initPhoneNumberConfigs(["field_25","field_77"]),_.setPhoneNumberMask(["field_25","field_77"]),f.disableInputDefaultAutoSuggest(["first","last"]),f.checkVersion(),v("field_588",m),y("#field_25",m),$("#kn-input-field_507 label span").remove(),$("#field_507").hide(),$(s).on("blur",function(){4<$(s).val().length&&-1!==$(s).val().indexOf("@")&&k(s)}),$(".kn-button").on("click",function(){return _.formatEmail(s,u,f),$(u).val(f.removeCharAndSpaces($(u).val())),!0}),$(document).on("knack-record-create.view_103",function(e,n,t){h(t,"view_103"),$(document).off(e)})}}),createContact:function(e,n){n&&h(e,n),function(e){$.ajax({type:"POST",url:"https://ajt-sandbox.herokuapp.com/knack",headers:{"content-type":"application/json"},data:e,success:function(){console.log("hello")},failure:function(e){console.log(e)}})}(JSON.stringify(e))}}}();
var addLead=function(){var c={},o={},v={},f={},r={},s="#field_188",u="#field_186",d="#view_186-field_194",h="#view_186-field_187",_="#field_190",p="#view_186-field_107",C="#field_192",g="#view_186-field_38";function k(e){var t=new Date,a=(t.getMonth(),t.getFullYear());$(e).keyup(function(){2==$(this).val().length?$(this).val($(this).val()+"/"):5==$(this).val().length&&$(this).val($(this).val()+"/"+a)})}function m(e,t,a,i){var n=$.cookie("sourceCodePreset"),l=$.cookie("sourceDatePreset"),o=$.cookie("promoCodePreset"),r=$.cookie("marketerNamePreset");$("#sourceCodePreset").val(n),$("#sourceDatePreset").val(l),$("#promoCodePreset").val(o),$("#marketerNamePreset").val(r),$(e).val(n),$(t).val(l),$(a).val(o),null!=r&&function(e,t){e.replace("-","_");$(e+" option").each(function(){$(this).text().toLowerCase()==t.toLowerCase()&&($(this).attr("selected",!0).change(),$(this).prop("selected",!0).change(),$("#view_186_field_38_chzn a span").text($(this).text()))})}(i,r)}function w(e,t,a,i,n,l){$(".kn-button").on("click",function(){return function(e,t,a,i,n,l){o.formatEmail(a,i,v),$(i).val(v.removeCharAndSpaces($(i).val())),$(e).val(v.capitalizeFirstLetter($(e).val())),$(t).val(v.capitalizeFirstLetter($(t).val())),$(n).val($(n).val().toUpperCase()),$(l).val($(l).val().toUpperCase()),P(l)}(e,t,a,i,n,l),!0})}function P(e){var t=$(e).val().toUpperCase();5===t.length&&(t=[t.slice(0,2),"-",t.slice(2)].join("").toUpperCase()),$(e).val(t)}return{init:function(e,t,a,i,n,l){v=e,f=t,c=a,r=i,o=n,m(_,p,C,g),k(p),k("#view_186-field_151"),function(e,t){$(t).on("change",function(){$(e).val($(this).val())})}(u,d),function(e,t,a,i){$("#setPresetsBtn").on("click",function(){r.createCookies(),m(e,t,a,i)})}(_,p,C,g),function(a,t,i,n,l){var o="",r="",s="";v.onBlur(n,function(e){o=$(t).val(),r=$(i).val(),s=$(n).val(),2<r.length&&1<s.length&&c.getCityStateAddressInfo(o,r,s,function(e){var t=l.getAddressInfo(e,i,f)[0];$(a).val(t)})})}(s,"#field_185",u,h,l),l.onZipCodeBlur(s,u,h,d,f,c,v),function(e){$(e).on("blur",function(){P(e)})}(_),w("#first","#last","#field_26","#field_189",h,_)}}}();
var expense=function(){function o(e){var t="#field_226",n="#field_222",i=utils.getNum("#field_252"),l=e?void 0!==Knack.getUserAttributes()?Knack.getUserAttributes().values.field_247:.35:($("#kn-input-field_219").hide(),$("#kn-input-field_219").text().toLowerCase().includes("salgado")?.45:.35),a="No"==$("#field_267").val()?0:40*l,o=utils.getNum(t)-utils.getNum("#field_225"),r=40<o?+o*l-a+i:i;r=1e3<(r=r<0?0:r)?0:r,0<i||0<$(t).val().length?($(n).val(r.toFixed(2)),$(n).prop("disabled",!0)):$(n).prop("disabled",!1)}return{init:function(e,t,n,i,l){!function(i,l){var e="#field_225",t="#field_226",n="#field_222",a="#field_252";i||o(i),$(e).on("blur",function(){o(i)}),$(t).on("blur",function(){o(i)}),$(a).on("blur",function(){o(i)}),$(n).on("blur",function(){$(this).val($(this).val().replace(/[&\/\\#,+()$~%'":*?<>{}]/g,""))}),$("#kn-input-field_238 .select").on("change",function(){$(n).val(" "),$(e).val(0),$(t).val(0),$(a).val(0),$(n).prop("disabled",!1)}),$(".kn-form .kn-button").on("click",function(){var e=0!=$("#kn-input-field_227 .kn-asset-current").text().trim(" ").length,t="travel"==$("#connection-picker-chosen-field_238 .chzn-container a span").text().toLowerCase(),n=l.getNum(a);return t&&o(i),0<n&t&&!e?(alert("Please add a receipt for your toll"),!1):t||e?void 0:(alert("Please make sure you have selected the expense category and added a receipt if its a non mileage expenses"),!1)})}(l,e)}}}();