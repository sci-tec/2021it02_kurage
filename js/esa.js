
let name_esa = "くらげ";
let counter_esa = 0;

export let esayari = ()=>{
    counter_esa++;
    console.log(`${counter_esa}個目のエサを${name_esa}にあげます`);
}

export function esayari2(){
    counter_esa++;
    console.log(`${counter_esa*2}個目のエサを${name_esa}様にあげます`);
}
