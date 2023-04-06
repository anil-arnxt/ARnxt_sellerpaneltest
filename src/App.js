import React, { Component, useState } from 'react';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js'

//importing components
import {  Footer, Model_Approval, Add_tag } from './components'

import HomePage from './components/HomePage';
import Navbartest from './components/Navbartest';
import Footertest from './components/Footertest';
import Pricing from './components/Pricing';
import Blog from './components/Blog';
import Merchant_Register from './components/merchant_register.js';
import Merchant_Login from './components/merchant_login.js';
import User_Login from './components/user_login.js';
import User_Register from './components/user_register.js';
import Model from './components/models.js';
import Welcome_User from './components/welcome_user.js';
import Download from './components/download.js';
import Merchants from './components/merchants.js';
import Users from './components/users.js';
import Plans from './components/plans.js';
import User_Guide from './components/user_guide.js';
import Contact_Support from './components/contact_support.js';
import User_Details_Admin from './components/user_details_admin.js';
import Merchant_Details_Admin from './components/merchant_details_admin.js';
import User_Profile from './components/user_profile.js';
import Merchant_Profile from './components/merchant_profile.js';
import Project_Gallery from './components/project_gallery.js';
import Projects from './components/projects.js';
import Welcome_Admin from './components/welcome_admin.js';
import Transaction_History from './components/transaction_history.js';
import HiddenPlan from './components/hiddenplan';
import Merch_Guide from './components/merch_guide';
import Request_Demo from './components/requestDemo';
import { Login } from './Login';
import { Register } from './Register';
import Products from './Products'
import { getUser, getToken, setUserSession, resetUserSession } from './service/AuthService';
import { useEffect } from 'react';
import axios from 'axios';
import  PrivateRoute  from './routes/PrivateRoute';




import './App.css';





import { BrowserRouter as Router, Switch, Route, Redirect, withRouter } from 'react-router-dom';

// importing bootstrap files
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap"
import { Nav } from 'reactstrap';
import About from './components/About';
import ContactUs from './components/ContactUs';
import Privacypolicy from './components/Privacypolicy';
import TermsAndConditions from './components/TermsAndConditions';
import LoginNew from './components/LoginNew';
import Registernew from './components/Registernew';
import Productsnew from './components/Productsnew';
import ProductsHome from './components/ProductsHome';
import Blognew from './components/Blognew';
import ProductTest from './ProductTest';
import ContactUsnew from './ContactUsnew';
import Testpage from './Testpage';
import BlogSecond from './components/BlogSecond';
import BlogThird from './components/BlogThird';
import Career from './components/Career';
import Joinus from './components/Joinus';
import Opening from './components/Opening';
import JobDesc from './components/JobDesc';

  


const verifyUrl= 'https://4xuh6eqvr6.execute-api.ap-south-1.amazonaws.com/prod/verify'




class App extends Component {

 
  constructor() {
    super();
    this.state = {
      reload: null
    }
  }



  componentDidUpdate() {

 
    const token= getToken();
    if(token==='undefined'  || token === undefined || token === null || !token){
  
      return
    }
    const requestBody= {
      user: getUser(),
      token: token
    
  
    }
  
    axios.post(verifyUrl, requestBody).then(response=>{
      console.log(response)
  
      setUserSession(response.data.user, response.data.token)
    }).catch(()=>{
      
    
      
    })
      
  }

  




