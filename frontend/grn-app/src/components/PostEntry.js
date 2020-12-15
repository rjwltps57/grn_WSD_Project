import React from 'react';
import { TableRow, TableCell, Button } from "@material-ui/core"

class PostEntry extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            loginUser: this.props.loginUser,
            postInfo: this.props.postEntry,
        };
    }

    render(){
        return(
            <TableRow>
                <TableCell>
                    <Button className="PostTitle" onClick={function(){
                    this.props.onClickForDetail();
                }.bind(this)}>{this.state.postInfo.title}</Button>
                </TableCell>
                {this.state.postInfo.auth_read===0&&<TableCell>제한 없음</TableCell>}
                {this.state.postInfo.auth_read===1&&<TableCell>{this.state.postInfo.targetGrade}</TableCell>}
                {this.state.postInfo.isPrivate===0&&<TableCell>{this.state.postInfo.userNickName}</TableCell>}
                {this.state.postInfo.isPrivate===1&&<TableCell>작성자 비공개</TableCell>}
                <TableCell>{this.state.postInfo.createdDate}</TableCell>
                <TableCell>{this.state.postInfo.likeCount}</TableCell>
                <TableCell>{this.state.postInfo.answerCount}</TableCell>
            </TableRow>
        );
    }
}

export default PostEntry;