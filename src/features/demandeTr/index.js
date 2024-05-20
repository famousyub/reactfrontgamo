import './App.css';
import {Fragment, useEffect, useState} from "react";
import {deleteStudent, getAllStudents} from "../../services/DemandeTrServcie";
import {
    Avatar,
    Badge,
    Breadcrumb,
    Button, Descriptions,
    Divider,
    Empty,
    Layout,
    Menu,
    Popconfirm,
    Radio,
    Spin,
    Table,
} from 'antd';
import {
    CodeOutlined,
    DesktopOutlined,
    FileOutlined,
    LoadingOutlined,
    PieChartOutlined,
    PlusCircleOutlined,
    TeamOutlined,
    UserOutlined,
    LinkedinOutlined,
    GithubOutlined
} from '@ant-design/icons';
import DemandeDrawerForm from "./compnenet/DemandeDrawerForm";
import {errorNotification, successNotification} from "./compnenet/Notification";

const {Content, Footer, Sider} = Layout;
const {SubMenu} = Menu;

const TheAvatar = ({name}) => {
    let trim = name.trim();
    if (trim.length === 0) {
        return <Avatar icon={<UserOutlined/>}/>
    }
    const split = trim.split(" ");
    if (split.length === 1) {
        return <Avatar>{name.charAt(0)}</Avatar>
    }
    return <Avatar>
        {`${name.charAt(0)}${name.charAt(name.length - 1)}`}
    </Avatar>
}

const removeStudent = (studentId, callback) => {
    deleteStudent(studentId).then(() => {
        successNotification("Student deleted", `Student with student id ${studentId} has been deleted`)
        callback();
    })
        .catch(err => {
            err.response.json().then(res => {
                console.log(res);
                err.response.json().then(res => {
                    console.log(res);
                    errorNotification(
                        "There was an issue",
                        `${res.message} [statusCode: ${res.status}] [${res.error}]`
                    );
                });
            })
        })
}

const updateStudent = (student, setShowDrawer, setStud, callback) => {
    console.log(student);
    setStud(student)
    setShowDrawer(true);
    callback();
}

const columns = (fetchStudents, setShowDrawer, setStud) => [
    {
        title: '',
        dataIndex: 'avatar',
        key: 'avatar',
        render: (text, student) => <TheAvatar name={student.name}/>
    },
    // {
    //     title: 'Id',
    //     dataIndex: 'id',
    //     key: 'id',
    // },
    {
        title: 'NAME',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'EMAIL',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'GENDER',
        dataIndex: 'gender',
        key: 'gender',
    },
    {
        title: 'ACTIONS',
        key: 'actions',
        render: (text, student) =>
            <Radio.Group>
                <Popconfirm
                    placement='topRight'
                    title={`Are you sure to delete ${student.name}`}
                    onConfirm={() => removeStudent(student.id, fetchStudents)}
                    okText='Yes'
                    cancelText='No'>
                    <Radio.Button value="delete">Delete</Radio.Button>
                </Popconfirm>
                <Radio.Button onClick={() => {
                    updateStudent(student, setShowDrawer, setStud, fetchStudents);
                }} value="edit">Edit</Radio.Button>
            </Radio.Group>
    }
];

const antIcon = <LoadingOutlined style={{fontSize: 24}} spin/>

function DemandeTr() {
    const [students, setStudents] = useState([]);
    const [collapsed, setCollapsed] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [showDrawer, setShowDrawer] = useState(false);
    const [student, setStudent] = useState([]);

    const fetchStudents = () =>
        getAllStudents()
            .then(res => { setStudents(res.data);  console.log(res)})
            .then(data => {
                console.log(data);
                //setStudents(data);
            }).catch(err => {
            console.log(err.response)
            err.response.json().then(res => {
                console.log(res);
                errorNotification(
                    "There was an issue",
                    `${res.message} [${res.status}] [${res.error}]`
                )
            });
        }).finally(() => setFetching(false))

    useEffect(() => {
        console.log("component is mounted");
        fetchStudents();
    }, []);

    const renderStudents = () => {
        if (fetching) {
            return <Spin indicator={antIcon}/>;
        }
        if (students.length <= 0) {
            return <>
                <Button
                    onClick={() => setShowDrawer(!showDrawer)}
                    type="primary" shape="round" icon={<PlusCircleOutlined/>} size="small">
                    Add New Student
                </Button>
                <DemandeDrawerForm
                    showDrawer={showDrawer}
                    setShowDrawer={setShowDrawer}
                    fetchStudents={fetchStudents}
                    student={student}
                    setStudent={setStudent}
                />
                <Empty/>
            </>
        }
        return <>
            <DemandeDrawerForm
                showDrawer={showDrawer}
                setShowDrawer={setShowDrawer}
                fetchStudents={fetchStudents}
                student={student}
                setStudent={setStudent}
            />
            <Table
                dataSource={students}
                columns={columns(fetchStudents, setShowDrawer, setStudent)}
                bordered
                title={() =>
                    <>
                        <Button
                            onClick={() => setShowDrawer(!showDrawer)}
                            type="primary" shape="round" icon={<PlusCircleOutlined/>} size="small">
                            Add New Student
                        </Button>
                    </>
                }
                pagination={{pageSize: 50}}
                scroll={{y: 500}}
                rowKey={(student) => student.id}
            />
        </>
    }
    return <Fragment>
                <Layout style={{minHeight: '100vh'}}>
                    <Sider collapsible collapsed={collapsed}
                           onCollapse={setCollapsed}>
                        <div className="logo"/>
                        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                            <Menu.Item key="1" icon={<PieChartOutlined/>}>
                                Option 1
                            </Menu.Item>
                            <Menu.Item key="2" icon={<DesktopOutlined/>}>
                                Option 2
                            </Menu.Item>
                            <SubMenu key="sub1" icon={<UserOutlined/>} title="User">
                                <Menu.Item key="3">Rommel</Menu.Item>
                                <Menu.Item key="4">Tom</Menu.Item>
                                <Menu.Item key="5">Bill</Menu.Item>
                                <Menu.Item key="6">Alex</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub2" icon={<TeamOutlined/>} title="Team">
                                <Menu.Item key="7">Admin</Menu.Item>
                                <Menu.Item key="8">Registrar</Menu.Item>
                            </SubMenu>
                            <Menu.Item key="9" icon={<FileOutlined/>}>
                                Files
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Layout className="site-layout">
                        <div className="site-page-header-ghost-wrapper">
                          <p>user</p>
                        </div>
                        {/*<Header className="site-layout-background" style={{padding: 0}}/>*/}
                        <Content style={{margin: '0 16px'}}>
                            <Breadcrumb style={{margin: '16px 0'}}>
                                <Breadcrumb.Item>User</Breadcrumb.Item>
                                <Breadcrumb.Item></Breadcrumb.Item>
                            </Breadcrumb>
                            <div className="site-layout-background" style={{padding: 24, minHeight: 360}}>
                                {renderStudents()}
                            </div>
                        </Content>
                        <Footer style={{textAlign: 'center'}}>
                            <strong> <CodeOutlined style={{ fontSize: '18px', color: '#000' }}/></strong>
                            <Divider />
                            
                        
                        </Footer>
                    </Layout>
                </Layout>
            </Fragment>
}

export default DemandeTr;