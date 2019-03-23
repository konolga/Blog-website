import React, { Component } from 'react';

class Signup extends Component {
    constructor(){
        super()
        this.state = {
            name: "",
            email: "",
            password: "",
            error: "", 
            open: false
        }
    };


    handleChange=(name)=> (event) =>{
        this.setState({error:""})
        this.setState({[name]:event.target.value})
    };

    clickSubmit=(event)=>{
        event.preventDefault();
        const {name, email, password} = this.state;
        const user ={
            name: name,
            email: email,
            password: password
        };
        this.signup(user)
        .then(data=>{
            if(data.error) this.setState({error: data.error})
            else this.setState({
                error: "",
                 name: "",
                  password: "",
                   email: "",
                   open: true
                })    
        })
    };


    signup = user => {
        return fetch("http://localhost:8080/signup",
        {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)       
         })
         .then(response=>{
             return response.json()
         })
         .catch(err=> console.log("errror" + err))
    }
    
    signupForm=(name, email, password)=>(
        <form>
        <div className="form-group">
            <label className="text-muted">Name</label>
            <input onChange = {this.handleChange("name")} type="text" value = {name} className="form-control"/>
        </div>

        <div className="form-group">
            <label className="text-muted">Email</label>
            <input onChange = {this.handleChange("email")} type="text" value = {email} className="form-control"/>
        </div>

        <div className="form-group">
            <label className="text-muted">Password</label>
            <input onChange = {this.handleChange("password")} type="password" value = {password} className="form-control"/>
        </div>

           <button onClick ={this.clickSubmit} className="btn btn-raised btn-primary">Submit</button>
       </form>
    )

    render() {
        const {name, email, password, error, open} = this.state;
        return (
           
            <div className="container">
                <h2 className = "mt-5 mb-5">signup</h2>
                <div className="alert alert-danger" 
                style={{display: error ? "": "none"}}>
                     {error}
                </div>

                <div className="alert alert-info" 
                style={{display: open ? "": "none"}}>
                     New account is successfully created. Please Sign In.
                </div>

               {this.signupForm(name, email, password)}
                
            </div>
        );
    }
}

export default Signup;