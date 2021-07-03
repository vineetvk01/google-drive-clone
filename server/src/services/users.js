import User from '../models/User';
import _ from 'lodash';


export const createUser = async (user) => {
  if(!user.name || !user.username || !user.password){
    throw new Error('Missing required fields');
  }

  const { username, name, password } = user;

  const userExists = await User.findOne({ username });
  if(userExists){
    throw new Error('Username already taken');
  }

  const newUser = await User.create({ username, name, password });

  return _.omit(newUser.toObject(), 'password');
}

export const fetchUser = async ({ username }) => {

  const user = await User.findOne({ username });
  if(!user){
    throw new Error(`No User found with username, ${username}`);
  }

  return user;
}

export const loginRequest = async ({ username, password }) => {
  const user = await User.findOne({ username, password });
  
  if(!user){
    throw new Error(`No User found with username, ${username}`);
  }

  return _.omit(user.toObject(), 'password');
}