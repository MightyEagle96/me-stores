import React, { useState, useEffect } from 'react';
import Footer from '../../../../components/Footer/Footer';
import Navbar from '../../../../components/Navbar/Navbar';
import { SideMenu } from '../SideMenu/SideMenu';
import {
  MDBInput,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
} from 'mdbreact';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

import Select from '@material-ui/core/Select';
import { agentRoles } from '../../../../data/data';
import { httpService } from '../../../../data/services';

export default function AgentsListPage() {
  const [open, setOpen] = useState(false);
  const defaultData = {
    isAgent: true,
    password: 'password',
  };
  const [formData, setFormData] = useState(defaultData);

  const [agents, setAgents] = useState([]);

  const toggleModal = () => {
    setOpen(!open);
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const createAgent = async () => {
    const path = 'agents';
    const res = await httpService.post(path, formData);
    if (res) {
      setFormData(defaultData);
      getAgents();
      toggleModal();
    } else {
      console.log('Wahala dey o');
      toggleModal();
    }
  };

  const getAgents = async () => {
    const path = 'agents?isAgent=true';
    const res = await httpService.get(path);
    if (res) {
      setAgents(res.data.agents);
    }
  };

  useEffect(() => {
    getAgents();
  }, []);
  return (
    <div>
      <Navbar></Navbar>
      <div className="row">
        <div className="col-md-3">
          <SideMenu />
        </div>
        <div className="col-md-9">
          <div className="p-3">
            <div className="">
              <div className="d-flex justify-content-between">
                <div className="h3 text-primary">Agents List</div>
                <button onClick={toggleModal} className="btn btn-primary">
                  New Agent <i class="fa fa-user" aria-hidden="true"></i>
                </button>
              </div>
              <hr color="red" />
            </div>
            <div>
              <MDBTable hover>
                <MDBTableHead color="danger-color" textWhite>
                  <tr>
                    <th>Agent</th>
                    <th>Role</th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  {agents.map((agent, index) => {
                    return (
                      <tr key={index}>
                        <td>{agent.fullName}</td>
                        <td>{agent.role}</td>
                      </tr>
                    );
                  })}
                </MDBTableBody>
              </MDBTable>
            </div>
          </div>
        </div>
        <MDBModal isOpen={open} centered>
          <MDBModalHeader>Add new Agent</MDBModalHeader>
          <MDBModalBody>
            <div className="p-3">
              <form>
                <div className="grey-text">
                  <MDBInput
                    label="Enter agent's first name"
                    icon="user"
                    group
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    validate
                    error="wrong"
                    success="right"
                  />
                  <MDBInput
                    label="Enter agent's last name"
                    icon="user"
                    group
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    validate
                    error="wrong"
                    success="right"
                  />
                  <MDBInput
                    label="Enter agent's email address"
                    icon="envelope"
                    group
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    validate
                    error="wrong"
                    success="right"
                  />
                  <MDBInput
                    label="Enter agent's phone number"
                    icon="phone"
                    group
                    type="number"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    validate
                    error="wrong"
                    success="right"
                  />
                  <div className="text-center">
                    <InputLabel>Choose Agent role</InputLabel>
                    <Select
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                    >
                      {agentRoles.map((agentRole, index) => {
                        return (
                          <MenuItem key={index} value={agentRole.key}>
                            {agentRole.value}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </div>
                </div>
              </form>
            </div>
          </MDBModalBody>
          <MDBModalFooter>
            <button className="btn btn-success" onClick={createAgent}>
              Create Agent
            </button>
            <button className="btn btn-danger" onClick={toggleModal}>
              Cancel
            </button>
          </MDBModalFooter>
        </MDBModal>
      </div>
      <Footer></Footer>
    </div>
  );
}
