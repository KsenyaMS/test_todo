import React, {useState} from "react";
import {Button, Col, Divider, Input, message, Modal, Row, Select, Space} from "antd";
import "./ControlPanel.css";
import CancelButtonAntd from "../components/CancelButtonAntd";
import ConfirmationButtonAntd from "../components/ConfirmationButtonAntd";

const { TextArea } = Input;
const { Option } = Select;
const rowStyle = {padding: '4px'};

export default function NameDialog({visible, onOk, onCancel}) {
  let [data, setData] = useState([]);
  const namesList = JSON.parse(localStorage.getItem("NAMES")) ? JSON.parse(localStorage.getItem("NAMES")) : [];

  const handleNameChange = (projectName) => {
    // console.log({localStorage});
    setData({...data, ...{name: projectName}})
  };

  return (
      <Modal
        className="size-for-middle-window"
        style={{top: 10}}
        title={"Создание проекта"}
        open={visible}
        destroyOnClose={true}
        footer={null}
      >
        <Divider style={{marginTop: '0px'}}/>
        <Row gutter={[0, 16]} style={rowStyle}>
          <Col span={8}>Название проекта</Col>
          <Col md={16}>
            <Input
              allowClear={true}
              onChange={(e) => { handleNameChange(e.target.value)}}
            />
          </Col>
        </Row>
        <Row gutter={[0, 16]} style={rowStyle}>
          <Col span={8}>Описание</Col>
          <Col md={16}>
            <TextArea
              allowClear={true}
              onChange={(e) => {setData({...data, ...{description: e.target.value}});}}
            />
          </Col>
        </Row>
        <Row gutter={[0, 16]} style={rowStyle}>
        <div style={{width: '100%'}}>
          <div style={{width: '80%', float: 'right'}} >
            <Space style={{float: "right", marginTop: 10}} wrap direction="horizontal">
              <CancelButtonAntd value="Отмена" onClick={() => {onCancel()}}/>
              <ConfirmationButtonAntd value="Сохранить" onClick={() => {
                if(!data.name) {
                  message.warning("Укажите название проекта!")
                  return;
                }
                if (namesList.length !== 0) {
                  let result = namesList.find((s) => s === data.name)
                  if (result !== undefined) {
                    message.warning("Проект с таким названием уже существует, пожалуйста, смените название!")
                    return;
                  }
                }
                // message.success("Проект создан!")
                onOk(data);
              }}/>
            </Space>
          </div>
        </div>
        </Row>
      </Modal>
  );}