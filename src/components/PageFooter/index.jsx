import React, { useState } from 'react';
import './style.css';
import AddPlantButton from './components/AddPlantButton';
import { useNavigate } from 'react-router-dom';
import { Modal, Button } from 'bootstrap';
import CustomModal from '../CustomModal';
import ContentContainer from '../ContentContainer';
import CreatePlantForm from './components/CreatePlantForm'

export default function PageFooter() {
const navigate = useNavigate();
const [show, setShow] = useState(false);

const handleClose = () => {
  setShow(false)
};
const handleShow = () => {
  setShow(true)
};

const handleHomeClick = () => {
  navigate('/app');
}


// Modal Properties
const plantFormProps = {
  setShow: setShow,
  show: show
}

const contentChildren =
  <>
    <CreatePlantForm {...plantFormProps}></CreatePlantForm>
  </>
const children = <ContentContainer children={contentChildren} classNames={["custom-modal-content"]}/>

const modalProps = {
  children: children,
  show: show,
  setShow: setShow
}
  return (
    <>
    <CustomModal {...modalProps}/>
    <div id="page-footer">
      <div className='testo' onClick={handleHomeClick}>Home</div>
      <div id="add-plant-btn" onClick={handleShow}>+</div>
      <div className='testo'>TEST</div>
    </div>
    </>
  )
}
