import React from 'react';
import { withRouter } from 'react-router-dom';
import { Button, TextField } from "@material-ui/core"

class LoginForm extends React.Component {
    constructor(props){
        super(props)
        this.form = {
            userID: React.createRef(),
            userPW: React.createRef(),
        }
        this.submit = this.submit.bind(this);
        this.cancle = this.cancle.bind(this);
    }

    async submit(){
        const data = {
            userID: this.form.userID.current.value,
            userPW: this.form.userPW.current.value,
        }
        const echo_result = await this.props.onSubmit(data);
        if (echo_result.err == "log in fail"){
            alert('ID 혹은 비밀번호가 틀렸습니다.');
        } else {
            var loginUser = {
                userLikePosts: echo_result.userLikePosts,
                userLikeAnswers: echo_result.userLikeAnswers,
                cate_lifeGrade: echo_result.cate_lifeGrade, cate_lifeScore: echo_result.cate_lifeScore,
                cate_loveGrade: echo_result.cate_loveGrade, cate_loveScore: echo_result.cate_loveScore,
                cate_jobGrade: echo_result.cate_jobGrade, cate_jobScore: echo_result.cate_jobScore,
                cate_studyGrade: echo_result.cate_studyGrade, cate_studyScore: echo_result.cate_studyScore,
                cate_healthGrade: echo_result.cate_healthGrade, cate_healthScore: echo_result.cate_healthScore,
                cate_cureGrade: echo_result.cate_cureGrade, cate_cureScore: echo_result.cate_cureScore,
                cate_friendGrade: echo_result.cate_friendGrade, cate_friendScore: echo_result.cate_friendScore,
                cate_issueGrade: echo_result.cate_issueGrade, cate_issueScore: echo_result.cate_issueScore,
                cate_musicGrade: echo_result.cate_musicGrade, cate_musicScore: echo_result.cate_musicScore,
                cate_gameGrade: echo_result.cate_gameGrade, cate_gameScore: echo_result.cate_gameScore,
                cate_newsGrade: echo_result.cate_newsGrade, cate_newsScore: echo_result.cate_newsGrade,
                cate_otherGrade: echo_result.cate_otherGrade, cate_otherScore: echo_result.cate_otherScore,
                _id: echo_result._id, userID: echo_result.userID, userPW: echo_result.userPW,
                nickName: echo_result.nickName, sex: echo_result.sex, dateOfBirth: echo_result.dateOfBirth
            };
            this.props.onLogin(1, loginUser);
            this.props.history.push("/");
        }
    }

    cancle(){
        this.props.history.push("/");
    }

    render(){
        return(
            <div className="form">
                <TextField required label="Required" inputRef={this.form.userID}
                    label="ID" margin="normal" variant="outlined" /> <br />
                <TextField required label="Required" inputRef={this.form.userPW}
                    label="비밀번호" margin="normal" variant="outlined" /> <br /> <br />
                <Button variant="contained" color="primary" size="large" onClick={this.submit}>로그인</Button>&nbsp;&nbsp;
                <Button variant="contained" color="secondary" size="large" onClick={this.cancle}>취소</Button>
            </div>
        );
    }
}

export default withRouter(LoginForm);