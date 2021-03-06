import React, { useState, useEffect } from 'react';
import { PageTitle } from '../../components/page-title/'
import './gift-card.scss';
import axios from '../../config/api/'
import { SearchOutlined } from '@ant-design/icons'
import { Card, Table, Tag, Input, Button, Modal, Skeleton, message, Form } from 'antd';
import { StatusComponent } from '../../components/status/'
import { handleError } from '../../utils/error-handling';

const GiftCards = () => {

  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [giftcard, setGiftcard] = useState({})
  const [giftCards, setGiftCards] = useState([])
  const [searchText, setSearchText] = useState('')
  const [giftCardSearchResult, setGiftCardSearchResult] = useState([])
  const [saveGiftcardLoading, setSaveGiftcardLoading] = useState(false)
  const [visible, setVisible] = useState(false)
  const [clientName, setClientName] = useState('')
  const [emailId, setEmailId] = useState('')
  const [offer, setOffer] = useState('')
  const [serviceId, setServiceId] = useState('')
  const [showError, setShowError] = useState(false)
  const [services, setServices] = useState([])
  const [newGiftCard, setNewGiftCard] = useState(false)
  const [showSearchResults, setShowSearchResults] = useState(false)
  const [promoOfferType, setPromoOfferType] = useState('')
  const [status, setStatus] = useState('')
  useEffect(() => {
    getAllService()
  }, [])

  const getAllGiftCards = async () => {
    setIsLoading(true)
    try {
      const { data } = await axios.get('gift/getAllGift',)
      setIsLoading(false)
      const giftCards = (data && data.gift) || ''
      if (giftCards.length >= 0) {
        setGiftCards(giftCards)
      }
    } catch (e) {
      handleError(e)
      setIsError(true)
    }
  }

  useEffect(() => {
    getAllGiftCards()
  }, []);

  const getAllService = async () => {
    try {
      const { data } = await axios.get("service/getAllService");
      const services = data.service;
      setServices(services)
    } catch (e) {
      handleError(e)
    }
  };

  const saveGiftcard = async () => {
    //const { clientName, emailId, offer, serviceId } = giftcard

    if (clientName && emailId && offer && serviceId) {
      setSaveGiftcardLoading(true)
      try {
        const saveGiftcard = await axios.post('gift/saveGift',
          {
            clientName,
            clientEmailId: emailId,
            offer: offer + promoOfferType,
            serviceId,
            status
          });
        message.success('Data updated successfully!');
      } catch (e) {
        handleError(e)
      }
      setSaveGiftcardLoading(false)
      hideModal()
      getAllGiftCards()
    } else {
      setShowError(true)
    }
  }

  const showModal = (giftCard) => {
    if (giftCard) {
      //edit view
      setClientName(giftCard.createdBy)
      setEmailId(giftCard.clientEmailId)
      setOffer(giftCard.offer)
      setServiceId(giftCard.serviceId)
      setNewGiftCard(false)
      setStatus(giftCard.status)
    } else {
      //new view
      setClientName('')
      setEmailId('')
      setOffer('')
      setServiceId('')
      setStatus('')
      setNewGiftCard(true)
      getAllService()
    }
    setVisible(true)
  };

  const hideModal = () => {
    setVisible(false)
    setClientName('')
    setEmailId('')
    setOffer('')
    setServiceId('')
    setStatus('')
  };

  const giftcardUI = () => {
    const columns = [
      {
        title: 'Gift CardId',
        dataIndex: 'giftCardId',
        key: 'giftCardId',
      },
      {
        title: 'Client EmailId',
        dataIndex: 'clientEmailId',
        key: 'clientEmailId',
        render: text => <div>{text}</div>,
      },
      {
        title: 'Service Name',
        dataIndex: 'serviceName',
        key: 'serviceName',

      },
      {
        title: 'Offer',
        dataIndex: 'offer',
        key: 'offer',
      },
      {
        title: 'Status',
        key: 'status',
        dataIndex: 'status',
        render: status => <StatusComponent status={status} />

      },
      {
        title: 'Created By',
        key: 'createdBy',
        dataIndex: 'createdBy',
      },
      {
        title: '',
        dataIndex: 'status',
        key: 'status',
        render: (status, giftCard) => {
          console.log('giftCard', giftCard)
          return (
            status === 'New' && <div className="view-btn" onClick={() => { showModal(giftCard) }}>Edit</div>
          )
        }
      },
    ];

    const data = [
      {
        key: '1',
        name: 'John Brown',
        age: 32,
        id: 1,
        address: 'New York No. 1 Lake Park',
        tags: ['New'],
        email: 'akash@gmail.com',
        offer: '10% off',
        service: 'service 1'
      },
    ];
    if (isLoading) {
      return (
        <div className={'gift-card'}>
          <Skeleton paragraph={{ rows: 10 }} />
        </div>
      )
    }
    else if (isError) {
    } else {
      return (
        <div className={'gift-card'}>
          <Table
            dataSource={showSearchResults ? giftCardSearchResult : giftCards}
            columns={columns} />
        </div>
      )
    }
  }

  const searchTextChanged = (searchText) => {
    setShowSearchResults(searchText ? 1 : 0)
    const giftCardSearchResult = giftCards.filter(giftcard => giftcard.giftCardId.toLowerCase().includes(searchText.toLowerCase()))
    setSearchText(searchText)
    setGiftCardSearchResult(giftCardSearchResult)
  }

  return (
    <div className="gift-card-screen">
      <div className={'content-wrapper'}>
        <PageTitle
          title={'Gift Cards'}
        />
        <div className={"gift-card"}>
          <Card>
            <div className={'gift-card-wrapper'}>
              <div className={'gift-card-inner-wrapper'}>
                <div className={'options-wrapper'}>
                  <div className={'search-wrapper'}>
                    <Input placeholder="Search..."
                      prefix={<SearchOutlined />}
                      value={searchText}
                      onChange={e => searchTextChanged(e.target.value)} />
                  </div>
                  <div className={'primary-btn '} onClick={() => showModal()}>
                    Create New
                  </div>
                </div>
                {giftcardUI()}
                <Modal
                  visible={visible}
                  onCancel={hideModal} footer={null} width={700} style={{ top: 250 }} >
                  <div className="modal-title" style={{
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: ' bolder', fontSize: '18px', marginTop: -10
                  }}>Gift Cards</div>
                  <div className="create-wrapper" style={{ display: 'flex', marginTop: 20 }}>
                    <div
                      className="modal-link"
                      style={{
                        fontFamily: "Poppins, sans-serif",
                        fontWeight: " bolder",
                        fontSize: "15px",
                      }}
                    >
                      Client Name
                    <Input
                        placeholder="Client Name"
                        value={clientName}
                        onChange={e => setClientName(e.target.value, setShowError(false))}
                        disabled={!newGiftCard}
                        style={{
                          width: 300,
                          backgroundColor: ' #E2E2E2',
                          blockSize: 40, border: '0px',
                          borderRadius: '5px',
                          // marginRight: 40
                        }}
                      />
                    </div>
                    <div
                      className="modal-link"
                      style={{
                        fontFamily: "Poppins, sans-serif",
                        fontWeight: " bolder",
                        fontSize: "15px",
                      }}
                    >
                      Email Id
                      <Form layout="vertical">
                        <Form.Item name='email' rules={[{ type: 'email',
                       message: 'The input is not valid E-mail!' }]}>
                          <Input
                            type='email'
                            placeholder="Email Id"
                            value={emailId}
                            disabled={!newGiftCard}
                            onChange={e => setEmailId(e.target.value, setShowError(false))}
                            style={{ width: 320, marginTop: '-5', backgroundColor: ' #E2E2E2', blockSize: 40, border: '0px', borderRadius: '5px' }} />
                        </Form.Item>
                      </Form>
                    </div>
                  </div>

                  <div className={'create-row'} style={{ display: 'flex', marginTop: 5 }}>
                    {/* <Input
                      placeholder="Service Name"
                      defaultValue={serviceId}
                      onChange={e => setServiceId(e.target.value, setShowError(false))}
                      style={{ width: '70%', backgroundColor: ' #E2E2E2', blockSize: 40, border: '0px', borderRadius: '5px', marginRight: 10 }} />
                     */}
                    <div
                      className="modal-code"
                      style={{
                        fontFamily: "Poppins, sans-serif",
                        fontWeight: " bolder",
                        fontSize: "15px",
                      }}>Service Name
                      {/* <Input
                        onChange={e => setServiceId(e.target.value, setShowError(false))}
                        type="text"
                        list="option"
                        placeholder="Service Name"
                        disabled={!newGiftCard}
                        value={serviceId || ""}
                        style={{
                          width:300,
                          backgroundColor: " #E2E2E2",
                          blockSize: 40,
                          border: "0px",
                          borderRadius: "5px",
                         }}
                      /> */}
                      <select
                        id="option"
                        onChange={e => setServiceId(e.target.value, setShowError(false))}
                        placeholder="Service Name"
                        disabled={!newGiftCard}
                        value={serviceId || ""}
                        style={{
                          width: 300,
                          backgroundColor: " #E2E2E2",
                          blockSize: 40,
                          border: "0px",
                          borderRadius: "5px",
                        }}>
                        {newGiftCard && <option value={''}>{''}</option>}
                        {services.map(
                          (service) =>
                            service.isActive && (
                              <option value={service.recId}>{service.serviceName}</option>
                            )
                        )}
                      </select>
                    </div>
                    <div
                      className="modal-link"
                      style={{
                        fontFamily: "Poppins, sans-serif",
                        fontWeight: " bolder",
                        fontSize: "15px",
                      }}>
                      Value
                    <Input
                        placeholder="Value"
                        value={offer}
                        disabled={!newGiftCard}
                        onChange={e => setOffer(e.target.value, setShowError(false))}
                        style={{
                          width: !newGiftCard ? 220 : 115,
                          backgroundColor: ' #E2E2E2',
                          blockSize: 40, border: '0px',
                          borderRadius: '5px',
                          marginRight: !newGiftCard ? 10 : 0,
                          marginBottom: 30
                        }}
                      />
                    </div>
                    {/* <Input
                      type="text"
                      list="type"
                      disabled={!newGiftCard}
                      style={{
                        width: 110, backgroundColor: ' #E2E2E2', blockSize: 40, border: '0px', borderRadius: '5px', marginBottom: 30, marginTop: 23
                      }} 
                      onChange={e => setPromoOfferType(e.target.value)}
                      /> */}
                    {newGiftCard && <select id="type" type="text"
                      disabled={!newGiftCard}
                      style={{
                        width: 110, backgroundColor: ' #E2E2E2', blockSize: 40, border: '0px', borderRadius: '5px', marginBottom: 30, marginTop: 23, marginRight: 10
                      }}
                      onChange={e => setPromoOfferType(e.target.value)} >
                      <option></option>
                      <option>$</option>
                      <option>%</option>
                    </select>
                    }
                    <select id="type" type="text"
                      disabled={!newGiftCard}
                      value={status || ""}
                      style={{
                        width: 110, backgroundColor: ' #E2E2E2', blockSize: 40, border: '0px', borderRadius: '5px', marginBottom: 30, marginTop: 23
                      }}
                      onChange={e => setStatus(e.target.value)} >
                      {newGiftCard && <option></option>}
                      <option>New</option>
                      <option>Rejected</option>
                      <option>Redeemed</option>

                    </select>
                  </div>

                  <Button loading={saveGiftcardLoading}
                    onClick={() => saveGiftcard()} className="save-btn" style={{ float: 'right', backgroundColor: '#5D72E9', color: 'white', borderRadius: '5px', padding: '0px 25px 0px 25px', marginTop: -20 }}>Save</Button>
                  {showError && <div style={{
                    color: 'red',
                    textAlign: 'center',
                    margin: '5px 0px -15px 0'
                  }}>All the fields are mandatory</div>}
                </Modal>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
export default GiftCards