import { PageTitle } from '../../components/page-title'
import './service-history.scss';
import { Card, Table, Tag, Button, Input, Skeleton, Modal, Image } from 'antd';
import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { SearchOutlined } from '@ant-design/icons'


class ServiceHistory extends React.Component {
  state = {
    loadings: []
  };
  // state = { visible: true };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  hideModal = () => {
    this.setState({
      visible: false,
    });
  };

  enterLoading = index => {
    this.setState(({ loadings }) => {
      const newLoadings = [...loadings];
      newLoadings[index] = true;

      return {
        loadings: newLoadings,
      };
    });
    setTimeout(() => {
      this.setState(({ loadings }) => {
        const newLoadings = [...loadings];
        newLoadings[index] = false;

        return {
          loadings: newLoadings,
        };
      });
    }, 6000);
  };
  render() {

    const { loadings } = this.state;

    const columns = [
      {
        title: 'Transaction Id',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: 'Client Name',
        dataIndex: 'name',
        key: 'name',
        render: text => <a>{text}</a>,
      },
      {
        title: 'Email Id',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: 'Service',
        dataIndex: 'service',
        key: 'service',
      },
      {
        title: 'Promo Name',
        dataIndex: 'promoname',
        key: 'promoname',
      },
      {
        title: 'Status',
        key: 'tags',
        dataIndex: 'tags',
        render: tags => (
          <>
            {tags.map(tag => {
              let color = tag.length > 5 ? 'geekblue' : 'green';
              if (tag === 'Refund') {
                color = 'orange';
              } else if (tag === 'chargeback') {
                color = 'red';
              }
              return (
                <Tag color={color} key={tag}>
                  {tag.toUpperCase()}
                </Tag>
              );
            })}
          </>
        ),
      },
      {
        title: '',
        dataIndex: 'btn',
        key: 'btn',
        render: text => <div className="view-btn" onClick={this.showModal}>View</div>

      }
    ];

    const data = [
      {
        key: '1',
        name: 'John Brown',
        age: 32,
        id: 1,
        address: 'New York No. 1 Lake Park',
        tags: ['paid',],
        email: 'akash@gmail.com',
        offer: '10% off',
        service: 'service 1',
        promoname: 'No',
      },
      {
        key: '2',
        name: 'Jim Green',
        age: 42,
        id: 2,
        address: 'London No. 1 Lake Park',
        tags: ['chargeback'],
        email: 'hamse@gmail.com',
        offer: '15% off',
        service: 'service 2',
        promoname: 'Promo Details',
      },
      {
        key: '3',
        name: 'Joe Black',
        age: 32,
        id: 3,
        address: 'Sidney No. 1 Lake Park',
        tags: ['Refund'],
        email: 'john@gmail.com',
        offer: '20% off',
        service: 'service 3',
        promoname: 'Promo Details',
      },
      {
        key: '4',
        name: 'Ronald Taylo',
        age: 32,
        id: 4,
        address: 'Sidney No. 1 Lake Park',
        tags: ['paid'],
        email: 'ronald@gmail.com',
        offer: '20% off',
        service: 'service 4',
        promoname: 'Promo Details',
      },
      {


            key: '5',
            name: `John Brown`,
            age: 32,
            id: 5,
            address: `New York No.1 Lake Park`,
            tags: ['New'],
            email: 'akash@gmail.com',
            offer: '10% off',
            service: `service 5`,
            promoname: 'Promo Details',
    
         },
    ];
    // for (let i = 5; i < 100; i++) {
    //   data.push({


    //     key: 'i',
    //     name: `John Brown ${i}`,
    //     age: 32,
    //     id: i,
    //     address: `New York No.${i} Lake Park`,
    //     tags: ['New'],
    //     email: 'akash@gmail.com',
    //     offer: '10% off',
    //     service: `service ${i}`,
    //     promoname: 'Promo Details',

    //   });
    // }


    return (

      <div className="service-history-screen">
        <div className={'content-wrapper'}>
          <PageTitle
            title={'Service History'}
          />
          <div className={"history-card"}>
            <Card>
              <div className={'service-history-wrapper'}>
                <div className={'gift-card-inner-wrapper'}>
                  <div className={'search-wrapper'} >
                    <Input placeholder="Search..." prefix={<SearchOutlined />} />
                  </div>
                  <Table dataSource={data} columns={columns} />
                  <Modal
                    visible={this.state.visible}
                    onCancel={this.hideModal} footer={null} width={700} style={{ top: 180 }} >
                    <div className="modal-title" style={{
                      fontFamily: "Poppins, sans-serif",
                      fontWeight: ' bolder', fontSize: '18px', marginTop: 20
                    }}>Service History-View</div>
                    <Button loading={loadings[1]}
                      onClick={() => this.enterLoading(1)} className="save-btn" style={{ float: 'right', backgroundColor: '#5D72E9', color: 'white', borderRadius: '5px', padding: ' 0px 25px', marginTop: '-30px' }} >Save</Button>

                    <div className="image-wrapper" style={{ display: 'flex', marginTop: 20 }}>
                      <img width={90} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTChQdlYiED1Ot1XBsYrExnQlEPnuU55oXFXA&usqp=CAU" />
                      <div className="create-wrapper" >

                        <Input value="Full Name" placeholder="Full Name" style={{ width: 270, backgroundColor: ' #E2E2E2', blockSize: 40, border: '0px', borderRadius: '5px', marginLeft: 10, marginBottom: 10 }} />

                        <Input value="Loyality Points" placeholder="Loyality Points" style={{ width: 270, backgroundColor: ' #E2E2E2', blockSize: 40, border: '0px', borderRadius: '5px', marginLeft: 10 }} />

                        <Input value="Email Id" placeholder="Email Id" style={{ width: 270, backgroundColor: ' #E2E2E2', blockSize: 40, border: '0px', borderRadius: '5px', marginLeft: 10 }} />

                        <Input value="Mobile Number" placeholder="Mobile Number" style={{ width: 270, backgroundColor: ' #E2E2E2', blockSize: 40, border: '0px', borderRadius: '5px', marginLeft: 10 }} />

                      </div>

                    </div>
                    <div style={{ height: '1px', width: '100%', backgroundColor: '#E2E2E2', marginTop: 20 }} />
                    <div className="image-wrapper" style={{ display: 'flex', marginTop: 20 }}>
                      <img width={90} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTChQdlYiED1Ot1XBsYrExnQlEPnuU55oXFXA&usqp=CAU" />
                      <div className="create-wrapper" >

                        <Input value="Full Name" placeholder="Full Name" style={{ width: 270, backgroundColor: ' #E2E2E2', blockSize: 40, border: '0px', borderRadius: '5px', marginLeft: 10, marginBottom: 10 }} />

                        <Input value="Loyality Points" placeholder="Loyality Points" style={{ width: 270, backgroundColor: ' #E2E2E2', blockSize: 40, border: '0px', borderRadius: '5px', marginLeft: 10 }} />

                        <Input value="Email Id" placeholder="Email Id" style={{ width: 270, backgroundColor: ' #E2E2E2', blockSize: 40, border: '0px', borderRadius: '5px', marginLeft: 10 }} />

                        <Input value="Mobile Number" placeholder="Mobile Number" style={{ width: 270, backgroundColor: ' #E2E2E2', blockSize: 40, border: '0px', borderRadius: '5px', marginLeft: 10 }} />

                      </div>

                    </div>


                  </Modal>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

    );
  }
}
export default withRouter(ServiceHistory);