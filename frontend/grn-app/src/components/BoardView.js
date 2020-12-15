import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Button, Table, TableHead, TableBody, TableRow, TableCell } from "@material-ui/core"
import { FormControl, FormControlLabel, RadioGroup, Radio, FormLabel } from "@material-ui/core"
import Icon_Looks1 from '@material-ui/icons/LooksOne';
import Icon_Looks2 from '@material-ui/icons/LooksTwo';
import Icon_Looks3 from '@material-ui/icons/Looks3';
import Icon_Looks4 from '@material-ui/icons/Looks4';
import Icon_Looks5 from '@material-ui/icons/Looks5';
import axios from 'axios';

import SearchBar from './SearchBar';
import PostEntry from './PostEntry';
import PostDetail from './PostDetail';

class BoardView extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            detail_mode: 0,
            postIdx: 0,
            postList: [],
            loginUser: this.props.loginUser,

            orderOpt: 'createdDate',
            selectedIdx: 11,
            categoryList: [
                { name_kor: '일상', name_eng: 'life', grade: this.props.loginUser.cate_lifeGrade },
                { name_kor: '연애', name_eng: 'love', grade: this.props.loginUser.cate_loveGrade },
                { name_kor: '직장', name_eng: 'job', grade: this.props.loginUser.cate_jobGrade },
                { name_kor: '공부', name_eng: 'study', grade: this.props.loginUser.cate_studyGrade },
                { name_kor: '건강', name_eng: 'health', grade: this.props.loginUser.cate_healthGrade },
                { name_kor: '치료', name_eng: 'cure', grade: this.props.loginUser.cate_cureGrade },
                { name_kor: '친구', name_eng: 'friend', grade: this.props.loginUser.cate_friendGrade },
                { name_kor: '이슈', name_eng: 'issue', grade: this.props.loginUser.cate_issueGrade },
                { name_kor: '음악', name_eng: 'music', grade: this.props.loginUser.cate_musicGrade },
                { name_kor: '게임', name_eng: 'game', grade: this.props.loginUser.cate_gameGrade },
                { name_kor: '뉴스', name_eng: 'news', grade: this.props.loginUser.cate_newsGrade },
                { name_kor: '자유(기타)', name_eng: 'other', grade: this.props.loginUser.cate_otherGrade },
            ]
        };
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount = async () => {
        axios.get('http://localhost:3030/board/getPostsByCategory', {
            params: {
                category: this.state.categoryList[this.state.selectedIdx].name_eng,
                orderOpt: this.state.orderOpt
            }
        })
        .then(res => {
            this.setState({postList: res.data});
        })
    }

    async handleChange(event){
        this.setState({ detail_mode: 0, orderOpt: event.target.value });
        axios.get('http://localhost:3030/board/getPostsByCategory', {
            params: {
                category: this.state.categoryList[this.state.selectedIdx].name_eng,
                orderOpt: this.state.orderOpt
            }
        })
        .then(res => {
            this.componentDidMount();
        })
    };

    render(){
        return(
            <div>
                <CategoryList loginUser={this.state.loginUser} selectedIdx={this.props.selectedIdx}
                    onChangeCategory={function(selectedIdx){
                        this.setState({detail_mode: 0, selectedIdx: selectedIdx});
                        axios.get('http://localhost:3030/board/getPostsByCategory', {
                            params: {
                                category: this.state.categoryList[this.state.selectedIdx].name_eng,
                                orderOpt: this.state.orderOpt
                            }
                        })
                        .then(res => {
                            this.componentDidMount();
                        })
                    }.bind(this)} /> &nbsp;&nbsp;

                {this.state.detail_mode===0&&<>
                    <FormControl component="fieldset">
                        <FormLabel component="legend" className="cate_line">정렬 기준</FormLabel>
                        <RadioGroup aria-label="position" name="position" value={this.state.value} onChange={this.handleChange} row>
                            <FormControlLabel value="createdDate" control={<Radio color="primary" />} label="최신순" labelPlacement="start" />
                            <FormControlLabel value="likeCount" control={<Radio color="primary" />} label="공감순" labelPlacement="start" />
                            <FormControlLabel value="answerCount" control={<Radio color="primary" />} label="댓글순" labelPlacement="start" />
                        </RadioGroup>
                    </FormControl>
                    
                    &nbsp;&nbsp;&nbsp;&nbsp;<Link to="/createPost">
                        <Button className="cate_line" variant="outlined" color="primary" size="large">글 작성</Button>
                    </Link>

                    {/* <SearchBar className="cate_line" /> */}
                    <h1>{this.state.categoryList[this.state.selectedIdx].name_kor} 고민글</h1>


                    <Table style={{ width: 1700, margin: 'auto' }}>
                        <TableHead>
                            <TableRow>
                                <TableCell className="PostEntryTitle">제목</TableCell> <TableCell>읽기 등급 제한</TableCell> <TableCell>닉네임</TableCell>
                                <TableCell>생성 날짜</TableCell> <TableCell>추천 수</TableCell> <TableCell>댓글 수</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.postList.map((postEntry, idx) => {
                                return (
                                    <PostEntry key={postEntry._id} postEntry={postEntry} loginUser={this.state.loginUser}
                                        onClickForDetail={function(){
                                            this.setState({detail_mode: 1, postIdx: idx})
                                        }.bind(this)}/>
                                );
                            })}
                        </TableBody>
                    </Table>
                </>}

                {this.state.detail_mode===1&&<>
                    <br /><br />
                    <h1>글 제목 : {this.state.postList[this.state.postIdx].title}</h1>
                    <PostDetail loginUser={this.state.loginUser} postInfo={this.state.postList[this.state.postIdx]} 
                        categoryInfo={this.state.categoryList[this.state.selectedIdx]} 
                        updateBoardState={function(loginUser){
                            this.setState({loginUser: loginUser});
                            this.componentDidMount(); }.bind(this)}
                        onGradeUp={function(loginUser){
                            this.setState({loginUser: loginUser});
                            this.props.onGradeUp(loginUser);
                        }.bind(this)} />
                </>}
            </div>
        );
    }
}

