import _ from 'lodash';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import useOutside from "../../customHooks/clickOutside";
import { IoArrowBackCircle } from 'react-icons/io5';
import { IoIosClose } from 'react-icons/io';
import { useToasts } from 'react-toast-notifications';
import { AiOutlineSearch, AiOutlineLogout } from 'react-icons/ai';
import { fetchSession } from '../../store/session/actions';
import folderImage from '../../assets/folder.png';
import fileImage from '../../assets/file.png';
import addNewButton from '../../assets/add_new_button.png';
import styles from './drive.module.less';
import { fetchFiles, createFile, deleteFile, renameFile, searchFiles, logoutUser } from './requests';
import { useDispatch } from 'react-redux';

const nameTrimmer = (value, length = 11) => {
  return _.truncate(
    _.trim(value), {
      'length': length,
      'omission': '..'
    }
  )
}

const DriveContainer = () => {
  const [modalVisible, setModalVisible] = useState({ show: false });
  const dispatch = useDispatch();
  const [contextVisible, setContextVisible] = useState({visible: false});
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(true);
  const [allFiles, setAllFiles] = useState([]);
  const [ directory, setDirectory ] = useState([{
    name: 'root',
    id: 'root',
  }]);
  const lastIndex = directory.length - 1;
  const currentParent = directory[lastIndex];
  const { addToast } = useToasts();
  const isSearchActive = searchText.length > 0;

  const fetchAllTheFiles = useCallback(async (currentParentId) => {
    setLoading(true);
    const response = await fetchFiles(currentParentId);
      if(response.data.success){
        const files = _.get(response, 'data.data.files', []);
        setAllFiles(files);
      }
      setLoading(false);
  }, []);

  const handleContextMenu = useCallback((event, child) => {
    event.preventDefault();
    const xPos = event.pageX + "px";
    const yPos = event.pageY + "px";

    console.log(event);

    setContextVisible({
      visible: true,
      top: yPos,
      left: xPos,
      child
    })
  }, []);

  const handleSearch = async(value) => {
    if(value === ''){
      fetchAllTheFiles(currentParent.id);
      return;
    }
    const response = await searchFiles(value);
    if(response.data.success){
      const searchedFiles = _.get(response, 'data.data.files', []);
      setAllFiles(searchedFiles);
    }
  }

  const debouncedSearch = useCallback(
    _.debounce(handleSearch, 400),
    []
  );

  useEffect(() => {
    debouncedSearch(searchText);
  }, [debouncedSearch, searchText])

  useEffect(() => {
    fetchAllTheFiles(currentParent.id);
  }, [currentParent.id, fetchAllTheFiles])

  const handleNavigation = (parent) => {
    const directoryClone = _.clone(directory);
    directoryClone.push(parent);
    setDirectory(directoryClone);
  }

  const handleBack = (index) => {
    if(directory.length === 1) return;
    if(isSearchActive) return;

    let directoryClone = _.clone(directory);
    console.log('DD', directoryClone);

    if(Number.isInteger(index)){
      console.log('SLICE ?', directoryClone);
      directoryClone = directoryClone.slice(0, index + 1);
    } else {
      console.log('POP ?', directoryClone);
      directoryClone.pop();
    }

    console.log(directoryClone);
    setDirectory(directoryClone);
  }

  const handleCloseContext = () => {
    setContextVisible({ visible: false });
  }

  const handleRenameClick = (child) => {
    setContextVisible({ visible: false });
    setModalVisible({ type: 'edit', child, show: true });
  }

  const handleDelete = async (child) => {
    await deleteFile(currentParent.id, child.id);
    const cloneFiles = _.cloneDeep(allFiles);
    const newFiles = _.filter(cloneFiles, (file) => file.childId !== child.id);
    setAllFiles(newFiles);
    handleCloseContext();
  }

  const renderDirectory  = () => {
    const lastIndex = directory.length - 1;
    return (
      <div>
        {
          _.map(directory, (path, index) => {
            return (
              <div className={styles.pathName} onClick={() => handleBack(index)} title={path.name}>
                <span className={lastIndex === index ? styles.active : ''}>{nameTrimmer(path.name, 20)}</span>
                <span> / </span>
              </div>)
          })
        }
      </div>
    )
  }

  const renderFilesAndFolder = () => {
    return (
      <div className={styles.container}>
        {
          _.map(allFiles, (info) => {
            const { displayName, childId, type } = info;

            if(type === 'folder') {
              return (
                <div className={styles.folder} key={childId}  title={displayName} 
                  onDoubleClick={() => handleNavigation({ id: childId, name: displayName })}
                  onContextMenu={(event) => handleContextMenu(event, { id: childId, name: displayName } )}>
                  <img src={folderImage} alt="Folder" width="60"  />
                  <p className={styles.name}>{nameTrimmer(displayName)}</p>
                </div>
              )
            } else if (type === 'file') {
              return (
                <div className={styles.file} key={childId} title={displayName}
                  onContextMenu={(event) => handleContextMenu(event, { id: childId, name: displayName } )}
                >
                  <img src={fileImage} alt="Folder" width="55" />
                  <p className={styles.name}>{nameTrimmer(displayName)}</p>
                </div>
              )
            }
            
          })
        }
        {!isSearchActive && <div className={styles.addNew}>
          <img src={addNewButton} alt="Add New" onClick={() => setModalVisible({ type: 'create', show: true })} />
        </div>
        }
      </div>
    )
  }

  const handleCreate = async (filename, type, parentId) => {
    const response = await createFile(filename, type, parentId);
    if(response.data.success){
      addToast('Created Successfully', {
        appearance: 'success',
        autoDismiss: true,
      })
      fetchAllTheFiles(currentParent.id);
      setModalVisible({ show: false, type: 'create' });
    }
  }

  const handleRename = async (filename, parentId, childId) => {
    const response = await renameFile(filename, parentId, childId);
    if(response.data.success){
      addToast('Renamed Successfully', {
        appearance: 'success',
        autoDismiss: true,
      })
      fetchAllTheFiles(currentParent.id);
      setModalVisible({ show: false, type: 'edit' });
    }
  }

  const renderLoader = () => {
    return (
      <div>
        Loading...
      </div>
    )
  }

  const renderSearchDetails = () => {
    return (
      <div className={styles.searchResult}>
        <span>Found Results:</span> {allFiles.length} Items
      </div>
    )
  }

  const handleLogout = async () => {
    await logoutUser();
    dispatch(fetchSession());
  }

  return (
    <div className={styles.driveContainer}>
      <div className={styles.navigation}>
        <div className={styles.back}>
          <IoArrowBackCircle onClick={handleBack} className={lastIndex > 0 ? styles.activeNav : styles.disabledNav} />
        </div>
        <div className={styles.breadcrumbs}>
          {isSearchActive ? renderSearchDetails() : renderDirectory()}
        </div>
        <div className={styles.rightContainer}>
          <div className={styles.searchBox}>
            <span className={styles.prefix}><AiOutlineSearch /></span>
            <input placeholder="Search files and folders" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
          </div>
          <AiOutlineLogout className={styles.logout} title="Logout" onClick={handleLogout} />
        </div>
        
      </div>
      <div className={styles.filesAndFolder}>
        {loading ? renderLoader() : renderFilesAndFolder()}
      </div>
      <Modal 
        visible={modalVisible}
        closeModal={() => setModalVisible({ show: false  })}
        parent={currentParent}
        createFile={handleCreate}
        renameFile={handleRename}
      />
      <ContextMenu 
        context={contextVisible} 
        closeContext={handleCloseContext} 
        handleDelete={handleDelete}
        handleRename={handleRenameClick}
      />
    </div>
  )
};

