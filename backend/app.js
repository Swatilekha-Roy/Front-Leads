const { Client } = require("cassandra-driver");
var express=require("express");
var app=express();
var port = process.env.PORT || 3000;
app.use(express.static("public"));
var bodyParser=require("body-parser");
	app.use(bodyParser.urlencoded({extended:true}));
  app.use(bodyParser.json());
const connection = require('./db_connection')
const Uuid       = require('cassandra-driver').types.Uuid;
const TimeUuid   = require('cassandra-driver').types.TimeUuid;
const ASTRA_DB_ID="21441cfd-1cbc-4b21-8670-d61fd966cbf0";
const ASTRA_DB_REGION="asia-south1"
const ASTRA_DB_KEYSPACE="leads"
const ASTRA_DB_APPLICATION_TOKEN="AstraCS:ZSxyOEpTMnoIBHBEIInZBSfU:4074144a78e430aadcdb400ac96123cb837d1fcb83eb0143ac29d718a8de41b6"


// CORS HEADERS MIDDLEWARE
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token, x-refresh-token, _id");

  res.header(
      'Access-Control-Expose-Headers',
      'x-access-token, x-refresh-token'
  );

  next();
});

/*async function run() {
    const client = new Client({
      cloud: {
        secureConnectBundle: "\secure-connect-front-leads-app.zip",
      },
      keyspace: ASTRA_DB_KEYSPACE,
      credentials: {
        username: "ZSxyOEpTMnoIBHBEIInZBSfU",
        password: "I-yH3TeLB+cRLYZE,WjCT7u5-TS5bydArD+KNKwFh7kN-5K+2tjPsM3_rAf-Qn+yjy.1bSc7R1natkKk,vCtr3cfGN9.26YSFZhaQnpMK8XZlYd58K-jG2ESDLrmg7Ey",
      },
    });
  
    await client.connect();
  
    // Execute a query
    const rs = await client.execute("SELECT * FROM system.local");
    rs.rows.forEach(row => {
      console.log("Your are now connected to cluster '%s'", row.cluster_name);
  })
  
    await client.shutdown();
  }
  
  // Run the async function
   connection= run();
   */
  /*
  CREATE TABLE IF NOT EXISTS leads(
  id uuid PRIMARY KEY,
  is_verified text,
  author_name text,
  author_phone text,
  lead_phone text,
  lead_name text,
  lead_type text,
  lead_description text,
  city text,
  lead_address text,
  created timestamp
);
INSERT INTO leads(  id , is_verified ,  author_name , author_phone, lead_phone, lead_name , lead_type ,lead_description ,city ,lead_address , created ) VALUES (31047029-2175-43ce-9fdd-b3d568b19bb0, 'not_verified','Lorem Ipsum','9123456789', '9012345678','XYZ Hospital','oxygen', '100 oxygen cylinders availaible','mumbai','Ghodbunder road XYZ' ,'2019-01-10 09:48:31.020+0040') IF NOT EXISTS;
SELECT id, author_name, lead_name FROM leads.leads ;
*/
app.get("/",(req,res)=>{
const queryMetrics = 'select * from leads';
//retreiving all data  without any filters
// Get query
allLeads=[];
console.log("Hi");
const is_verified = 'verified,not_verified,unavailable';
const lead_type='oxygen,plasma_donor,oximeter,med,remdev';
const city='mumbai,del,chen,kol,bgl';
connection.client.execute(queryMetrics)
.then(function(result){
  console.log("Hi");
    result.rows.forEach(row => {
        console.log('Row has been found');
        allLeads.push(row);
    })
    console.log(allLeads);
    connection.client.shutdown();
    console.log("SUCCESS");
    res.send(allLeads);
})
.catch(function(error){
    console.log(error)
    connection.client.shutdown()
    console.log("FAILED")
});
});
//retrieving data with filters



app.get("/submit",(req,res)=>{
  //for inserting data into table lead
const id = TimeUuid.now();
const currentDate = new Date();
const timestamp = currentDate.getTime();
const insert     = 'INSERT INTO leads ( id , is_verified ,author_name ,author_phone ,lead_phone ,lead_name ,lead_type,lead_description ,city,lead_address ,created) VALUES (?,?,?,?,?,?,?,?,?,?,?);';
const params     = [id, 'not_verified' ,'Lorem Ipsum','9123456789', '9012345678','XYZ Hospital','oxygen', '100 oxygen cylinders availaible','mumbai','Ghodbunder road XYZ' ,timestamp];

connection.client.execute(insert, params)
.then(function (result){
	console.log("lead created : %s", id.toString())
    console.log("SUCCESS")
    connection.client.shutdown()
})
.catch(function (error){
     console.log(error)
     connection.client.shutdown()
});
})
app.listen(port, function() {
  console.log("Server started on port 3000.");
});
 


