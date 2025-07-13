// console.log(" I ");

// setTimeout(() => {
//   console.log("eat");
// }, 2000);

// console.log(" Ice Cream ");

let stocks = {
  Fruits: ["strawberry", "grapes", "banana", "apple"],
  liquid: ["water", "ice"],
  holder: ["cone", "cup", "stick"],
  toppings: ["chocolate", "peanuts"],
};
let is_shop_open = true;

let order = (time, work) => {
  return new Promise((resolve, reject) => {
    if (is_shop_open) {
      setTimeout(() => {
        // work is 👇 getting done here
        resolve(work());

        // Setting 👇 time here for 1 work
      }, time);
    } else {
      reject(console.log("Our shop is closed"));
    }
  });
};

order(2000, () => console.log(`${stocks.Fruits[0]} was selected`))

.then(() => {
  return order(1000, () => console.log("production has started"))
})
.then(()=>{
  return order(2000, ()=>console.log("Fruit has been chopped"))
})

// step 4
.then(()=>{
  return order(1000, ()=>console.log(`${stocks.liquid[0]} and ${stocks.liquid[1]} added`))
})

// step 5
.then(()=>{
  return order(1000, ()=>console.log("start the machine"))
})

// step 6
.then(()=>{
  return order(2000, ()=>console.log(`ice cream placed on ${stocks.holder[1]}`))
})

// step 7
.then(()=>{
  return order(3000, ()=>console.log(`${stocks.toppings[0]} as toppings`))
})

// Step 8
.then(()=>{
  return order(2000, ()=>console.log("Serve Ice Cream"))
})
.catch(()=>{
  console.log("Customer left")
})
.finally(()=>{
  console.log("end of day")
})


















// let order = (fruit_name, call_production) =>{
// // console.log("Order placed. Please call production")
// // function is being called
//    setTimeout(function(){

//     console.log(`${stocks.Fruits[fruit_name]} was selected`)

// // Order placed. Call production to start
//    call_production();
//   },2000)
// };

// let production = () =>{

//   setTimeout(()=>{
//     console.log("production has started")
//     setTimeout(()=>{
//       console.log("The fruit has been chopped")
//       setTimeout(()=>{
//         console.log(`${stocks.liquid[0]} and ${stocks.liquid[1]} Added`)
//         setTimeout(()=>{
//           console.log("start the machine")
//           setTimeout(()=>{
//             console.log(`Ice cream placed on ${stocks.holder[1]}`)
//             setTimeout(()=>{
//               console.log(`${stocks.toppings[0]} as toppings`)
//               setTimeout(()=>{
//                 console.log("serve Ice cream")
//               },2000)
//             },3000)
//           },2000)
//         },1000)
//       },1000)
//     },2000)
//   },1000)

// };

// // Function invocation
// order(0, production);
