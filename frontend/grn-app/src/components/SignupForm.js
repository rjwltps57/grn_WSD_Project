import React from 'react';
import { withRouter } from 'react-router-dom';
import { Button, TextField, MenuItem } from "@material-ui/core"

class SignupForm extends React.Component {
    constructor(props){
        super(props)
        this.form = {
            userID: React.createRef(),
            userPW: React.createRef(),
            nickName: React.createRef(),
            dateOfBirth: React.createRef(),
            sex: React.createRef(),
        }
        this.submit = this.submit.bind(this);
        this.cancle = this.cancle.bind(this);
    }

    async submit(){
        const data = {
            userID: this.form.userID.current.value,
            userPW: this.form.userPW.current.value,
            nickName: this.form.nickName.current.value,
            dateOfBirth: this.form.dateOfBirth.current.value,
            sex: this.form.sex.current.value
        }
        const echo_result = await this.props.onSubmit(data);
        if (echo_result.err == "userID is duplicated"){
            alert('ID가 중복되었습니다.');
        } else {
            this.props.history.push("/");
        }
    }

    cancle(){
        this.props.history.push("/");
    }
    
    render(){
        const userSexMenu = [{value: 'male', label: '남자'}, {value: 'female', label: '여자'}];
        return(
            <div className="form">
                <TextField required label="Required" inputRef={this.form.userID}
                    label="ID" margin="normal" variant="outlined" /> <br />
                <TextField required label="Required" inputRef={this.form.userPW}
                    label="비밀번호" margin="normal" variant="outlined" /> <br />
                <TextField required label="Required" inputRef={this.form.nickName}
                    label="닉네임" margin="normal" variant="outlined" /> <br />
                <TextField required label="Required" inputRef={this.form.dateOfBirth}
                    label="생년월일" margin="normal" variant="outlined" /> <br /> 
                <TextField inputRef={this.form.sex}
                    select label="Select" helperText="Please select your gender"
                    SelectProps={{
                        MenuProps: {
                        className: userSexMenu,
                        },
                    }}
                    margin="normal" variant="outlined">
                    {userSexMenu.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                        {option.label}
                        </MenuItem>
                    ))}
                </TextField> <br /> <br />
                <Button variant="contained" color="primary" size="large" onClick={this.submit}>회원가입</Button>&nbsp;&nbsp;
                <Button variant="contained" color="secondary" size="large" onClick={this.cancle}>취소</Button>
            </div>
        );
    }
}

export default withRouter(SignupForm);