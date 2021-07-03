import _ from 'lodash';
import React, { useState } from 'react';
import { IoArrowBackCircle } from 'react-icons/io5';
import { IoIosClose } from 'react-icons/io';
import folderImage from '../../assets/folder.png';
import addNewButton from '../../assets/add_new_button.png';
import styles from './drive.module.less';

const DriveContainer = () => {
  const [ directory, setDirectory ] = useState(['root', '100']);

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
    const lastIndex = directory.length - 1;
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
          <img src={addNewButton} alt="Add New" />
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
      <Modal />
    </div>
  )
};

export default React.memo(DriveContainer);

const Modal = () => {
  return (
    <div className={styles.modalContainer}>
      <div className={styles.modal}>
        <IoIosClose className={styles.cross} />
        <h5 className={styles.title}>Create New</h5>
        <div className={styles.radioWrapper}>
          <input type="radio" name="fileType" id={styles.option1} checked />
          <label for={styles.option1} className={`${styles.option} ${styles.option1}`}>
            <span>Folder</span>
          </label>
          <input type="radio" name="fileType" id={styles.option2} />
          <label for={styles.option2} className={`${styles.option} ${styles.option2}`}>
            <span>File</span>
          </label> 
        </div>
        <input className={styles.fileName} />
        <button className={styles.submit}>Create</button>
      </div>
    </div>
  )
}