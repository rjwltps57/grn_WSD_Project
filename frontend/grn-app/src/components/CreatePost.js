import React from 'react';
import { withRouter } from 'react-router-dom';
import { Button, TextField, MenuItem, Checkbox, FormControlLabel } from "@material-ui/core"
import { FormControl, RadioGroup, Radio, FormLabel } from "@material-ui/core"

import request from '../lib/request';

class CreatePost extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            isPrivate: 0,
            auth_read: 0,
            auth_write: 0,
        }
        this.form = {
            title: React.createRef(),
            description: React.createRef(),
            category: React.createRef(),

            targetGrade: React.createRef(),
            targetSex: React.createRef(),
            targetMinAge: React.createRef(),
            targetMaxAge: React.createRef(),
        }
        this.submit = this.submit.bind(this);
        this.cancle = this.cancle.bind(this);
    }

    async submit(){
        if (this.props.loginUser._id == ""){
            alert('로그인 후 이용해주세요.');
            this.props.history.push("/login");
        }
        else if (this.form.targetMinAge.current.value != 0 && this.form.targetMaxAge.current.value != 0 
                && this.form.targetMinAge.current.value > this.form.targetMaxAge.current.value){
            alert('해결사 나이를 올바르게 설정해주세요.');
        } else {
            const data = {
                user_id: this.props.loginUser._id, category: this.form.category.current.value,
                userNickName: this.props.loginUser.nickName, title: this.form.title.current.value,
                description: this.form.description.current.value, isPrivate: this.state.isPrivate,
                auth_read: this.state.auth_read, auth_write: this.state.auth_write,
                targetGrade: this.form.targetGrade.current.value,
                targetSex: this.form.targetSex.current.value,
                targetMinAge: this.form.targetMinAge.current.value,
                targetMaxAge: this.form.targetMaxAge.current.value,
            }
            const isGradeUp = await request.userCreatePost(data);
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
            this.props.history.push("/");
        }
    }

    cancle(){
        this.props.history.push("/");
    }

    togglePrivate = (event) => {
        this.state.isPrivate ? this.setState({isPrivate:0}) : this.setState({isPrivate:1});
    };
    setAuthReadVal = (event) => {
        if (event.target.value == 1) {
            this.setState({auth_read: event.target.value, auth_write: 1});
        } else {
            this.setState({auth_read: event.target.value});
        }
    }
    setAuthWriteVal = (event) => {
        this.setState({auth_write: event.target.value});
    }


    render(){
        const categoryList = [
            { label: '일상', value: 'life'}, { label: '연애', value: 'love'},
            { label: '직장', value: 'job' }, { label: '공부', value: 'study' },
            { label: '건강', value: 'health' }, { label: '치료', value: 'cure' },
            { label: '친구', value: 'friend' }, { label: '이슈', value: 'issue' },
            { label: '음악', value: 'music' }, { label: '게임', value: 'game' },
            { label: '뉴스', value: 'news' }, { label: '자유(기타)', value: 'other' }
        ];
        const targetGradeMenu = [{value: '1', label: '제한없음'}, {value: '2', label: '2이상'}, {value: '3', label: '3이상'}, {value: '4', label: '4이상'}, {value: '5', label: '5이상'}];
        const targetSexMenu = [{value: 'both', label: '제한없음'}, {value: 'male', label: '남자'}, {value: 'female', label: '여자'}];
        const targetAgeMenu = [{value: '0', label: '제한없음'}, {value: '10', label: '10대'}, {value: '20', label: '20대'}, {value: '30', label: '30대'}, {value: '40', label: '40대'}, {value: '50', label: '50대'}, {value: '60', label: '60대'}, {value: '70', label: '70대 이상'}, ];

        let authForms;
        if (this.state.auth_read == 1){
            authForms = 
                <div>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">읽기</FormLabel>
                        <RadioGroup value={this.state.auth_read} onChange={this.setAuthReadVal} row >
                            <FormControlLabel value="0" control={<Radio />} label="모두" />
                            <FormControlLabel value="1" control={<Radio />} label="해결사만" />
                        </RadioGroup>
                    </FormControl>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                    <FormControl component="fieldset">
                        <FormLabel component="legend">쓰기</FormLabel>
                        <RadioGroup value={this.state.auth_write} onChange={this.setAuthWriteVal} row >
                            <FormControlLabel disabled value="0" control={<Radio />} label="모두" />
                            <FormControlLabel disabled checked value="1" control={<Radio />} label="해결사만" />
                        </RadioGroup>
                    </FormControl>
                </div>
        } else {
            authForms = 
                <div>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">읽기</FormLabel>
                        <RadioGroup value={this.state.auth_read} onChange={this.setAuthReadVal} row >
                            <FormControlLabel value="0" control={<Radio />} label="모두" />
                            <FormControlLabel value="1" control={<Radio />} label="해결사만" />
                        </RadioGroup>
                    </FormControl>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                    <FormControl component="fieldset">
                        <FormLabel component="legend">쓰기</FormLabel>
                        <RadioGroup value={this.state.auth_write} onChange={this.setAuthWriteVal} row >
                            <FormControlLabel value="0" control={<Radio />} label="모두" />
                            <FormControlLabel value="1" control={<Radio />} label="해결사만" />
                        </RadioGroup>
                    </FormControl>
                </div>
        }
        let targetForm;
        if (this.state.auth_read == 0 && this.state.auth_write == 0) {
            targetForm = 
            <div>
                <TextField disabled style={{ width: 200 }} inputRef={this.form.targetGrade} 
                    select label="등급 제한" margin="normal" variant="outlined">
                        <MenuItem value="1">제한없음</MenuItem>
                </TextField> &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                <TextField disabled style={{ width: 200 }} inputRef={this.form.targetSex} 
                    select label="성별 제한" margin="normal" variant="outlined">
                        <MenuItem value="both">제한없음</MenuItem>
                </TextField> <br /> <br />
                <TextField disabled style={{ width: 200 }} inputRef={this.form.targetMinAge} 
                    select label="나이 제한(최소 나이대)" margin="normal" variant="outlined">
                        <MenuItem value="0">제한없음</MenuItem>
                </TextField> &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                <TextField disabled style={{ width: 200 }} inputRef={this.form.targetMaxAge} 
                    select label="나이 제한(최대 나이대)" margin="normal" variant="outlined">
                        <MenuItem value="0">제한없음</MenuItem>
                </TextField>
            </div>
        } else {
            targetForm = 
                <div>
                    <TextField style={{ width: 200 }} inputRef={this.form.targetGrade} 
                        select label="등급 제한" SelectProps={{ MenuProps: { className: targetGradeMenu, },}}
                        margin="normal" variant="outlined">
                        {targetGradeMenu.map(option => (
                            <MenuItem key={option.value} value={option.value}> {option.label} </MenuItem>
                        ))}
                    </TextField> &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                    <TextField style={{ width: 200 }} inputRef={this.form.targetSex} 
                        select label="성별 제한" SelectProps={{ MenuProps: { className: targetSexMenu, },}}
                        margin="normal" variant="outlined">
                        {targetSexMenu.map(option => (
                            <MenuItem key={option.value} value={option.value}> {option.label} </MenuItem>
                        ))}
                    </TextField> <br /> <br />
                    <TextField style={{ width: 200 }} inputRef={this.form.targetMinAge} 
                        select label="나이 제한(최소 나이대)" SelectProps={{ MenuProps: { className: targetAgeMenu, },}}
                        margin="normal" variant="outlined">
                        {targetAgeMenu.map(option => (
                            <MenuItem key={option.value} value={option.value}> {option.label} </MenuItem>
                        ))}
                    </TextField> &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                    <TextField style={{ width: 200 }} inputRef={this.form.targetMaxAge} 
                        select label="나이 제한(최대 나이대)" SelectProps={{ MenuProps: { className: targetAgeMenu, },}}
                        margin="normal" variant="outlined">
                        {targetAgeMenu.map(option => (
                            <MenuItem key={option.value} value={option.value}> {option.label} </MenuItem>
                        ))}
                    </TextField>
                </div>
        }
        
        return(
            <>
                <br /> <br />
                <h1>고민글 작성</h1>
                <div className="leftSide">
                    <TextField style={{ width: 150 }} inputRef={this.form.category} 
                        select label="Category" SelectProps={{ MenuProps: { className: categoryList, },}}
                        margin="normal" variant="outlined">
                        {categoryList.map(option => (
                            <MenuItem key={option.value} value={option.value}> {option.label} </MenuItem>
                        ))}
                    </TextField>
                    &nbsp;&nbsp;
                    <TextField style={{ width: 550 }} required label="Required" inputRef={this.form.title}
                        label="글 제목" margin="normal" variant="outlined" /> <br />
                    <TextField style={{ width: 710 }} required label="Required" inputRef={this.form.description}
                        multiline label="본문" margin="normal" variant="outlined" /> <br />
                    <FormControlLabel
                        control={<Checkbox name="isPrivate" onChange={this.togglePrivate} />}
                        label="작성자 비공개" labelPlacement="start"
                    />


                </div>
                <div className="rightSide">
                    <h2>게시글 권한 설정</h2>
                    {authForms}
                    <hr /><h2>해결사 조건 설정</h2>
                    {targetForm}
                    <br /> <br />
                    <Button variant="contained" color="primary" size="large" onClick={this.submit}>작성완료</Button>&nbsp;&nbsp;
                    <Button variant="contained" color="secondary" size="large" onClick={this.cancle}>취소</Button>
                </div>
            </>
        );
    }
}

export default withRouter(CreatePost);