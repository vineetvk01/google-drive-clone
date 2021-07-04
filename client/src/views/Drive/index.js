import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import { IoArrowBackCircle } from 'react-icons/io5';
import { IoIosClose } from 'react-icons/io';
import folderImage from '../../assets/folder.png';
import addNewButton from '../../assets/add_new_button.png';
import styles from './drive.module.less';

const DriveContainer = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [ directory, setDirectory ] = useState(['root', '100']);
  const lastIndex = directory.length - 1;
  const currentParentId = directory[lastIndex];

  const files = [
    {
      id: '100',
      type: 'folder',
      name: 'Folder A',
      parent: 'root'
    },
    {
      id: '101',
      type: 'folder',
      name: 'Folder B',
      parent: 'root'
    },
    {
      id: '102',
      type: 'folder',
      name: 'Folder A-A',
      parent: '100'
    }
  ]

  const renderDirectory  = () => {
    const lastIndex = directory.length - 1;
    return (
      <div>
        {
          _.map(directory, (path, index) => {
            return <><span className={lastIndex === index ? styles.active : ''}>{path}</span><span> / </span></>
          })
        }
      </div>
    )
  }

  const renderFilesAndFolder = () => {
    return (
      <div className={styles.container}>
        {
          _.map([1,2,3,4,5,6,7,8,10,11,12,13,14,15], (path, index) => {
            return (
              <div className={styles.files}>
                <img src={folderImage} alt="Folder" width="60" />
                <p className={styles.name}>Folder A</p>
              </div>
            )
          })
        }
        <div className={styles.addNew}>
          <img src={addNewButton} alt="Add New" onClick={() => setModalVisible(true)} />
        </div>
      </div>
    )
  }


  return (
    <div className={styles.driveContainer}>
      <div className={styles.navigation}>
        <div className={styles.back}>
          <IoArrowBackCircle />
        </div>
        <div className={styles.breadcrumbs}>
          {renderDirectory()}
        </div>
        <div className={styles.search}>
          <input placeholder="Search files and folders" />
        </div>
      </div>
      <div className={styles.filesAndFolder}>
        {renderFilesAndFolder()}
      </div>
      <Modal 
        visible={modalVisible}
        closeModal={() => setModalVisible(false)}
        parentId={currentParentId}
      />
    </div>
  )
};

export default React.memo(DriveContainer);

const Modal = ({visible = false, closeModal, parentId }) => {
  const [fileName, setFileName] = useState('');
  const [fileType, setFileType] = useState('folder');

  const [render, setRender] = useState({ 
    visibility: 'hidden', 
    opacity: 0
  });

  useEffect(() => {
    if(visible) {
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
  }, [visible]);

  const handleCreate = () => {
    console.log(fileName, fileType, parentId);
  }

  return (
    <div className={styles.modalContainer} style={render}>
      <div className={styles.modal}>
        <IoIosClose className={styles.cross} onClick={closeModal} />
        <h5 className={styles.title}>Create New</h5>
        <div className={styles.radioWrapper}>
          <input type="radio" name="fileType" id={styles.option1} checked={fileType === 'folder'} onChange={console.log} />
          <label htmlFor={styles.option1} className={`${styles.option} ${styles.option1}`} onClick={() => setFileType('folder')}>
            <span>Folder</span>
          </label>
          <input type="radio" name="fileType" id={styles.option2} checked={fileType === 'file'} onChange={console.log} />
          <label htmlFor={styles.option2} className={`${styles.option} ${styles.option2}`} onClick={() => setFileType('file')}>
            <span>File</span>
          </label> 
        </div>
        <input className={styles.fileName} onChange={(e) => setFileName(e.target.value)} value={fileName} placeholder="Enter File/Folder Name" />
        <button className={styles.submit} onClick={handleCreate} disabled={fileName.length === 0}>Create</button>
      </div>
    </div>
  )
}