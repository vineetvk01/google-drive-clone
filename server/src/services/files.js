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

export const deleteFileByUser = async (parentId = 'root', childId,  user) => {

  // TODO: Validate file name

  console.log('\n\n\n',parentId, childId);

  await FileSystem.findOneAndDelete({
    childId: childId,
    parentId: parentId,
    ownerId: user.username
  });

  return true;
}

