const grpc = require("grpc");
const proto_loader = require("@grpc/proto-loader")
const proto_def = proto_loader.loadSync("test.proto",{});
const grpc_obj = grpc.loadPackageDefinition(proto_def);
const test_package = grpc_obj.testPackage;

const amqp = require("amqplib");


//Server functions that will be called by the grpc clients
function getData(call,callback){
	const Data = {
		"datatxt":"GRPC is working fine"
	}
	callback(null, Data);
};




//Initializing grpc server
const server = new grpc.Server();
server.bind("0.0.0.0:3000", grpc.ServerCredentials.createInsecure());



//Proto service to server function mapping
server.addService(test_package.Test.service,
{
	"getData":getData
});


server.start();






//Mssz queue consumer
const connect = async ()=>{
	try {
		const connection =await amqp.connect("amqp://3.19.232.111:5672");
		const channel = await connection.createChannel();
		const result = await channel.assertQueue("test");
		

		channel.consume("test", mssz=>{
			const msszData= JSON.parse(mssz.content.toString());

			console.log(`Mssz recieved: ${msszData}`);
			channel.ack(mssz);
		})
		console.log("Waiting for messages...")
	}
	catch (err){
        console.error(err)
    }
}

connect();


