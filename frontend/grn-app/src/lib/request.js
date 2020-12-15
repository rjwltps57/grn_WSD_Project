import axios from 'axios';

const API_DEFAULT = "http://localhost:3030/";
const instance = axios.create({ baseURL: API_DEFAULT });

export async function userSignup({userID, userPW, nickName, dateOfBirth, sex}){
    const result = await instance.post('/users/signup', {userID, userPW, nickName, dateOfBirth, sex});
    return result.data;
}

export async function userLogin({userID, userPW}){
    const result = await instance.post('/users/login', {userID, userPW});
    return result.data;
}

export async function userLikePost({user_id, post_id}){
    const result = await instance.post('/users/likePost', {user_id, post_id});
    return result.data;
}

export async function userReadAnswers({post_id}){
    const result = await instance.post('/users/readAnswers', {post_id});
    return result.data;
}

export async function userCreatePost({user_id, category, userNickName, title, description, auth_read, auth_write, isPrivate, targetGrade, targetSex, targetMinAge, targetMaxAge}){
    const result = await instance.post('/users/createPost',
    {user_id, category, userNickName, title, description, auth_read, auth_write, isPrivate, targetGrade, targetSex, targetMinAge, targetMaxAge});
    return result.data;
}

export async function userCreateAnswer({user_id, post_id, userNickName, description, category}){
    const result = await instance.post('/users/createAnswer', {user_id, post_id, userNickName, description, category});
    return result.data;
}

export default {
    userSignup,
    userLogin,
    userLikePost,
    userReadAnswers,
    userCreatePost,
    userCreateAnswer,
}