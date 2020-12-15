import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import CreatePost from './components/CreatePost';
import BoardView from './components/BoardView';
import SignupForm from './components/SignupForm';
import LoginForm from './components/LoginForm';
import request from './lib/request';
import { Link } from 'react-router-dom';
import { Button } from "@material-ui/core"
import './App.css';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loginStatus: 0,
      loginUser: {
        userLikePosts: [],
        userLikeAnswers: [],
        cate_lifeGrade: 1, cate_lifeScore: 0,
        cate_loveGrade: 1, cate_loveScore: 0,
        cate_jobGrade: 1, cate_jobScore: 0,
        cate_studyGrade: 1, cate_studyScore: 0,
        cate_healthGrade: 1, cate_healthScore: 0,
        cate_cureGrade: 1, cate_cureScore: 0,
        cate_friendGrade: 1, cate_friendScore: 0,
        cate_issueGrade: 1, cate_issueScore: 0,
        cate_musicGrade: 1, cate_musicScore: 0,
        cate_gameGrade: 1, cate_gameScore: 0,
        cate_newsGrade: 1, cate_newsScore: 0,
        cate_otherGrade: 1, cate_otherScore: 0,
        _id: "", userID: "", userPW: "",
        nickName: "", sex: "", dateOfBirth: ""
      }  
    };
  }

  login(){
    this.setState({loginStatus: 1});
  }

  render(){
    return (
      <Router>
        {/* <Header loginStatus={this.state.loginStatus} loginUser={this.state.loginUser}
          onLogout={function(loginStatus, loginUser){
            this.setState({loginStatus: loginStatus, loginUser: loginUser});
        }.bind(this)} /> */}
        {this.state.loginStatus===1&&<div className="Header">
            <div className="Header_top">
              <Link to="/">
                  <input type="button" class="logo"></input>
              </Link>
            </div>
            <br/ >
            <div className="Header_bottom">
              <Button variant="contained" color="primary" size="large" onClick={function(){
                  var nullUser = {
                      userLikePosts: [],
                      userLikeAnswers: [],
                      cate_lifeGrade: 1, cate_lifeScore: 0,
                      cate_loveGrade: 1, cate_loveScore: 0,
                      cate_jobGrade: 1, cate_jobScore: 0,
                      cate_studyGrade: 1, cate_studyScore: 0,
                      cate_healthGrade: 1, cate_healthScore: 0,
                      cate_cureGrade: 1, cate_cureScore: 0,
                      cate_friendGrade: 1, cate_friendScore: 0,
                      cate_issueGrade: 1, cate_issueScore: 0,
                      cate_musicGrade: 1, cate_musicScore: 0,
                      cate_gameGrade: 1, cate_gameScore: 0,
                      cate_newsGrade: 1, cate_newsScore: 0,
                      cate_otherGrade: 1, cate_otherScore: 0,
                      _id: "", userID: "", userPW: "",
                      nickName: "", sex: "", dateOfBirth: ""
                  };
                  this.setState({
                      loginStatus: 0,
                      loginUser: nullUser
                  });
              }.bind(this)}>로그아웃</Button>&nbsp;&nbsp;
              <span>{this.state.loginUser.nickName}님 반갑습니다</span>
            </div>
            <br/ >
          </div>}
        {this.state.loginStatus===0&&<div className="Header">
                    <div className="Header_top">
                        <Link to="/">
                            <input type="button" class="logo"></input>
                        </Link>
                    </div>
                    <br/ >
                    <div className="Header_bottom">
                        <Link to="/login">
                            <Button variant="contained" color="primary" size="large">로그인</Button>&nbsp;&nbsp;
                        </Link>
                        <Link to="/signup">
                            <Button variant="contained" color="primary" size="large">회원가입</Button>
                        </Link>
                    </div>
                    <br/ >
                </div>}

        <Switch>
          <Route exact path="/"
            component={() => <BoardView loginUser={this.state.loginUser} onGradeUp={function(loginUser){
              this.setState({loginUser: loginUser}) }.bind(this)} />}/>
          <Route exact path="/signup"
            component={() => <SignupForm onSubmit={request.userSignup} />}/>
          <Route exact path="/login"
            component={() => <LoginForm onSubmit={request.userLogin}
            onLogin={function(loginStatus, loginUser){
              this.setState({loginStatus: loginStatus, loginUser: loginUser});
            }.bind(this)} />}/>
          <Route exact path="/createPost" render={() => <CreatePost loginUser={this.state.loginUser}
            onGradeUp={function(loginUser){
              this.setState({loginUser: loginUser})
            }.bind(this)} />}/>
        </Switch>
      </Router>
    );
  }
}

export default App;
