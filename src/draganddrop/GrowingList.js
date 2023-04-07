import React, {useState, useEffect} from "react";
import {DeleteOutlined, EditOutlined, CheckSquareOutlined, BorderOutlined} from '@ant-design/icons';
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Button, Radio, Space, Typography } from "antd";
import "./GrowingList.css"
import ConfirmationButtonAntd from "../components/ConfirmationButtonAntd";
import CreateElementDialog from "./CreateElementDialog";
import ChangeNameDialog from "./ChangeNameDialog";

export default function GrowingList({title, project}) {
  const namesList = JSON.parse(localStorage.getItem("NAMES")) ? JSON.parse(localStorage.getItem("NAMES")) : [];
  let [state, setState] = useState([]);
  let [visible, setVisible] = useState(false);
  let [changeVisible, setChangeVisible] = useState(null);
  let [nameDialogVisible, setNameDialogVisible] = useState(false);
  let [tasksType, setTasksType] = useState("tasks");
  let [projectName, setProjectName] = useState(title);

  useEffect(() => {
    setProjectName(title);
    let type = window.localStorage.getItem(`${projectName} + tasksType`);
    setTasksType(type);
    if (type === "tasks") {
      setState(JSON.parse(localStorage.getItem(projectName)) ? JSON.parse(localStorage.getItem(projectName)) : []);
    }
    else if (type === "done") {
      let items = JSON.parse(localStorage.getItem(projectName)) ? JSON.parse(localStorage.getItem(projectName)) : [];
      let result = items.filter((s) => s.status === "done");
      setState(result);
    }
    else if (type === "at_work") {
      let items = JSON.parse(localStorage.getItem(projectName)) ? JSON.parse(localStorage.getItem(projectName)) : [];
      let result = items.filter((s) => s.status === "at_work");
      setState(result);
    }
  }, [project]);

  const onDragEnd = (result) => {
    let newItems = [...state];
    let [removed] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, removed);
    setState(newItems);
    window.localStorage.setItem(projectName, JSON.stringify(newItems));
  };

  const onAddElement = (params, id) => {
    let items = [...state];
    let res = {
      id: id.toString(),
      name: params.name,
      description: params.description,
      task: params.task,
      date: params.date,
      status: params.status,
      comment: params.comment ? params.comment : "",
    };
    items = [...items, res];
    setState(items);
    window.localStorage.setItem(projectName, JSON.stringify(items));
  };

  const onChangeElement = (params, id) => {
    // window.localStorage.removeItem("1");
    let items = [...state];
    let element = items.find((s) => s.id === id);
    let index = items.indexOf(element);
    items.splice(index, 1);
    let res = {
      id: id.toString(),
      name: params.name,
      description: params.description,
      task: params.task,
      date: params.date,
      status: params.status,
      comment: params.comment ? params.comment : "",
    };
    items.splice(index, 0, res);
    setState(items);
    window.localStorage.setItem(projectName, JSON.stringify(items));
    console.log({localStorage});
  };
  
  const deleteElement = (value) => {
    let items = [...state];
    let element = items.find((s) => s.id === value);
    let index = items.indexOf(element);
    items.splice(index, 1);
    setState(items);
    window.localStorage.setItem(projectName, JSON.stringify(items));
  };
  
  const handleTaskStatusChange = (value) => {
    let items = [...state];
    let element = items.find((s) => s.id === value);
    let index = items.indexOf(element);
    if (items[index].status === "done") items[index].status = "at_work";
    else if (items[index].status === "at_work") items[index].status = "done"
    setState(items);
    window.localStorage.setItem(projectName, JSON.stringify(items));
  };

  const handleTypeChange = (e) => {
    if (e.target.value === "tasks") {
      setState(JSON.parse(localStorage.getItem(projectName)) ? JSON.parse(localStorage.getItem(projectName)) : []);
      window.localStorage.setItem(`${projectName} + tasksType`, "tasks");
      setTasksType("tasks");
    }
    else {
      let list = JSON.parse(localStorage.getItem(projectName)) ? JSON.parse(localStorage.getItem(projectName)) : [];
      window.localStorage.setItem(`${projectName} + tasksType`, e.target.value);
      setTasksType(e.target.value);
      let items = [...list];
      let result = items.filter((s) => s.status === e.target.value);
      setState(result);
    }
  };

  const onChangeName = (name) => {
    console.log({name});
    let lastList = namesList;
    let element = lastList.find((s) => s === projectName);
    let index = lastList.indexOf(element);
    lastList.splice(index, 1);
    let newList = [...lastList, name.name];
    setProjectName(name.name);
    window.localStorage.setItem("NAMES", JSON.stringify(newList));
  };


  return (
    <>
      <div class="flexbox-container">
        <div style={{width: '80%', float: 'left'}} >
          <Space direction={"horizontal"} wrap style={{marginBottom: 16, marginTop: 10}}>
            <Typography.Title level={5} style={{ margin: 10, marginBottom: 10 }}>
              {projectName}
            </Typography.Title>
            <Button
              icon={<EditOutlined style={{color: "#1b3fc2"}} />}
              onClick={() => {setNameDialogVisible(true);}}
              type="link"
            />
          </Space>
        </div>
          <div style={{width: '20%', float: 'right'}}>
            <ConfirmationButtonAntd value="Добавить задачу в список" onClick={() => {setVisible(true)}}/>
          </div>
      </div>
      <div class="flexbox-container">
        <div style={{width: '80%', float: 'left'}} >
          <Space direction={"horizontal"} wrap style={{marginBottom: 16, marginTop: 10}}>
            <Radio.Group
              value={tasksType}
              onChange={handleTypeChange}
            >
              <Radio.Button style={{borderTopLeftRadius: 15, borderBottomLeftRadius: 15}} value="at_work">Только в работе</Radio.Button>
              <Radio.Button value="tasks">Все задачи</Radio.Button>
              <Radio.Button style={{borderTopRightRadius: 15, borderBottomRightRadius: 15}}  value="done">Только завершенные</Radio.Button>
            </Radio.Group>
          </Space>
        </div>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="content-div">
          <div className="droppable-div">
            <Droppable key={"droppable"} droppableId={"droppable"} >  
              {(provided, snapshot) => (  
                <div {...provided.droppableProps} ref={provided.innerRef}>  
                  {state.map((item, idx) => (  
                    <Draggable key={item.id} index={idx} draggableId={item.id}>  
                      {(provided, snapshot) => (  
                        <div
                          className="drag-item"
                          ref={provided.innerRef}
                          snapshot={snapshot}
                          {...provided.draggableProps}  
                          {...provided.dragHandleProps}
                        >
                          <div style={{width: "100%"}}>
                            <div style={{float: "left", width: "70%"}}>
                              <span>{item.name}</span>
                            </div>
                            <div style={{float: "right", width: "30%"}}>
                              <span>
                                <Button
                                  icon={<EditOutlined style={{color: "#1b3fc2"}} />}
                                  onClick={() => { setChangeVisible(item); }}
                                  type="link"
                                />
                              </span>
                              <span>
                                <Button
                                  icon={item.status && item.status === "done" ?
                                    <CheckSquareOutlined style={{color: "#a3b7ff"}}/>
                                    : <BorderOutlined style={{color: "#a3b7ff"}}/>
                                  }
                                  onClick={() => { handleTaskStatusChange(item.id); }}
                                  type="link"
                                />
                              </span>
                              <span>
                                <Button
                                  icon={<DeleteOutlined style={{color: "#1b3fc2"}} />}
                                  onClick={() => { deleteElement(item.id) }}
                                  type="link"
                                />
                              </span>
                            </div>
                          </div>
                          <div style={{background: "#d6dfff", padding: "10px", borderRadius: "5px"}}>
                            <div>
                              <span>Описание:</span>
                            </div>
                            <div>
                                <span>{item.description}</span>
                            </div>
                          </div>
                        </div>  
                      )}  
                    </Draggable>  
                  ))}
                  {provided.placeholder}
                </div>  
              )}  
            </Droppable>
          </div>
        </div>
      </DragDropContext>
      <CreateElementDialog
        visible={changeVisible !== null}
        data={changeVisible}
        type="project"
        onOk={(params, id) => { setChangeVisible(null); onChangeElement(params, id); }}
        onCancel={() => { setChangeVisible(null); }}
      />
      <CreateElementDialog
        visible={visible}
        data={state}
        type="new"
        onOk={(params, id) => { setVisible(false); onAddElement(params, id); }}
        onCancel={() => { setVisible(false) }}
      />
      <ChangeNameDialog
        visible={nameDialogVisible}
        onOk={(name) => { setNameDialogVisible(false); onChangeName(name); }}
        onCancel={() => { setNameDialogVisible(false) }}
      />
    </>
  );
}