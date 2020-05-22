const express= require("express");
const app = express();
const grpc = require("grpc");
const proto_loader = require("@grpc/proto-loader")
const proto_def = proto_loader.loadSync("test.proto",{});
const grpc_obj = grpc.loadPackageDefinition(proto_def);
const test_package = grpc_obj.testPackage;

const amqp = require("amqplib");


//Initializing grpc client
const client = new test_package.Test("localhost:3000", 
grpc.credentials.createInsecure());


app.get("/",(req,res)=>{
	//Data to mssz queqe
	const data= { "mssz": "This is the mssz after grpc mssz has been sent" };


	//Calling the grpc server function
	client.getData(null, (err,response)=>{
		console.log(response,data);
		connect(data);
		res.json(response);
	})

});

	// client.getData(null, (err,response)=>{
	// 	console.log(response);
	// });


const connect =async data=>{
	try {
		const connection =await amqp.connect("amqp://3.19.232.111:5672");
		const channel = await connection.createChannel();
		const result = await channel.assertQueue("test");
		channel.sendToQueue("test", Buffer.from(JSON.stringify(data)));

	}
	catch (err){
        console.error(err)
    }
};





app.listen(5000,()=>{
	console.log("Service 1 is listening at 5000");
})
