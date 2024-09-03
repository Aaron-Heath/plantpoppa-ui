import React, { useState } from 'react'

import ContentContainer from "../../../ContentContainer"
import TextInput from '../../../form-components/TextInput'
import CustomButton from '../../../CustomButton'
import Auth from '../../../../utils/auth'
import { useQuery } from 'react-query'
import { ME, EDIT_ME, DELETE_ME } from '../../../../schemas/api-requests'
import "./style.css"
import { useNavigate } from 'react-router-dom'

export default function settings() {

    const {data, status, isLoading} = useQuery("ME", ME);
    const [editMode, setEditMode] = useState(false);
    const [user, setUser] = useState({})
    const navigate = useNavigate();

    if(data && Object.keys(user).length <=0) {
      setUser(data);
    }

    const handleEditToggle = (e) => {
      setEditMode(!editMode);
    }

    const handleSave = async (e) => {

      const formFields = {
        firstname: document.getElementById("firstName").value.trim(),
        lastname : document.getElementById('lastName').value.trim(),
        phone : document.getElementById('phone').value.trim(),
        zip : document.getElementById('zip').value.trim()
      }



      const payload = {};
      // Iterate over key fields to build payload. Only include parameters that have changed
      for (let key in formFields) {
        // Changing to lowercase to match the API return keys

        if(key === "phone" || key === "zip") { // Phone and zip are nullable and will always be updated in the request.
          payload[key] = formFields[key]; 
        } else if (formFields[key] !== data[key]) {
          payload[key] = formFields[key];
        }
      }

      // If payload is empty, return script.
      if(Object.keys(payload).length <= 0) {
        setEditMode(false);
        return;
      }
      console.log(payload)
      const responseData = await EDIT_ME(payload);

      console.log(responseData);



      setUser(responseData);
      setEditMode(false);
    }

    const handleDelete = async (e) => {
      const confirmation = confirm("Are you sure you want to delete your account? THIS ACTION CANNOT BE UNDONE.")
      if (!confirmation) return;
      
      const responseData = await DELETE_ME();
      Auth.logout();
      navigate("/login");
      
    }

    const editButtonProps = {
      type: "submit",
      text: editMode? "Save" : "Edit",
      onClick: editMode? handleSave : handleEditToggle,
      buttonColor: editMode? "save-button" : "edit-button"
    }

    const deleteButtonProps = {
      type: "submit",
      text: "Delete My Account",
      onClick: handleDelete,
      buttonColor : "danger-button"
    }


    const children = 
    data ? 
    <div id="settings-page">
    <h2>Settings</h2>
      {editMode?
      <>
      <TextInput id="firstName" inputName={"First"} defaultValue={user.firstname} disabled={!editMode}/>
      <TextInput id="lastName" inputName={"Last"} defaultValue={user.lastname} disabled={!editMode}/>

      </>
    :
    <TextInput id="fullName" inputName={"Name"} defaultValue={user.firstname + " " + data.lastname} disabled={!editMode}/>
    }
      <TextInput id="phone" inputName={"Phone"} defaultValue={user.phone} disabled={!editMode}/>
      <TextInput id="zip" inputName={"Zip"} defaultValue={user.zip} disabled={!editMode}/>
      <p><b>Email:</b> {user.email}</p>
      <CustomButton {...editButtonProps}/>
      {editMode?
        <CustomButton {...deleteButtonProps}/>
      :
      <></>
      }
    </div>

    :

    <>
    <h2>Settings</h2>
    <h3>Loading...</h3>
  </>

  return (
    <>
        <ContentContainer children={children}/>
    </>
    
  )
}
