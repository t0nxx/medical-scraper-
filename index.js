const puppeteer = require('puppeteer');
const fs = require('fs');
let arr = [];
const t = async() => {
    let browser = await puppeteer.launch();
    let i = 1 ;
    while(i< 1000){
        let page = await browser.newPage() ;
        await page.goto(`https://dalilaldwaa.com/view-medicine/${i}` , {waitUntil :'networkidle2'});
        
        let test = await page.evaluate(()=> {
            let body = document.querySelector('table[class="table table-hover"] > tbody');
           // console.log(body);
            let data = body.getElementsByTagName('td') ;
            let name = data[0].innerText ;
            let sciName = data[1].innerText ;
            let price = data[2].innerText ;
            let manufacturers = data[3].innerText.trim() ;
        
         return {
             name  ,
             sciName ,
             price ,
             manufacturers
         } ;
        })
        
        let data = test;
        arr.push(data);
        i ++ ;
        await page.close();
        
        }
await browser.close();
console.log(arr.length);
cc(arr);
};
// repeat i = 1000 , 2000 ... so on till 13954


function cc (arrr){
        fs.writeFile('test.json', JSON.stringify(arrr), (err) => {  
            if (err) throw err;
            console.log('Data written to file');
        });
    }
t();
