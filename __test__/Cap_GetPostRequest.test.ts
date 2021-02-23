const axios = require('../node_modules/axios');
const fs = require('fs');
var fastXmlParser = require('../node_modules/fast-xml-parser');
var jp = require('../node_modules/jsonpath');

//Create a new user
describe("GET and POST request", () => {
  try
  {
    
 
 beforeEach(function () {  
  console.log("Verify CAP Feed Source")
 });

 afterEach(function () {
  console.log("Cap Feed Source is verified")
});

//let payload = JSON.parse(fs.readFileSync('payload.txt', 'utf-8'))
  // test('Post the request', () => {
  //   return axios.post('api/mockfemacap',payload)
  //   .then( res => console.log(res) )
  // });
  

  test('Get the request', () => {
    return axios.get('mockfemacap')
          .then( res => 
            expect(res.data).toBeDefined())
           
  });
  
  test('Validate attribute values from the response', async() => {
    const resp =  await axios.get('mockfemacap');
        
    //default options, need not to set
    var options = {
      attributeNamePrefix : "@_",
      attrNodeName: false,
      textNodeName : "#text",
      ignoreAttributes : true,
      ignoreNameSpace : true,
      allowBooleanAttributes : false,
      parseNodeValue : true,
      parseAttributeValue : false,
      trimValues: true,
      cdataTagName: "__cdata", //default is 'false'
      cdataPositionChar: "\\c"
           }
  
if(fastXmlParser.validate(resp.data)=== true){//optional
var jsonObj = fastXmlParser.parse(resp.data,options);
}
//var jason = JSON.stringify(jsonObj);
var identifiers = jp.query(jsonObj, '$..identifier');
console.log(identifiers);

// verify first identifier
var firstID = jp.value(jsonObj, '$..identifier');
  console.log(firstID);

   //verify 4th sender name
   var sender = jp.apply(jsonObj, '$..code', function(value) {
       console.log(value);
       return value;
     });
   console.log(sender);
   });
  
 }
catch(err){
  console.log("Exception : ", err)
}
})