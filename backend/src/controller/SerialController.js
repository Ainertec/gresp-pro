module.exports = {
  exit(req, res) {
  	const { password } = req.query;
  	if(password==52164521655455362){
  		process.exit(0);	
  	}else{
  		return res.json({"alert":"invalid acess!"});
  	}
  }
}