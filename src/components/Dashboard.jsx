import React, { useState } from 'react';
import './Dashboard.css';
import logoimage from './assets/1k-logo.svg';
import defaultAvatar from './assets/1k-logo.svg';
import { Navigate, useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [regDate, setRegDate] = useState('');
  const [plan, setPlan] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [tableWidth, setTableWidth] = useState('100%');
  const [newposition, setNewPosition] = useState('1400px');
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [userAvatar, setUserAvatar] = useState(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();
  const [isShowLogOut, SetIsShowLogOut] = useState(false);
  const addRow = () => {
    if (name && company && plan) {
      const today = new Date();
      const date = today.getFullYear() + '.' + (today.getMonth() + 1) + '.' + today.getDate();
      setRegDate(date);

      setData([...data, { name, company, plan, regDate: date, avatar: userAvatar }]);
      setName('');
      setCompany('');
      setPlan('Free');
      setShowForm(false);
      setTableWidth('100%');
      setNewPosition('1400px');
    } else {
      alert('All fields are required.');
    }
  };

  const tableWidthSmall = () => {
    setAvatar(null);
    setUserAvatar(null);
    setName('');
    setCompany('');
    setPlan('Free');
    setShowForm(true);
    setTableWidth('75%');
    setNewPosition('1070px');
  };

  const closeForm = () => {
    setShowForm(false);
    setTableWidth('100%');
    setNewPosition('1400px');
    setSelectedRowIndex(null);
    setAvatar(null);
    setUserAvatar(null);
  };

  const editRow = (index) => {
    setTableWidth('75%');
    const editedRow = data[index];
    setName(editedRow.name);
    setRegDate(editedRow.regDate);
    setCompany(editedRow.company);
    setPlan(editedRow.plan);
    setSelectedRowIndex(index);
    setAvatar(editedRow.avatar);
    setUserAvatar(editedRow.avatar);
    setShowForm(true);
    setTableWidth('75%');
    setNewPosition('1070px');
  };
  const handleLogout = () => {
    setIsLoggingOut(true);
    setTimeout(() => {
      navigate('/Login');
    }, 1000);
  };
  const handleRowClick = (index) => {
    setSelectedRowIndex(index);
    setUserAvatar(data[index].avatar);
    populateFormWithData(index);
  }
  const updateRow = () => {
    if (name && company && plan) {
      const updatedData = [...data];
      const originalRegDate = updatedData[selectedRowIndex].regDate;
      updatedData[selectedRowIndex] = { name, company, plan, regDate: originalRegDate, avatar: userAvatar };
      setData(updatedData);
      setTableWidth('75%');
      closeForm();
    } else {
      alert('All fields are required.');
    }
  };
  const populateFormWithData = (index) => {
    const selectedRowData = data[index];
    setName(selectedRowData.name);
    setCompany(selectedRowData.company);
    setPlan(selectedRowData.plan);
    setTableWidth('75%');
    setNewPosition('1070px');
    setShowForm(true);
  };

  const handleAvatarChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const fileReader = new FileReader();
      fileReader.onload = (event) => {
        setUserAvatar(event.target.result);
      };
      fileReader.readAsDataURL(e.target.files[0]);
    }
  };
  const setShowLogOut = () => {
    SetIsShowLogOut(true);
  };

  return (
    <div>
      <header className="header">
        <div className="logo-container">
          <img src={logoimage} alt="Logo" className="logo" />
          <p className="site-title">Client Management System</p>
          <p className="site-title-right">Welcome, Alex!</p>
          <img src={defaultAvatar} alt="avatar" className="logo-avatar" onClick={setShowLogOut}/>
          <div>
          {isShowLogOut && (
        <button onClick={handleLogout} className="LogOutButton">
          {isLoggingOut ? 'Logging out...' : 'Logout'}
        </button>)}
    </div>
        </div>
      </header>

      <p className="countclients">{data.length} Clients<button className='CreateNewButton' onClick={tableWidthSmall} style={{ marginLeft: newposition }}>New</button></p>      <div className="main-data-table" style={{ width: tableWidth }}>
        <table className="crud-table" style={{ width: tableWidth }}>
          <thead>
            <tr>
              <th>Avatar</th>
              <th>Name</th>
              <th>Company</th>
              <th>Reg. Date</th>
              <th>Plan</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item, index) => (
              <tr
                key={index}
                onClick={() => handleRowClick(index)}
                className={selectedRowIndex === index ? 'selected-row' : ''}
              >
                <td className="avatar-cell">
                  <div className="avatar">
                    {item.avatar ? (
                      <img src={item.avatar} alt="Avatar" className="logo-abc-avatar" />
                    ) : (
                      <div className="default-avatar">
                        {item.name.charAt(0).toUpperCase() + item.name.charAt(item.name.length / 2).toUpperCase()}
                      </div>
                    )}
                  </div>
                </td>
                <td>{item.name}</td>
                <td>{item.company}</td>
                <td>{item.regDate}</td>
                <td>{item.plan}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {showForm && (
          <form className="crud-form">
            {selectedRowIndex === null ? <p className='NewClient'>New Client</p> :
              <p className='NewClient'>{data[selectedRowIndex].name}</p>
            }
            <div className="newclientavatar">
              <label htmlFor="avatarInput" className="avatar-label">
                {userAvatar ? (
                  <img src={userAvatar} alt="Avatar" className="logo-ab-avatar" />
                ) : (
                  <div className="newclientavatar">
                    {name.charAt(0).toUpperCase() + name.charAt(name.length / 2).toUpperCase()}
                  </div>
                )}
              </label>
            </div>
            <input type="file" id="avatarInput" onChange={handleAvatarChange} style={{ display: 'none' }} />
            <input type="text" value={name} placeholder="Name" onChange={(e) => setName(e.target.value)} />
            <input type="text" value={company} placeholder="Company" onChange={(e) => setCompany(e.target.value)} />
            <select value={plan} onChange={(e) => setPlan(e.target.value)}>
              <option value="Free">Free</option>
              <option value="Gold">Gold</option>
              <option value="Silver">Silver</option>
            </select>
            {
              selectedRowIndex !== null ?
                <button type="button" onClick={updateRow} className="add-btn">
                  Save
                </button> :
                <button type="button" onClick={addRow} className="add-btn">
                  Register
                </button>
            }
            <button type="button" onClick={closeForm} className="cancel-btn">Cancel</button>
            <button type="button" onClick={closeForm} className="close-btn">
              X
            </button>
          </form>
        )}
      </div>

    </div>
  );
};

export default Dashboard;
