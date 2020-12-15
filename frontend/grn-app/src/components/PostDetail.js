import React from 'react';
import img_isLowGrade from '../images/isLowGrade.png';
import { Button, TextField, IconButton } from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

import request from '../lib/request';
import AnswerEntry from './AnswerEntry';

class PostDetail extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            loginUser: this.props.loginUser,
            postInfo: this.props.postInfo,
            isLikeThisPost: 0,

            answerIdx: 0,
            answerList: [],
        };
        this.form = {
            description: React.createRef(),
        }
        this.likeButtonClick = this.likeButtonClick.bind(this);
        this.getCurrentUser = this.getCurrentUser.bind(this);
        this.onSumbit = this.onSumbit.bind(this);
    }

    async componentDidMount() {
        for (var i = 0; i < this.state.loginUser.userLikePosts.length; i++){
            if (this.state.loginUser.userLikePosts[i] == this.state.postInfo._id){
                this.setState({isLikeThisPost: 1})
            }
        }

        const data = {post_id: this.state.postInfo._id};
        const echo_result = await request.userReadAnswers(data);
        this.setState({answerList: echo_result});
    }

    async getCurrentUser(){
        const data = {
            userID: this.state.loginUser.userID,
            userPW: this.state.loginUser.userPW
        }
        const echo_result = await request.userLogin(data);
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
        this.setState({loginUser: loginUser});
        this.props.updateBoardState(loginUser);
    }

    async likeButtonClick(){
        if (this.state.isLikeThisPost === 1){
            const data = {
                user_id: this.state.loginUser._id,
                post_id: this.state.postInfo._id
            }
            const echo_result = await request.userLikePost(data);
            this.setState({isLikeThisPost: 0, postInfo: {
                ...this.state.postInfo, likeCount: this.state.postInfo.likeCount-1
            } })
            this.getCurrentUser();
        } else {
            // 로그인 하라고 처리
            if (this.state.loginUser._id == ""){
                alert('로그인이 필요합니다.')
            } else {
                const data = {
                    user_id: this.state.loginUser._id,
                    post_id: this.state.postInfo._id
                }
                const echo_result = await request.userLikePost(data);
                this.setState({ isLikeThisPost: 1, postInfo: {
                    ...this.state.postInfo, likeCount: this.state.postInfo.likeCount+1
                } })
                this.getCurrentUser();
            }
        }
    }

    async onSumbit() {
        if (this.form.description.current.value == ""){
            alert('내용을 입력하세요.');
        } else {
            const data = {
                user_id: this.state.loginUser._id,
                post_id: this.state.postInfo._id,
                userNickName: this.state.loginUser.nickName,
                description: this.form.description.current.value,
                category: this.props.categoryInfo.name_eng,
            }
            const isGradeUp = await request.userCreateAnswer(data);

            const data2 = {post_id: this.state.postInfo._id};
            const answerList = await request.userReadAnswers(data2);
            this.setState({answerList: answerList});

            if (isGradeUp.gradeUp != 0){
                const dataForLogin = {
                    userID: this.props.loginUser.userID,
                    userPW: this.props.loginUser.userPW
                }
                const echo_result = await request.userLogin(dataForLogin);
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
                this.props.onGradeUp(loginUser);
                alert('축하합니다! ' + data.category + ' 카테고리 등급이 ' + isGradeUp.gradeUp + '로 상승했습니다.');
            }
        }
    }
    
    render(){
        let likeButton;
        if (this.state.isLikeThisPost === 1){
            likeButton = <>
                <IconButton color="secondary" className="heartIcon" onClick={this.likeButtonClick}>
                    {<FavoriteIcon className="heartIcon" />}
                </IconButton>
            </>
        } else {
            likeButton = <>
                <IconButton color="secondary" className="heartIcon" onClick={this.likeButtonClick}>
                    {<FavoriteBorderIcon className="heartIcon" />}
                </IconButton>
            </>
        }
        let createAnswerForm;
        if (!((this.state.postInfo.auth_write) && (this.state.postInfo.targetGrade > this.props.categoryInfo.grade))
            && this.state.loginUser._id != ""){
            createAnswerForm = <>
                <hr className="leftSide"/>
                <TextField style={{ width: 710 }} required label="Required" inputRef={this.form.description}
                        multiline label="답변 내용" margin="normal" variant="outlined" />
                <Button id="createAnswerBtn" variant="contained" color="primary" size="large" onClick={this.onSumbit} >답변 등록</Button>&nbsp;&nbsp;
            </>
        } else {
            createAnswerForm = <>
                <TextField error InputProps={{ readOnly: true, }} label="답변" defaultValue="답변이 불가능한 글입니다. 등급이 낮거나, 해결사 조건에 맞지 않습니다."
                    className="PostDescription" margin="normal" variant="outlined"/>
            </>
        }

        if ((this.state.postInfo.auth_read) && (this.state.postInfo.targetGrade > this.props.categoryInfo.grade)){
            return(
                <div>
                    <img src={img_isLowGrade} width='738' height='632' />
                </div>
            );
        } else{
            return(
                <>
                    <div className="leftSide">
                        <TextField label="카테고리" defaultValue={this.props.categoryInfo.name_kor} margin="normal"
                            className="PostContents" InputProps={{ readOnly: true }} variant="outlined" />&nbsp;&nbsp;
                        {this.state.postInfo.isPrivate===0&&<TextField label="닉네임" defaultValue={this.state.postInfo.userNickName} margin="normal"
                            className="PostContents" InputProps={{ readOnly: true }} variant="outlined" />}&nbsp;&nbsp;
                        {this.state.postInfo.isPrivate===1&&<TextField label="닉네임" defaultValue="비공개" margin="normal"
                            className="PostContents" InputProps={{ readOnly: true }} variant="outlined" />}&nbsp;&nbsp;
                        <TextField label="공감수" defaultValue={this.state.postInfo.likeCount} margin="normal"
                            className="PostContents" InputProps={{ readOnly: true }} variant="outlined" />
                        {likeButton}
                        <br /> <br />
                        <TextField label="내용" defaultValue={this.state.postInfo.description} margin="normal" multiline
                            className="PostDescription" InputProps={{ readOnly: true }} variant="outlined" />
                        <br /> <br />
                        {createAnswerForm}
                    </div>

                    <div className="rightSide">
                        <h2>답변</h2>
                        {this.state.answerList.map((answerEntry, idx) => {
                            return(
                                <AnswerEntry key={answerEntry._id} answerInfo={answerEntry} />
                            );
                        })}
                    </div>
                </>
            );
        }
        
    }
}

export default PostDetail;