  render() {
    
    
   

    return (

      <div className="App">

       
        <Router>
        
        
    
       
       
       
      <Navbartest/>
       
      
       
       
       
       
      
          
        
        <Route path="/register" exact component={Register} />
        <Route path="/price" exact component={Pricing} />
        <Route path="/blog" exact component={Blog} />
        <Route path="/about" exact component={About} />
        <Route path="/contact" exact component={ContactUs} />
        <Route path="/privacypolicy" exact component={Privacypolicy} />
        <Route path="/terms&conditions" exact component={TermsAndConditions} />
        <Route path="/loginnew" exact component={LoginNew} />
        <Route path="/registernew" exact component={Registernew} />
        <Route path="/productsnew" exact component={Productsnew} />
        <Route path="/productshome" exact component={ProductsHome} />
        <Route path="/blognew" exact component={Blognew} />
        <Route path="/producttest" exact component={ProductTest}/>
        <Route path="/contactusnew" exact component={ContactUsnew}/>
        <Route path="/test" exact component={Testpage}/>
        <Route path="/blogsecond" exact component={BlogSecond}/>
        <Route path="/blogthird" exact component={BlogThird}/>
        <Route path="/career"  component={Career}  exact/>
       
        <Route path="/:id" component={JobDesc} />

      


        




        




      
        
        









        









     
          
          <Switch>
            <Route path="/models" exact component={Model} />
            <Route
              path="/download/:model"
              render={(props) => {
                return <Download model={props.match.params.model} />;
              }}
            />
          </Switch>
          <Route
            path="/merchant_register"
            exact
            component={Merchant_Register}
          />
            

          <Route
            path="/plans"
            exact
            render={() => {
              return (
                <Plans
                  rfunction={() => {
                    return this.setState({
                      reload: true,
                    });
                  }}
                />
              );
            }}
          />
          <Route
            path="/hiddenplan"
            exact
            render={() => {
              return (
                <HiddenPlan
                  rfunction={() => {
                    return this.setState({
                      reload: true,
                    });
                  }}
                />
              );
            }}
          />
          <Route path="/merchants" exact component={Merchants} />
          <Route
            path="/transaction_history"
            exact
            component={Transaction_History}
          />
          <Route path="/users" exact component={Users} />
          <Route path="/welcome_admin" exact component={Welcome_Admin} />
          <Route path="/user_guide" exact component={User_Guide} />
          <Route path="/merch_guide" exact component={Merch_Guide} />
          <Route path="/contact_support" exact component={Contact_Support} />
          <Route path="/requestDemo" exact component={Request_Demo} />
        


          <Route path="/welcome_user" exact component={Welcome_User} />
          <Route path="/approvemodels" exact component={Model_Approval} />
          <Route path="/addtag" exact component={Add_tag} />
          <Route
            path="/user/project/:project/:user"
            render={(props) => {
              return (
                <Project_Gallery
                  projectId={props.match.params.project}
                  userId={props.match.params.user}
                />
              );
            }}
          />
          <Route
            path="/admin/users/:id"
            render={(props) => {
              return <User_Details_Admin userId={props.match.params.id} />;
            }}
          />
          <Route
            path="/admin/merchants/:id"
            render={(props) => {
              return (
                <Merchant_Details_Admin merchantId={props.match.params.id} />
              );
            }}
          />
          <Route path="/user_profile" exact component={User_Profile} />
          <Route path="/merchant_profile" exact component={Merchant_Profile} />
          <Route path="/projects" exact component={Projects} />
          <Route
            path="/"
            exact
            render={() => {
              return (
                <HomePage
                  rfunction={() => {
                    return this.setState({
                      reload: true,
                    });
                  }}
                />
              );
            }}
          />
          <Route
            path="/merchant_login"
            exact
            render={() => {
              return (
                <Merchant_Login
                  rfunction={() => {
                    return this.setState({
                      reload: true,
                    });
                  }}
                />
              );
            }}
          />
          <Route
            path="/user_login"
            exact
            render={() => {
              return (
                <User_Login
                  rfunction={() => {
                    return this.setState({
                      reload: true,
                    });
                  }}
                />
              );
            }}
          />
          <Route
            path="/logout"
            exact
            render={() => {
              sessionStorage.removeItem("token");
              sessionStorage.removeItem("load");
              sessionStorage.removeItem("models");
              sessionStorage.setItem("logout", "You have logged out");
              return <Redirect to="/" />;
            }}
          />
            <Route
            path="/logoutuser"
            exact
            render={() => {
              sessionStorage.removeItem("token");
              sessionStorage.removeItem("user");
              return <Redirect to="/" />;
            }}
          />
           <div>
        <PrivateRoute  path='/products'  component={Products} />

           </div>
      
           <Footertest/>
        </Router>
          
      
      </div>
    );
  }
}

export default App;