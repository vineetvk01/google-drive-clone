import uuid from 'uuid';
import FileSystem from '../models/FileSystem';

const uidV4 = uuid.v4;

export const getFilesByUser = async (parentId = 'root', user) => {
  let files = await FileSystem.find({ parentId, ownerId: user.username });
  if(!Array.isArray(files)){
    files = [files];
  }
  return files;
}

export const createFileByUser = async (parentId = 'root', { fileName, type },  user) => {

  // TODO: Validate file name

  const file = await FileSystem.create({
    displayName: fileName,
    type: type,
    childId: uidV4(),
    parentId: parentId,
    ownerId: user.username
  });

  return file.toObject();
}

export const updateFileByUser = async (fileName, parentId = 'root', childId,  user) => {

  // TODO: Validate file name

  await FileSystem.findOneAndUpdate({
    childId: childId,
    parentId: parentId,
    ownerId: user.username
  }, {
    displayName: fileName
  });

  return true;
}

const fetchObjectIdOfChildren = async (parentId, user, objIds) => {
  let children = await FileSystem.find({ parentId, ownerId: user.username });

  if(!children){
    return;
  }

  if(!Array.isArray(children)){
    children = [children];
  }

  for(let i=0; i< children.length; i++){
    const child = children[i];
    objIds.push(child._id);
    if(child.type === 'folder'){
      await fetchObjectIdOfChildren(child.childId, user, objIds);
    }
  }
}

const handleAsyncChildDelete = async (parentId, user) => {
  const objIds = [];
  await fetchObjectIdOfChildren(parentId, user, objIds);
  return objIds;
}


export const deleteFileByUser = async (parentId = 'root', childId,  user) => {

  await FileSystem.findOneAndDelete({
    childId: childId,
    parentId: parentId,
    ownerId: user.username
  });

  const objectIds = await handleAsyncChildDelete(childId, user);
  console.log('Going to delete files Ids', objectIds);
  await FileSystem.deleteMany({ _id: { $in : objectIds }});
  return true;
}

export const searchFileByUser = async (searchText,  user) => {

  // TODO: Validate file name

  let files = await FileSystem.find({ displayName:  { $regex: '.*' + searchText + '.*' }, ownerId: user.username });
  if(!Array.isArray(files)){
    files = [files];
  }
  return files;
}

