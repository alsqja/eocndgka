import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { dummyUser } from "../Dummys/dummy";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { followerModal, followModal, isLogin } from "../store/store";
import { FollowModal } from "./FollowModal";
import { FollowerModal } from "./FollowerModal";
import axios from "axios";

const Container = styled.div`
  transition-duration: 0.3s;
  font-family: "SUIT-Light";
  position: fixed;
  top: 100px;
  width: 200px;
  padding-bottom: 15px;
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  @media only screen and (max-width: 1200px) {
    margin-left: 10px;
    width: 180px;
  }
  @media only screen and (max-width: 768px) {
    grid-column: span 1;
    width: 150px;
  }

  @media only screen and (max-width: 500px) {
    position: fixed;
    top: 100px;
    left: 20px;
    margin: 0;
    width: 200px;
    display: none;
  }
`;

const Menu = styled.div`
  /* transition-duration: 0.3s; */
  width: auto;
  text-align: center;
  margin: 10px;
  font-size: large;
  cursor: pointer;
  :hover {
    color: var(--main-color);
    font-family: "SUIT-SemiBold";
  }
`;

const UserInfo = styled.div`
  display: flex;
  padding: 10px 0;
  width: 100%;
  border-bottom: 1px solid #dbdbdb;
  justify-content: center;
  :hover {
    border-bottom: 2px solid var(--main-color);
  }
  .photo {
    width: 40px;
    height: 40px;
    margin-right: 10%;
    border-radius: 50%;
  }
  .name {
    font-weight: bolder;
    display: flex;
    align-items: center;
    cursor: pointer;
    color: #333;
  }
`;

export const SideBar = () => {
  const [follower, setFollower] = useState(0);
  const [follow, setFollow] = useState(0);
  const [username, setUsername] = useState("");
  const [profile, setProfile] = useState("");
  const navigate = useNavigate();
  const [isFollowModalOn, setIsFollowModalOn] = useRecoilState(followModal);
  const [isFollowerModalOn, setIsFollowerModalOn] =
    useRecoilState(followerModal);
  const [login, setLogin] = useRecoilState(isLogin)

  useEffect(() => {
    const userId = window.localStorage.getItem('userId')
    const accessToken = window.localStorage.getItem('accessToken')
    if (!userId) {
      return;
    }
    axios
      .get(
        `http://52.79.250.177:8080/user?id=${userId}&cursor=-1`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          }
        }
      )
      .then((res) => {
        console.log(res)
      })
  }, []);

  const handlePost = () => {
    navigate("/createpost");
  };

  return (
    <Container>
      {isFollowModalOn ? <FollowModal /> : ""}
      {isFollowerModalOn ? <FollowerModal /> : ""}
      {login ? 
      <Link to={`/mypage/${dummyUser[0].id}`}>
        <UserInfo>
          <img className="photo" src={profile} alt="" />
          <div className="name">{username}</div>
        </UserInfo>
      </Link> : 
      <div>게시판은 로그인 후 이용가능합니다.</div>}
      
      <Menu onClick={() => {
        setIsFollowerModalOn(true)
      }} style={login ? {} : {display:'none'}}>{`팔로워 ${follower}`}</Menu>
      <Menu onClick={() => {
        setIsFollowModalOn(true)
      }} style={login ? {} : {display:'none'}}>{`팔로우 ${follow}`}</Menu>
      <Link to={'/makeup'}>
        <Menu>화장하러 가기</Menu>
      </Link>
      <Menu onClick={handlePost} style={login ? {} : {display:'none'}}>게시글 작성</Menu>
    </Container>
  );
};
