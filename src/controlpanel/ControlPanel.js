import React, {useState} from "react";
import {isMobile} from 'react-device-detect';
import {Link, Redirect, Route, Switch, useRouteMatch, useHistory} from "react-router-dom";
import {Layout, Menu, message, Divider, Tooltip, Dropdown, Typography, ConfigProvider} from 'antd';
import './ControlPanel.css'
import {LogoutOutlined, BarChartOutlined, RightOutlined, LeftOutlined, UnorderedListOutlined} from "@ant-design/icons";
import GrowingList from "../draganddrop/GrowingList";
import AuthDialog from "./AuthDialog";
// import DragAndDropPage from "../draganddrop/DragAndDropPage";

const {Header, Sider, Content, Footer} = Layout;
const {Text} = Typography;
let namesList = JSON.parse(localStorage.getItem("NAMES")) ? JSON.parse(localStorage.getItem("NAMES")) : [];

export default function ControlPanel(props) {
  let [collapsed, setCollapsed] = useState(false);
  let [activeRouteKey, setActiveRouteKey] = useState("drag_and_drop");
  let [visible, setVisible] = useState(true);
  let [projectName, setProjectName] = useState("");
  let [projects, setProjects] = useState([]);

  const history = useHistory();

  let {path, url} = useRouteMatch();

  const onMenuClick = (item) => {
    if (item.key !== "100" && item.key !== "collapsed") {
      setActiveRouteKey(item.key);
    }
    if (item.key === '100') {
      
    } else if(item.key === "collapsed") {
      setCollapsed(!collapsed);
    }
  };

  const systemMenu = () => {
    return (
      <ConfigProvider
        theme={{
          components: {
            Menu: {
              colorItemBgSelected: 'rgba(205, 214, 219, 0.5)',
              colorItemBgHover: 'rgba(205, 214, 219, 0.3)',
            },
          },
        }}
      >
        <Menu style={{marginTop: "150px"}} className="menu-background" onClick={onMenuClick}  defaultSelectedKeys={['1']} mode="inline">
          {
              collapsed ? <Menu.Item key="collapsed" style={{color: "white"}} icon={<RightOutlined/>}/>
              : <Menu.Item key="collapsed" style={{paddingLeft: "45%", color: "white"}} icon={<LeftOutlined/>}/>
          }
          <Menu.Item style={{color: "white"}} key="drag_and_drop" icon={<UnorderedListOutlined />}>
            <Link to={`${url}/drag_and_drop`}>Задачи</Link>
          </Menu.Item>
          <Menu.Item key="100" style={{color: "white"}} title="Exit" icon={<LogoutOutlined/>}>
            Выход
          </Menu.Item>
        </Menu>
      </ConfigProvider>
    )
  };

  const systemRoute = () => {
    if(activeRouteKey === "drag_and_drop") {
      return (
        <Route path={`${path}/drag_and_drop`} key="drag_and_drop">
          <GrowingList title={projectName} project={projects}/>
        </Route>
      )
    }
  };

  const defaultRoute = () => {
    if(activeRouteKey === "drag_and_drop") {
      return (
        <Redirect to={`${path}/drag_and_drop`}/>
      )
    }
  };

  const handleNameChange = (data) => {
    let lastList = namesList;
    let newList = [...lastList, data.name];
    window.localStorage.setItem("NAMES", JSON.stringify(newList));
    console.log(JSON.parse(localStorage.getItem("NAMES")));
    setProjectName(data ? data.name : "");
  };

  const handleProjectsChange = (data) => {
    setProjectName(data ? data.name : "");
    console.log({localStorage});
    setProjects(JSON.parse(localStorage.getItem(data.name)) ? JSON.parse(localStorage.getItem(data.name)) : []);
  };

  return (
    <div>
      <Layout style={{minHeight: '100vh'}}>
        <Layout>
          <Sider style={{backgroundColor: "#435ebf"}} width={210} collapsed={collapsed}>
            {
              systemMenu()
            }
          </Sider>
          <Layout className="site-layout" style={isMobile ? {width: "1600px"} : {}}>
            <Header style={isMobile ? {width: "1600px", backgroundColor: "white"} : {width: "100%", backgroundColor: "white"}}>
                  
            </Header>
            <Divider style={{marginTop: '0px'}}/>
            <Content style={isMobile ? {margin: '10px', width: "1600px"} : {margin: '10px'}}>
              <Switch>
                {
                  systemRoute()
                }
                {
                  defaultRoute()
                }
              </Switch>
            </Content>
            <Footer style={isMobile ? {textAlign: 'right', fontSize: '0.8em', width: "1600px"} : {textAlign: 'right', fontSize: '0.8em'}}>Тестовое задание</Footer>
          </Layout>
        </Layout>
      </Layout>
      <AuthDialog
        visible={visible}
        onOk={(data) => { setVisible(false); handleProjectsChange(data); }}
        onCancel={(data) => { setVisible(false); handleNameChange(data);}}
      />
    </div>
  );
}