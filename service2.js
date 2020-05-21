const grpc = require("grpc");
const proto_loader = require("@grpc/proto-loader")
const proto_def = proto_loader.loadSync("test.proto",{});
const grpc_obj = grpc.loadPackageDefinition(proto_def);
const test_package = grpc_obj.testPackage;

//Initializing grpc server
const server = new grpc.Server();
server.bind("0.0.0.0:3000", grpc.ServerCredentials.createInsecure());


//Proto service to server function mapping
server.addService(test_package.Test.service,
{
	"getData":getData
});



server.start();



//Server functions that will be called by the grpc clients
function getData(call,callback){
	const Data = {
		"data_txt":"GRPC is working fine"
	}
	callback(null, Data);
}