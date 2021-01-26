import { PageTitle } from '../../components/page-title/'
import { Form, Select } from 'antd';
import './profile.scss';
import { Card, Input, Space, Image, Button, Anchor } from 'antd';
import { EditFilled } from '@ant-design/icons'
import axios from '../../config/api/'
import { withRouter } from 'react-router-dom';
import React, { Component } from 'react';
import { refeshUI } from '../../config/helpers'

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

class Profile extends React.Component {
    constructor() {
        super()
        this.state = {
            isLoading: false,
            isChangePasswordLoading:false,
            isError: false,
            userDetails: {},
        };
    }

    async componentDidMount() {
        this.setState({ isLoading: true })
        try {
            const { data } = await axios.get('admin')
            this.setState({
                isLoading: false
            })
            const userDetails = (data && data.user) || ''
            if (userDetails)
                this.setState({ userDetails })
        } catch (e) {
            this.setState({ isError: true })
        }
    }

    imageHandler = e => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                this.setState({ profileImg: reader.result });
            }
        };
        reader.readAsDataURL(e.target.files[0]);
    };

    profileUI = () => {
        const { userDetails, isLoading, isError } = this.state
        if (isLoading) {

        } else if (isError) {

        } else if (userDetails.userName) {
            return (
                <div className={'content-body-wrapper'}>
                    <div className={'profile-card'} >
                        <Card >
                            <div className={'title-card'}>Personal Profile</div>
                            <div className={'img-card'}>
                                <img alt="" id="img" src={userDetails.profilePic}
                                    className={'profile-img'} />
                            </div>
                            <div className="edit-btn-card">
                                <label className htmlFor="input">
                                    <i type="link" style={{ color: "#343557", fontSize: '1.5em' }}>
                                        {<EditFilled />} </i>
                                </label>
                            </div>
                            <input style={{ display: 'none' }}
                                type="file"
                                accept="image/*"
                                name="image-upload"
                                id="input"
                                onChange={this.imageHandler}
                            />

                            <Space direction="vertical">
                                <div className="profile-card-body" >
                                    <Form
                                        layout="vertical"
                                        name="nest-profile" >
                                        <Form.Item name='name'
                                            label="Full Name"
                                            rules={[{ required: true, message: 'Please input your Username!' }]}>
                                            <Input
                                                defaultValue={userDetails.userName}
                                                size="large"
                                                style={{ borderRadius: '5px' }}
                                            />
                                        </Form.Item>
                                        <Form.Item
                                            name="email"
                                            label="E-mail"
                                            rules={[
                                                {
                                                    type: 'email',
                                                    message: 'The input is not valid E-mail!',
                                                },
                                                {
                                                    required: true,
                                                    message: 'Please input your E-mail!',
                                                },
                                            ]}
                                        >
                                            <Input
                                                defaultValue={userDetails.emailId}
                                                size="large"
                                                style={{ borderRadius: '5px' }} />
                                        </Form.Item>
                                        <Form.Item
                                            name="phone"
                                            label="Phone Number"
                                            rules={[{ required: true, message: 'Please input your phone number!' }]}
                                        >
                                            <Input
                                                size="large"
                                                defaultValue={userDetails.phoneNumber}
                                                style={{ borderRadius: '5px' }}
                                            />
                                        </Form.Item>
                                    </Form>
                                </div>
                                <div
                                    onClick={()=>this.saveUserDetails()}
                                    className={'profile-primary-btn'}
                                    htmlType="submit"> Submit
                            </div>
                            </Space>
                        </Card>
                    </div>
                    <div className={'profile-card-pwd'}>
                        <Card>
                            <div
                                onClick={()=>this.changePassword()}
                                className={'title-card'}>
                                Change Password
                           </div>
                            <Space direction="vertical" >
                                <div className={'pwd-card-body'}  >
                                    <Form
                                        layout="vertical"
                                        name="nest-profile"  >
                                        <Form.Item

                                            name="password"
                                            label="Password"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please input your password!',
                                                },
                                            ]}
                                            hasFeedback
                                        >
                                            <Input.Password size="large" style={{ borderRadius: '5px' }} />
                                        </Form.Item>
                                        <Form.Item

                                            name="confirm"
                                            label="Confirm Password"
                                            dependencies={['password']}
                                            hasFeedback
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please confirm your password!',
                                                },
                                                ({ getFieldValue }) => ({
                                                    validator(_, value) {
                                                        if (!value || getFieldValue('password') === value) {
                                                            return Promise.resolve();
                                                        }
                                                        return Promise.reject(' two passwords entered do not match!');
                                                    },
                                                }),
                                            ]}
                                        >
                                            <Input.Password size="large" style={{ borderRadius: '5px' }} />
                                        </Form.Item>
                                    </Form>
                                </div>
                                <div className={'profile-primary-pwd-btn'} htmlType="">
                                    Submit
                                        </div>
                            </Space>
                        </Card>
                    </div>
                </div>
            )
        }
    }

    saveUserDetails = () => {

    }

    changePassword = async () => {
        this.setState({ isChangePasswordLoading: true })
        try {
            const { data } = await axios.get('admin/updateUserProfile')
            this.setState({
                isChangePasswordLoading: false
            })
            refeshUI()
            // const userDetails = (data && data.user) || ''
            // if (userDetails)
            //     this.setState({ userDetails })
        } catch (e) {
            this.setState({ isChangePasswordError: true })
        }
    }

    render() {
        return (
            <div className="profile-screen">
                <div>
                    <div className={'content-wrapper'}>
                        <PageTitle
                            title={'Profile'}
                        />
                        {this.profileUI()}
                    </div>
                </div>
            </div>
        );
    }
}
export default withRouter(Profile);
