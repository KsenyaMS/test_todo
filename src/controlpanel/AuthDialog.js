import React, {useState} from "react";
import {Button, Col, Divider, Input, message, Modal, Row, Select, Space} from "antd";
import "./ControlPanel.css";
import NameDialog from "./NameDialog";
import ConfirmationButtonAntd from "../components/ConfirmationButtonAntd";

const rowStyle = {padding: '4px'};

export default function AuthDialog({visible, onOk, onCancel}) {
  let [data, setData] = useState(null);
  let [nameVisible, setNameVisible] = useState(false);
  const namesList = JSON.parse(localStorage.getItem("NAMES")) ? JSON.parse(localStorage.getItem("NAMES")) : [];

  return (
    <>
      <Modal
        className="size-for-small-window"
        style={{top: 10}}
        title={"Выбор проекта"}
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
              onChange={(e) => { setData({...data, ...{name: e.target.value}}) }}
            />
          </Col>
        </Row>
        <Space style={{marginLeft: "30%", marginTop: 20}} wrap direction="horizontal">
          <Row gutter={[0, 16]} style={rowStyle}>
            <ConfirmationButtonAntd
              onClick={() => {
                if(!data.name) {
                  message.warning("Укажите название проекта!")
                  return;
                }
                if (namesList.length !== 0) {
                  let result = namesList.find((s) => s === data.name)
                  if (result === undefined) {
                    message.warning("Проекта с таким названием не существует, пожалуйста, смените название!")
                    return;
                  }
                }
                onOk(data);
              }}
              value="Войти в проект"
            />
          </Row>
        </Space>
        <Space style={{marginLeft: "27%"}} wrap direction="horizontal">
          <Row gutter={[0, 16]} style={rowStyle}>
            <Button type="link" onClick={() => {setNameVisible(true);}}>Создать новый проект</Button>
          </Row>
        </Space>
      </Modal>
      <NameDialog
        visible={nameVisible}
        onOk={(data) => { setNameVisible(false); onCancel(data);}}
        onCancel={() => { setNameVisible(false); }}
      />
    </>
  );}