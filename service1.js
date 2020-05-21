// const express= require("express");
// const app = express();
const grpc = require("grpc");
const proto_loader = require("@grpc/proto-loader")
const proto_def = proto_loader.loadSync("test.proto",{});
const grpc_obj = grpc.loadPackageDefinition(proto_def);
const test_package = grpc_obj.testPackage;


//Initializing grpc client
const client = new test_package.Test("localhost:3000", 
grpc.credentials.createInsecure());


// app.get("/",(req,res)=>{
// 	//Calling the grpc server function
// 	// client.getData(null, (err,response)=>{
// 	// 	console.log(response);
// 	// 	res.json(response);
// 	// })

// });

	client.getData(null, (err,response)=>{
		console.log(response);
	})




// app.listen(5000,()=>{
// 	console.log("Service 1 is listening at 5000");
// })
