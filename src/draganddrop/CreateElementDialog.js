import React, {useState, useEffect} from "react";
import {Col, DatePicker, Input, message, Modal, Row, Select, Space} from "antd";
import CancelButtonAntd from "../components/CancelButtonAntd";
import ConfirmationButtonAntd from "../components/ConfirmationButtonAntd";
const rowStyle = {padding: '4px'};
const { TextArea } = Input;

export default function CreateElementDialog({visible, data, type, onOk, onCancel}) {
  let [params, setParams] = useState([]);
  let [id, setId] = useState(null);

  useEffect(() => {
    if(data && type === "new") {
      // console.log({data});
      let id = Math.floor(Math.random() * 1000);
      let res = data.find((s) => Number(s.id) === id);
      let result = res !== undefined;
      if (result === true) {
        while (result === true) {
          id = Math.floor(Math.random() * 1000);
          res = data.find((s) => Number(s.id) === id);
          result = res !== undefined;
          if (result === false) break;
        }
      }
      setParams({...params, ...{status: "at_work"}})
      setId(id);
      // setParams({...params, ...{index: id}});
    } else if (data && type === "project") {
      console.log({data});
      setParams(data);
      setId(data.id);
    } else {
      setParams(null);
    }
  }, [data]);

  return (
    <Modal
      destroyOnClose={true}
      footer={null}
      // className="dialog-modal-style"
      style={{top: 10}}
      title="Создание задачи"
      open={visible}
      >
      <Row gutter={[0, 16]} style={rowStyle}>
        <Col span={6}>Название задачи</Col>
        <Col md={18}>
          <Input
            allowClear={true}
            value={params ? params.name : ""}
            onChange={(e) => { setParams({...params, ...{name: e.target.value}}) }}
          />
        </Col>
      </Row>
      <Row gutter={[0, 16]} style={rowStyle}>
        <Col span={6}>Описание</Col>
        <Col md={18}>
          <TextArea
            allowClear={true}
            value={params ? params.description : ""}
            onChange={(e) => {setParams({...params, ...{description: e.target.value}});}}
          />
        </Col>
      </Row>
      <Row gutter={[0, 16]} style={rowStyle}>
        <Col span={6}>Подзадача</Col>
        <Col md={18}>
          <Input
            allowClear={true}
            value={params ? params.task : ""}
            onChange={(e) => { setParams({...params, ...{task: e.target.value}}) }}
          />
        </Col>
      </Row>
      <Row gutter={[0, 16]} style={rowStyle}>
        <Col span={6}>Срок выполнения</Col>
        <Col md={18}>
          <DatePicker
            allowClear={true}
            placeholder="Срок выполнения"
            showTime
            // defaultValue={application && application.accident_date ? dayjs(application.accident_date, dateFormat) : null}
            onChange={(dates, dateStrings) => {setParams({...params, ...{date: dateStrings}}); }}
            style={{width: 250}}
          />
        </Col>
      </Row>
      <Row gutter={[0, 16]} style={rowStyle}>
        <Col span={6}>Комментарий</Col>
        <Col md={18}>
          <TextArea
            allowClear={true}
            value={params ? params.comment : ""}
            onChange={(e) => {setParams({...params, ...{comment: e.target.value}});}}
          />
        </Col>
      </Row>
      <Space style={{marginLeft: "55%", marginTop: 20}} wrap direction="horizontal">
        <CancelButtonAntd value="Вернуться" onClick={() => {
          onCancel();
          setParams(null);
        }}/>
        <ConfirmationButtonAntd value="Создать" onClick={() => {
          if(!params.name) {
            message.warning("Укажите название задачи!");
            return;
          }
          if(!params.description) {
            message.warning("Укажите описание!");
            return;
          }
          if(!params.date) {
            message.warning("Укажите срок выполнения!");
            return;
          }
          // if(!params.moneySpent) {
          //   message.warning("Укажите сумму потраченных средств!");
          //   return;
          // }
          onOk(params, id);
          setParams(null);
        }}/>
      </Space>
    </Modal>
  );}