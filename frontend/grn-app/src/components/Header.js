import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@material-ui/core"

class Header extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            loginStatus: this.props.loginStatus,
            loginUser: this.props.loginUser
        };
    }
    
    render() {
        if (this.state.loginStatus){
            return (
                <div className="Header">
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
                            this.props.onLogout(0, nullUser);
                        }.bind(this)}>로그아웃</Button>&nbsp;&nbsp;
                        <span>{this.state.loginUser.nickName}</span>
                    </div>
                    <br/ >
                </div>
            );
        } else {
            return (
                <div className="Header">
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
                </div>
            );
        }
    }
}

export default Header;