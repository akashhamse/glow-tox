import { PageTitle } from '../../components/page-title/'
import './gift-card.scss';
import { Form, Input, Button, Card, Select , Skeleton ,Anchor} from 'antd';
const { Option } = Select;
const {Link}= Anchor;
function Dashboard() {
    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };
    return (
        <div className="gift-card-screen">
            <div className={'content-wrapper'}>
                <PageTitle
                    title={'Gift Card - Create'}
                />
                <div className={'content-body-wrapper'}>
                    <div className={'gift-card-inner-wrapper'}>
                        <div className={'options-wrapper'}>
                            <div className={'add-btn'} style={{ padding: '10px 30px' }}> <Anchor affix={false}><Link href="/Giftcards" title="Send" /></Anchor> </div>
                        </div>
                        <div className={'card-wrapper'}>
                        <Card
                    style={{ width: 900}}>
                    <Skeleton paragraph={{ rows: 6 }} />
                  </Card>
                        </div>
                        {/* <div className={'card-wrapper'}>
                            <Card style={{ width: '90%' }}>
                                <Form {...layout} name="nest-messages"
                                //validateMessages={validateMessages}
                                >
                                    <Form.Item name={['user', 'name']} label="Client Name"
                                    // rules={[{ required: true }]}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item name={['user', 'email']} label="Email Id" rules={[{ type: 'email' }]}>
                                        <Input />
                                    </Form.Item>
                                    <Form.Item name={['user', 'age']} label="Service Name" rules={[{ type: 'number', min: 0, max: 99 }]}>
                                        <Input />

                                    </Form.Item>



                                    <Form.Item name={['user', 'website']} label="Offer">
                                        <span>
                                            <Input
                                                type="text"
                                                value={''}
                                                // onChange={onNumberChange}
                                                style={{ width: 200 }}
                                            />
                                            <Select
                                                value={"$"}
                                                style={{ width: 150, margin: '0 8px' }}
                                            // onChange={onCurrencyChange}
                                            >
                                                <Option value="dollar">$</Option>
                                                <Option value="percentage">%</Option>
                                            </Select>
                                        </span>                                    </Form.Item>
                                </Form>
                            </Card>

                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;