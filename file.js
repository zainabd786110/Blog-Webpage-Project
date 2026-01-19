const fs=require('fs');
// for reading files
// fs.readFile('./docs/blog1.txt',(err,data)=>{
//  if(err){
//     console.log(err);
//  }
//  console.log(data.toString());

// });
// fs.readFile('./docs/blog1.txt',(err,data)=>{
//    if(err){
//       console.log(err);

//    }console.log(data.toString());
// });
// writing files
// fs.writeFile('./docs/blog1.txt','Incididunt incididunt ad pariatur adipisicing deserunt id deserunt laborum consectetur est minim minim commodo. Qui ullamco labore quis deserunt nulla cillum eiusmod dolor',()=>{
//    console.log("hello zainab");
// });
// fs.writeFile('./docs/blog2.txt','hello again',()=>{
// });
// fs.writeFile('./docs/blog3.txt','hello again zainab',()=>{
// });
if (!fs.existsSync('./assets')) {
    fs.mkdir('./assets', (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("folder created");
        }
    });
} else {
    fs.rm('./assets', { recursive: true, force: true }, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("folder deleted");
        }
    });
}