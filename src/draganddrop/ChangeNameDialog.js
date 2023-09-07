import React, {useState} from "react";
import {Col, Divider, Input, message, Modal, Row} from "antd";
import "../controlpanel/ControlPanel.css";
import CancelButtonAntd from "../components/CancelButtonAntd";
import ConfirmationButtonAntd from "../components/ConfirmationButtonAntd";

const rowStyle = {padding: '4px'};

export default function ChangeNameDialog({visible, onOk, onCancel}) {
  let [data, setData] = useState([]);
  const namesList = JSON.parse(localStorage.getItem("NAMES")) ? JSON.parse(localStorage.getItem("NAMES")) : [];

  const handleNameChange = (projectName) => {
    setData({...data, ...{name: projectName}})
  };

  return (
      <Modal
        className="size-for-middle-window"
        style={{top: 10}}
        title={"Изменение названия проекта"}
        open={visible}
        destroyOnClose={true}
        footer={[
          <CancelButtonAntd value="Отмена" onClick={() => {onCancel()}}/>,
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
            onOk(data);
          }}/>
        ]}
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
      </Modal>
  );}