class CategoryList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            loginUser: this.props.loginUser,
            selectedIdx: this.props.selectedIdx
        };
    }

    render(){
        return(
            <>
                {this.state.loginUser.cate_lifeGrade===1&&<Button variant="contained" color="secondary" endIcon={<Icon_Looks1 />} onClick={function(){
                    this.setState({selectedIdx: 0});   this.props.onChangeCategory(0);  }.bind(this)}>일상</Button>}
                {this.state.loginUser.cate_lifeGrade===2&&<Button variant="contained" color="secondary" endIcon={<Icon_Looks2 />} onClick={function(){
                    this.setState({selectedIdx: 0});   this.props.onChangeCategory(0);  }.bind(this)}>일상</Button>}
                {this.state.loginUser.cate_lifeGrade===3&&<Button variant="contained" color="secondary" endIcon={<Icon_Looks3 />} onClick={function(){
                    this.setState({selectedIdx: 0});   this.props.onChangeCategory(0);  }.bind(this)}>일상</Button>}
                {this.state.loginUser.cate_lifeGrade===4&&<Button variant="contained" color="secondary" endIcon={<Icon_Looks4 />} onClick={function(){
                    this.setState({selectedIdx: 0});   this.props.onChangeCategory(0);  }.bind(this)}>일상</Button>}
                {this.state.loginUser.cate_lifeGrade===5&&<Button variant="contained" color="secondary" endIcon={<Icon_Looks5 />} onClick={function(){
                    this.setState({selectedIdx: 0});   this.props.onChangeCategory(0);  }.bind(this)}>일상</Button>}
                {this.state.loginUser.cate_loveGrade===1&&<Button variant="contained" color="secondary" endIcon={<Icon_Looks1 />} onClick={function(){
                    this.setState({selectedIdx: 1});   this.props.onChangeCategory(1);  }.bind(this)}>연애</Button>}
                {this.state.loginUser.cate_loveGrade===2&&<Button variant="contained" color="secondary" endIcon={<Icon_Looks2 />} onClick={function(){
                    this.setState({selectedIdx: 1});   this.props.onChangeCategory(1);  }.bind(this)}>연애</Button>}
                {this.state.loginUser.cate_loveGrade===3&&<Button variant="contained" color="secondary" endIcon={<Icon_Looks3 />} onClick={function(){
                    this.setState({selectedIdx: 1});   this.props.onChangeCategory(1);  }.bind(this)}>연애</Button>}
                {this.state.loginUser.cate_loveGrade===4&&<Button variant="contained" color="secondary" endIcon={<Icon_Looks4 />} onClick={function(){
                    this.setState({selectedIdx: 1});   this.props.onChangeCategory(1);  }.bind(this)}>연애</Button>}
                {this.state.loginUser.cate_loveGrade===5&&<Button variant="contained" color="secondary" endIcon={<Icon_Looks5 />} onClick={function(){
                    this.setState({selectedIdx: 1});   this.props.onChangeCategory(1);  }.bind(this)}>연애</Button>}
                {this.state.loginUser.cate_jobGrade===1&&<Button variant="contained" color="secondary" endIcon={<Icon_Looks1 />} onClick={function(){
                    this.setState({selectedIdx: 2});   this.props.onChangeCategory(2);  }.bind(this)}>직장</Button>}
                {this.state.loginUser.cate_jobGrade===2&&<Button variant="contained" color="secondary" endIcon={<Icon_Looks2 />} onClick={function(){
                    this.setState({selectedIdx: 2});   this.props.onChangeCategory(2);  }.bind(this)}>직장</Button>}
                {this.state.loginUser.cate_jobGrade===3&&<Button variant="contained" color="secondary" endIcon={<Icon_Looks3 />} onClick={function(){
                    this.setState({selectedIdx: 2});   this.props.onChangeCategory(2);  }.bind(this)}>직장</Button>}
                {this.state.loginUser.cate_jobGrade===4&&<Button variant="contained" color="secondary" endIcon={<Icon_Looks4 />} onClick={function(){
                    this.setState({selectedIdx: 2});   this.props.onChangeCategory(2);  }.bind(this)}>직장</Button>}
                {this.state.loginUser.cate_jobGrade===5&&<Button variant="contained" color="secondary" endIcon={<Icon_Looks5 />} onClick={function(){
                    this.setState({selectedIdx: 2});   this.props.onChangeCategory(2);  }.bind(this)}>직장</Button>}
                {this.state.loginUser.cate_studyGrade===1&&<Button variant="contained" color="secondary" endIcon={<Icon_Looks1 />} onClick={function(){
                    this.setState({selectedIdx: 3});   this.props.onChangeCategory(3);  }.bind(this)}>공부</Button>}
                {this.state.loginUser.cate_studyGrade===2&&<Button variant="contained" color="secondary" endIcon={<Icon_Looks2 />} onClick={function(){
                    this.setState({selectedIdx: 3});   this.props.onChangeCategory(3);  }.bind(this)}>공부</Button>}
                {this.state.loginUser.cate_studyGrade===3&&<Button variant="contained" color="secondary" endIcon={<Icon_Looks3 />} onClick={function(){
                    this.setState({selectedIdx: 3});   this.props.onChangeCategory(3);  }.bind(this)}>공부</Button>}
                {this.state.loginUser.cate_studyGrade===4&&<Button variant="contained" color="secondary" endIcon={<Icon_Looks4 />} onClick={function(){
                    this.setState({selectedIdx: 3});   this.props.onChangeCategory(3);  }.bind(this)}>공부</Button>}
                {this.state.loginUser.cate_studyGrade===5&&<Button variant="contained" color="secondary" endIcon={<Icon_Looks5 />} onClick={function(){
                    this.setState({selectedIdx: 3});   this.props.onChangeCategory(3);  }.bind(this)}>공부</Button>}
                {this.state.loginUser.cate_healthGrade===1&&<Button variant="contained" color="secondary" endIcon={<Icon_Looks1 />} onClick={function(){
                    this.setState({selectedIdx: 4});   this.props.onChangeCategory(4);  }.bind(this)}>건강</Button>}
                {this.state.loginUser.cate_healthGrade===2&&<Button variant="contained" color="secondary" endIcon={<Icon_Looks2 />} onClick={function(){
                    this.setState({selectedIdx: 4});   this.props.onChangeCategory(4);  }.bind(this)}>건강</Button>}
                {this.state.loginUser.cate_healthGrade===3&&<Button variant="contained" color="secondary" endIcon={<Icon_Looks3 />} onClick={function(){
                    this.setState({selectedIdx: 4});   this.props.onChangeCategory(4);  }.bind(this)}>건강</Button>}
                {this.state.loginUser.cate_healthGrade===4&&<Button variant="contained" color="secondary" endIcon={<Icon_Looks4 />} onClick={function(){
                    this.setState({selectedIdx: 4});   this.props.onChangeCategory(4);  }.bind(this)}>건강</Button>}
                {this.state.loginUser.cate_healthGrade===5&&<Button variant="contained" color="secondary" endIcon={<Icon_Looks5 />} onClick={function(){
                    this.setState({selectedIdx: 4});   this.props.onChangeCategory(4);  }.bind(this)}>건강</Button>}
                {this.state.loginUser.cate_cureGrade===1&&<Button variant="contained" color="secondary" endIcon={<Icon_Looks1 />} onClick={function(){
                    this.setState({selectedIdx: 5});   this.props.onChangeCategory(5);  }.bind(this)}>치료</Button>}
                {this.state.loginUser.cate_cureGrade===2&&<Button variant="contained" color="secondary" endIcon={<Icon_Looks2 />} onClick={function(){
                    this.setState({selectedIdx: 5});   this.props.onChangeCategory(5);  }.bind(this)}>치료</Button>}
                {this.state.loginUser.cate_cureGrade===3&&<Button variant="contained" color="secondary" endIcon={<Icon_Looks3 />} onClick={function(){
                    this.setState({selectedIdx: 5});   this.props.onChangeCategory(5);  }.bind(this)}>치료</Button>}
                {this.state.loginUser.cate_cureGrade===4&&<Button variant="contained" color="secondary" endIcon={<Icon_Looks4 />} onClick={function(){
                    this.setState({selectedIdx: 5});   this.props.onChangeCategory(5);  }.bind(this)}>치료</Button>}
                {this.state.loginUser.cate_cureGrade===5&&<Button variant="contained" color="secondary" endIcon={<Icon_Looks5 />} onClick={function(){
                    this.setState({selectedIdx: 5});   this.props.onChangeCategory(5);  }.bind(this)}>치료</Button>}
                {this.state.loginUser.cate_friendGrade===1&&<Button variant="contained" color="secondary" endIcon={<Icon_Looks1 />} onClick={function(){
                    this.setState({selectedIdx: 6});   this.props.onChangeCategory(6);  }.bind(this)}>친구</Button>}
                {this.state.loginUser.cate_friendGrade===2&&<Button variant="contained" color="secondary" endIcon={<Icon_Looks2 />} onClick={function(){
                    this.setState({selectedIdx: 6});   this.props.onChangeCategory(6);  }.bind(this)}>친구</Button>}
                {this.state.loginUser.cate_friendGrade===3&&<Button variant="contained" color="secondary" endIcon={<Icon_Looks3 />} onClick={function(){
                    this.setState({selectedIdx: 6});   this.props.onChangeCategory(6);  }.bind(this)}>친구</Button>}
                {this.state.loginUser.cate_friendGrade===4&&<Button variant="contained" color="secondary" endIcon={<Icon_Looks4 />} onClick={function(){
                    this.setState({selectedIdx: 6});   this.props.onChangeCategory(6);  }.bind(this)}>친구</Button>}
                {this.state.loginUser.cate_friendGrade===5&&<Button variant="contained" color="secondary" endIcon={<Icon_Looks5 />} onClick={function(){
                    this.setState({selectedIdx: 6});   this.props.onChangeCategory(6);  }.bind(this)}>친구</Button>}
                {this.state.loginUser.cate_issueGrade===1&&<Button variant="contained" color="secondary" endIcon={<Icon_Looks1 />} onClick={function(){
                    this.setState({selectedIdx: 7});   this.props.onChangeCategory(7);  }.bind(this)}>이슈</Button>}
                {this.state.loginUser.cate_issueGrade===2&&<Button variant="contained" color="secondary" endIcon={<Icon_Looks2 />} onClick={function(){
                    this.setState({selectedIdx: 7});   this.props.onChangeCategory(7);  }.bind(this)}>이슈</Button>}
                {this.state.loginUser.cate_issueGrade===3&&<Button variant="contained" color="secondary" endIcon={<Icon_Looks3 />} onClick={function(){
                    this.setState({selectedIdx: 7});   this.props.onChangeCategory(7);  }.bind(this)}>이슈</Button>}
                {this.state.loginUser.cate_issueGrade===4&&<Button variant="contained" color="secondary" endIcon={<Icon_Looks4 />} onClick={function(){
                    this.setState({selectedIdx: 7});   this.props.onChangeCategory(7);  }.bind(this)}>이슈</Button>}
                {this.state.loginUser.cate_issueGrade===5&&<Button variant="contained" color="secondary" endIcon={<Icon_Looks5 />} onClick={function(){
                    this.setState({selectedIdx: 7});   this.props.onChangeCategory(7);  }.bind(this)}>이슈</Button>}
                {this.state.loginUser.cate_musicGrade===1&&<Button variant="contained" color="secondary" endIcon={<Icon_Looks1 />} onClick={function(){
                    this.setState({selectedIdx: 8});   this.props.onChangeCategory(8);  }.bind(this)}>음악</Button>}
                {this.state.loginUser.cate_musicGrade===2&&<Button variant="contained" color="secondary" endIcon={<Icon_Looks2 />} onClick={function(){
                    this.setState({selectedIdx: 8});   this.props.onChangeCategory(8);  }.bind(this)}>음악</Button>}
                {this.state.loginUser.cate_musicGrade===3&&<Button variant="contained" color="secondary" endIcon={<Icon_Looks3 />} onClick={function(){
                    this.setState({selectedIdx: 8});   this.props.onChangeCategory(8);  }.bind(this)}>음악</Button>}
                {this.state.loginUser.cate_musicGrade===4&&<Button variant="contained" color="secondary" endIcon={<Icon_Looks4 />} onClick={function(){
                    this.setState({selectedIdx: 8});   this.props.onChangeCategory(8);  }.bind(this)}>음악</Button>}
                {this.state.loginUser.cate_musicGrade===5&&<Button variant="contained" color="secondary" endIcon={<Icon_Looks5 />} onClick={function(){
                    this.setState({selectedIdx: 8});   this.props.onChangeCategory(8);  }.bind(this)}>음악</Button>}
                {this.state.loginUser.cate_gameGrade===1&&<Button variant="contained" color="secondary" endIcon={<Icon_Looks1 />} onClick={function(){
                    this.setState({selectedIdx: 9});   this.props.onChangeCategory(9);  }.bind(this)}>게임</Button>}
                {this.state.loginUser.cate_gameGrade===2&&<Button variant="contained" color="secondary" endIcon={<Icon_Looks2 />} onClick={function(){
                    this.setState({selectedIdx: 9});   this.props.onChangeCategory(9);  }.bind(this)}>게임</Button>}
                {this.state.loginUser.cate_gameGrade===3&&<Button variant="contained" color="secondary" endIcon={<Icon_Looks3 />} onClick={function(){
                    this.setState({selectedIdx: 9});   this.props.onChangeCategory(9);  }.bind(this)}>게임</Button>}
                {this.state.loginUser.cate_gameGrade===4&&<Button variant="contained" color="secondary" endIcon={<Icon_Looks4 />} onClick={function(){
                    this.setState({selectedIdx: 9});   this.props.onChangeCategory(9);  }.bind(this)}>게임</Button>}
                {this.state.loginUser.cate_gameGrade===5&&<Button variant="contained" color="secondary" endIcon={<Icon_Looks5 />} onClick={function(){
                    this.setState({selectedIdx: 9});   this.props.onChangeCategory(9);  }.bind(this)}>게임</Button>}
                {this.state.loginUser.cate_newsGrade===1&&<Button variant="contained" color="secondary" endIcon={<Icon_Looks1 />} onClick={function(){
                    this.setState({selectedIdx: 10});   this.props.onChangeCategory(10);  }.bind(this)}>뉴스</Button>}
                {this.state.loginUser.cate_newsGrade===2&&<Button variant="contained" color="secondary" endIcon={<Icon_Looks2 />} onClick={function(){
                    this.setState({selectedIdx: 10});   this.props.onChangeCategory(10);  }.bind(this)}>뉴스</Button>}
                {this.state.loginUser.cate_newsGrade===3&&<Button variant="contained" color="secondary" endIcon={<Icon_Looks3 />} onClick={function(){
                    this.setState({selectedIdx: 10});   this.props.onChangeCategory(10);  }.bind(this)}>뉴스</Button>}
                {this.state.loginUser.cate_newsGrade===4&&<Button variant="contained" color="secondary" endIcon={<Icon_Looks4 />} onClick={function(){
                    this.setState({selectedIdx: 10});   this.props.onChangeCategory(10);  }.bind(this)}>뉴스</Button>}
                {this.state.loginUser.cate_newsGrade===5&&<Button variant="contained" color="secondary" endIcon={<Icon_Looks5 />} onClick={function(){
                    this.setState({selectedIdx: 10});   this.props.onChangeCategory(10);  }.bind(this)}>뉴스</Button>}
                {this.state.loginUser.cate_otherGrade===1&&<Button variant="contained" color="secondary" endIcon={<Icon_Looks1 />} onClick={function(){
                    this.setState({selectedIdx: 11});   this.props.onChangeCategory(11);  }.bind(this)}>자유(기타)</Button>}
                {this.state.loginUser.cate_otherGrade===2&&<Button variant="contained" color="secondary" endIcon={<Icon_Looks2 />} onClick={function(){
                    this.setState({selectedIdx: 11});   this.props.onChangeCategory(11);  }.bind(this)}>자유(기타)</Button>}
                {this.state.loginUser.cate_otherGrade===3&&<Button variant="contained" color="secondary" endIcon={<Icon_Looks3 />} onClick={function(){
                    this.setState({selectedIdx: 11});   this.props.onChangeCategory(11);  }.bind(this)}>자유(기타)</Button>}
                {this.state.loginUser.cate_otherGrade===4&&<Button variant="contained" color="secondary" endIcon={<Icon_Looks4 />} onClick={function(){
                    this.setState({selectedIdx: 11});   this.props.onChangeCategory(11);  }.bind(this)}>자유(기타)</Button>}
                {this.state.loginUser.cate_otherGrade===5&&<Button variant="contained" color="secondary" endIcon={<Icon_Looks5 />} onClick={function(){
                    this.setState({selectedIdx: 11});   this.props.onChangeCategory(11);  }.bind(this)}>자유(기타)</Button>}
            </>
        );
    }
}

export default BoardView;