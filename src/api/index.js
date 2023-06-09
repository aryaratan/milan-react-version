import { API_URLS, getFormBody, LOCALSTORAGE_TOKEN_KEY } from '../utils';

const customFetch = async (url, { body, ...customConfig }) => {
  const token = window.localStorage.getItem(LOCALSTORAGE_TOKEN_KEY);

  const headers = {
    'content-type': 'application/x-www-form-urlencoded',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const config = {
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };

  if (body) {
    config.body = getFormBody(body);
    console.log(config.body);
  }

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (data.success) {
      return {
        data: data.data,
        success: true,
      };
    }

    throw new Error(data.message);
  } catch (error) {
    console.error('error');
    return {
      message: error.message,
      success: false,
    };
  }
};

export const getPosts = (page = 1, limit = 5) => {
  return customFetch(API_URLS.posts(page, limit), {
    method: 'GET',
  });
};

export const login = (email, password) => {
  return customFetch(API_URLS.login(), {
    method: 'POST',
    body: { email, password },
  });
};

export const signup = (email, name,password,confirmPassword) => {
  return customFetch(API_URLS.signup(),{
    method: 'POST',
    body:{
      
      email,
      name,
      password,
      confirm_password:confirmPassword
    }
  });
}

export const updateProfile = (userId, name , password, confirmPassword) => {
  return customFetch(API_URLS.editUser(),{
    method: 'POST',
    body:{
      id:userId,
      name,
      password,
      confirm_password:confirmPassword
    }
  });
}

export const getUser = (userId)=>{
  return customFetch(API_URLS.userInfo(userId),{
    method:'GET',
  });
}

export const getFriends = () => {
  return customFetch(API_URLS.friends(), {
    method :'GET'
  })
}

export const addFriend = (userId) => {
  return customFetch(API_URLS.createFriendship(userId), {
    method: 'POST',
  });
};

export const removeFriend = (userId) => {
  return customFetch(API_URLS.removeFriend(userId), {
    method: 'POST',
  });
};


export const addPost = (content) => {
  return customFetch(API_URLS.createPost(content),{
    method :'POST',
    body:{
      content
    }
  })
}

export const addComment = async (postId,content) => {
  return customFetch(API_URLS.comment(),{
    method :'POST',
    body:{
      post_id:postId,
      content
      
    }
  })
}

export const addRemoveLike = async (likeable_id,likeable_type) => {
  // console.log(likeable_id,likeable_type);
  return customFetch(API_URLS.toggleLike(likeable_id,likeable_type),{
    method:'POST',
    likeable_id,
    likeable_type
  })
}
export const searchUsers =  (searchText) => {
  // console.log(likeable_id,likeable_type);
  return customFetch(API_URLS.searchUsers(searchText),{
    method:'GET'
  })
}