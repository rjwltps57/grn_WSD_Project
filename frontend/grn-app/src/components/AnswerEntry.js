import React from 'react';
import { TextField } from "@material-ui/core"

class AnswerEntry extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            answerInfo: this.props.answerInfo
        };
    }

    render(){
        const dateString = this.state.answerInfo.createdDate;
        return(
            <>
                <TextField label="닉네임" defaultValue={this.state.answerInfo.userNickName} margin="normal"
                    className="AnswerContents" InputProps={{ readOnly: true }} />&nbsp;&nbsp;
                <TextField label="날짜" defaultValue={dateString} margin="normal"
                    className="AnswerContents" InputProps={{ readOnly: true }} />&nbsp;&nbsp;
                <br />
                <TextField label="내용" defaultValue={this.state.answerInfo.description} margin="normal" multiline
                    className="AnswerDescription" InputProps={{ readOnly: true }} variant="filled" />&nbsp;&nbsp;
                <br /> <br />
            </>
        );
    }
}

export default AnswerEntry;