export default React.memo(DriveContainer);

const Modal = ({visible = { show: false }, closeModal, parent, createFile, renameFile }) => {
  const { show, type, child } = visible;
  const [fileName, setFileName] = useState('');
  const [fileType, setFileType] = useState('folder');

  const [render, setRender] = useState({ 
    visibility: 'hidden', 
    opacity: 0,
  });

  useEffect(() => {
    if(show) {
      setTimeout(() => {
        setRender({ 
          visibility: 'visible', 
          opacity: 1
        });
      }, 300);
    } else {
      setRender({ 
        visibility: 'hidden', 
        opacity: 0
      });
    }
  }, [show]);

  const handleSubmit = () => {
    if(type === 'create'){
      createFile(fileName, fileType, parent.id);
    } else {
      renameFile(fileName, parent.id, child.id );
    }
  }

  return (
    <div className={styles.modalContainer} style={render}>
      <div className={styles.modal} style={type==='create' ? {}: {height: '200px'}}>
        <IoIosClose className={styles.cross} onClick={() => { closeModal(); setFileName(''); }} />
        <h5 className={styles.title}>{type === 'create' ? 'Create New' : 'Edit Name'}</h5>
        {type === 'create' && <div className={styles.radioWrapper}>
          <input type="radio" name="fileType" id={styles.option1} checked={fileType === 'folder'} onChange={console.log} />
          <label htmlFor={styles.option1} className={`${styles.option} ${styles.option1}`} onClick={() => setFileType('folder')}>
            <span>Folder</span>
          </label>
          <input type="radio" name="fileType" id={styles.option2} checked={fileType === 'file'} onChange={console.log} />
          <label htmlFor={styles.option2} className={`${styles.option} ${styles.option2}`} onClick={() => setFileType('file')}>
            <span>File</span>
          </label> 
        </div>
        }
        <input className={styles.fileName} onChange={(e) => setFileName(e.target.value)} value={fileName || _.get(child, 'name', '')} placeholder="Enter File/Folder Name" />
        <button className={styles.submit} onClick={handleSubmit} disabled={fileName.length === 0}>{type === 'create' ? 'Create' : 'Rename'}</button>
      </div>
    </div>
  )
}

const ContextMenu = ({ context, closeContext, handleRename, handleDelete }) => {
  const { top, left, visible, child }  = context;

  const wrapperRef = useRef(null);
  useOutside(wrapperRef, closeContext);

  if(!visible){
    return null;
  }

  return (
    <div ref={wrapperRef} className={styles.contextMenu} style={{ top, left }}>
      <p onClick={() => handleRename(child)}>Rename</p>
      <p style={{ color: '#F04E39' }} onClick={() => handleDelete(child)}>Delete</p>
    </div>
  )
}