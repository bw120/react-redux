import React, { useEffect } from 'react';
import {
  useParams,
} from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchPosts,
  postsData,
} from '../reducers/posts';

function Posts(props) {
  const {userId} = useParams();
  const {userList} = props.users;
  const selectedUser = userList.filter((item) => item.id === Number(userId))[0];

  const posts = useSelector(postsData);
  const {postList, status} = posts || {};
  const userPosts = postList[userId] || [];
  const dispatch = useDispatch();

  // load user list on mount
  useEffect(() => {
    dispatch(fetchPosts({userId}));
  }, []);

  return (
    <div>
      { selectedUser && (
        <>
          <h1>Posts from {selectedUser.name}</h1>
          <table>
            <thead>
              <tr>
                <td>Title</td>
                <td>Body</td>
              </tr>
            </thead>
            <tbody>
              {(status === 'loading' && userPosts.length === 0) ? 'Loading' : (
                <>
                  {userPosts.map((item) => {
                    const {
                      title,
                      body
                      } = item;

                      return (
                        <tr key={title}>
                          <td>{title}</td>
                          <td>{body}</td>
                        </tr>
                      )
                    })}
                </>
              )}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default Posts;
