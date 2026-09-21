const demoDB = {
  "91": { country:"India", code:"IN", region:"India", type:"Mobile", validLengths:"10 digits", tags:["Asia / India","+91","Mobile numbering"] },
  "44": { country:"United Kingdom", code:"GB", region:"United Kingdom", type:"Mobile", validLengths:"10 digits after +44", tags:["Europe / UK","+44","Mobile numbering"] },
  "1": { country:"United States / Canada", code:"US/CA", region:"North American Numbering Plan", type:"Mobile / geographic", validLengths:"10 digits", tags:["NANP","+1","Numbering plan"] },
  "971": { country:"United Arab Emirates", code:"AE", region:"United Arab Emirates", type:"Mobile", validLengths:"9 digits after +971", tags:["Middle East / UAE","+971","Mobile numbering"] },
  "61": { country:"Australia", code:"AU", region:"Australia", type:"Mobile", validLengths:"9 digits after +61", tags:["Oceania / Australia","+61","Mobile numbering"] }
};

const form = document.querySelector("#lookupForm");
const input = document.querySelector("#phoneInput");
const results = document.querySelector("#results");
const message = document.querySelector("#message");

function digitsOnly(value){ return value.replace(/\D/g,""); }

function getCallingCode(raw){
  const d = digitsOnly(raw);
  const candidates = Object.keys(demoDB).sort((a,b)=>b.length-a.length);
  return candidates.find(code => d.startsWith(code)) || null;
}

function formatInternational(raw, code){
  const d = digitsOnly(raw);
  if(!code) return "+" + d;
  const rest = d.slice(code.length);
  if(code === "91" && rest.length >= 10) return `+91 ${rest.slice(0,5)} ${rest.slice(5,10)}`;
  if(code === "44" && rest.length >= 10) return `+44 ${rest.slice(0,4)} ${rest.slice(4,10)}`;
  if(code === "1" && rest.length >= 10) return `+1 ${rest.slice(0,3)} ${rest.slice(3,6)} ${rest.slice(6,10)}`;
  if(code === "971") return `+971 ${rest.slice(0,2)} ${rest.slice(2,5)} ${rest.slice(5)}`;
  return "+" + code + " " + rest;
}

function analyze(raw){
  const digits = digitsOnly(raw);
  const code = getCallingCode(raw);
  if(!code) return {error:"This demo does not recognize that calling code. Try one of the examples below."};
  if(digits.length < 7) return {error:"Please enter a complete international number."};
  const meta = demoDB[code];
  const confidence = code === "1" ? "PATTERN MATCH" : "HIGH CONFIDENCE";
  return {digits, code, meta, formatted:formatInternational(raw,code), confidence};
}

function render(data){
  document.querySelector("#formattedNumber").textContent = data.formatted;
  document.querySelector("#resultSummary").textContent = `Public numbering metadata matched for ${data.meta.country}.`;
  document.querySelector("#confidence").textContent = data.confidence;
  document.querySelector("#country").textContent = data.meta.country;
  document.querySelector("#countryCode").textContent = `ISO / region code: ${data.meta.code}`;
  document.querySelector("#callingCode").textContent = "+" + data.code;
  document.querySelector("#numberType").textContent = data.meta.type;
  document.querySelector("#validity").textContent = "STRUCTURALLY VALID";
  document.querySelector("#digits").textContent = data.meta.validLengths;
  document.querySelector("#region").textContent = data.meta.region;
  document.querySelector("#locationText").textContent =
    "This is a numbering-plan region, not the live physical location of the phone or its owner.";
  document.querySelector("#mapLabel").textContent = data.meta.region;
  document.querySelector("#chips").innerHTML = data.meta.tags.map(x=>`<span>${x}</span>`).join("");
  results.classList.remove("hidden");
  results.scrollIntoView({behavior:"smooth",block:"start"});
}

form.addEventListener("submit",(e)=>{
  e.preventDefault();
  message.textContent="";
  const data=analyze(input.value);
  if(data.error){ results.classList.add("hidden"); message.textContent=data.error; return; }
  render(data);
});

document.querySelector("#clearBtn").addEventListener("click",()=>{
  input.value=""; message.textContent=""; input.focus(); results.classList.add("hidden");
});

document.querySelectorAll(".demo-number").forEach(btn=>{
  btn.addEventListener("click",()=>{
    input.value=btn.dataset.number;
    form.requestSubmit();
  });
});
