module.exports = {

    // Login
    signIn(req, res) {
        
        let { email, password } = req.body;
        if(email && password){
            if(email==='admin@gmail.com' && password==='admin'){
                res.status(200).json({ msg: 'Ok' });
            }
            else{
                res.status(404).json({ msg: 'Incorrect Username and/or Password!' });
            }
        }
        else{
            res.status(404).json({ msg: 'Please enter Username and Password!' });
        }
    }
}